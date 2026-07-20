import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminHeader from '@/components/content-admin/AdminHeader';
import ReviewPanel from '@/components/content-admin/ReviewPanel';
import { getArticle } from '@/features/content-admin/repository';
import { runApprovalChecks } from '@/features/content-admin/scoring';

export const dynamic = 'force-dynamic';

export default async function ArticlePreviewPage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);
  if (!article) notFound();
  const version = article.versions.find((item) => item.version === article.currentVersion) || article.versions[0];
  const checks = runApprovalChecks(version);
  return <div className="min-h-screen bg-slate-950 px-4 py-8 md:px-8"><div className="mx-auto max-w-7xl"><AdminHeader title="文章發布前預覽" subtitle={`目前為第 ${version.version} 版；畫面沿用正式文章的深色卡片、青色重點與手機單欄閱讀節奏。`} /><Link href="/admin/content-topics" className="mb-5 inline-flex text-sm font-bold text-cyan-300 hover:text-cyan-100">← 返回議題工作台</Link><div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"><main className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/80 shadow-2xl"><article className="p-5 md:p-10"><header className="mb-9 border-l-4 border-cyan-500 bg-gradient-to-r from-slate-900/80 to-transparent py-5 pl-4"><div className="flex flex-wrap gap-2"><span className="rounded-full border border-cyan-500/40 px-3 py-1 text-xs font-bold text-cyan-300">{article.category}</span><span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">草稿 v{version.version}</span></div><h1 className="mt-5 text-3xl font-bold leading-tight text-white md:text-5xl">{version.title}</h1><p className="mt-5 leading-7 text-slate-300">{version.summary}</p></header><div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-h2:text-2xl prose-h3:text-xl prose-p:leading-8 prose-li:leading-8" dangerouslySetInnerHTML={{ __html: version.contentHtml }} /><section className="mt-10 border-t border-slate-700 pt-7"><h2 className="text-xl font-bold text-white">參考資料（需人工複核）</h2><ol className="mt-4 space-y-3 text-sm text-slate-400">{version.references.map((reference) => <li key={reference.url}><a href={reference.url} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{reference.label}</a>{reference.note && <p className="mt-1 text-xs text-amber-200/70">{reference.note}</p>}</li>)}</ol></section></article></main><ReviewPanel article={article} checks={checks} /></div></div></div>;
}
