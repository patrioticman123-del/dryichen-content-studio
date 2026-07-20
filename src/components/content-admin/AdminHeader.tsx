'use client';

import { useRouter } from 'next/navigation';

export default function AdminHeader({ title, subtitle }: { title: string; subtitle: string }) {
  const router = useRouter();
  async function logout() {
    await fetch('/api/admin/session', { method: 'DELETE' });
    router.replace('/admin/login');
    router.refresh();
  }
  return (
    <header className="mb-6 flex items-start justify-between gap-4">
      <div><p className="mb-2 text-xs font-bold uppercase tracking-[.22em] text-cyan-400">Medical Content Pilot</p><h1 className="mb-2 text-2xl font-bold text-white md:text-4xl">{title}</h1><p className="max-w-2xl text-sm text-slate-400 md:text-base">{subtitle}</p></div>
      <button onClick={logout} className="shrink-0 rounded-lg border border-slate-600 px-3 py-2 text-xs text-slate-300 hover:border-cyan-400 hover:text-white">登出</button>
    </header>
  );
}
