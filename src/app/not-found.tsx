// src/app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-6xl font-bold text-cyan-500 mb-4">404</h2>
      <p className="text-xl text-slate-300 mb-8">
        抱歉，您尋找的頁面似乎迷路了。
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
      >
        返回首頁
      </Link>
    </div>
  )
}