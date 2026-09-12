'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ArticleCodePreview from './ArticleCodePreview';
import { buildClaudeHandoffPrompt, parseExternalArticleCode, type ExternalArticleCode } from '@/features/content-admin/article-prompt';
import type { ContentTopic } from '@/features/content-admin/types';
import type { FreeDraft } from '@/features/content-admin/free-draft-store';

export default function PromptArticleWorkspace({ topic, prompt }: { topic: ContentTopic; prompt: string }) {
  const [copyStatus, setCopyStatus] = useState('');
  const [articleCode, setArticleCode] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');
  const [storageNotice, setStorageNotice] = useState('');
  const [preview, setPreview] = useState<{ article: ExternalArticleCode; kind: 'free' | 'claude' }>();
  const [draft, setDraft] = useState<FreeDraft | null>(null);
  const [model, setModel] = useState('');
  const [configured, setConfigured] = useState<boolean>();
  const [generating, setGenerating] = useState(false);
  const [includeDraft, setIncludeDraft] = useState(true);
  const [loadedKey, setLoadedKey] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);
  const storageKey = `content-studio:claude:${topic.id}`;
  const endpoint = `/api/admin/topics/${encodeURIComponent(topic.id)}/free-draft`;
  const fullPrompt = buildClaudeHandoffPrompt(prompt, includeDraft ? draft?.article : undefined, instructions);
  const working = generating || draft?.status === 'running';

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        if (typeof data.code === 'string') setArticleCode(data.code);
        if (typeof data.instructions === 'string') setInstructions(data.instructions);
        setStorageNotice('已恢復這台裝置之前貼上的程式碼與修改意見。');
      }
    } catch { setStorageNotice('瀏覽器不允許本機儲存，離開前請另存程式碼。'); }
    setLoadedKey(storageKey);
  }, [storageKey]);

  useEffect(() => {
    if (loadedKey !== storageKey) return;
    const timer = setTimeout(() => {
      try { window.localStorage.setItem(storageKey, JSON.stringify({ code: articleCode, instructions })); }
      catch { setStorageNotice('本機儲存失敗或空間不足，離開前請另存程式碼。'); }
    }, 400);
    return () => clearTimeout(timer);
  }, [articleCode, instructions, loadedKey, storageKey]);

  const loadDraft = useCallback(async () => {
    const response = await fetch(endpoint, { cache: 'no-store' });
    const data = await response.json();
    if (!response.ok) throw new Error('無法讀取 AI 初稿狀態；手動貼回仍可使用。');
    setConfigured(data.configured); setModel(data.model); setDraft(data.draft);
    return data.draft as FreeDraft | null;
  }, [endpoint]);

  useEffect(() => {
    void loadDraft().catch((reason) => setError(reason.message));
    const onFocus = () => { void loadDraft().catch(() => {}); };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [loadDraft]);

  useEffect(() => {
    if (draft?.status !== 'running') return;
    const timer = setInterval(() => { void loadDraft().then((current) => {
      if (current?.status === 'completed' && current.article) setPreview({ article: current.article, kind: 'free' });
    }).catch(() => {}); }, 8000);
    return () => clearInterval(timer);
  }, [draft?.status, loadDraft]);

  function reveal(article: ExternalArticleCode, kind: 'free' | 'claude') {
    setPreview({ article, kind });
    window.setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }

  async function generateDraft(regenerate = false) {
    if (regenerate && !window.confirm('確定重新試寫？這會消耗一次免費額度，失敗時會保留上一版初稿。')) return;
    setGenerating(true); setError('');
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ regenerate }), signal: AbortSignal.timeout(280000) });
      const data = await response.json().catch(() => ({ error: '伺服器沒有完整回應；請檢查初稿狀態或改用 Claude。' }));
      if (!response.ok) throw new Error(data.error || '初稿產生失敗。');
      setDraft(data.draft);
      if (data.draft.status === 'completed' && data.draft.article) reveal(data.draft.article, 'free');
    } catch (reason) {
      setError(reason instanceof Error && ['AbortError', 'TimeoutError'].includes(reason.name) ? '等待時間已到，請按「檢查初稿狀態」。不要連續重按試寫，以免重複消耗額度。' : reason instanceof Error ? reason.message : '無法生成初稿。');
      await loadDraft().catch(() => {});
    } finally { setGenerating(false); }
  }

  async function copyPrompt() {
    try { await navigator.clipboard.writeText(fullPrompt); setCopyStatus(`已複製議題、文章範本、修改意見${includeDraft && draft?.article ? '及 AI 初稿' : ''}，可以貼到 Claude。`); }
    catch { setCopyStatus('瀏覽器無法自動複製，請展開提示詞後長按「全選、複製」。'); }
  }

  function showPastedPreview() {
    setError('');
    try { reveal(parseExternalArticleCode(articleCode), 'claude'); }
    catch (reason) { setError(reason instanceof Error ? reason.message : '無法解析文章程式碼。'); }
  }

  const button = 'min-h-12 w-full rounded-xl px-4 py-3 text-sm font-black disabled:opacity-40';
  return <div className="space-y-5">
    <section className="rounded-2xl border border-teal-200 bg-teal-50 p-4 text-sm leading-7 text-teal-900"><p className="font-black">兩種方式都保留</p><p>先用免費 AI 看文章方向與版型；覺得適合後，把提示詞交給 Claude 正式撰寫。也可以跳過試寫，直接使用 Claude。</p><p className="mt-2 text-xs">這裡只生成與預覽，不會自動修改網站檔案或發布文章。</p></section>
    <header className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-bold text-teal-600">已選議題 · {topic.category}</p><h2 className="mt-2 text-lg font-black leading-7 text-slate-900">{topic.title}</h2></header>

    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-lg font-black text-slate-900">1. 免費 AI 試寫與預覽（可略過）</h2>
      <p className="text-sm leading-6 text-slate-500">模型流程：{model || '確認設定中…'}。先搜尋並整理論文，再依完整文章範本寫作；3.8 遇到服務錯誤就改用免費 Flash-Lite，若回傳短文或缺少版型，再由免費 2.5 Flash 依錯誤清單修復。全程不切換付費模型。工作台每天最多試寫 10 次，已完成初稿可重複查看。</p>
      <p className="rounded-xl bg-amber-50 p-3 text-xs leading-6 text-amber-800">初稿會先使用 Google Search 尋找 DOI、PubMed、PMC 或期刊原始論文頁；如果搜尋不足或暫時失敗，仍會繼續寫完整初稿，參考文獻有幾篇就列幾篇，完全沒有時會清楚標示而不捏造。發布前仍必須人工核對。Google 免費服務可能使用輸入改善產品，請勿提供患者個資。</p>
      {configured === false && <p className="text-sm text-amber-700">目前尚未設定 Gemini 金鑰，下方 Claude 流程仍可直接使用。</p>}
      <button type="button" onClick={() => draft?.article ? reveal(draft.article, 'free') : generateDraft()} disabled={(!draft?.article && configured !== true) || working} className={`${button} bg-teal-600 text-white hover:bg-teal-700`}>{working ? '正在試寫，請稍候…' : draft?.article ? '查看已完成的免費初稿' : '免費 AI 產生初稿並預覽'}</button>
      {working && <p role="status" className="text-sm leading-6 text-teal-700">會先搜尋論文再寫完整文章，可能需要 2–5 分鐘。建議保持此頁開啟；若切換 App 回來，請按「檢查初稿狀態」，不要連續重按。</p>}
      {(draft?.article || draft?.status === 'failed') && <button type="button" onClick={() => generateDraft(true)} disabled={working || configured !== true} className={`${button} border border-slate-300 text-slate-600`}>重新試寫一版</button>}
      <button type="button" onClick={() => loadDraft().then((value) => { if (value?.article) reveal(value.article, 'free'); }).catch((reason) => setError(reason.message))} className="min-h-11 text-sm font-bold text-teal-700 underline">檢查初稿狀態</button>
      {draft?.error && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{draft.error}</p>}
    </section>

    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-lg font-black text-slate-900">2. 交給 Claude 正式撰寫</h2>
      <p className="text-sm leading-6 text-slate-500">一鍵複製的提示詞包含完整文章物件、所有 HTML 版型區塊、論文規則，以及你勾選的免費初稿，不再只是簡化骨架。</p>
      <label className="block text-sm font-bold text-slate-700">你想保留或修改的地方<textarea value={instructions} onChange={(event) => setInstructions(event.target.value)} maxLength={8000} rows={4} className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-sm font-normal leading-6" placeholder="例如：保留比較表，正文再白話一些；少寫研究細節，多說病患應該怎麼做。" /></label>
      {draft?.article && <label className="flex items-center gap-3 text-sm leading-6 text-slate-600"><input type="checkbox" checked={includeDraft} onChange={(event) => setIncludeDraft(event.target.checked)} className="h-5 w-5" />把免費初稿一起交給 Claude，並要求重新查證</label>}
      <button type="button" onClick={copyPrompt} className={`${button} bg-teal-600 text-white hover:bg-teal-700`}>一鍵複製 Claude 完整提示詞</button>
      {copyStatus && <p role="status" className="rounded-lg bg-teal-50 p-3 text-sm text-teal-800">{copyStatus}</p>}
      <details><summary className="cursor-pointer py-3 text-sm font-bold text-slate-600">查看完整提示詞與文章範本</summary><textarea readOnly value={fullPrompt} rows={14} aria-label="完整文章提示詞" className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 font-mono text-xs leading-5 text-slate-700" /></details>
    </section>

    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-lg font-black text-slate-900">3. 貼回 Claude 程式碼，預覽完整文章</h2>
      <p className="text-sm leading-6 text-slate-500">貼上 Claude 回傳的整個文章物件；JavaScript、TypeScript 程式碼框或 JSON 都可以。不是整個 page.tsx，也不會執行貼上的程式。</p>
      <textarea value={articleCode} onChange={(event) => { setArticleCode(event.target.value); if (preview?.kind === 'claude') setPreview(undefined); }} maxLength={500000} rows={12} aria-label="Claude 生成的文章程式碼" placeholder="在這裡貼上 Claude 回傳的完整文章物件…" className="w-full rounded-xl border border-slate-300 bg-white p-3 font-mono text-xs leading-5 text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" />
      <p className="text-xs leading-6 text-slate-500">程式碼與修改意見會暫存於這台裝置的瀏覽器，不會自動同步到其他手機或電腦。{storageNotice}</p>
      <button type="button" onClick={showPastedPreview} disabled={!articleCode.trim()} className={`${button} bg-teal-700 text-white`}>產生 Claude 文章預覽</button>
    </section>
    {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-700">{error}</p>}
    {preview && <div ref={previewRef} className="scroll-mt-4"><ArticleCodePreview article={preview.article} isDraft={preview.kind === 'free'} /></div>}
  </div>;
}
