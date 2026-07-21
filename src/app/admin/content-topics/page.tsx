import AdminHeader from '@/components/content-admin/AdminHeader';
import TopicDashboard from '@/components/content-admin/TopicDashboard';
import { listTopics } from '@/features/content-admin/repository';

export const dynamic = 'force-dynamic';

export default async function ContentTopicsPage() {
  const topics = await listTopics();
  return <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-10"><div className="mx-auto max-w-3xl"><AdminHeader title="文章工作台" subtitle="選擇每日建議題目，複製完整提示詞到 GPT 或 Claude，再貼回程式碼預覽。" /><TopicDashboard initialTopics={topics} /></div></div>;
}
