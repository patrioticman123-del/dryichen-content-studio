// src/app/about/cases/page.tsx
import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { casesData } from '@/data/cases' 
import ScrollAnimation from '@/components/ScrollAnimation'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dryichen.com.tw').trim()
const PAGE_PATH = '/about/cases' 
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`

export async function generateStaticParams() {
  return casesData.map((post) => ({ id: post.id }))
}

// ==========================================
// 1. Meta 設定 (優化 Title 並加入 Geo 標籤)
// ==========================================
export const metadata: Metadata = { 
  // 修正：移除後綴診所名，避免與 layout.tsx 模板疊加
  title: '臨床治療案例分享 - PRP與震波治療成效 | 新竹宸新復健科',
  description: '匯集新竹宸新復健科的實際臨床治療案例。透過高濃度血小板(PRP)、聚焦式震波與徒手物理治療，協助患者改善退化性關節炎、五十肩、運動傷害與兒童生長發育問題。',
  keywords: ['PRP治療案例', '震波治療心得', '五十肩治療', '退化性關節炎改善', '新竹復健推薦', '宸新復健科案例'],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: '臨床治療案例分享 - 疼痛改善與復健成效 | 新竹宸新復健科',
    description: '查看真實患者如何透過再生醫學與精準復健，成功擺脫慢性疼痛的治療過程。',
    url: CANONICAL_URL,
    type: 'website',
    siteName: '新竹宸新復健科診所',
  },
  // 加入在地化 Geo 標記
  other: {
    'geo.region': 'TW-HCH',
    'geo.placename': '新竹市',
  }
}

export default function CaseStudyListPage() {
  const currentUrl = CANONICAL_URL

  // ==========================================
  // 2. Schema 結構化資料
  // ==========================================
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首頁', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '關於我們', item: `${SITE_URL}/about` },
      { '@type': 'ListItem', position: 3, name: '治療案例分享', item: currentUrl },
    ],
  }
    
  const jsonLdCollection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${currentUrl}#collection`,
    name: '宸新復健科臨床治療案例集',
    description: '收錄PRP注射、震波治療、兒童生長評估之實際成功案例',
    url: currentUrl,
    publisher: {
        '@type': 'MedicalClinic',
        name: '新竹宸新復健科診所',
        logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.webp`
        }
    },
    author: {
        '@type': 'MedicalOrganization',
        name: '新竹宸新復健科',
        url: SITE_URL
    },
    mainEntity: {
        '@type': 'ItemList',
        itemListElement: casesData.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${SITE_URL}/about/cases/${item.id}`, 
            name: item.title
        }))
    }
  }

  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdCollection} />
      
      <ScrollAnimation />

      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300">
        
        <main className="flex-grow pt-0 -mt-10 md:-mt-12 pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header 區塊 */}
            <div className="mb-12 text-center animate-on-scroll">
                
                <div className="text-left mb-4">
                    {/* ✨ 修改處：移除 prefetch={false} 釋放返回連結的純靜態預載快取 */}
                    <Link 
                      href="/about" 
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group text-sm font-medium"
                    >
                        <i className="fa-solid fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i> 
                        返回關於我們
                    </Link>
                </div>

                <div className="border-b border-slate-700 pb-8">
                    <h1 className="text-3xl md:text-5xl font-bold font-sans text-white tracking-wide mb-4">
                        臨床治療案例
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        疼痛不是生活的一部分，康復才是。在這裡，我們分享患者透過<span className="text-cyan-400">精準診斷</span>與<span className="text-cyan-400">再生醫學</span>重拾生活品質的真實故事。
                    </p>
                </div>
            </div>

            {/* 文章列表 Grid */}
            <div className="space-y-8 animate-on-scroll delay-100">
              {casesData.map((item) => (
                /* ✨ 修改處：移除 prefetch={false} 屬性，解凍背景快取，換回極速流暢的秒開體感 */
                <Link 
                  key={item.id} 
                  href={`/about/cases/${item.id}`} 
                  className="block group bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row h-full">
                    {/* 圖片區 */}
                    <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                      <img 
                        src={item.coverImage} 
                        alt={`新竹宸新復健科臨床成功案例：${item.title}`} 
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent md:hidden"></div>
                      
                      {/* 左上角標籤 */}
                      <div className="absolute top-4 left-4">
                         <span className="px-3 py-1 bg-cyan-600/90 text-white text-xs font-bold rounded shadow-lg backdrop-blur-sm">
                            <i className="fa-solid fa-file-medical mr-1"></i>
                            {item.category || '治療案例'}
                         </span>
                      </div>
                    </div>
                    
                    {/* 文字區 */}
                    <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center relative">
                        
                        <div className="flex items-center gap-3 mb-3 text-sm">
                           <span className="text-slate-500 flex items-center">
                              <i className="fa-regular fa-calendar-check mr-2 text-cyan-500"></i>
                              案例日期：{item.date}
                           </span>
                        </div>
                        
                        {/* H2 正確應用於列表標題 */}
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-relaxed">
                            {item.title}
                        </h2>
                        
                        <p className="text-slate-400 line-clamp-2 mb-5 leading-relaxed">
                            {item.summary}
                        </p>
                        
                        {/* 底部 CTA 區 */}
                        <div className="mt-auto flex items-center justify-between border-t border-slate-700/50 pt-4">
                            <span className="text-xs text-slate-500 font-medium">
                                <i className="fa-solid fa-user-doctor mr-1"></i> 林羿辰醫師主治
                            </span>
                            <div className="text-cyan-400 text-sm font-bold group-hover:translate-x-1 transition-transform inline-flex items-center">
                                查看完整過程 <i className="fa-solid fa-angle-right ml-2"></i>
                            </div>
                        </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* SEO 導言區 (優化：加入 H2 層級補強) */}
            <div className="mb-12 max-w-3xl mx-auto mt-20 animate-on-scroll delay-300">
              <h2 className="sr-only">為何參考實際復健案例對病患很重要？新竹宸新復健科專業解析</h2>
              <details className="group border-l-4 border-cyan-500 pl-4">
                  <summary className="list-none [&::-webkit-details-marker]:hidden text-lg text-slate-400 leading-relaxed outline-none cursor-pointer select-none text-left flex items-start">
                      <div className="flex-1">
                        為什麼參考<strong className="text-cyan-400 font-normal">實際案例</strong>對您的治療很重要？
                        <span className="group-open:hidden inline-block ml-2 text-sm text-cyan-500 hover:text-cyan-400 font-semibold align-middle">
                            了解詳情 <i className="fa-solid fa-chevron-down text-xs"></i>
                        </span>
                      </div>
                  </summary>
                  
                  <div className="mt-4 text-lg text-slate-400 leading-relaxed text-left animate-in fade-in slide-in-from-top-1 duration-300">
                      <p className="mb-4">
                          每個人的疼痛成因與身體狀況都是獨一無二的。但在眾多案例中，我們能找到治療的脈絡與信心。
                      </p>
                      <p className="mb-4">
                          林羿辰醫師團隊堅持<strong className="text-white">「實證醫學」</strong>，在本專區分享的案例，皆是經過詳盡的超音波診斷，並依據患者狀況量身打造（如：PRP注射劑量、震波施打發數）後的真實反饋。
                      </p>
                      <p>
                          若您正受五十肩、網球肘、膝蓋退化或兒童生長問題所苦，希望這些成功案例能讓您了解：<span className="text-cyan-400">「疼痛是可以被精準解決的。」</span>
                      </p>
                  </div>
              </details>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}