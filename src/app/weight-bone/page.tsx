// src/app/weight-bone/page.tsx
import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { weightLossPrograms } from '@/data/weightLoss'
import WeightLossTools from '@/components/WeightLossTools'
import ScrollAnimation from '@/components/ScrollAnimation'
import { sportsInjuriesData } from '@/data/sportsInjuries'

// ✨ 引入所需的 React Icons
import { 
  FaWeight, 
  FaFileMedical, 
  FaArrowRight, 
  FaCheck, 
  FaUserMd, 
  FaExclamationTriangle,
  FaTools,
  FaRunning
} from "react-icons/fa";

// 定義常數，確保網址一致
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dryichen.com.tw').trim()
const PAGE_PATH = '/weight-bone'
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`

// ==========================================
// 1. Meta 設定
// ==========================================
export const metadata: Metadata = {
  // 強化「復健科」與「運動傷害」關聯
  title: '新竹減重/骨齡/運動傷害門診 - 猛健樂、瘦瘦針、兒童生長 | 宸新復健科',
  description: '新竹宸新復健科由林羿辰醫師帶領，專精猛健樂(Mounjaro)減重、兒童骨齡評估及運動傷害復健（籃球、網球運動傷害門診）。提供精準醫療評估，助您找回健康體態與活動力。',
  // 擴充運動傷害關鍵字
  keywords: [
    '新竹減重', '新竹猛健樂', '新竹復健科推薦', '運動傷害治療', '網球肘復健', 
    '籃球運動傷害', '新竹照骨齡', '性早熟', '林羿辰醫師', '宸新復健科'
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: '新竹宸新復健科 - 減重、兒童骨齡與運動傷害專業門診',
    description: '專業體重管理、兒童生長評估與運動傷害診斷，由林羿辰醫師提供個人化療程。',
    url: CANONICAL_URL,
    type: 'website',
    siteName: '新竹宸新復健科診所',
  },
  other: {
    'geo.region': 'TW-HCH',
    'geo.placename': '新竹市',
    'geo.position': '24.7833314;121.0170937', // 建議加入經緯度，對在地 SEO 有幫助
    'ICBM': '24.7833314;121.0170937',
  }
}

const weightBoneSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', position: 1, name: '首頁', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: '醫療服務', item: CANONICAL_URL },
      ],
    },
    {
      '@type': 'MedicalWebPage',
      '@id': `${CANONICAL_URL}#webpage`,
      'name': '減重、骨齡與運動傷害綜合門診',
      'description': '專精於體重管理(猛健樂)、兒童骨齡檢查及各類運動傷害(籃球、網球)之診斷與復健。',
      'url': CANONICAL_URL,
      'lastReviewed': new Date().toISOString().split('T')[0],
      'reviewedBy': {
        '@type': 'Physician',
        'name': '林羿辰 醫師',
        'image': `${SITE_URL}/dr-lin-photo.jpg`, // 加入醫師照片對 E-E-A-T 有幫助
        'medicalSpecialty': ['RehabilitationMedicine', 'SportsMedicine']
      },
      // 擴張醫療領域
      'relevantSpecialty': [
        { '@type': 'MedicalSpecialty', 'name': 'Physical Medicine and Rehabilitation' },
        { '@type': 'MedicalSpecialty', 'name': 'Sports Medicine' },
        { '@type': 'MedicalSpecialty', 'name': 'Endocrinology' }
      ],
      // 透過 ItemList 呈現導覽架構
      'mainEntity': [
        {
          '@type': 'ItemList',
          'name': '體重管理與骨齡服務',
          'itemListElement': weightLossPrograms.map((program, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'url': `${SITE_URL}/weight-bone/${program.slug}`,
            'name': program.title
          }))
        },
        {
          '@type': 'ItemList',
          'name': '運動傷害復健導覽',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': '籃球運動傷害復健', 'url': `${SITE_URL}/sports-injury/basketball` },
            { '@type': 'ListItem', 'position': 2, 'name': '網球運動傷害與網球肘', 'url': `${SITE_URL}/sports-injury/tennis` }
          ]
        }
      ]
    },
    // 新增：在地診所實體資訊，這對 Geo SEO 極其重要
    {
      '@type': 'MedicalClinic',
      'name': '宸新復健科診所',
      'alternateName': '新竹宸新復健科',
      'address': {
      '@type': 'PostalAddress',
      'streetAddress': '光復路一段371號B1',
      'addressLocality': '新竹市',
      'addressRegion': '東區',
      'postalCode': '300',
      'addressCountry': 'TW',
      },
      'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '24.7833314', 
      'longitude': '121.0170937'
      },
      'telephone': '+886-35647999',
    }
  ]
}

export default function WeightLossPage() {
  // 将原本的三個項目拆分：前兩個為一組，第三個為一組
  const firstTwoPrograms = weightLossPrograms.slice(0, 2);
  const remainingPrograms = weightLossPrograms.slice(2);

  return (
    <>
      <JsonLd data={weightBoneSchema} />
      
      <ScrollAnimation />

      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300">
        
        <main className="flex-grow pt-0 -mt-10 md:-mt-12 pb-12 relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* 標題區塊 */}
            <div className="text-center mb-5 max-w-4xl mx-auto animate-on-scroll relative z-50">
              <div className="flex items-center justify-center gap-4 mb-4">
{/* 手機版本隱藏，電腦版 (md以上) 才顯示 */}
<span className="hidden md:flex items-center justify-center w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30">
  <FaWeight size={20} />
</span>

                  <div className="flex flex-col justify-center">
                      <h1 className="text-3xl font-bold font-sans text-white leading-none transform translate-y-[7px]">
                          減重、成長與運動醫學門診
                      </h1>
                  </div>
              </div>

              {/* 手機版：維持在標題下方顯示小工具 */}
              <div className="relative z-20 md:hidden">
                  <WeightLossTools />
              </div>
            </div>

{/* 健康實用小工具區塊 (僅在電腦版 md 以上顯示) */}
<div className="hidden md:block mb-16 animate-on-scroll delay-150 relative z-10">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
      <FaTools className="text-cyan-400" /> 健康實用小工具
    </h2>
  </div>

  {/* 這裡電腦版放入四顆按鈕，方格內容自適應 */}
  <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-2xl p-6 md:p-8">
    {/* 這裡渲染按鈕組件 */}
    <WeightLossTools />
  </div>
</div>

            {/* 區塊一：前兩個減重與骨齡卡片 (通常是減重相關) */}
            <div className="grid grid-cols-1 gap-8 mb-16 animate-on-scroll delay-100 relative z-10">
              {firstTwoPrograms.map((program) => (
                <Link
                  key={program.slug}
                  href={`/weight-bone/${program.slug}`}
                  // ✨ 修改處：移除 prefetch={false} 屬性，回復背景快取高速秒開
                  className="group relative bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row h-auto md:h-64 cursor-pointer"
                >
                  {/* 圖片區塊 */}
<div className="w-full md:w-2/5 relative h-48 md:h-full overflow-hidden">
  <img 
    src={program.image} 
    alt={`新竹宸新復健科專業門診：${program.title}`} 
    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
  />
  
  {/* 修改重點：將 /90 改為 /60，並限制寬度 md:w-1/2，避免遮擋整張圖 */}
  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent md:bg-none"></div>
  <div className="hidden md:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-slate-900/60 to-transparent"></div>
</div>

                  {/* 文字內容區塊 */}
                  <div className="w-full md:w-3/5 p-5 md:p-6 flex flex-col justify-center relative">
                    <FaFileMedical className="absolute right-4 bottom-4 text-8xl text-slate-800/50 -rotate-12 group-hover:text-cyan-900/30 transition-colors duration-500 pointer-events-none" />
                    
                    <div className="relative z-10 h-full flex flex-col justify-center">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors flex items-center">
                        {program.title}
                        <FaArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ml-3 text-lg text-cyan-500" />
                      </h2>

                      <p className="text-slate-300 text-lg mb-4 line-clamp-2">
                        {program.description}
                      </p>

                      {program.features && program.features.length > 0 && (
                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-2">
                             {program.features.slice(0, 3).map((feature, idx) => (
                               <span key={idx} className="text-sm bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded border border-cyan-500/20 flex items-center">
                                  <FaCheck className="mr-1 text-[10px]" />{feature}
                               </span>
                             ))}
                             {program.features.length > 3 && (
                               <span className="text-sm text-slate-500 px-2 py-1">...</span>
                             )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 中間插入：運動傷害導覽區塊 */}
            <div className="mb-16 animate-on-scroll delay-200 relative z-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaRunning className="text-cyan-400" /> 運動傷害導覽
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sportsInjuriesData.map((categoryItem) => (
                  <Link
                    key={categoryItem.category}
                    href={`/weight-bone/sports-injuries/${categoryItem.category}`}
                    // ✨ 修改處：移除 prefetch={false} 屬性，回復背景快取高速秒開
                    className="group relative bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden hover:bg-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col cursor-pointer"
                  >
                    <div className="h-40 w-full relative overflow-hidden bg-slate-700">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                      <img 
                        src={categoryItem.image} 
                        alt={categoryItem.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 opacity-100"
                      />
                      <h3 className="absolute bottom-4 left-4 z-20 text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors drop-shadow-lg">
                        {categoryItem.title}
                      </h3>
                    </div>
                    <div className="p-5 flex-grow">
                      <p className="text-slate-300 mb-4 line-clamp-2">{categoryItem.description}</p>
                      <div className="flex items-center text-cyan-500 text-sm font-bold">
                        查看分類傷害 <FaArrowRight className="ml-2" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 區塊二：最後一個減重與骨齡卡片 (通常是骨齡相關項目) */}
            <div className="grid grid-cols-1 gap-8 mb-16 animate-on-scroll delay-100 relative z-10">
              {remainingPrograms.map((program) => (
                <Link
                  key={program.slug}
                  href={`/weight-bone/${program.slug}`}
                  // ✨ 修改處：移除 prefetch={false} 屬性，回復背景快取高速秒開
                  className="group relative bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row h-auto md:h-64 cursor-pointer"
                >
                  {/* 圖片區塊 */}
                  <div className="w-full md:w-2/5 relative h-48 md:h-full overflow-hidden">
                    <img 
                      src={program.image} 
                      alt={`新竹宸新復健科專業門診：${program.title}`} 
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/60 to-transparent group-hover:from-slate-900/40 transition-colors duration-500"></div>
                  </div>

                  {/* 文字內容區塊 */}
                  <div className="w-full md:w-3/5 p-5 md:p-6 flex flex-col justify-center relative">
                    <FaFileMedical className="absolute right-4 bottom-4 text-8xl text-slate-800/50 -rotate-12 group-hover:text-cyan-900/30 transition-colors duration-500 pointer-events-none" />
                    
                    <div className="relative z-10 h-full flex flex-col justify-center">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors flex items-center">
                        {program.title}
                        <FaArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ml-3 text-lg text-cyan-500" />
                      </h2>

                      <p className="text-slate-300 text-lg mb-4 line-clamp-2">
                        {program.description}
                      </p>

                      {program.features && program.features.length > 0 && (
                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-2">
                             {program.features.slice(0, 3).map((feature, idx) => (
                               <span key={idx} className="text-sm bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded border border-cyan-500/20 flex items-center">
                                  <FaCheck className="mr-1 text-[10px]" />{feature}
                               </span>
                             ))}
                             {program.features.length > 3 && (
                               <span className="text-sm text-slate-500 px-2 py-1">...</span>
                             )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 醫師治療理念區塊 */}
            <div className="bg-slate-800/80 rounded-2xl p-8 border border-slate-700 relative overflow-hidden animate-on-scroll delay-300">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center border-2 border-cyan-500/50">
                             <FaUserMd className="text-3xl text-cyan-400" />
                        </div>
                    </div>
                    
                    <div className="flex-grow text-left">
                        <h2 className="text-2xl font-bold text-white mb-4">
                          新竹宸新復健科：醫師治療理念與專業叮嚀
                        </h2>
                        <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
                            <p>
                                體重控制不僅僅是為了外觀，更是為了健康。市面上的減重藥物（如<span className="text-cyan-400">瘦瘦針、猛健樂</span>）必須在專業醫師的評估下使用。
                            </p>
                            <p>
                                同時地，兒童的生長發育只有一次。透過<span className="text-cyan-400">骨齡檢測</span>，我們能客觀判斷孩子的生長潛力，把握黃金成長期。
                            </p>
                        </div>
                        
                        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex gap-3">
                            <FaExclamationTriangle className="text-yellow-500 mt-1 shrink-0" />
                            <p className="text-sm text-yellow-200/80">
                                <strong>特別提醒：</strong>所有醫療行為皆有個別差異。請親自蒞臨診所，由醫師進行完整評估。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEO 導言區 */}
            <div className="max-w-4xl mx-auto opacity-70 hover:opacity-100 transition-opacity duration-300 mt-12 px-4 animate-on-scroll delay-300">
              <h2 className="sr-only">新竹減重與兒童骨齡專業醫療服務介紹</h2>
              <details className="group border-l-2 border-slate-700 pl-4">
                <summary className="list-none [&::-webkit-details-marker]:hidden text-sm md:text-base text-slate-500 leading-relaxed outline-none cursor-pointer select-none text-left hover:text-cyan-400 transition-colors">
                  <span className="inline-block h-full">
                    宸新復健科提供<strong className="text-cyan-400 font-normal">全方位的服務</strong>...
                    <span className="group-open:hidden">
                      ... <span className="text-xs text-cyan-500 hover:underline ml-2">展開閱讀</span>
                    </span>
                  </span>
                </summary>

                <div className="mt-4 text-base text-slate-500 leading-relaxed text-left">
                  <p className="mb-4">
                    我們提供科學化的<strong className="text-cyan-400 font-normal">減重</strong>療程，包含<strong className="text-cyan-400 font-normal">猛健樂</strong>與<strong className="text-cyan-400 font-normal">瘦瘦針</strong>。
                  </p>
                  <p>
                    針對兒童發育，我們提供專業的<strong className="text-cyan-400 font-normal">照骨齡</strong> X光檢查，協助家長精準掌握孩子的生長進度與潛力，預防性早熟。
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