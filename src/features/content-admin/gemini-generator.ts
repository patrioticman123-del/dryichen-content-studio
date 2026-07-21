import 'server-only';

import { GoogleGenAI } from '@google/genai';
import type { ArticleReference, ArticleVersion, ContentTopic } from './types';

type GeneratedSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type GeneratedFaq = {
  question: string;
  answer: string;
};

type GeminiArticleDraft = {
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  opening: string[];
  keyPoints: string[];
  sections: GeneratedSection[];
  warningSigns: string[];
  faqs: GeneratedFaq[];
  conclusion: string;
};

const articleSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: { type: 'string', description: '文章主標題，繁體中文，清楚回應搜尋意圖。' },
    summary: { type: 'string', description: '80 至 140 字的文章摘要。' },
    seoTitle: { type: 'string', description: '適合搜尋結果顯示的 SEO 標題。' },
    seoDescription: { type: 'string', description: '80 至 150 字的 SEO 描述。' },
    opening: {
      type: 'array', minItems: 2, maxItems: 3,
      items: { type: 'string', description: '文章前言段落。' },
    },
    keyPoints: {
      type: 'array', minItems: 3, maxItems: 5,
      items: { type: 'string', description: '讀者先看結論的重點。' },
    },
    sections: {
      type: 'array', minItems: 4, maxItems: 6,
      items: {
        type: 'object', additionalProperties: false,
        properties: {
          heading: { type: 'string' },
          paragraphs: { type: 'array', minItems: 2, maxItems: 4, items: { type: 'string' } },
          bullets: { type: 'array', minItems: 2, maxItems: 6, items: { type: 'string' } },
        },
        required: ['heading', 'paragraphs'],
      },
    },
    warningSigns: {
      type: 'array', minItems: 3, maxItems: 7,
      items: { type: 'string', description: '需要停止自行處理並就醫的具體警訊。' },
    },
    faqs: {
      type: 'array', minItems: 2, maxItems: 4,
      items: {
        type: 'object', additionalProperties: false,
        properties: { question: { type: 'string' }, answer: { type: 'string' } },
        required: ['question', 'answer'],
      },
    },
    conclusion: { type: 'string', description: '收束全文並鼓勵適當就醫的結語。' },
  },
  required: [
    'title', 'summary', 'seoTitle', 'seoDescription', 'opening', 'keyPoints',
    'sections', 'warningSigns', 'faqs', 'conclusion',
  ],
} as const;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  })[character] || character);
}

function clean(value: unknown, maximum = 4000): string {
  return typeof value === 'string' ? value.trim().slice(0, maximum) : '';
}

function cleanList(value: unknown, maximumItems: number, maximumLength = 1500): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => clean(item, maximumLength)).filter(Boolean).slice(0, maximumItems);
}

function parseDraft(raw: string): GeminiArticleDraft {
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new Error('Gemini 回傳的文章格式無法解析，請再試一次。');
  }
  if (!value || typeof value !== 'object') throw new Error('Gemini 未回傳完整文章。');
  const input = value as Record<string, unknown>;
  const sections = Array.isArray(input.sections)
    ? input.sections.map((item) => {
        const section = item && typeof item === 'object' ? item as Record<string, unknown> : {};
        return {
          heading: clean(section.heading, 160),
          paragraphs: cleanList(section.paragraphs, 4),
          bullets: cleanList(section.bullets, 6, 500),
        };
      }).filter((section) => section.heading && section.paragraphs.length >= 2).slice(0, 6)
    : [];
  const faqs = Array.isArray(input.faqs)
    ? input.faqs.map((item) => {
        const faq = item && typeof item === 'object' ? item as Record<string, unknown> : {};
        return { question: clean(faq.question, 200), answer: clean(faq.answer, 1200) };
      }).filter((faq) => faq.question && faq.answer).slice(0, 4)
    : [];

  const draft: GeminiArticleDraft = {
    title: clean(input.title, 180),
    summary: clean(input.summary, 500),
    seoTitle: clean(input.seoTitle, 180),
    seoDescription: clean(input.seoDescription, 500),
    opening: cleanList(input.opening, 3),
    keyPoints: cleanList(input.keyPoints, 5, 500),
    sections,
    warningSigns: cleanList(input.warningSigns, 7, 500),
    faqs,
    conclusion: clean(input.conclusion, 2000),
  };

  if (!draft.title || draft.summary.length < 40 || !draft.seoTitle || draft.seoDescription.length < 40) {
    throw new Error('Gemini 回傳的標題或摘要不完整，請再試一次。');
  }
  if (draft.opening.length < 2 || draft.keyPoints.length < 3 || draft.sections.length < 4 ||
      draft.warningSigns.length < 3 || draft.faqs.length < 2 || !draft.conclusion) {
    throw new Error('Gemini 回傳的文章段落不完整，請再試一次。');
  }
  return draft;
}

function referencesFromTopic(topic: ContentTopic): ArticleReference[] {
  return topic.sources.map((source) => ({
    label: source.label,
    url: source.url || '',
    note: source.note || (source.url ? '正式發布前請人工確認引用內容。' : '診所內部選題觀察，非外部醫學文獻。'),
  }));
}

function renderArticleHtml(draft: GeminiArticleDraft, version: number, changeRequest?: string): string {
  const editorNote = changeRequest
    ? `<div style="margin:1.5rem 0;padding:1rem;border:1px solid #22d3ee;border-radius:.75rem;background:rgba(8,145,178,.12)"><strong style="color:#67e8f9">第 ${version} 版修改要求：</strong> ${escapeHtml(changeRequest)}</div>`
    : '';
  const paragraphs = (items: string[]) => items.map((item) => `<p>${escapeHtml(item)}</p>`).join('');
  const bullets = (items: string[]) => `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;

  return `
    <div style="background:#f8fafc;border-left:4px solid #06b6d4;padding:1.5rem;margin-bottom:2rem;border-radius:.5rem;color:#334155">
      <h2 style="color:#0e7490;margin-top:0">先說結論</h2>
      ${bullets(draft.keyPoints)}
    </div>
    ${editorNote}
    <section style="margin-bottom:3rem">
      <h2 style="color:#fff">讀者最需要先知道的事</h2>
      ${paragraphs(draft.opening)}
    </section>
    ${draft.sections.map((section) => `
      <section style="margin-bottom:3rem">
        <h2 style="color:#fff">${escapeHtml(section.heading)}</h2>
        ${paragraphs(section.paragraphs)}
        ${section.bullets?.length ? bullets(section.bullets) : ''}
      </section>`).join('')}
    <section style="margin-bottom:3rem">
      <h2 style="color:#fff">哪些情況應儘早就醫？</h2>
      ${bullets(draft.warningSigns)}
    </section>
    <section style="margin-bottom:3rem">
      <h2 style="color:#fff">常見問題</h2>
      ${draft.faqs.map((faq) => `<h3 style="color:#67e8f9">${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p>`).join('')}
    </section>
    <section style="margin-bottom:3rem">
      <h2 style="color:#fff">重點整理</h2>
      <p>${escapeHtml(draft.conclusion)}</p>
    </section>
    <div style="background:#fffbeb;border:2px solid #fbbf24;border-radius:1rem;padding:1.5rem;color:#92400e">
      <strong>醫療安全提醒：</strong>本文為一般醫療衛教草稿，不能取代醫師診斷、檢查或個別治療建議。若症狀持續、惡化或出現上述警訊，請儘早就醫。正式發布前仍須由醫療專業人員複核內容與參考資料。
    </div>`;
}

function plainText(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function buildPrompt(topic: ContentTopic, changeRequest?: string, previousVersion?: ArticleVersion): string {
  const sources = topic.sources.map((source, index) => ({
    number: index + 1, label: source.label, type: source.sourceType,
    note: source.note, url: source.url || null,
  }));
  const revisionContext = changeRequest && previousVersion
    ? `\n這是修改任務。編輯要求：${changeRequest}\n前一版內容：\n${plainText(previousVersion.contentHtml).slice(0, 12000)}`
    : '';

  return `你是台灣復健科診所的醫療衛教文章編輯。請以繁體中文撰寫一篇可供醫療人員審核的完整草稿。

文章主題：${topic.title}
分類：${topic.category}
選題摘要：${topic.summary}
選題原因：${topic.rationale}
長尾關鍵字：${topic.longTailKeywords.join('、')}
可使用的來源線索：${JSON.stringify(sources)}
${revisionContext}

寫作要求：
1. 以一般民眾能理解、溫暖但專業的台灣繁體中文撰寫，全文約 1,400 至 2,200 個中文字。
2. 開頭直接回應問題，再依序解釋原因、可執行做法、常見錯誤、就醫警訊與常見問題。
3. 自然放入長尾關鍵字，不要堆砌關鍵字。
4. 不可做個別診斷、保證療效或提供精確處方；不得以文章取代就醫。
5. 不可捏造研究名稱、作者、年份、統計數字、醫療指引或來源網址。若來源資訊不足，使用保守的一般衛教表述。
6. 只輸出符合指定 JSON Schema 的資料，不要輸出 Markdown 或 HTML。`;
}

export async function generateArticleVersion(
  topic: ContentTopic,
  version = 1,
  changeRequest?: string,
  previousVersion?: ArticleVersion,
): Promise<ArticleVersion> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new Error('Gemini API 尚未設定，請在 Vercel 新增 GEMINI_API_KEY。');

  const client = new GoogleGenAI({ apiKey });
  const configuredModel = process.env.GEMINI_MODEL?.trim();
  const models = configuredModel ? [configuredModel] : ['gemini-3.5-flash', 'gemini-2.5-flash'];
  let draft: GeminiArticleDraft | undefined;
  let lastError: unknown;

  for (const model of models) {
    try {
      const response = await client.models.generateContent({
        model,
        contents: buildPrompt(topic, changeRequest, previousVersion),
        config: {
          httpOptions: { timeout: 26000 },
          temperature: 0.35,
          maxOutputTokens: 12000,
          responseMimeType: 'application/json',
          responseJsonSchema: articleSchema,
        },
      });
      draft = parseDraft(response.text || '');
      break;
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : '';
      console.error(`Gemini model ${model} failed`, error);
      if (/API_KEY_INVALID|API key not valid|401|403|PERMISSION_DENIED|429|RESOURCE_EXHAUSTED|quota/i.test(message)) {
        throw error;
      }
    }
  }
  if (!draft) throw lastError || new Error('Gemini 未回傳文章內容。');

  return {
    version,
    title: draft.title,
    summary: draft.summary,
    seoTitle: draft.seoTitle,
    seoDescription: draft.seoDescription,
    keywords: [...topic.longTailKeywords],
    contentHtml: renderArticleHtml(draft, version, changeRequest),
    references: referencesFromTopic(topic),
    changeRequest,
    createdAt: new Date().toISOString(),
  };
}

export function publicGenerationError(error: unknown): string {
  const message = error instanceof Error ? error.message : '';
  if (/Gemini API 尚未設定/.test(message)) return message;
  if (/429|RESOURCE_EXHAUSTED|quota/i.test(message)) {
    return 'Gemini 免費額度或速率限制已用完，請稍候一段時間再試。';
  }
  if (/API_KEY_INVALID|API key not valid|401|403|PERMISSION_DENIED/i.test(message)) {
    return 'Gemini API 金鑰無效或沒有權限，請檢查 Vercel 的 GEMINI_API_KEY。';
  }
  if (/404|NOT_FOUND|model.+not found/i.test(message)) {
    return '目前帳號無法使用設定的 Gemini 模型，請檢查模型名稱或稍後再試。';
  }
  if (/format|格式|完整文章|標題或摘要|文章段落/.test(message)) return message;
  if (/timeout|timed out|abort/i.test(message)) return 'Gemini 生成時間過長，請再試一次。';
  return 'Gemini 暫時無法完成文章生成，請稍後再試。';
}
