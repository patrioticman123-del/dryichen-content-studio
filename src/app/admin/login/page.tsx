import { redirect } from 'next/navigation';
import AdminLoginForm from '@/components/content-admin/AdminLoginForm';
import { isAdminConfigured } from '@/features/content-admin/auth';
import { hasAdminSession } from '@/features/content-admin/auth-server';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  if (hasAdminSession()) redirect('/admin/content-topics');
  return <div className="min-h-[calc(100vh-5rem)] bg-slate-950 px-4 py-12"><div className="mx-auto max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl md:p-9"><p className="text-xs font-bold uppercase tracking-[.25em] text-cyan-400">Private workspace</p><h1 className="mt-3 text-3xl font-bold text-white">醫療內容後台</h1><p className="mb-8 mt-3 leading-7 text-slate-400">這是獨立的本機測試入口。未登入時，議題、草稿與審核 API 都無法存取。</p><AdminLoginForm configured={isAdminConfigured()} /></div></div>;
}
