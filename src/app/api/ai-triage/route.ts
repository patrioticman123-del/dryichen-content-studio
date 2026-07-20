import { NextResponse } from 'next/server';
import { getAllDiseases } from '@/data/diseases';

export const maxDuration = 60;

const MODELS = ['gemini-3.5-flash', 'gemini-3.1-flash-lite'] as const;
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_SYMPTOM_LENGTH = 1_000;

interface AIResult {
  recommendedIds: string[];
  externalSuggestions: string[];
}

class GeminiRequestError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'GeminiRequestError';
  }
}

const RED_FLAG_PATTERN =
  /(胸痛|胸悶.*冒冷汗|呼吸困難|喘不過氣|失去意識|昏迷|突然.*(?:無力|癱瘓|嘴歪|說話不清)|大量出血|吐血|黑便|嚴重過敏|喉嚨腫|自殺|不想活|大小便失禁.*(?:腳麻|無力)|高燒.*意識不清)/i;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeResult(value: unknown, validIds: Set<string>): AIResult {
  if (!value || typeof value !== 'object') {
    throw new Error('AI response is not an object');
  }

  const candidate = value as Record<string, unknown>;
  if (!Array.isArray(candidate.recommendedIds) || !Array.isArray(candidate.externalSuggestions)) {
    throw new Error('AI response does not match the expected schema');
  }

  const recommendedIds = [
    ...new Set(
      candidate.recommendedIds.filter(
        (id): id is string => typeof id === 'string' && validIds.has(id),
      ),
    ),
  ].slice(0, 3);

  const normalizedExternalSuggestions = [
    ...new Set(
      candidate.externalSuggestions
        .filter((name): name is string => typeof name === 'string')
        .map((name) => name.trim())
        .filter(Boolean),
    ),
  ].slice(0, 3);

  return {
    recommendedIds,
    externalSuggestions: recommendedIds.length > 0 ? [] : normalizedExternalSuggestions,
  };
}

async function fetchGeminiOnce(
  model: string,
  apiKey: string,
  systemPrompt: string,
  symptom: string,
  diseaseIds: string[],
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\n【使用者症狀】：${symptom}` }],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            responseJsonSchema: {
              type: 'object',
              properties: {
                recommendedIds: {
                  type: 'array',
                  items: { type: 'string', enum: diseaseIds },
                  maxItems: 3,
                },
                externalSuggestions: {
                  type: 'array',
                  items: { type: 'string' },
                  maxItems: 3,
                },
              },
              required: ['recommendedIds', 'externalSuggestions'],
              additionalProperties: false,
            },
            temperature: 0.2,
            maxOutputTokens: 512,
          },
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new GeminiRequestError(`Gemini returned HTTP ${response.status}`, response.status);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof text !== 'string' || !text.trim()) {
      throw new Error(`Gemini returned no text (${data.candidates?.[0]?.finishReason ?? 'unknown'})`);
    }

    return JSON.parse(text) as unknown;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchGemini(
  model: string,
  apiKey: string,
  systemPrompt: string,
  symptom: string,
  diseaseIds: string[],
) {
  try {
    return await fetchGeminiOnce(model, apiKey, systemPrompt, symptom, diseaseIds);
  } catch (error) {
    const shouldRetry =
      error instanceof GeminiRequestError &&
      error.status !== undefined &&
      [429, 500, 502, 503, 504].includes(error.status);

    if (!shouldRetry) throw error;

    await wait(750);
    return fetchGeminiOnce(model, apiKey, systemPrompt, symptom, diseaseIds);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { symptom?: unknown };
    const symptom = typeof body.symptom === 'string' ? body.symptom.trim() : '';

    if (!symptom) {
      return NextResponse.json({ error: '請輸入症狀' }, { status: 400 });
    }

    if (symptom.length > MAX_SYMPTOM_LENGTH) {
      return NextResponse.json(
        { error: `症狀內容請勿超過 ${MAX_SYMPTOM_LENGTH} 個字元` },
        { status: 413 },
      );
    }

    if (RED_FLAG_PATTERN.test(symptom)) {
      return NextResponse.json({
        recommendedIds: [],
        externalSuggestions: [
          '您的描述可能包含緊急警訊，請立即聯絡 119 或前往急診，勿等待線上分析。',
        ],
        urgent: true,
      });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_API_KEY is not configured');
      return NextResponse.json(
        { error: 'AI 服務尚未完成設定，請稍後再試' },
        { status: 503 },
      );
    }

    const diseases = getAllDiseases().map((disease) => ({
      id: disease.id,
      title: disease.title,
    }));
    const diseaseIds = diseases.map((disease) => disease.id);
    const validIds = new Set(diseaseIds);

    const systemPrompt = `
你是復健科診所的症狀導引助理，不是醫師，也不能做出確定診斷。
請根據使用者提供的症狀，選出最多 3 個可能相關的衛教主題。

【本院疾病列表】
${JSON.stringify(diseases)}

規則：
1. 列表內有合適主題時，只把對應 id 放入 recommendedIds。
2. 列表沒有合適主題時，才把最多 3 個可能相關的醫學名稱放入 externalSuggestions。
3. 不要提供確定診斷、藥物劑量或取代醫師評估的建議。
4. 資訊不足時可以回傳兩個空陣列，不要憑空猜測。
5. 只輸出符合指定 JSON Schema 的資料。
`;

    for (const model of MODELS) {
      try {
        console.info(`Calling triage model: ${model}`);
        const rawResult = await fetchGemini(
          model,
          apiKey,
          systemPrompt,
          symptom,
          diseaseIds,
        );
        return NextResponse.json(normalizeResult(rawResult, validIds));
      } catch (error) {
        console.warn(
          `Triage model failed: ${model}`,
          error instanceof Error ? error.message : 'Unknown error',
        );
      }
    }

    return NextResponse.json(
      { error: 'AI 服務目前忙碌，請稍後再試' },
      {
        status: 503,
        headers: { 'Retry-After': '10' },
      },
    );
  } catch (error) {
    console.error('AI triage critical error:', error);
    return NextResponse.json(
      { error: '無法處理這次請求，請稍後再試' },
      { status: 500 },
    );
  }
}
