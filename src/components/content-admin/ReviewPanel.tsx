'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ApprovalCheck, GeneratedArticle } from '@/features/content-admin/types';

export default function ReviewPanel({ article, checks }: { article: GeneratedArticle; checks: ApprovalCheck[] }) {
  const router = useRouter();
  const [request, setRequest] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const canApprove = checks.every((check) => !check.blocking || check.passed);

  async function revise(event: FormEvent) {
    event.preventDefault(); if (!request.trim()) return;
    setBusy(true); setMessage('');
    const response = await fetch(`/api/admin/articles/${article.id}/versions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ changeRequest: request }) });
    const result = await response.json(); setBusy(false);
    if (!response.ok) return setMessage(result.error || '建立版本失敗');
    setRequest(''); setMessage(`已建立第 ${result.article.currentVersion} 版。`); router.refresh();
  }

  async function approve() {
    setBusy(true); setMessage('');
    const response = await fetch(`/api/admin/articles/${article.id}/approve`, { method: 'POST' });
    const result = await response.json(); setBusy(false);
    if (!response.ok) return setMessage(result.error || '核准失敗');
    setMessage('文章已核准；目前仍不會發布到正式網站。'); router.refresh();
  }

  return (
    <aside className="space-y-5">
      <section className="rounded-2xl border border-slate-700 bg-slate-800 p-5"><div className="flex items-center justify-between"><h2 className="text-lg font-bold text-white">發布前檢查</h2><span className={`rounded-full px-3 py-1 text-xs font-bold ${article.status === 'approved' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-amber-400/15 text-amber-200'}`}>{article.status === 'approved' ? '已核准' : '待審核'}</span></div><div className="mt-4 space-y-3">{checks.map((check) => <div key={check.id} className="flex gap-3 text-sm"><span className={check.passed ? 'text-emerald-400' : 'text-rose-400'}>{check.passed ? '✓' : '×'}</span><div><p className="font-semibold text-slate-200">{check.label}</p><p className="mt-1 text-xs leading-5 text-slate-500">{check.detail}</p></div></div>)}</div></section>
      <form onSubmit={revise} className="rounded-2xl border border-slate-700 bg-slate-800 p-5"><h2 className="text-lg font-bold text-white">提出修改</h2><p className="mt-2 text-xs leading-5 text-slate-400">本機基本版會保存你的要求並產生新版本；接上 AI 後，這裡會依指示重寫內文。</p><textarea value={request} onChange={(event) => setRequest(event.target.value)} rows={5} className="mt-4 w-full rounded-xl border border-slate-600 bg-slate-950 p-3 text-sm text-white outline-none focus:border-cyan-400" placeholder="例如：把開頭寫得更口語，並補充三個常見錯誤。"/><button disabled={busy || !request.trim()} className="mt-3 w-full rounded-xl border border-cyan-500/50 px-4 py-3 text-sm font-bold text-cyan-300 disabled:opacity-40">建立新版本</button></form>
      <button disabled={busy || !canApprove || article.status === 'approved'} onClick={approve} className="w-full rounded-xl bg-emerald-400 px-4 py-3 font-black text-slate-950 disabled:opacity-40">{article.status === 'approved' ? '已核准（尚未發布）' : '核准文章'}</button>
      {message && <p className="rounded-xl bg-slate-800 p-3 text-sm text-cyan-200">{message}</p>}
      <p className="text-center text-xs leading-5 text-slate-500">基本版沒有「正式發布」按鈕，核准只會改變本機狀態。</p>
    </aside>
  );
}
