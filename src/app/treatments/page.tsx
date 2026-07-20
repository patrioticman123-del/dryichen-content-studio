// src/app/treatments/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { treatmentsList } from '@/data/treatments'
import ScrollAnimation from '@/components/ScrollAnimation'

// 引入所需的 React Icons
import { 
  FaNotesMedical, 
  FaFileMedical, 
  FaArrowRight, 
  FaCheck, 
  FaMicroscope, 
  FaInfoCircle 
} from "react-icons/fa";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dryichen.com.tw').trim()
const PAGE_PATH = '/treatments'
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`

export const metadata: Metadata = {
  title: '專業復健治療項目 - 新竹 PRP/增生注射/震波/徒手治療 | 新竹宸新復健科',
  description: '新竹復健科推薦。林羿辰醫師團隊提供高解析超音波導引注射(PRP/葡萄糖增生療法)，精準治療疼痛。另設有高能量體外震波、專業徒手治療與運動治療，為新竹骨科患者提供全方位復健方案。',
  keywords: [
    '新竹PRP', '新竹增生注射', '超音波導引注射', '新竹骨科', 
    '體外震波', '新竹體外震波', '徒手治療', '新竹徒手治療', 
    '復健科推薦', '膝蓋退化免開刀', '足底筋膜炎治療', '宸新復健科項目'
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: '專業復健治療項目  | 新竹宸新復健科',
    description: '提供PRP增生療法、體外震波、徒手治療等專業骨科復健服務。',
    url: CANONICAL_URL,
    type: 'website',
    siteName: '新竹宸新復健科診所',
  },
  other: {
    'geo.region': 'TW-HCH',
    'geo.placename': '新竹市',
  }
}

const treatmentsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首頁', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: '治療項目', item: CANONICAL_URL },
      ],
    },
    {
      '@type': 'MedicalWebPage', 
      '@id': `${CANONICAL_URL}#webpage`,
      'name': '復健治療項目總覽',
      'description': '提供PRP增生療法、體外震波、徒手治療等專業骨科復健服務。',
      'url': CANONICAL_URL,
      'lastReviewed': new Date().toISOString().split('T')[0],
      'reviewedBy': {
        '@type': 'Physician',
        'name': '林羿辰 醫師',
        'url': `${SITE_URL}/about/doctors`
      },
      'specialty': [
        { '@type': 'MedicalSpecialty', 'name': 'Orthopedics' },
        { '@type': 'MedicalSpecialty', 'name': 'Physical Medicine and Rehabilitation' },
        { '@type': 'MedicalSpecialty', 'name': 'Sports Medicine' }
      ],
      'mainEntity': {
        '@type': 'ItemList',
        'itemListElement': treatmentsList.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'url': `${SITE_URL}/treatments/${item.slug}`,
            'name': item.title
        }))
      }
    }
  ]
}

export default function TreatmentsPage() {
  return (
    <>
      <JsonLd data={treatmentsSchema} />
      
      <ScrollAnimation />

      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300">
        
        <main className="flex-grow pt-0 -mt-10 md:-mt-12 pb-12 relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* 標題區塊 */}
            <div className="flex items-center justify-center gap-4 mb-10 animate-on-scroll">
              <span className="flex items-center justify-center w-12 h-12 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30">
                <FaNotesMedical size={20} />
              </span>
              
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl font-bold font-sans text-white leading-none flex items-baseline transform translate-y-[7px]">
                  治療項目 
                  <span className="text-slate-500 text-lg font-normal ml-3 leading-none">Treatments</span>
                </h1>
              </div>
            </div>

            {/* 卡片列表 Grid */}
            <div className="grid grid-cols-1 gap-8 mb-16 animate-on-scroll delay-100">
              {treatmentsList.map((treatment) => (
                <Link
                  key={treatment.slug}
                  href={`/treatments/${treatment.slug}`}
                  // ✨ 修改處：拔除 prefetch={false}，釋放全靜態背景自動預載快取，換回極速流暢體感
                  className="group relative bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300 flex flex-col md:flex-row h-auto md:h-64 cursor-pointer"
                >
                  {/* 左側：圖片區塊 - 結構大改 */}
                  <div className="w-full md:w-2/5 h-56 md:h-full overflow-hidden flex-shrink-0">
                    <img 
                      src={treatment.image} 
                      alt={`${treatment.title} - 新竹推薦`}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* 右側：文字內容區塊 */}
                  <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center relative bg-slate-800">
                    {/* 背景裝飾圖示 - 調淡，避免干擾文字 */}
                    <FaFileMedical className="absolute right-4 bottom-4 text-8xl text-slate-700/30 -rotate-12 pointer-events-none" />
                    
                    <div className="relative z-10 h-full flex flex-col justify-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors flex items-center">
                            {treatment.title}
                            <FaArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-2 transition-all ml-3 text-lg text-cyan-500" />
                        </h2>
                        
                        <p className="text-slate-300/90 text-lg mb-4 line-clamp-2 md:line-clamp-3">
                            {treatment.description}
                        </p>
                        
                        {treatment.applicableConditions && treatment.applicableConditions.length > 0 && (
                            <div className="mt-autopt-2">
                                <div className="flex flex-wrap gap-2">
                                    {treatment.applicableConditions.slice(0, 4).map((condition, idx) => (
                                        <span key={idx} className="text-sm bg-slate-700 text-cyan-400 px-2 py-1 rounded border border-slate-600 flex items-center">
                                            <FaCheck className="mr-1 text-[10px]" />{condition}
                                        </span>
                                    ))}
                                    {treatment.applicableConditions.length > 4 && (
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

            {/* 專業理念區塊 */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 relative overflow-hidden animate-on-scroll delay-200">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0 hidden md:block">
                        <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center border-2 border-cyan-500/50">
                             <FaMicroscope size={28} className="text-cyan-400" />
                        </div>
                    </div>
                    
                    <div className="flex-grow">
                        <div className="flex items-center gap-4 mb-4 md:mb-2">
                            <FaMicroscope size={28} className="text-cyan-400 md:hidden" />
                            <h2 className="text-2xl font-bold text-white">
                                精準醫療，對症下藥
                            </h2>
                        </div>
                        <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
                            <p>
                                疼痛的成因複雜，傳統的「頭痛醫頭」往往只能治標。宸新復健科堅持引入醫學中心等級的<strong className="text-cyan-400">超音波導引</strong>技術，在注射治療（如 PRP、增生療法）時，能即時看見神經、血管與受傷組織，確保藥劑精準送達病灶。
                            </p>
                            <p>
                                同時，我們整合了物理治療師的<strong className="text-cyan-400">徒手治療</strong>與運動訓練，不僅修復組織，更協助您重建正確的身體力學，從根本預防復發。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

          </div>

          {/* SEO 導言區 */}
          <div className="max-w-4xl mx-auto opacity-70 hover:opacity-100 transition-opacity duration-300 mt-12 animate-on-scroll delay-300">
              <details className="group border-l-2 border-slate-700 pl-4">
                  <summary className="list-none [&::-webkit-details-marker]:hidden text-sm md:text-base text-slate-500 leading-relaxed outline-none cursor-pointer select-none text-left hover:text-cyan-400 transition-colors">
                      <span className="inline-block h-full">
                          <span className="flex items-center gap-2 mb-2">
                             <FaInfoCircle className="text-cyan-500/50" />
                             <strong className="text-white font-medium">醫師叮嚀：精準治療，重啟修復</strong>
                          </span>
                          宸新復健科致力於提供最先進的<strong className="text-cyan-400 font-normal">新竹骨科</strong>復健治療...
                          <span className="group-open:hidden">
                             <span className="text-xs text-cyan-500 hover:underline ml-2">展開閱讀</span>
                          </span>
                      </span>
                  </summary>

                  <div className="mt-4 text-base text-slate-500 leading-relaxed text-left">
                    <p className="mb-4">
                        我們特別引進高解析度<strong className="text-cyan-400 font-normal">超音波導引注射</strong>技術，讓<strong className="text-cyan-400 font-normal">PRP</strong> (高濃度血小板) 與<strong className="text-cyan-400 font-normal">增生注射</strong>治療能精準修復受損組織，大幅提升<strong>退化性關節炎</strong>與<strong>肌腱撕裂</strong>的療效。
                    </p>
                    <p className="mb-4">
                        針對慢性疼痛與術後恢復，我們配備高能量<strong className="text-cyan-400 font-normal">體外震波</strong>儀器，專治<strong>足底筋膜炎</strong>與<strong>鈣化性肌腱炎</strong>。
                    </p>
                    <p> 
                        並由資深治療師提供一對一的<strong className="text-cyan-400 font-normal">徒手治療</strong>與運動指導，全方位解決您的疼痛困擾。
                    </p>
                  </div>
              </details>
          </div>
        </main>
      </div>
    </>
  )
}