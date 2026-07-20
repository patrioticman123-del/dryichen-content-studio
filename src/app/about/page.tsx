// src/app/about/page.tsx
import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import ScrollAnimation from '@/components/ScrollAnimation'

// ✨ 引入所需的 React Icons，確保顯示穩定且極速
import { 
  FaNewspaper, 
  FaHospital, 
  FaUserMd, 
  FaAddressCard, 
  FaArrowRight 
} from "react-icons/fa";

// 定義標準網域與路徑
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dryichen.com.tw').trim()
const PAGE_PATH = '/about'
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`

// ==========================================
// 1. Meta 設定 (優化 Title 並加入 Geo 標籤)
// ==========================================
export const metadata: Metadata = {
  // 修正：移除後綴診所名，避免與 layout.tsx 模板疊加
  title: '關於我們 - 新竹復健科推薦 | 台大醫師林羿辰 | 竹科/關埔/光復路骨科診所 | 新竹宸新復健科,',
  description: '新竹東區/竹科復健科首選。宸新復健科由台大林羿辰醫師主持，位於關埔重劃區(近Costco、光復路)。提供骨科痛症、運動傷害、兒童早療等全方位治療。附設專屬停車位，就醫方便。',
  keywords: [
    '新竹復健科', '新竹骨科', '台大醫師', '林羿辰',
    '新竹竹科', '新竹科學園區', '關埔重劃區', '光復路', '關新路', '新竹東區', 'Costco附近',
    '新竹復健推薦', '假日有開復健科', '好停車復健科'
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: '關於我們 - 宸新復健科診所',
    description: '台大醫師團隊，提供骨科痛症、運動傷害、兒童早療等全方位治療標。',
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

// 修改資料結構，將 icon 儲存為組件引用而非字串類名
const aboutSections = [
  {
    id: 'news',
    title: '最新文章與公告',
    subtitle: 'Latest News',
    description: '掌握最新的復健醫學新知與衛教文章雨診所最新公告、門診異動。',
    href: '/about/news',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800',
    Icon: FaNewspaper
  },
  {
    id: 'clinic',
    title: '診所介紹',
    subtitle: 'Clinic Information',
    description: '舒適寬敞的復健空間，配備醫學中心等級的檢查與治療設備，提供高品質的醫療服務。',
    href: '/about/clinic',
    image: '/images/about/b.webp',
    Icon: FaHospital
  },
  {
    id: 'cases',
    title: '治療案例分享',
    subtitle: 'Case Sharing',
    description: '疼痛不是生活的一部分，康復才是。在這裡，我們分享患者透過精準診斷與再生醫學重拾生活品質的真實故事。',
    href: '/about/cases',
    image: '/images/about/e.webp',
    Icon: FaHospital
  },
  {
    id: 'doctors',
    title: '醫師介紹',
    subtitle: 'Our Physician',
    description: '由台大訓練醫師團隊親自看診，結合骨科與復健科專業，提供全方位的疼痛治療方案。',
    href: '/about/doctors',
    image: '/images/about/a.webp',
    Icon: FaUserMd
  }
]

export default function AboutPage() {
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首頁', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '關於我們', item: CANONICAL_URL },
    ],
  }

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${CANONICAL_URL}#webpage`,
    url: CANONICAL_URL,
    name: '關於宸新復健科',
    description: metadata.description,
    mainEntity: {
        '@type': 'MedicalClinic',
        name: '宸新復健科診所',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
        url: SITE_URL,
        telephone: '+886-3-5647999',
        priceRange: '$$', 
        medicalSpecialty: ['Physical Medicine and Rehabilitation', 'Orthopedics', 'Pediatrics', 'Pain Management'],
        address: {
            '@type': 'PostalAddress',
            addressLocality: '新竹市東區',
            addressRegion: 'Hsinchu City',
            addressCountry: 'TW',
            streetAddress: '新竹市東區光復路一段371號b1' 
        },
        openingHoursSpecification: [
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '21:00' },
            { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '12:00' }
        ]
    }
  }

  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={aboutSchema} />
      
      <ScrollAnimation />

      <div className="min-h-screen bg-slate-900 text-slate-300">
        <main className="max-w-5xl mx-auto px-4 pt-0 -mt-10 md:-mt-12 pb-12">
          
          {/* 標題區塊 */}
          <div className="flex items-center justify-center gap-4 mb-10 animate-on-scroll">
            <span className="flex items-center justify-center w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30">
              <FaAddressCard size={24} />
            </span>
            
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold font-sans text-white leading-none flex items-baseline transform translate-y-[7px]">
                關於我們 
                <span className="text-slate-500 text-lg font-normal ml-3 leading-none">About Us</span>
              </h1>
            </div>
          </div>

          {/* 卡片連結區塊 */}
          <div className="grid grid-cols-1 gap-8 mb-16 animate-on-scroll delay-100">
            {aboutSections.map((item) => (
              <Link 
                key={item.id} 
                href={item.href}
                // ✨ 依照建議修改：移除 prefetch={false}，釋放全靜態背景自動預載快取，換回極速流暢體感
                className="group relative bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 flex flex-col md:flex-row h-auto md:h-64 cursor-pointer"
              >
                {/* 圖片區塊 */}
                <div className="w-full md:w-2/5 relative h-48 md:h-full overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={`${item.title} - 新竹宸新復健科診所專業服務`}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/90 to-transparent"></div>
                </div>
                
                {/* 文字內容區塊 */}
                <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center relative">
                   {/* 背景大圖示 */}
                   <item.Icon className="absolute right-4 bottom-4 text-8xl text-slate-800/50 -rotate-12 group-hover:text-cyan-900/30 transition-colors duration-500 pointer-events-none" />
                   
                   <div className="relative z-10">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors flex items-center">
                        {item.title}
                        <FaArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-2 transition-all ml-3 text-lg text-cyan-500" />
                      </h2>
                      <h3 className="text-sm font-tech text-cyan-500/80 mb-4 tracking-widest uppercase font-semibold">{item.subtitle}</h3>
                      <p className="text-slate-300 text-lg leading-relaxed">{item.description}</p>
                   </div>
                </div>
              </Link>
            ))}
          </div>

          {/* SEO 導言區 (優化：加入 H2 層級補強) */}
          <div className="max-w-4xl mx-auto opacity-70 hover:opacity-100 transition-opacity duration-300 animate-on-scroll delay-300">
            {/* 視覺隱藏 H2 補強 SEO 層級 */}
            <h2 className="sr-only">新竹東區與竹科復健科首選：宸新復健科地理位置與診所優勢</h2>
            
            <details className="group border-l-2 border-slate-700 pl-4">
              <summary className="list-none [&::-webkit-details-marker]:hidden text-sm md:text-base text-slate-500 leading-relaxed outline-none cursor-pointer select-none text-left hover:text-cyan-400 transition-colors">
                <span className="inline-block h-full">
                我們是<strong className="text-cyan-400 font-normal">新竹推薦</strong>的首選復健專科診所。擁有<strong className="text-cyan-400 font-normal">醫學中心等級</strong>的醫療設備及醫療人員。
                  <span className="group-open:hidden">
                    ... <span className="text-xs text-cyan-500 hover:underline ml-2">展開閱讀</span>
                  </span>
                </span>
              </summary>

              <div className="mt-4 text-base text-slate-500 leading-relaxed text-left animate-in fade-in slide-in-from-top-1 duration-300">
                  <p className="mb-4">
                      宸新復健科座落於繁華的<strong className="text-cyan-400 font-normal">新竹東區</strong>核心地帶，緊鄰<strong className="text-cyan-400 font-normal">新竹科學園區 (竹科)</strong> 與熱鬧的<strong className="text-cyan-400 font-normal">關埔重劃區</strong>。
                  </p>
                  <p className="mb-4">
                      診所位置交通極其便利，位於<strong className="text-cyan-400 font-normal">光復路</strong>與<strong className="text-cyan-400 font-normal">關新路</strong>交界處附近。無論您是住在關新社區的居民，或是下班後從竹科過來的工程師，甚至是剛逛完 <strong className="text-cyan-400 font-normal">Costco (好市多)</strong> 的民眾，都能輕鬆抵達。
                  </p>
                  <p>
                      為了解決新竹市區停車困難的問題，我們特別規劃了<strong className="text-cyan-400 font-normal">專屬停車位</strong>，讓您就醫復健不再為了找車位而煩惱。我們提供骨科疼痛、運動傷害、增生療法、兒童早療等全方位治療。
                  </p>
              </div>
            </details>
          </div>

        </main>
      </div>
    </>
  )
}