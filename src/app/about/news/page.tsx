// src/app/about/news/page.tsx
import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { newsList } from '@/data/news'
import ScrollAnimation from '@/components/ScrollAnimation'

// 強制動態渲染，確保每次網址的 ?page 變更都會抓取最新資料
export const dynamic = 'force-dynamic';

// ✨ 優化：強制清除尾部斜線，防止任何因環境變數多打斜線造成的網址拼接瑕疵
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dryichen.com.tw').trim().replace(/\/$/, '')
const PAGE_PATH = '/about/news'
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`

// 過濾衛教文章 (排除門診公告類別)
const articlesList = newsList.filter(item => item.category !== '門診公告');

// 定義不同類別在列表中的標籤樣式
const categoryStyles: Record<string, string> = {
  '診間隨筆': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  '衛教文章': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  '醫學新知': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  '診所活動': 'bg-pink-500/10 text-pink-400 border-pink-500/30',
};

// 定義 Hover 時的外框發光顏色
const hoverBorderStyles: Record<string, string> = {
  '診間隨筆': 'hover:border-amber-500 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]',
  '衛教文章': 'hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]',
  '醫學新知': 'hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]',
};

// Meta 設定
export const metadata: Metadata = { 
  title: '復健衛教文章 - 最新醫療新知 | 新竹宸新復健科',
  description: '提供新竹宸新復健科最新的復健醫學衛教文章，包含 PRP 增生療法、骨骼肌肉超音波、兒童骨齡與生長評估等專業知識。',
  keywords: ['復健衛教', 'PRP注射', '兒童骨齡', '新竹復健科', '疼痛管理', '宸新復健科'],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: '復健衛教文章 | 新竹宸新復健科',
    description: '深入淺出的復健醫學與疼痛管理知識分享。',
    url: CANONICAL_URL,
    type: 'website',
    siteName: '新竹宸新復健科診所',
  },
  other: {
    'geo.region': 'TW-HCH',
    'geo.placename': '新竹市',
  }
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function NewsListPage({ searchParams }: Props) {
  const currentUrl = CANONICAL_URL
  
  // ✨ 核心修正 2：修復 Next.js 15 searchParams 非同步 Promise 解構地雷，防止伺服器端渲染卡死
  const resolvedSearchParams = await searchParams;

  // 分頁邏輯設定
  const ITEMS_PER_PAGE = 10;
  const pageParam = resolvedSearchParams?.page;
  const parsedPage = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  const totalPages = Math.ceil(articlesList.length / ITEMS_PER_PAGE) || 1;
  
  // 確保當前頁數在有效範圍內
  const currentPage = Math.max(1, Math.min(parsedPage, totalPages));
  
  // 裁切當前頁面的文章
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = articlesList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': '首頁', 'item': `${SITE_URL}/` },
      { '@type': 'ListItem', 'position': 2, 'name': '關於我們', 'item': `${SITE_URL}/about` },
      { '@type': 'ListItem', 'position': 3, 'name': '最新衛教文章', 'item': currentUrl },
    ],
  }
    
  // ✨ Schema 結構優化：更換為標準 CollectionPage 搭配 ItemList 結構，移除陣列多重宣告地雷
  const jsonLdBlog = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${currentUrl}#collection`,
    'name': '宸新復健科復健衛教專區',
    'description': '專業醫師撰寫的復健醫學與疼痛管理衛教文章',
    'url': currentUrl,
    'publisher': {
        '@type': 'MedicalClinic',
        'name': '新竹宸新復健科診所',
        'logo': {
            '@type': 'ImageObject',
            'url': `${SITE_URL}/logo.webp`
        }
    },
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': currentArticles.length,
      'itemListElement': currentArticles.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'BlogPosting',
          'headline': item.title,
          'description': item.summary,
          'url': `${SITE_URL}/about/news/${item.id}`,
          'datePublished': item.date || '2026-01-25',
          'image': item.coverImage || `${SITE_URL}/images/main/a.webp`,
          'author': { '@type': 'Person', 'name': '林羿辰醫師' }
        }
      }))
    }
  }

  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdBlog} />
      
      {/* 綁定 currentPage 作為 key，讓切換頁面時動畫能夠重新初始化 */}
      <ScrollAnimation key={`anim-${currentPage}`} />

      {/* 加入 overflow-x-hidden 確保手機版不會產生橫向捲軸 */}
      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300 overflow-x-hidden">
        <main className="flex-grow pt-0 -mt-10 md:-mt-12 pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header 區塊 */}
            <div className="mb-10 animate-on-scroll">
                <div className="text-left mb-4">
                    <Link href="/about" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group text-sm font-medium">
                        <i className="fa-solid fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i> 
                        返回關於我們
                    </Link>
                </div>

                <div className="pb-2 flex flex-row items-center justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-2xl md:text-5xl font-bold font-sans text-white tracking-wide mb-0 md:mb-2">
                            最新衛教文章
                        </h1>
                        <p className="hidden md:block text-slate-400">
                            專業醫師團隊撰寫的復健醫學新知
                        </p>
                    </div>

                    <Link 
                        href="/about/news/notices" 
                        prefetch={false}
                        className="group relative inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 overflow-hidden font-medium text-white transition-all duration-300 bg-pink-600 rounded-xl hover:bg-pink-500 hover:scale-105 shadow-[0_0_20px_rgba(219,39,119,0.4)] shrink-0"
                    >
                        <span className="mr-2 md:mr-3 text-lg">
                            <i className="fa-solid fa-calendar-check"></i>
                        </span>
                        <div className="flex flex-col items-start leading-tight">
                            <span className="text-base tracking-wider">門診公告</span>
                        </div>
                        <i className="fa-solid fa-arrow-right ml-3 md:ml-4 group-hover:translate-x-1 transition-transform text-sm md:text-base"></i>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                    </Link>
                </div>
            </div>

            {/* 文章列表 */}
            <div className="space-y-8" key={`page-${currentPage}`}>
              {currentArticles.map((item, index) => {
                const catStyle = categoryStyles[item.category] || 'bg-slate-500/10 text-slate-400 border-slate-500/30';
                const hoverStyle = hoverBorderStyles[item.category] || 'hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]';
                
                const isEssay = item.category === '診間隨筆';
                const titleColorClass = isEssay ? 'group-hover:text-amber-400' : 'group-hover:text-cyan-400';
                const moreBtnColorClass = isEssay ? 'text-amber-500' : 'text-cyan-500';

                return (
                  /* ✨ 核心修正：為每篇文章卡片的 Link 組件強制補上 prefetch={false}，徹底防堵單頁 10 篇同時自動預載引發的連鎖穿透 */
                  <Link 
                    key={item.id} 
                    href={`/about/news/${item.id}`} 
                    prefetch={false}
                    className={`block group bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 ${hoverStyle} animate-on-scroll ${index === 0 ? '' : 'delay-100'}`}
                  >
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-1/3 h-56 md:h-auto relative overflow-hidden">
                        <img 
                          src={item.coverImage} 
                          alt={`新竹宸新復健科衛教文章：${item.title}`} 
                          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                          loading="lazy"
                        />
                      </div>
                      <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-3 text-sm">
                          <span className={`px-2 py-1 rounded border font-medium ${catStyle}`}>
                            {item.category}
                          </span>
                          <span className="text-slate-400 flex items-center">
                            <i className="fa-regular fa-calendar mr-2"></i>{item.date}
                          </span>
                        </div>
                        
                        <h2 className={`text-xl md:text-2xl font-bold text-white mb-3 transition-colors leading-relaxed ${titleColorClass}`}>
                          {item.title}
                        </h2>
                        
                        <p className="text-slate-400 line-clamp-2 mb-4 leading-relaxed">{item.summary}</p>
                        
                        <div className={`mt-auto text-sm font-bold group-hover:translate-x-1 transition-transform inline-flex items-center ${moreBtnColorClass}`}>
                          閱讀更多 <i className="fa-solid fa-arrow-right ml-2"></i>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 分頁按鈕區塊 */}
            {totalPages > 1 && (
              <div className="mt-12 animate-on-scroll w-full">
                
                {/* --- 電腦版分頁 (大於 md 顯示) --- */}
                <div className="hidden md:flex justify-center items-center space-x-2">
                  {/* 上一頁按鈕 */}
                  {currentPage > 1 ? (
                    <Link 
                      href={`${PAGE_PATH}?page=${currentPage - 1}`} 
                      prefetch={false}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 transition-colors border border-slate-700 text-sm font-medium"
                    >
                      <i className="fa-solid fa-chevron-left mr-1"></i> 上一頁
                    </Link>
                  ) : (
                    <button 
                      disabled 
                      className="px-4 py-2 rounded-lg bg-slate-800/30 text-slate-600 cursor-not-allowed border border-slate-800/50 text-sm font-medium"
                    >
                      <i className="fa-solid fa-chevron-left mr-1"></i> 上一頁
                    </button>
                  )}

                  {/* 頁碼按鈕 */}
                  <div className="flex items-center space-x-1 mx-2">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isActive = currentPage === pageNum;
                      return (
                        <Link
                          key={pageNum}
                          href={`${PAGE_PATH}?page=${pageNum}`}
                          prefetch={false}
                          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors border text-sm font-medium ${
                            isActive
                              ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-cyan-400 border-slate-700'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      );
                    })}
                  </div>

                  {/* 下一頁按鈕 */}
                  {currentPage < totalPages ? (
                    <Link 
                      href={`${PAGE_PATH}?page=${currentPage + 1}`} 
                      prefetch={false}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 transition-colors border border-slate-700 text-sm font-medium"
                    >
                      下一頁 <i className="fa-solid fa-chevron-right ml-1"></i>
                    </Link>
                  ) : (
                    <button 
                      disabled 
                      className="px-4 py-2 rounded-lg bg-slate-800/30 text-slate-600 cursor-not-allowed border border-slate-800/50 text-sm font-medium"
                    >
                      下一頁 <i className="fa-solid fa-chevron-right ml-1"></i>
                    </button>
                  )}
                </div>

                {/* --- 手機版分頁 (小於 md 顯示) --- */}
                <div className="flex md:hidden flex-col items-center space-y-4 w-full">
                  <div className="flex justify-between w-full max-w-[320px] gap-4">
                    {currentPage > 1 ? (
                      <Link 
                        href={`${PAGE_PATH}?page=${currentPage - 1}`} 
                        prefetch={false}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 transition-colors border border-slate-700 text-sm font-medium text-center"
                      >
                        <i className="fa-solid fa-chevron-left mr-1"></i> 上一頁
                      </Link>
                    ) : (
                      <button 
                        disabled 
                        className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800/30 text-slate-600 cursor-not-allowed border border-slate-800/50 text-sm font-medium text-center"
                      >
                        <i className="fa-solid fa-chevron-left mr-1"></i> 上一頁
                      </button>
                    )}

                    {currentPage < totalPages ? (
                      <Link 
                        href={`${PAGE_PATH}?page=${currentPage + 1}`} 
                        prefetch={false}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 transition-colors border border-slate-700 text-sm font-medium text-center"
                      >
                        下一頁 <i className="fa-solid fa-chevron-right ml-1"></i>
                      </Link>
                    ) : (
                      <button 
                        disabled 
                        className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800/30 text-slate-600 cursor-not-allowed border border-slate-800/50 text-sm font-medium text-center"
                      >
                        下一頁 <i className="fa-solid fa-chevron-right ml-1"></i>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 max-w-full px-2">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isActive = currentPage === pageNum;
                      return (
                        <Link
                          key={pageNum}
                          href={`${PAGE_PATH}?page=${pageNum}`}
                          prefetch={false}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors border text-xs font-medium ${
                            isActive
                              ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-cyan-400 border-slate-700'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* ✨ 專屬 SEO 爬蟲通路：完美消滅 Ahrefs 孤兒頁面警告，搭配子分頁完全靜態 HTML 化後，絕不引發流量爆炸 */}
            <div className="sr-only" aria-hidden="true">
              {articlesList.map((item) => (
                <Link 
                  key={`seo-${item.id}`} 
                  href={`/about/news/${item.id}`} 
                  prefetch={false}
                >
                  {item.title}
                </Link>
              ))}
            </div>

          </div>
        </main>
      </div>
    </>
  )
}