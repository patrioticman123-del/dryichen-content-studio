'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ContentTopic, TopicStatus } from '@/features/content-admin/types';

const filters = [
  ['active', '待處理'],
  ['saved', '已收藏'],
  ['drafting', '已有草稿'],
  ['dismissed', '已忽略'],
] as const;

export default function TopicDashboard({ initialTopics }: { initialTopics: ContentTopic[] }) {
  const router = useRouter();
  const [topics, setTopics] = useState(initialTopics);
  const [busyId, setBusyId] = useState<string>();
  const [filter, setFilter] = useState<'active' | TopicStatus>('active');
  const [error, setError] = useState('');

  const visibleTopics = topics.filter((topic) =>
    filter === 'active' ? topic.status !== 'dismissed' : topic.status === filter,
  );

  async function updateStatus(id: string, status: TopicStatus) {
    setBusyId(id);
    setError('');
    const response = await fetch(`/api/admin/topics/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const result = await response.json();
    setBusyId(undefined);
    if (!response.ok) return setError(result.error || '更新失敗，請稍後再試。');
    setTopics((current) => current.map((topic) => topic.id === id ? result.topic : topic));
  }

  async function generate(id: string) {
    setBusyId(id);
    setError('');
    const response = await fetch(`/api/admin/topics/${id}/generate`, { method: 'POST' });
    const result = await response.json();
    setBusyId(undefined);
    if (!response.ok) return setError(result.error || '文章生成失敗，請稍後再試。');
    router.push(`/admin/articles/${result.article.id}/preview`);
  }

  return (
    <div>
      <nav className="mb-5 grid grid-cols-2 gap-2 sm:flex" aria-label="議題篩選">
        {filters.map(([value, label]) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`min-h-11 rounded-xl px-4 py-2 text-sm font-bold ${
              filter === value ? 'bg-teal-600 text-white shadow-sm' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {error && <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}

      <div className="space-y-3">
        {visibleTopics.map((topic) => (
          <article key={topic.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-teal-600">{topic.category}</span>
                <h2 className="mt-1 text-lg font-black leading-7 text-slate-900">{topic.title}</h2>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-lg font-black text-teal-700" aria-label={`議題分數 ${topic.score.total}`}>
                {topic.score.total}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                disabled={busyId === topic.id}
                onClick={() => updateStatus(topic.id, 'saved')}
                className="min-h-12 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                收藏
              </button>
              <button
                disabled={busyId === topic.id}
                onClick={() => updateStatus(topic.id, 'dismissed')}
                className="min-h-12 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-50"
              >
                忽略
              </button>
              <button
                disabled={busyId === topic.id}
                onClick={() => topic.articleId ? router.push(`/admin/articles/${topic.articleId}/preview`) : generate(topic.id)}
                className="col-span-2 min-h-12 rounded-xl bg-teal-600 px-4 text-sm font-black text-white hover:bg-teal-700 disabled:opacity-50"
              >
                {busyId === topic.id ? '處理中…' : topic.articleId ? '開啟文章預覽' : '生成文章'}
              </button>
            </div>
          </article>
        ))}

        {!visibleTopics.length && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
            這個分類目前沒有議題。
          </div>
        )}
      </div>
    </div>
  );
}
