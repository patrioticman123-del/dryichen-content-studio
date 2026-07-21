import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminHeader from '@/components/content-admin/AdminHeader';
import PromptArticleWorkspace from '@/components/content-admin/PromptArticleWorkspace';
import { buildArticlePrompt } from '@/features/content-admin/article-prompt';
import { listTopics } from '@/features/content-admin/repository';

export const dynamic = 'force-dynamic';

export default async function ArticlePromptPage({ params }: { params: { id: string } }) {
  const topic = (await listTopics()).find((item) => item.id === params.id);
  if (!topic) notFound();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-3xl">
        <AdminHeader title="文章提示詞與預覽" subtitle="複製提示詞到 GPT 或 Claude，再把完整文章程式碼貼回來預覽。" />
        <Link href="/admin/content-topics" className="mb-5 inline-flex text-sm font-bold text-teal-700 hover:text-teal-900">← 返回文章工作台</Link>
        <PromptArticleWorkspace topic={topic} prompt={buildArticlePrompt(topic)} />
      </div>
    </div>
  );
}
