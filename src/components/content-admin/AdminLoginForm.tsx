'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const response = await fetch('/api/admin/session', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) return setError(result.error || '登入失敗');
    router.replace('/admin/content-topics');
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {!configured && <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-100">請先依照 `.env.example` 建立 `.env.local`，再重新啟動開發伺服器。</div>}
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-200">後台密碼</span>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" className="w-full rounded-xl border border-slate-600 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" placeholder="輸入 CONTENT_ADMIN_PASSWORD" />
      </label>
      {error && <p className="text-sm text-rose-300">{error}</p>}
      <button disabled={!configured || loading} className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40">{loading ? '登入中…' : '登入內容後台'}</button>
    </form>
  );
}
