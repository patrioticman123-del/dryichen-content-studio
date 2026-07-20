'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ContentTopic, TopicStatus } from '@/features/content-admin/types';

const scoreLabels = [['時效', 'timeliness'], ['患者需求', 'patientRelevance'], ['專業契合', 'clinicalFit'], ['搜尋意圖', 'searchIntent'], ['差異化', 'differentiation']] as const;

export default function TopicDashboard({ initialTopics }: { initialTopics: ContentTopic[] }) {
  const router = useRouter();
  const [topics, setTopics] = useState(initialTopics);
  const [busyId, setBusyId] = useState<string>();
  const [filter, setFilter] = useState<'active' | TopicStatus>('active');
  const [error, setError] = useState('');

  const visibleTopics = topics.filter((topic) => filter === 'active' ? topic.status !== 'dismissed' : topic.status === filter);

  async function updateStatus(id: string, status: TopicStatus) {
    setBusyId(id); setError('');
    const response = await fetch(`/api/admin/topics/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    const result = await response.json();
    setBusyId(undefined);
    if (!response.ok) return setError(result.error || '更新失敗');
    setTopics((current) => current.map((topic) => topic.id === id ? result.topic : topic));
  }

  async function generate(id: string) {
    setBusyId(id); setError('');
    const response = await fetch(`/api/admin/topics/${id}/generate`, { method: 'POST' });
    const result = await response.json();
    setBusyId(undefined);
    if (!response.ok) return setError(result.error || '文章生成失敗');
    router.push(`/admin/articles/${result.article.id}/preview`);
  }

  return (
    <div>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {([['active', '待處理'], ['saved', '已收藏'], ['drafting', '已有草稿'], ['dismissed', '已忽略']] as const).map(([value, label]) => <button key={value} onClick={() => setFilter(value)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${filter === value ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>{label}</button>)}
      </div>
      {error && <div className="mb-5 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-rose-200">{error}</div>}
      <div className="grid gap-5">
        {visibleTopics.map((topic) => (
          <article key={topic.id} className="rounded-2xl border border-slate-700 bg-slate-800/80 p-5 shadow-xl md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div><span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">{topic.category}</span><h2 className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">{topic.title}</h2></div>
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-cyan-400 text-slate-950"><strong className="text-2xl">{topic.score.total}</strong><span className="text-[10px] font-bold">總分</span></div>
            </div>
            <p className="mt-4 leading-7 text-slate-300">{topic.summary}</p>
            <div className="mt-5 grid grid-cols-5 gap-1.5">{scoreLabels.map(([label, key]) => <div key={key} className="rounded-lg bg-slate-900/70 p-2 text-center"><div className="text-sm font-bold text-white">{topic.score[key]}</div><div className="mt-1 text-[10px] text-slate-500">{label}</div></div>)}</div>
            <div className="mt-7 border-t border-slate-700 pt-6">
              <h3 className="mb-4 text-sm font-bold text-slate-200">長尾關鍵字</h3>
              <div className="flex flex-wrap gap-2.5">{topic.longTailKeywords.map((keyword) => <span key={keyword} className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-cyan-200">{keyword}</span>)}</div>
            </div>
            <div className="mt-7 rounded-xl bg-slate-900/60 p-4"><p className="text-xs font-bold text-slate-400">選題理由</p><p className="mt-2 text-sm leading-6 text-slate-300">{topic.rationale}</p></div>
            <div className="mt-6 grid grid-cols-2 gap-3 md:flex md:justify-end">
              <button disabled={busyId === topic.id} onClick={() => updateStatus(topic.id, 'dismissed')} className="rounded-xl border border-slate-600 px-4 py-3 text-sm font-bold text-slate-300 hover:border-slate-400">忽略</button>
              <button disabled={busyId === topic.id} onClick={() => updateStatus(topic.id, 'saved')} className="rounded-xl border border-cyan-500/50 px-4 py-3 text-sm font-bold text-cyan-300 hover:bg-cyan-500/10">收藏</button>
              <button disabled={busyId === topic.id} onClick={() => topic.articleId ? router.push(`/admin/articles/${topic.articleId}/preview`) : generate(topic.id)} className="col-span-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-cyan-300 disabled:opacity-50">{busyId === topic.id ? '處理中…' : topic.articleId ? '開啟文章預覽' : '生成文章草稿'}</button>
            </div>
          </article>
        ))}
        {!visibleTopics.length && <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-500">這個分類目前沒有議題。</div>}
      </div>
    </div>
  );
}
