// src/app/diseases/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { diseaseCategories } from '@/data/diseases'
import SymptomChecker from '@/components/SymptomChecker'
import ScrollAnimation from '@/components/ScrollAnimation'

// ✨ 引入所需的 React Icons，確保顯示穩定且極速
import { 
  FaBookMedical, 
  FaArrowRight, 
  FaChartBar, 
  FaInfoCircle 
} from "react-icons/fa";

// 定義標準網域與路徑
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dryichen.com.tw').trim()
const PAGE_PATH = '/diseases'
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`

// ==========================================
// 1. Meta 設定 (優化 Title 並加入 Geo 標籤)
// ==========================================
export const metadata: Metadata = {
  // 修正：移除後綴診所名，避免與 layout.tsx 模板疊加
  title: '新竹骨科/復健科推薦 - 椎間盤突出/五十肩/關節炎/痠麻痛治療 | 新竹宸新復健科',
  description: '新竹復健科權威，專治椎間盤突出、坐骨神經痛、肩頸痠痛與五十肩。提供退化性關節炎與網球肘的精準診斷，解決您的痠麻痛困擾，是您值得信賴的新竹骨科診所。',
  keywords: ['新竹骨科', '新竹復健科', '椎間盤突出', '背痛', '肩頸痠痛', '五十肩', '退化性關節炎', '網球肘', '痠麻痛', '復健診所', '宸新復健科'],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: '新竹骨科/復健科推薦 - 各部位疼痛治療導覽 | 新竹宸新復健科',
    description: '肩膀痛、膝蓋痛、腰痛？點擊查看宸新復健科針對各部位疼痛的詳細衛教與治療建議。',
    type: 'website',
    url: CANONICAL_URL,
    siteName: '新竹宸新復健科診所',
  },
  // 加入在地化 Geo 標記
  other: {
    'geo.region': 'TW-HCH',
    'geo.placename': '新竹市',
  }
}

// ==========================================
// 2. Schema 結構化資料
// ==========================================
const diseasesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首頁', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: '疾病衛教', item: CANONICAL_URL },
      ],
    },
    {
      '@type': 'MedicalWebPage', 
      '@id': `${CANONICAL_URL}#webpage`,
      'name': '骨科復健疾病衛教導覽',
      'description': '提供脊椎、關節、肌肉疼痛等相關疾病的詳細症狀說明與治療建議。',
      'url': CANONICAL_URL,
      'lastReviewed': new Date().toISOString().split('T')[0],
      'reviewedBy': {
        '@type': 'Physician',
        'name': '林羿辰 醫師',
        'url': `${SITE_URL}/about/doctors`
      },
      'specialty': [
        { '@type': 'MedicalSpecialty', 'name': 'Orthopedics' },
        { '@type': 'MedicalSpecialty', 'name': 'Physical Medicine and Rehabilitation' }
      ],
      'mainEntity': {
        '@type': 'ItemList',
        'itemListElement': diseaseCategories.map((cat, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'url': `${SITE_URL}/diseases/${cat.slug}`,
            'name': cat.title
        }))
      }
    }
  ]
}

export default function DiseasesPage() {
  return (
    <>
      <JsonLd data={diseasesSchema} />
      
      <ScrollAnimation />

      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300">
        
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 -mt-10 md:-mt-12 pb-12 fade-in">
          
          {/* 標題區塊 + AI 搜尋 */}
          <div className="text-center mb-5 max-w-4xl mx-auto animate-on-scroll">
              <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="flex items-center justify-center w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30">
                      <FaBookMedical size={20} />
                  </span>

                  <div className="flex flex-col justify-center">
                      <h1 className="text-3xl font-bold font-sans text-white leading-none transform translate-y-[7px]">
                          常見骨科疾病衛教
                      </h1>
                  </div>
              </div>

              {/* AI 輸入框 */}
              <div className="relative z-20">
                  <SymptomChecker />
              </div>
          </div>

          {/* 卡片列表 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 animate-on-scroll delay-100">
            {diseaseCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/diseases/${category.slug}`}
                // ✨ 依照建議修改：移除 prefetch={false}，釋放 Next.js 純靜態預載，換回零延遲秒開體感
                className="group relative bg-slate-800/40 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* 1. 圖片區塊 (優化 Alt 描述) */}
                <div className="aspect-[16/9] w-full overflow-hidden relative bg-slate-900">
                    <img 
                      src={category.image} 
                      alt={`新竹骨科復健常見疾病：${category.title}症狀與治療建議`} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                    
                    {/* 分類標題 */}
                    <div className="absolute bottom-0 left-0 p-5 w-full">
                        {/* H2 應用於分類列表標題 */}
                        <h2 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors drop-shadow-lg flex items-center justify-between">
                            {category.title}
                            <FaArrowRight className="-rotate-45 group-hover:rotate-0 text-slate-400 group-hover:text-cyan-400 transition-all duration-300 text-lg opacity-0 group-hover:opacity-100" />
                        </h2>
                    </div>
                </div>

                {/* 2. 文字內容區塊 */}
                <div className="p-5 pt-2 flex flex-col flex-grow border-t border-slate-700/30">
                  <p className="text-slate-400 mb-4 line-clamp-2 text-sm leading-relaxed min-h-[2.5rem]">
                    {category.description}
                  </p>

                  <div className="mt-auto">
                      {category.diseases && category.diseases.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                            {category.diseases.slice(0, 3).map((d, idx) => (
                                <span key={idx} className="text-[11px] font-medium bg-slate-700/50 text-slate-300 px-2 py-1 rounded-md border border-slate-600/50 group-hover:border-cyan-500/30 group-hover:text-cyan-100 transition-colors">
                                    {d.title}
                                </span>
                            ))}
                            {category.diseases.length > 3 && (
                                <span className="text-[10px] text-slate-500 self-center pl-1">+{category.diseases.length - 3}</span>
                            )}
                        </div>
                      ) : (
                          <span className="text-xs text-slate-600 italic">資料更新中...</span>
                      )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 專業信任區塊 (優化：H2 層級應用) */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-10 border border-slate-700 relative overflow-hidden shadow-2xl mb-12 animate-on-scroll delay-200">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0 hidden md:block">
                      <div className="w-16 h-16 rounded-2xl bg-slate-700/50 flex items-center justify-center border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                           <FaChartBar size={28} className="text-cyan-400" />
                      </div>
                  </div>
                  
                  <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-4 md:mb-2">
                        <FaChartBar size={28} className="text-cyan-400 md:hidden" />
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            正確的診斷，是有效復健治療的第一步
                        </h2>
                      </div>
                      
                      <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
                          <p>
                              許多病患深受長期疼痛困擾，原因往往在於沒有找出真正的病灶。例如：<span className="text-cyan-400 font-medium bg-cyan-900/20 px-1 rounded">手麻</span>不一定是腕隧道症候群，可能是頸椎神經壓迫；<span className="text-cyan-400 font-medium bg-cyan-900/20 px-1 rounded">膝蓋痛</span>不一定是退化，可能是周邊韌帶拉傷。
                          </p>
                          <p>
                              透過詳細的理學檢查與影像評估，我們能區分疼痛來源，為您制定最合適的復健計畫，避免無效治療。
                          </p>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-slate-700/50 flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-2">
                             <img 
                                src="/images/doctor/b.webp" 
                                alt="新竹宸新復健科院長林羿辰醫師" 
                                className="w-12 h-12 rounded-full border border-slate-600" 
                             />
                             <span className="text-slate-400 text-sm">本文內容由 林羿辰 醫師 專業審閱</span>
                          </div>
                          <Link 
                            href="/about/doctors" 
                            // ✨ 依照建議修改：移除 prefetch={false} 屬性
                            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-2 group"
                          >
                             認識我們的醫療團隊 <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                      </div>
                  </div>
              </div>
          </div>

          {/* SEO 導言區 (優化：加入 H2 層級補強) */}
          <div className="max-w-4xl mx-auto opacity-70 hover:opacity-100 transition-opacity duration-300 animate-on-scroll delay-300">
              <h2 className="sr-only">新竹專業復健科疾病衛教：解決各部位疼痛與運動傷害</h2>
              <details className="group border-l-2 border-slate-700 pl-4">
                  <summary className="list-none [&::-webkit-details-marker]:hidden text-sm md:text-base text-slate-500 leading-relaxed outline-none cursor-pointer select-none text-left hover:text-cyan-400 transition-colors">
                      <span className="inline-block h-full">
                          <span className="flex items-center gap-2 mb-2">
                             <FaInfoCircle className="text-cyan-500/50" />
                             <strong className="text-slate-400 font-medium">More 關於骨科復健的衛教資訊</strong>
                          </span>
                          <span className="group-open:hidden">
                             ... <span className="text-xs text-cyan-500 hover:underline ml-2">展開閱讀</span>
                          </span>
                      </span>
                  </summary>
                  
                  <div className="mt-4 text-base text-slate-500 leading-relaxed text-left animate-in fade-in slide-in-from-top-1 duration-300">
                      <p className="mb-4">
                          無論是現代文明病造成的<strong className="text-slate-400 font-normal">肩頸痠痛</strong>與<strong className="text-slate-400 font-normal">背痛</strong>，或是困擾中老年人的<strong className="text-slate-400 font-normal">五十肩</strong>與膝蓋<strong className="text-slate-400 font-normal">退化性關節炎</strong>，我們都能提供完整的治療計畫。
                      </p>
                      <p>
                          針對運動傷害如<strong className="text-slate-400 font-normal">網球肘</strong>，以及神經壓迫導致的<strong className="text-slate-400 font-normal">椎間盤突出</strong>與手腳<strong className="text-slate-400 font-normal">痠麻痛</strong>，宸新復健科團隊將協助您找出病因，遠離疼痛。我們致力於提供新竹地區最專業的骨科復健服務。
                      </p>
                  </div>
              </details>
          </div>

        </main>
      </div>
    </>
  )
}