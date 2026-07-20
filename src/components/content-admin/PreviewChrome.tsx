export default function PreviewChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <div>
            <p className="text-base font-black text-white">運動教練醫師・林羿辰</p>
            <p className="mt-0.5 text-xs text-slate-500">文章版型預覽</p>
          </div>
          <nav className="hidden gap-5 text-sm font-semibold text-slate-400 md:flex" aria-label="僅供版型預覽的導覽列">
            <span>關於我們</span>
            <span>治療項目</span>
            <span>特色門診</span>
            <span>疾病衛教</span>
            <span>預約</span>
          </nav>
          <span className="rounded-full border border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-400 md:hidden">預覽模式</span>
        </div>
      </header>

      {children}

      <footer className="mt-10 border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center md:px-8">
          <p className="font-bold text-slate-300">宸新復健科診所・林羿辰醫師</p>
          <p className="mt-2 text-xs leading-5 text-slate-500">此頁僅供文章版型與發布前內容檢查，所有導覽文字皆無連結。</p>
        </div>
      </footer>
    </div>
  );
}
