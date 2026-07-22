'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ContentTopic, TopicStatus } from '@/features/content-admin/types';

const filters = [
  ['active', '待處理'],
  ['saved', '已收藏'],
  ['drafting', '已有草稿'],
  ['dismissed', '過去議題'],
] as const;

export default function TopicDashboard({ initialTopics, initialNotice = '' }: { initialTopics: ContentTopic[]; initialNotice?: string }) {
  const router = useRouter();
  const [topics, setTopics] = useState(initialTopics);
  const [busyId, setBusyId] = useState<string>();
  const [refreshing, setRefreshing] = useState(false);
  const [rerolling, setRerolling] = useState(false);
  const [filter, setFilter] = useState<'active' | TopicStatus>('active');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(initialNotice);

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

  async function openPrompt(topic: ContentTopic) {
    if (!['drafting', 'generating'].includes(topic.status)) {
      setBusyId(topic.id);
      setError('');
      try {
        const response = await fetch(`/api/admin/topics/${topic.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'drafting' }),
        });
        const result = await response.json().catch(() => ({ error: '伺服器回應格式錯誤。' }));
        if (!response.ok) {
          setBusyId(undefined);
          setError(result.error || '無法記錄題目使用狀態，請稍後再試。');
          return;
        }
      } catch {
        setBusyId(undefined);
        setError('網路連線中斷，請稍後再試。');
        return;
      }
    }
    router.push(`/admin/content-topics/${topic.id}/prompt`);
  }

  async function refreshTopics() {
    setRefreshing(true);
    setError('');
    setNotice('');
    try {
      const response = await fetch('/api/admin/topics/refresh', { method: 'POST' });
      const result = await response.json().catch(() => ({ error: '伺服器回應格式錯誤。' }));
      if (!response.ok) return setError(result.error || '搜尋失敗，請稍後再試。');
      setTopics(result.topics);
      setFilter('active');
      setNotice(result.pending
        ? `${result.runDate} 的議題正在背景搜尋，請稍後再按一次檢查。`
        : result.created
        ? `已完成 ${result.runDate} 的最新搜尋，共找到 ${result.topics.filter((topic: ContentTopic) => topic.runDate === result.runDate).length} 個今日題目。`
        : `${result.runDate} 的議題已經搜尋完成，不會重複消耗流量。`);
    } catch {
      setError('網路連線中斷，舊議題仍然保留，請稍後再試。');
    } finally {
      setRefreshing(false);
    }
  }

  async function rerollTopics() {
    if (!window.confirm('將排除今天已顯示且尚未收藏的題目，重新搜尋另外 3 題。已收藏或已有草稿的內容會保留。確定繼續嗎？')) return;
    setRerolling(true);
    setError('');
    setNotice('');
    try {
      const response = await fetch('/api/admin/topics/refresh?force=1&excludeCurrent=1&count=3', { method: 'POST' });
      const result = await response.json().catch(() => ({ error: '伺服器回應格式錯誤。' }));
      if (!response.ok) return setError(result.error || '強制更新失敗，請稍後再試。');
      setTopics(result.topics);
      setFilter('active');
      setNotice(`原本未收藏的今日題目已移到「過去議題」，並重新提供 ${result.generatedCount || 3} 個不同議題。明天仍會照正常排程更新。`);
    } catch {
      setError('網路連線中斷，原本的題目仍然保留，請稍後再試。');
    } finally {
      setRerolling(false);
    }
  }

  return (
    <div>
      <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-black text-slate-900">每日熱門議題搜尋</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">台灣時間凌晨 00:00 排程；Vercel 免費版可能在 00:00–00:59 之間執行。早上首次開啟也會自動補跑。</p>
          </div>
          <div className="grid shrink-0 gap-2 sm:min-w-44">
            <button type="button" onClick={refreshTopics} disabled={refreshing || rerolling} className="min-h-11 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white disabled:opacity-50">
              {refreshing ? '正在交叉搜尋…' : '檢查今日議題'}
            </button>
            <button type="button" onClick={rerollTopics} disabled={refreshing || rerolling} className="min-h-11 rounded-xl border border-amber-300 bg-amber-50 px-4 text-sm font-black text-amber-800 hover:bg-amber-100 disabled:opacity-50">
              {rerolling ? '正在重新找 3 題…' : '強制換一批（3 題）'}
            </button>
          </div>
        </div>
      </section>

      {notice && <div className="mb-4 rounded-xl border border-teal-200 bg-teal-50 p-4 text-sm leading-6 text-teal-800">{notice}</div>}

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

      {filter === 'dismissed' && (
        <div className="mb-4 rounded-xl border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-500">
          今天未使用、手動移入或強制換掉的題目會保留在這裡，30 天後自動清除。收藏與已有草稿的題目不會被清除。
        </div>
      )}

      {error && <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}

      <div className="space-y-3">
        {visibleTopics.map((topic) => (
          <article key={topic.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-teal-600">{topic.category}</span>
                <h2 className="mt-1 text-lg font-black leading-7 text-slate-900">{topic.title}</h2>
                <p className="mt-1 text-xs text-slate-400">議題日期：{topic.runDate || topic.discoveredAt.slice(0, 10)}</p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-lg font-black text-teal-700" aria-label={`議題分數 ${topic.score.total}`}>
                {topic.score.total}
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">{topic.summary}</p>

            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-black text-slate-700">近期搜尋問句／長尾關鍵字</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {topic.longTailKeywords.map((keyword) => <span key={keyword} className="rounded-full border border-teal-100 bg-white px-3 py-1.5 text-xs leading-5 text-teal-700">{keyword}</span>)}
              </div>
            </div>

            <details className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
              <summary className="cursor-pointer text-xs font-black text-slate-700">查看入選原因與查證來源（{topic.sources.length}）</summary>
              <p className="mt-3 text-xs leading-5 text-slate-500">{topic.rationale}</p>
              <ul className="mt-3 space-y-2">
                {topic.sources.map((source, index) => (
                  <li key={`${source.label}-${index}`} className="rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600">
                    {source.url ? <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-bold text-teal-700 underline decoration-teal-200 underline-offset-2">{source.label}</a> : <span className="font-bold text-slate-700">{source.label}</span>}
                    <p className="mt-1">{source.note}</p>
                  </li>
                ))}
              </ul>
            </details>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                disabled={busyId === topic.id}
                onClick={() => updateStatus(topic.id, 'saved')}
                className={`${topic.status === 'dismissed' ? 'col-span-2' : ''} min-h-12 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50`}
              >
                收藏
              </button>
              {topic.status !== 'dismissed' && (
                <button
                  disabled={busyId === topic.id}
                  onClick={() => updateStatus(topic.id, 'dismissed')}
                  className="min-h-12 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-50"
                >
                  移到過去議題
                </button>
              )}
              <button
                disabled={busyId === topic.id}
                onClick={() => openPrompt(topic)}
                className="col-span-2 min-h-12 rounded-xl bg-teal-600 px-4 text-sm font-black text-white hover:bg-teal-700 disabled:opacity-50"
              >
                產生文章提示詞
              </button>
              {topic.articleId && <button onClick={() => router.push(`/admin/articles/${topic.articleId}/preview`)} className="col-span-2 min-h-11 rounded-xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-600 hover:bg-slate-50">開啟既有文章預覽</button>}
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
