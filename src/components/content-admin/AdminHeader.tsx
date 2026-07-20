export default function AdminHeader({ title, subtitle, dark = false }: { title: string; subtitle: string; dark?: boolean }) {
  return (
    <header className="mb-6">
      <p className={`mb-2 text-xs font-bold uppercase tracking-[.2em] ${dark ? 'text-cyan-400' : 'text-teal-600'}`}>Content Studio</p>
      <h1 className={`text-2xl font-black md:text-4xl ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h1>
      <p className={`mt-2 max-w-2xl text-sm leading-6 md:text-base ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{subtitle}</p>
    </header>
  );
}
