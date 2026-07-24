import AdminHeader from '@/components/content-admin/AdminHeader';
import TopicDashboard from '@/components/content-admin/TopicDashboard';
import { listTopics, refreshDailyTopics } from '@/features/content-admin/repository';

export const dynamic = 'force-dynamic';

export default async function ContentTopicsPage() {
  let initialNotice = '';
  try {
    const refresh = await refreshDailyTopics();
    initialNotice = refresh.pending
      ? `${refresh.runDate} 的議題正在背景搜尋，完成前暫時顯示上一批內容。`
      : refresh.created
      ? `已完成 ${refresh.runDate} 的最新議題搜尋，共找到 ${refresh.topics.length} 個優先題目。`
      : `目前顯示 ${refresh.runDate} 的議題；今日搜尋已完成。`;
  } catch (error) {
    console.error('Unable to ensure current daily topics:', error);
    initialNotice = '今日自動搜尋暫時失敗，目前先保留上一批議題；可按下方按鈕重新嘗試。';
  }
  const topics = await listTopics();
  return <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-10"><div className="mx-auto max-w-3xl"><AdminHeader title="文章工作台" subtitle="每天交叉比較 Google Trends、搜尋問句、近期新聞、PubMed、Meta 廣告與 Threads 話題，再依時效與骨科復健相關性排序。" /><TopicDashboard initialTopics={topics} initialNotice={initialNotice} /></div></div>;
}
