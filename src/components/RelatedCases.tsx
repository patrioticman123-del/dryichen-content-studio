// src/components/RelatedCases.tsx
import React from 'react'
import Link from 'next/link'
import { CaseStudy } from '@/data/cases'

interface RelatedCasesProps {
  cases: CaseStudy[];
}

export default function RelatedCases({ cases }: RelatedCasesProps) {
  if (!cases || cases.length === 0) return null;
  
  // 調整顯示數量上限為 6 個
  const displayCases = cases.slice(0, 6);
  const displayTitle = `${displayCases[0].category} 治療成功案例`;

  return (
<section className="pt-4 pb-4 border border-slate-800 bg-slate-900/50 rounded-3xl overflow-hidden shadow-sm">
<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 標題區：mb-3 減少與卡片的距離 */}
        <div className="flex items-center mb-3">
          <i className="fa-solid fa-file-medical text-cyan-400 text-lg mr-2"></i>
          <h2 className="text-xl font-bold text-white">
            {displayTitle} 
          </h2>
        </div>

        {/* 卡片列表容器：修改 md:grid-cols-3 確保超過三個會自動換行 */}
        <div className="flex overflow-x-auto pb-0 gap-3 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 scrollbar-hide">
          {displayCases.map((item) => (
            <Link 
              key={item.id} 
              href={`/about/cases/${item.id}`} 
              className="group block flex-shrink-0 w-[66vw] sm:w-64 md:w-auto md:flex-shrink-1 min-w-0 snap-center bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300"
            >
              {/* 圖片區高度壓低 */}
              <div className="h-28 md:h-36 overflow-hidden relative">
                <img 
                  src={item.coverImage} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur text-cyan-400 text-[10px] px-1.5 py-0.5 rounded border border-slate-700">
                  {item.category}
                </div>
              </div>

              {/* 文字內容區 */}
              <div className="p-3 pb-2">
                <h3 className="text-sm md:text-base font-bold text-slate-100 mb-1 group-hover:text-cyan-400 transition-colors line-clamp-1 leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-slate-400 text-[11px] md:text-xs line-clamp-2 mb-1.5 leading-snug">
                  {item.summary}
                </p>
                
                <div className="flex items-center text-cyan-500 text-[10px] font-bold uppercase tracking-wider">
                  Read More <i className="fa-solid fa-arrow-right ml-1 group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}