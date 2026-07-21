'use client';

import { useRef, useState } from 'react';
import PreviewChrome from './PreviewChrome';
import { parseExternalArticleCode, sanitizeArticleHtml, type ExternalArticleCode } from '@/features/content-admin/article-prompt';
import type { ContentTopic } from '@/features/content-admin/types';

export default function PromptArticleWorkspace({ topic, prompt }: { topic: ContentTopic; prompt: string }) {
  const [copyStatus, setCopyStatus] = useState('');
  const [articleCode, setArticleCode] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<ExternalArticleCode>();
  const previewRef = useRef<HTMLDivElement>(null);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyStatus('提示詞已複製，可以直接貼到 GPT 或 Claude。');
    } catch {
      setCopyStatus('瀏覽器無法自動複製，請在提示詞欄位長按後選擇「全選、複製」。');
    }
  }

  function showPreview() {
    setError('');
    try {
      const parsed = parseExternalArticleCode(articleCode);
      setPreview({
        ...parsed,
        contentHtml: sanitizeArticleHtml(parsed.contentHtml),
        referencesHtml: sanitizeArticleHtml(parsed.referencesHtml),
      });
      window.setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    } catch (reason) {
      setPreview(undefined);
      setError(reason instanceof Error ? reason.message : '無法解析文章程式碼。');
    }
  }

  const referenceCount = preview ? (preview.referencesHtml.match(/<li\b/gi) || []).length : 0;

  return (
    <>
      <div className="space-y-5">
        <section className="rounded-2xl border border-teal-200 bg-teal-50 p-4 text-sm leading-6 text-teal-900 sm:p-5">
          <p className="font-black">使用方式</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>按「一鍵複製完整提示詞」。</li>
            <li>貼到 GPT 或 Claude，等待它回傳完整文章物件程式碼。</li>
            <li>複製 AI 回傳的全部程式碼，貼到下方欄位。</li>
            <li>按「預覽完整文章」檢查手機與正式網站版型。</li>
          </ol>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-teal-600">{topic.category}</p>
              <h2 className="mt-1 text-lg font-black text-slate-900">{topic.title}</h2>
            </div>
            <span className="rounded-xl bg-teal-50 px-3 py-2 text-sm font-black text-teal-700">{topic.score.total}</span>
          </div>
          <textarea readOnly value={prompt} rows={18} aria-label="完整文章提示詞" className="mt-4 w-full rounded-xl border border-slate-300 bg-slate-50 p-3 font-mono text-xs leading-5 text-slate-700 outline-none" />
          <button type="button" onClick={copyPrompt} className="mt-3 min-h-12 w-full rounded-xl bg-teal-600 px-4 text-sm font-black text-white hover:bg-teal-700">一鍵複製完整提示詞</button>
          {copyStatus && <p className="mt-3 rounded-lg bg-slate-100 p-3 text-sm text-slate-700">{copyStatus}</p>}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-lg font-black text-slate-900">貼上 AI 生成的文章程式碼</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">請貼上從開頭的 <code>{'{'}</code> 到最後的 <code>{'},'}</code>；有包含 ```javascript 程式碼框也可以。</p>
          <textarea value={articleCode} onChange={(event) => setArticleCode(event.target.value)} rows={16} aria-label="AI 生成的文章程式碼" placeholder="在這裡貼上 GPT 或 Claude 回傳的完整程式碼…" className="mt-4 w-full rounded-xl border border-slate-300 bg-white p-3 font-mono text-xs leading-5 text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" />
          {error && <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
          <button type="button" onClick={showPreview} disabled={!articleCode.trim()} className="mt-3 min-h-12 w-full rounded-xl bg-slate-900 px-4 text-sm font-black text-white disabled:opacity-40">預覽完整文章</button>
        </section>
      </div>

      {preview && (
        <div ref={previewRef} className="mt-10 scroll-mt-4">
          <PreviewChrome>
            <div className="px-4 py-6 md:px-8 md:py-8">
              <div className="mx-auto max-w-5xl">
                <div className="mb-5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
                  <p className="font-bold">外部 AI 文章預覽</p>
                  <p className="mt-1 text-cyan-200/70">參考資料偵測：{referenceCount} 篇。正式發布前請逐篇打開連結核對作者、年份、結論與內文引用。</p>
                </div>
                <main className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/80 shadow-2xl">
                  <article className="p-5 md:p-10">
                    <header className="mb-8 border-l-4 border-cyan-500 bg-gradient-to-r from-slate-900/80 to-transparent py-5 pl-4">
                      <div className="flex flex-wrap gap-2"><span className="rounded-full border border-cyan-500/40 px-3 py-1 text-xs font-bold text-cyan-300">{preview.category}</span><span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">外部 AI 草稿</span></div>
                      <h1 className="mt-5 text-3xl font-bold leading-tight text-white md:text-5xl">{preview.title}</h1>
                      <p className="mt-5 leading-7 text-slate-300">{preview.summary}</p>
                    </header>
                    <div className="external-article-preview prose prose-invert max-w-none prose-h2:text-2xl prose-h3:text-xl prose-p:leading-8 prose-li:leading-8" dangerouslySetInnerHTML={{ __html: preview.contentHtml }} />
                    <section className="external-article-preview mt-10 border-t border-slate-700 pt-7" dangerouslySetInnerHTML={{ __html: preview.referencesHtml }} />
                  </article>
                </main>
              </div>
            </div>
          </PreviewChrome>
          <style jsx global>{`
            .external-article-preview .custom-table-container{width:100%;overflow-x:auto;margin:20px 0;border-radius:8px}
            .external-article-preview .modern-table{width:100%;border-collapse:collapse;font-size:15px;background:#fff;color:#1f2937;min-width:720px}
            .external-article-preview .modern-table thead tr{background:#1e3a8a;color:#fff;text-align:left}
            .external-article-preview .modern-table th{padding:16px 12px;border-bottom:2px solid #111827}
            .external-article-preview .modern-table td{padding:14px 12px;border-bottom:1px solid #e5e7eb;line-height:1.6}
            .external-article-preview .modern-table tbody tr:nth-of-type(even){background:#f3f4f6}
            .external-article-preview img{max-width:100%;height:auto;border-radius:12px;margin:1.5rem auto}
          `}</style>
        </div>
      )}
    </>
  );
}
