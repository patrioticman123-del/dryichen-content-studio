// src/app/about/news/notices/page.tsx
import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { newsList } from '@/data/news'
import ScrollAnimation from '@/components/ScrollAnimation'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dryichen.com.tw').trim()
const PAGE_PATH = '/about/news/notices'
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`

// 過濾門診公告
const noticesList = newsList.filter(item => item.category === '門診公告');

// 1. Meta 設定 (解決標題重複與加入 Geo 標記)
export const metadata: Metadata = { 
  // 修正：僅提供頁面標題，讓 Layout Template 自動加上「 | 新竹宸新復健科」
  title: '門診異動公告 - 休診與代診通知 | 新竹宸新復健科', 
  description: '查詢新竹宸新復健科最新的門診異動、國定假日休診公告、醫師代診資訊，掌握看診動態。提供新竹東區、竹北地區民眾最即時的復健科看診資訊。',
  authors: [{ name: '林羿辰醫師', url: SITE_URL }],
  publisher: '宸新復健科診所-林羿辰醫師',
  keywords: [
    '門診時間', '休診公告', '復健科門診', '新竹復健科公告', '宸新復健科異動',
    '新竹東區復健科', '新竹復健科推薦', '關埔復健科', 'PRP注射', '增生療法', '林羿辰醫師'
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: '門診異動公告 | 新竹宸新復健科',
    description: '即時更新的門診時間異動與休診資訊，包含國定假日與醫師代診通知。',
    url: CANONICAL_URL,
    type: 'website',
    siteName: '新竹宸新復健科診所',
    locale: 'zh_TW',
    // SEO 強化：補上 OG 圖片設定 (若無特定圖片則使用 Logo 或預設圖)
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`, // 建議確保此路徑有預設圖片
        width: 1200,
        height: 630,
        alt: '新竹宸新復健科門診公告',
      },
    ],
  },
  // 加入在地化 Geo 標記 (SEO 強化核心)
  other: {
    'geo.region': 'TW-HSZ', // 修正為新竹市 (Hsinchu City) 的 ISO 代碼
    'geo.placename': '新竹市東區',
    'geo.position': '24.783331;121.017094', // 加入精確座標
    'ICBM': '24.783331, 121.017094',        // 加入精確座標
  }
}

export default function NoticesPage() {
  const currentUrl = CANONICAL_URL

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首頁', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '最新消息', item: `${SITE_URL}/about/news` },
      { '@type': 'ListItem', position: 3, name: '門診公告', item: currentUrl },
    ],
  }

 // SEO 強化：在 MedicalClinic Schema 中加入 Geo 座標與服務範圍
 const jsonLdBlog = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${currentUrl}#notices`,
  name: '宸新復健科門診異動公告',
  description: '新竹宸新復健科最新的休診與公告資訊',
  
  url: currentUrl,
  publisher: {
      '@type': 'MedicalClinic',
      name: '新竹宸新復健科診所',
      image: `${SITE_URL}/logo.webp`,
      medicalSpecialty: ['Physical Therapy', 'Rehabilitation', 'Pain Management'], // 加入專科類別
      telephone: '+886-3-5647999', // 已填入診所電話
      address: {
        '@type': 'PostalAddress',
        streetAddress: '光復路一段371號B1',
        addressLocality: '新竹市',
        addressRegion: '東區',
        postalCode: '300',
        addressCountry: 'TW',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.783331,
        longitude: 121.017094
      },
      areaServed: [
        { '@type': 'City', name: '新竹市' },
        { '@type': 'City', name: '竹北市' },
        { '@type': 'Place', name: '新竹科學園區' }
      ],
      logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.webp`
      }
  },
  author: {
    // ✨ 修正重點：使用雙重宣告 ['Person', 'Physician'] 讓 jobTitle 合法化
    '@type': ['Person', 'Physician'],
    name: '林羿辰醫師',
    url: SITE_URL,
    jobTitle: '院長', // 現在 jobTitle 是合法的屬性
    address: {
      '@type': 'PostalAddress',
      streetAddress: '光復路一段371號B1',
      addressLocality: '新竹市',
      addressRegion: '東區',
      postalCode: '300',
      addressCountry: 'TW',
    },
    // ✨ 醫師專屬權威標記
    medicalSpecialty: [
      { '@type': 'MedicalSpecialty', 'name': 'Physical Medicine and Rehabilitation' }
    ],
    // ✨ 修正重點：隸屬關係使用 Person 支援的 affiliation
    affiliation: {
        '@type': 'MedicalClinic',
        name: '宸新復健科診所',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '光復路一段371號B1',
          addressLocality: '新竹市',
          addressRegion: '東區',
          postalCode: '300',
          addressCountry: 'TW',
        },
        // 保留原始座標
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 24.783331,
          longitude: 121.017094
        }
    }
  },
  blogPost: noticesList.map((item) => ({
      '@type': 'BlogPosting',
      headline: item.title,
      description: item.summary,
      url: `${SITE_URL}/about/news/${item.id}`,
      // ✨ 保留原始日期與時間戳
      datePublished: item.date,
      image: item.coverImage,
      author: {
        '@type': ['Person', 'Physician'],
        name: '林羿辰醫師'
      },
      mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/about/news/${item.id}`
      }
  }))
}

  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdBlog} />
      <ScrollAnimation />

      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300">
        <main className="flex-grow pt-0 -mt-10 md:-mt-12 pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="mb-10 animate-on-scroll">
                <div className="text-left mb-4">
                    {/* ✨ 修改處：移除 prefetch={false}，解凍對純靜態 /about/news 網頁的背景智慧預載快取 */}
                    <Link href="/about/news" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group text-sm font-medium">
                        <i className="fa-solid fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i> 
                        返回衛教文章
                    </Link>
                </div>

                <div className="pb-2 flex flex-row items-center justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-2xl md:text-5xl font-bold font-sans text-white tracking-wide mb-0 md:mb-2">
                            門診異動公告
                        </h1>
                        <p className="hidden md:block text-pink-400">
                            新竹宸新復健科：休診、代診與重要行政通知
                        </p>
                    </div>

                    {/* 🛡️ 流量防禦點：/about/news 為強制動態專區（force-dynamic），此處維持 prefetch={false} 進行精準防守 */}
                    <Link 
                        href="/about/news" 
                        prefetch={false}
                        className="group relative inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 overflow-hidden font-medium text-white transition-all duration-300 bg-cyan-600 rounded-xl hover:bg-cyan-500 hover:scale-105 shadow-[0_0_20px_rgba(8,145,178,0.4)] shrink-0"
                    >
                        <span className="mr-2 md:mr-3 text-lg">
                            <i className="fa-solid fa-book-medical"></i>
                        </span>
                        <div className="flex flex-col items-start leading-tight">
                            <span className="text-base tracking-wider">衛教文章</span>
                        </div>
                        <i className="fa-solid fa-arrow-right ml-3 md:ml-4 group-hover:translate-x-1 transition-transform text-sm md:text-base"></i>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                    </Link>
                </div>
            </div>

            <div className="space-y-8 animate-on-scroll delay-100">
              {noticesList.map((item) => (
                /* ✨ 修改處：移除 prefetch={false} 屬性！因公告詳細內頁為純靜態 SSG 檔案，重啟背景自動預載只消耗硬碟 Data Transfer */
                <Link key={item.id} href={`/about/news/${item.id}`} className="block group bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all duration-300">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/3 h-56 md:h-auto relative overflow-hidden">
                      <img 
                        src={item.coverImage} 
                        alt={`新竹宸新復健科門診異動公告：${item.title}`} 
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                      />
                    </div>
                    <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-3 text-sm">
                            <span className="px-2 py-1 rounded border bg-pink-500/10 text-pink-400 border-pink-500/30">{item.category}</span>
                            <span className="text-slate-400 flex items-center"><i className="fa-regular fa-calendar mr-2"></i>{item.date}</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors leading-relaxed">
                            {item.title}
                        </h2>
                        <p className="text-slate-400 line-clamp-2 mb-4 leading-relaxed">{item.summary}</p>
                        <div className="mt-auto text-pink-500 text-sm font-bold group-hover:translate-x-1 transition-transform inline-flex items-center">
                            查看詳情 <i className="fa-solid fa-arrow-right ml-2"></i>
                        </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}