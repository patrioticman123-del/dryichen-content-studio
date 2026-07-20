import AdminHeader from '@/components/content-admin/AdminHeader';
import TopicDashboard from '@/components/content-admin/TopicDashboard';
import { requireAdminPage } from '@/features/content-admin/auth-server';
import { listTopics } from '@/features/content-admin/repository';

export const dynamic = 'force-dynamic';

export default async function ContentTopicsPage() {
  requireAdminPage();
  const topics = await listTopics();
  return <div className="min-h-screen bg-slate-950 px-4 py-8 md:px-8"><div className="mx-auto max-w-5xl"><AdminHeader title="熱門議題工作台" subtitle="先以本機示範資料驗證收藏、忽略、生成、預覽與審核流程；搜尋量欄位沒有偽造數字。" /><TopicDashboard initialTopics={topics} /></div></div>;
}
