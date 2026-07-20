// src/components/ClinicHoursModal.tsx
'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function ClinicHoursModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 確保組件掛載後才執行 Portal 操作 (避免 SSR 伺服器端渲染錯誤)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {/* 1. 觸發按鈕 (維持您喜歡的漂亮樣式) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 rounded-full transition-all duration-300 font-bold flex items-center gap-2 group shadow-lg shadow-cyan-900/10 cursor-pointer"
      >
        <i className="fa-solid fa-table-list text-xl group-hover:scale-110 transition-transform"></i>
        查看門診時間表
      </button>

      {/* 2. 彈出視窗 (使用 Portal 強制渲染在 body 層級，解決醫師頁面被遮擋/跑位問題) */}
      {isOpen && mounted && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm overflow-y-auto fade-in"
          onClick={() => setIsOpen(false)}
        >
          {/* 加入 items-center 確保在任何頁面都能垂直置中 */}
          <div className="flex min-h-full items-center justify-center p-4 text-center"> 
            
            <div 
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()} 
            >
              {/* 右上角關閉按鈕 (X) */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 md:-right-8 text-white hover:text-cyan-400 transition-colors z-10 p-2"
              >
                <i className="fa-solid fa-xmark text-4xl"></i>
              </button>

              {/* 門診表圖片 */}
              <img 
                src="/images/doctor/a.webp" 
                alt="宸新復健科門診時間表" 
                className="w-full h-auto object-contain rounded-lg shadow-2xl border border-slate-700 bg-slate-900"
              />
            </div>
          </div>
        </div>,
        document.body // 指定渲染目標為網頁最外層
      )}
    </>
  )
}