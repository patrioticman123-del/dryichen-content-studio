import Link from 'next/link';
import AdminHeader from '@/components/content-admin/AdminHeader';
import SocialPostWorkspace from '@/components/content-admin/SocialPostWorkspace';

export const dynamic = 'force-dynamic';

export default function SocialPostsPage() {
  return <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-10"><div className="mx-auto max-w-3xl"><AdminHeader title="社群貼文與圖片工具" subtitle="貼網址或文章內容，分別生成 Facebook、Instagram、Threads 貼文與可下載圖片。" /><Link href="/admin/content-topics" className="mb-5 inline-flex text-sm font-bold text-teal-700 hover:text-teal-900">← 返回文章工作台</Link><div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><SocialPostWorkspace /></div></div></div>;
}
