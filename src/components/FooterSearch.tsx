// src/components/FooterSearch.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
// 1. 導入所有資料來源的輕量列表
import { treatmentsList } from '@/data/treatments'
import { diseaseCategoriesList } from '@/data/diseases'
import { newsList } from '@/data/news'
import { facilitiesData } from '@/data/facilities'     // ✅ 新增：診所設備
import { weightLossPrograms } from '@/data/weightLoss' // ✅ 新增：減重骨齡

// 定義搜尋結果介面
interface SearchResult {
  title: string
  url: string
  type: string
}

export default function FooterSearch({ lightMode = false }: { lightMode?: boolean }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])

  // 當使用者輸入時執行搜尋
  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      return
    }

    const lowerQuery = query.toLowerCase()
    const newResults: SearchResult[] = []

    // Helper: 通用搜尋判斷函式 (檢查標題、描述、關鍵字)
    const isMatch = (item: any) => {
        const titleMatch = item.title?.includes(query)
        const descMatch = item.description?.includes(query) || item.summary?.includes(query)
        // 檢查 keywords (有些資料結構沒有 keywords 欄位，所以要用 ?. )
        const keywordMatch = item.keywords?.some((k: string) => k.includes(query)) || 
                             item.seoKeywords?.some((k: string) => k.includes(query))
        
        return titleMatch || descMatch || keywordMatch
    }

    // ==========================================
    // 1. 搜尋治療項目 (Treatments)
    // ==========================================
    treatmentsList.forEach(t => {
      if (isMatch(t)) {
        newResults.push({ title: t.title, url: `/treatments/${t.slug}`, type: '治療' })
      }
    })

    // ==========================================
    // 2. 搜尋疾病衛教 (Diseases)
    // ==========================================
    diseaseCategoriesList.forEach(cat => {
      cat.diseases.forEach(d => {
        // 疾病列表比較特殊，keywords 可能在 seoKeywords 裡
        // 這裡直接檢查 title 和 seoKeywords
        const keywords = (d as any).seoKeywords as string[] | undefined;
        const symptoms = (d as any).symptoms as string[] | undefined; // 如果有把症狀加回列表
        
        const matchTitle = d.title.includes(query)
        const matchKeywords = keywords?.some(k => k.includes(query))
        const matchSymptoms = symptoms?.some(s => s.includes(query))

        if (matchTitle || matchKeywords || matchSymptoms) {
          newResults.push({ title: d.title, url: `/diseases/${cat.slug}/${d.slug}`, type: '疾病' })
        }
      })
    })

    // ==========================================
    // 3. 搜尋最新文章 (News)
    // ==========================================
    newsList.forEach(n => {
      if (isMatch(n)) {
        newResults.push({ title: n.title, url: `/about/news/${n.id}`, type: '文章' })
      }
    })

    // ==========================================
    // 4. ✅ 新增：搜尋診所設備 (Facilities)
    // ==========================================
    facilitiesData.forEach(f => {
        // 這裡會搜尋 title(如:專屬停車位), description, keywords
        if (isMatch(f)) {
            newResults.push({ title: f.title, url: `/about/clinic/${f.id}`, type: '設備' })
        }
    })

    // ==========================================
    // 5. ✅ 新增：搜尋減重與骨齡 (WeightLoss)
    // ==========================================
    weightLossPrograms.forEach(w => {
        if (isMatch(w)) {
            newResults.push({ title: w.title, url: `/weight-bone/${w.slug}`, type: '減重' })
        }
    })

    // 取前 5 筆結果以免版面太長
    setResults(newResults.slice(0, 5))
  }, [query])

  return (
    <div className="w-full">
        <h3 className={`text-lg font-bold mb-4 flex items-center ${lightMode ? 'text-slate-800' : 'text-white'}`}>
            <i className="fa-solid fa-magnifying-glass text-cyan-400 mr-2"></i> 站內搜尋
        </h3>
        
        <div className="relative">
            <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜尋疾病、治療、停車位..." 
                className={`w-full border text-sm rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all ${lightMode
                  ? 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400'
                  : 'bg-slate-900/50 border-slate-600 text-slate-200 placeholder:text-slate-500'
                }`}
            />
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
        </div>

        {/* 搜尋結果列表 */}
        {results.length > 0 && (
            <div className={`mt-2 border rounded-lg shadow-xl overflow-hidden animate-fade-in absolute z-50 w-full left-0 ${lightMode ? 'bg-white border-slate-200' : 'bg-slate-800 border-slate-700'}`}>
                {results.map((res, idx) => (
                    <Link 
                        key={idx} 
                        href={res.url} 
                        onClick={() => setQuery('')}
                        className={`block px-4 py-3 transition-colors border-b last:border-0 ${lightMode ? 'hover:bg-cyan-50 border-slate-100' : 'hover:bg-slate-700 border-slate-700/50'}`}
                    >
                        <div className="flex justify-between items-center">
                            <span className={`${lightMode ? 'text-slate-700' : 'text-slate-200'} text-sm font-medium truncate flex-grow mr-2`}>{res.title}</span>
                            <span className="text-[10px] bg-cyan-900/40 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20 whitespace-nowrap">
                                {res.type}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        )}
        
        {query && results.length === 0 && (
            <div className="mt-2 text-slate-500 text-sm px-1">
                沒有找到相關結果
            </div>
        )}
    </div>
  )
}
