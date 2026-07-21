'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ApprovalCheck, GeneratedArticle } from '@/features/content-admin/types';

export default function ReviewPanel({ article, checks }: { article: GeneratedArticle; checks: ApprovalCheck[] }) {
  const router = useRouter();
  const [publishPassword, setPublishPassword] = useState('');
  const [showPublish, setShowPublish] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const canApprove = checks.every((check) => !check.blocking || check.passed);
  const isApproved = article.status === 'approved';
  const isPublished = article.status === 'published';

  async function approve() {
    setBusy(true);
    setMessage('');
    const response = await fetch(`/api/admin/articles/${article.id}/approve`, { method: 'POST' });
    const result = await response.json();
    setBusy(false);
    if (!response.ok) return setMessage(result.error || '核准失敗。');
    setMessage('文章已核准，下一步可輸入發布密碼。');
    setShowPublish(true);
    router.refresh();
  }

  async function publish(event: FormEvent) {
    event.preventDefault();
    if (!publishPassword) return;
    setBusy(true);
    setMessage('');
    const response = await fetch(`/api/admin/articles/${article.id}/publish`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: publishPassword }),
    });
    const result = await response.json();
    setBusy(false);
    if (!response.ok) return setMessage(result.error || '發布失敗。');
    setPublishPassword('');
    setShowPublish(false);
    setMessage('文章已完成發布確認。');
    router.refresh();
  }

  return (
    <aside className="space-y-4">
      <section className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white">發布前檢查</h2>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${isPublished ? 'bg-cyan-400/15 text-cyan-200' : isApproved ? 'bg-emerald-400/15 text-emerald-300' : 'bg-amber-400/15 text-amber-200'}`}>
            {isPublished ? '已發布' : isApproved ? '已核准' : '待審核'}
          </span>
        </div>
        <div className="mt-4 space-y-3">
          {checks.map((check) => <div key={check.id} className="flex gap-3 text-sm"><span className={check.passed ? 'text-emerald-400' : 'text-rose-400'}>{check.passed ? '✓' : '×'}</span><div><p className="font-semibold text-slate-200">{check.label}</p><p className="mt-1 text-xs leading-5 text-slate-500">{check.detail}</p></div></div>)}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
        <h2 className="text-lg font-bold text-white">需要重新撰寫？</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">改用完整提示詞到 GPT 或 Claude 生成，再貼回工作台預覽。</p>
        <Link href={`/admin/content-topics/${article.topicId}/prompt`} className="mt-3 flex min-h-12 items-center justify-center rounded-xl border border-cyan-500/50 px-4 text-sm font-bold text-cyan-300">開啟提示詞工具</Link>
      </section>

      {!isApproved && !isPublished && <button disabled={busy || !canApprove} onClick={approve} className="min-h-12 w-full rounded-xl bg-emerald-400 px-4 font-black text-slate-950 disabled:opacity-40">核准文章</button>}
      {isApproved && !showPublish && <button onClick={() => setShowPublish(true)} className="min-h-12 w-full rounded-xl bg-cyan-400 px-4 font-black text-slate-950">輸入密碼並發布</button>}

      {isApproved && showPublish && (
        <form onSubmit={publish} className="rounded-2xl border border-cyan-500/40 bg-slate-800 p-5">
          <label className="text-sm font-bold text-white" htmlFor="publish-password">發布密碼</label>
          <input id="publish-password" type="password" value={publishPassword} onChange={(event) => setPublishPassword(event.target.value)} autoComplete="current-password" className="mt-3 min-h-12 w-full rounded-xl border border-slate-600 bg-slate-950 px-4 text-white outline-none focus:border-cyan-400" placeholder="只有發布時需要輸入" />
          <div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={() => setShowPublish(false)} className="min-h-12 rounded-xl border border-slate-600 text-sm font-bold text-slate-300">取消</button><button disabled={busy || !publishPassword} className="min-h-12 rounded-xl bg-cyan-400 text-sm font-black text-slate-950 disabled:opacity-40">確認發布</button></div>
        </form>
      )}

      {isPublished && <div className="rounded-xl bg-cyan-400/10 p-4 text-center text-sm font-bold text-cyan-200">這篇文章已完成發布確認。</div>}
      {message && <p className="rounded-xl bg-slate-800 p-3 text-sm text-cyan-200">{message}</p>}
    </aside>
  );
}
