// src/app/about/clinic/page.tsx
import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
// ✨ 1. 引入動畫組件
import ScrollAnimation from '@/components/ScrollAnimation'

// 1. 引入資料
import { facilitiesData } from '@/data/facilities'
import { getTreatmentBySlug } from '@/data/treatments'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dryichen.com.tw').trim()
const PAGE_PATH = '/about/clinic'
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`

// ==========================================
// 2. 資料處理邏輯 (混合與排序 - 完整保留)
// ==========================================
const allItems = facilitiesData.map((item) => {
  if ((item as any).isTreatment) {
    const treatment = getTreatmentBySlug(item.id);
    if (treatment) {
      const targetImage = (treatment as any).image || (treatment.images && treatment.images.length > 0 ? treatment.images[0].src : '/images/clinic/default.webp');
      return {
        id: treatment.slug,
        title: treatment.title,
        description: treatment.description,
        imageUrl: targetImage,
      };
    }
  }
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl,
  };
});

// ==========================================
// 3. Meta 設定 (優化 Title 並加入 Geo 標籤)
// ==========================================
export const metadata: Metadata = { 
  // 修正：移除後綴診所名，避免與 layout.tsx 模板疊加
  title: '診所環境與設備介紹 - 數位X光/超音波/骨科復健區 | 新竹宸新復健科',
  description: '新竹宸新復健科擁有醫學中心等級設備。包含數位X光、高解析超音波、瑞士聚焦式震波、兒童早療教室、獨立徒手治療室及專屬停車場，提供最優質的就醫環境。',
  keywords: ['新竹復健科設備', 'X光檢查', '超音波檢查', 'PRP設備', '兒童早療', '骨科復健', '停車方便', '宸新復健科環境'],
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    title: '診所環境與設備介紹 - 新竹宸新復健科',
    description: '醫學中心等級設備：數位X光、高解析超音波、瑞士震波、兒童早療教室。',
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

export default function ClinicPage() {
  // ==========================================
  // 4. Schema 結構化資料 (完整保留)
  // ==========================================
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首頁', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '關於我們', item: `${SITE_URL}/about` }, 
      { '@type': 'ListItem', position: 3, name: '環境與設備', item: CANONICAL_URL },
    ],
  }

  const jsonLdPage = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${CANONICAL_URL}#webpage`,
    name: '診所環境與設備介紹',
    description: '提供全方位骨科復健與兒童發展評估的專業診所環境介紹。',
    url: CANONICAL_URL,
    author: {
        '@type': 'MedicalOrganization',
        name: '新竹宸新復健科',
        url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${CANONICAL_URL}/${item.id}`,
        name: item.title,
        image: item.imageUrl
      }))
    }
  }

  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdPage} />
      
      {/* ✨ 5. 放置動畫邏輯組件 */}
      <ScrollAnimation />

      <div className="min-h-screen bg-slate-900 text-slate-300 pt-0 -mt-6 pb-12 md:pt-0 md:-mt-8 md:pb-16">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ✨ 6. 返回按鈕區塊動畫 */}
          <div className="animate-on-scroll">
            {/* ✨ 修改處：移除 prefetch={false} 屬性，回復背景智慧靜態預載 */}
            <Link href="/about" className="inline-flex items-center text-cyan-400 mb-2 hover:text-cyan-300 transition-colors group">
                <i className="fa-solid fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i> 返回關於我們
            </Link>
          </div>

          {/* ✨ 7. 標題區塊動畫 */}
          <div className="mb-12 text-center animate-on-scroll">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wider">專業醫療設備與環境</h1>
              <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full mb-4"></div>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                工欲善其事，必先利其器。我們引引進醫學中心等級的檢查與治療設備，並打造寬敞舒適的復健空間，致力於提供最精準的診斷與最有效的治療。
              </p>
          </div>

          {/* ✨ 8. 卡片網格區塊 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll delay-100">
            {allItems.map((item) => (
              /* ✨ 修改處：移除 prefetch={false} 屬性，解凍背景快取，換回極速流暢的秒開體感 */
              <Link 
                key={item.id} 
                href={`/about/clinic/${item.id}`} 
                className="group bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 flex flex-col"
              >
                  {/* 圖片區塊 (優化 Alt 描述) */}
                  <div className="h-48 overflow-hidden relative bg-slate-800">
                    <img 
                      src={item.imageUrl} 
                      alt={`新竹宸新復健科專業設備介紹：${item.title}`} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  </div>
                  
                  {/* 文字區塊 */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                       {item.title}
                       <i className="fa-solid fa-angle-right opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-sm"></i>
                    </h2>
                    
                    <p className="text-slate-400 line-clamp-2 mb-4 flex-grow text-sm leading-relaxed">
                       {item.description}
                    </p>
                    
                    <div className="text-right mt-auto">
                       <span className="text-cyan-400 font-semibold text-sm group-hover:underline decoration-cyan-400/50 underline-offset-4">
                         了解更多 <i className="fa-solid fa-arrow-right ml-1 text-xs"></i>
                       </span>
                    </div>
                  </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}