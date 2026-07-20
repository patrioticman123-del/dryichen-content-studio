export default function AdminHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mb-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-cyan-400">Content Studio</p>
      <h1 className="text-2xl font-black text-white md:text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">{subtitle}</p>
    </header>
  );
}
