import React from 'react'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import ClinicHoursModal from '@/components/ClinicHoursModal'
import ScrollAnimation from '@/components/ScrollAnimation'

// ✨ 引入所需的 React Icons，確保掛號流程圖示穩定且極速載入
import { 
  FaCalendarCheck, 
  FaGlobe, FaGem, 
  FaMousePointer, 
  FaLine, 
  FaApple, 
  FaAndroid, 
  FaUserPlus, 
  FaDownload 
} from "react-icons/fa";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dryichen.com.tw'
const PAGE_PATH = '/booking'
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`

// ==========================================
// 1. Meta 設定 (優化 Title 與在地化標記)
// ==========================================

export const metadata: Metadata = {
  title: '馬上預約 | 林羿辰院長 - 新竹宸新復健科 (網路掛號/APP/Line預約)',
  description: '新竹宸新復健科提供便利的數位掛號服務。支援APP或網頁直接掛號、Android/iOS App 下載預約，或加入 Line 官方帳號線上掛號。免排隊、即時查詢看診進度。新竹宸新復健科提供 PRP 注射、震波治療、一對一運動治療。由台大醫師醫師看診。近新竹科學園區與關埔重劃區。',
  authors: [{ name: '林羿辰醫師', url: SITE_URL }],
  publisher: '宸新復健科診所-林羿辰醫師',
  keywords: [
    '林羿辰醫師', '新竹復健科推薦', '新竹掛號', '宸新復健科預約', 
    '科學園區復健科', '關埔復健科', 'PRP注射', '震波治療', 
    '新竹物理治療', '網路預約診所', '看診進度查詢'
  ],
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: '馬上預約 | 林羿辰院長 - 新竹宸新復健科',
    description: '提供免 APP 網頁掛號、手機 App 與 Line 線上預約，專業台大復健科醫療團隊為您服務。',
    url: CANONICAL_URL,
    type: 'website',
    siteName: '新竹宸新復健科診所',
    locale: 'zh_TW',
    images: [
      {
        url: `${SITE_URL}/images/main/a.webp`,
        width: 1200,
        height: 630,
        alt: '宸新復健科診所 - 林羿辰醫師專業團隊',
      },
    ],
  },
  other: {
    'geo.region': 'TW-HCH',
    'geo.placename': '新竹市',
    'geo.position': '24.7833314;121.0170937',
  }
}

export default function BookingPage() {
  const currentUrl = CANONICAL_URL
  const webBookingUrl = 'https://reg.forcestar.com.tw/appointment/7/reserve'

  // ==========================================
  // 2. Schema: 麵包屑 (完整保留)
  // ==========================================
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首頁', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '馬上預約', item: currentUrl },
    ],
  }
  const jsonLdBooking = {
    '@context': 'https://schema.org',
    // ✨ 修正 1：補充最外層的類型宣告，解決「未指定類型」報錯
    '@type': 'MedicalWebPage',

    'author': {
      // ✨ 修正 2：使用雙重宣告 ['Person', 'Physician']，合法化 jobTitle 與 alumniOf
      '@type': ['Person', 'Physician'],
      'name': '林羿辰 醫師',
      'jobTitle': '宸新復健科診所 院長',
      'url': `${SITE_URL}/about/doctors`,
      'image': `${SITE_URL}/images/main/a.webp`,
      'alumniOf': { 
        '@type': 'EducationalOrganization', 
        'name': '國立台灣大學醫學系' 
      },
      'medicalSpecialty': [
        'https://schema.org/Physiotherapy',  
        'https://schema.org/Pediatric'
      ],
      'knowsAbout': [
        'Orthopaedic', 
        'Sports Medicine', 
        'Pain Management',
        'Physical Medicine and Rehabilitation'
      ],
      // 讓 AI 引擎確認醫師身份的外部權威連結
      'sameAs': [
        'https://ma.mohw.gov.tw/Accessibility/DOCSearch/DOCBasicData?DOC_SEQ=2bJQOvvE5EX3U6eK7eSvhw%253D%253D',
        'https://www.pmr.org.tw/associator/associator-all.asp?w/',
        'https://www.toa1997.org.tw/orthopedist/?n=%E6%9E%97%E7%BE%BF%E8%BE%B0&h=&c=&a='
      ],
      // 證照資訊：GEO (AI 搜尋) 判斷可信度的關鍵
      'hasCredential': [
        {
          '@type': 'EducationalOccupationalCredential',
          'name': '醫事人員執業資格',
          'credentialCategory': '醫師證書',
          'url': 'https://ma.mohw.gov.tw/Accessibility/DOCSearch/DOCBasicData?DOC_SEQ=2bJQOvvE5EX3U6eK7eSvhw%253D%253D',
          'recognizedBy': {
            '@type': 'Organization',
            'name': '中華民國衛生福利部'
          }
        },
        {
          '@type': 'EducationalOccupationalCredential',
          'name': '復健科專科醫師資格',
          'credentialCategory': '復健科專科醫師證書',
          'url': 'https://www.pmr.org.tw/associator/associator-all.asp?w/',
          'recognizedBy': {
            '@type': 'Organization',
            'name': '台灣復健醫學會'
          }
        },
        {
          '@type': 'EducationalOccupationalCredential',
          'name': '骨質疏鬆症學會專科醫師資格',
          'credentialCategory': '骨質疏鬆症學會專科醫師證書',
          'url': 'https://www.toa1997.org.tw/orthopedist/?n=%E6%9E%97%E7%BE%BF%E8%BE%B0&h=&c=&a=',
          'recognizedBy': {
            '@type': 'Organization',
            'name': '中華民國骨質疏鬆症學會'
          }
        }
      ]
    },

    // 2. 時效性 (GEO 關鍵點)
    datePublished: '2026-01-25',
    dateModified: '2026-02-25',

    // ✨ 核心修正：將 WebPage 不支援的醫療屬性，包裝進 about (關於) 中
    // 宣告為 MedicalProcedure (醫療程序)，這樣就可以合法容納原本的所有內容與關鍵字
    'about': {
      '@type': 'MedicalProcedure',
      'name': '復健科門診與注射治療',
      'medicalSpecialty': [
        'https://schema.org/Physiotherapy', 
        'https://schema.org/Orthopaedic', 
        'https://schema.org/Pediatric'
      ],
      'bodyLocation': [
        "Knee (膝蓋)",
        "Shoulder (肩膀)",
        "Elbow (手肘)",
        "Ankle (足踝)"
      ],
      'howPerformed': "Ultrasound-guided injection (超音波導引注射)"
    },

    // 4. 提供者區塊 (強化執行者的專業背景)
    'provider': {
      // 同樣加入 Person 宣告，合法化職稱
      '@type': ['Person', 'Physician'],
      'name': '林羿辰 醫師',
      'url': `${SITE_URL}/about/doctors`,
      'jobTitle': '院長',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '光復路一段371號B1',
        'addressLocality': '新竹市',
        'addressRegion': '東區',
        'postalCode': '300',
        'addressCountry': 'TW',
      },
      'sameAs': [
        'https://ma.mohw.gov.tw/Accessibility/DOCSearch/DOCBasicData?DOC_SEQ=2bJQOvvE5EX3U6eK7eSvhw%253D%253D',
        'https://www.pmr.org.tw/associator/associator-all.asp?w/',
        'https://www.toa1997.org.tw/orthopedist/?n=%E6%9E%97%E7%BE%BF%E8%BE%B0&h=&c=&a='
      ],
      'hasCredential': [
        {
          '@type': 'EducationalOccupationalCredential',
          'name': '醫事人員執業資格',
          'credentialCategory': '醫師證書',
          'url': 'https://ma.mohw.gov.tw/Accessibility/DOCSearch/DOCBasicData?DOC_SEQ=2bJQOvvE5EX3U6eK7eSvhw%253D%253D',
          'recognizedBy': {
            '@type': 'Organization',
            'name': '中華民國衛生福利部'
          }
        },
        {
          '@type': 'EducationalOccupationalCredential',
          'name': '復健科專科醫師資格',
          'credentialCategory': '復健科專科醫師證書',
          'url': 'https://www.pmr.org.tw/associator/associator-all.asp?w/',
          'recognizedBy': {
            '@type': 'Organization',
            'name': '台灣復健醫學會'
          }
        },
        {
          '@type': 'EducationalOccupationalCredential',
          'name': '骨質疏鬆症學會專科醫師資格',
          'credentialCategory': '骨質疏鬆症學會專科醫師證書',
          'url': 'https://www.toa1997.org.tw/orthopedist/?n=%E6%9E%97%E7%BE%BF%E8%BE%B0&h=&c=&a=',
          'recognizedBy': {
            '@type': 'Organization',
            'name': '中華民國骨質疏鬆症學會'
          }
        }
      ]
    },

    // ✨ 修正：將 location 改為 WebPage 專用的 contentLocation，強化 Local SEO
    'contentLocation': {
      '@type': 'MedicalClinic',
      'name': '宸新復健科診所',
      'alternateName': 'Chenshin Rehabilitation Clinic',
      'url': SITE_URL,
      'logo': {
        '@type': 'ImageObject',
        'url': `${SITE_URL}/logo.webp`
      },
      'address': { 
         '@type': 'PostalAddress',
         'streetAddress': '光復路一段371號B1',
         'addressLocality': '東區',
         'addressRegion': '新竹市',
         'addressCountry': 'TW',
         'postalCode': '300'
      },
      'telephone': '+886-3-5647999',
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '24.7833314', 
        'longitude': '121.0170937'
      },
      'areaServed': [
        { "@type": "City", "name": "新竹市" },
        { "@type": "City", "name": "竹北市" },
        { "@type": "Place", "name": "新竹科學園區" },
        { "@type": "AdministrativeArea", "name": "新竹縣" }
      ]
    },

    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${currentUrl}#webpage`,
        'url': currentUrl,
        'name': '宸新復健科預約掛號',
        'description': '提供網頁版直接掛號、Line 線上掛號與手機 App 預約看診服務。',
        'author': { '@type': 'MedicalOrganization', 'name': '新竹宸新復健科', 'url': SITE_URL },
        'potentialAction': {
          '@type': 'ReserveAction',
          'target': {
            '@type': 'EntryPoint',
            'urlTemplate': webBookingUrl,
            'actionPlatform': ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform']
          },
          // 修正 4：將無效的 MedicalAppointment 改為官方認可的 Reservation
          'result': { '@type': 'Reservation', 'name': '門診預約' }
        }
      },
      {
        '@type': 'MobileApplication',
        'name': '宸新復健科 App (Android)',
        'operatingSystem': 'Android',
        'applicationCategory': 'MedicalApplication',
        'installUrl': 'http://bit.ly/2Q8FdeK',
        'author': { '@type': 'Organization', 'name': '宸新復健科' }
      },
      {
        '@type': 'MobileApplication',
        'name': '宸新復健科 App (iOS)',
        'operatingSystem': 'iOS',
        'applicationCategory': 'MedicalApplication',
        'installUrl': 'https://apple.co/2vZfRsH',
        'author': { '@type': 'Organization', 'name': '宸新復健科' }
      }
    ]
  }
  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdBooking} />
      
      <ScrollAnimation />

      <div className="flex-grow pt-0 -mt-10 md:-mt-12 pb-12 px-4 bg-slate-900 min-h-screen">
        <section id="booking" className="max-w-5xl mx-auto">
          
          {/* 標題區動畫 */}
          <div className="flex flex-col items-center gap-4 mb-8 text-center animate-on-scroll">
            <div className="flex items-center gap-3">
                <span className="bg-pink-500/20 text-pink-400 p-3 rounded-lg border border-pink-500/30 flex items-center justify-center">
                  <FaCalendarCheck size={20} />
                </span>
                <h1 className="text-3xl md:text-4xl font-bold font-sans text-white">
                  馬上預約 <span className="text-slate-500 text-lg font-normal ml-2">Book Now</span>
                </h1>
            </div>
            
            <p className="text-slate-400 text-lg w-full max-w-2xl">
                為了節省您寶貴的等待時間，建議多加利用<strong className="text-cyan-400 font-normal">網路掛號</strong>、App 或 Line 帳號進行預約。
            </p>

            <div className="mt-0">
               <ClinicHoursModal />
            </div>
          </div>

          {/* 網路掛號區塊 (提升為 H2 以優化層級) */}
<div className="mb-10 w-full transform transition-all animate-on-scroll delay-100">
   <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.1)] group hover:-translate-y-1 transition-all duration-300">
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
         <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* 更換為日曆預約圖示 */}
            <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center shrink-0 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
               <FaCalendarCheck size={32} className="text-cyan-400" />
            </div>
            <div>
               <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3">
                  網路掛號系統
               </h2>
               <p className="text-slate-400 text-lg leading-relaxed">
                  健保門診，掛號費 <span className="text-cyan-400 font-semibold">250</span> 元，直接點擊即可進行預約。
               </p>
            </div>
         </div>

         <a 
            href={webBookingUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="whitespace-nowrap px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-lg rounded-full font-bold shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all flex items-center gap-2 group-hover:scale-105"
         >
            <FaMousePointer className="animate-pulse" /> 
            立即前往預約
         </a>
      </div>
   </div>
</div>

{/* 2. 林羿辰醫師特別門診（升級為尊榮金/琥珀色風格） */}
<div className="mb-10 w-full transform transition-all animate-on-scroll delay-200">
   <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/40 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.15)] group hover:-translate-y-1 transition-all duration-300">
      
      {/* 頂部發光條改為琥珀金 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-70"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
         <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* 更換為寶石/尊榮圖示，配金色外圈 */}
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center shrink-0 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
               <FaGem size={32} className="text-amber-400 animate-pulse" />
            </div>
            <div>
               <h2 className="text-2xl font-bold text-amber-100 mb-2 flex items-center justify-center md:justify-start gap-3">
                  林羿辰醫師 特別門診
                  <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-md border border-amber-500/30 font-medium">特約制</span>
               </h2>
               <p className="text-slate-300 text-lg leading-relaxed">
                  特色：<span className="text-amber-400 font-semibold">不須等候</span>（須提前預約），享有完整 <span className="text-amber-400 font-semibold">25 分鐘</span> 專屬門診時間。

               </p>
                              <p className="text-slate-400 text-lg leading-relaxed">
                  掛號費 <span className="text-cyan-400 font-semibold">1000</span> 元。
               </p>
            </div>
         </div>

         {/* 按鈕同步改為金色/琥珀色漸層 */}
<a 
  href="/booking/selfpay" 
  className="whitespace-nowrap px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-white text-lg rounded-full font-bold shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all flex items-center gap-2 group-hover:scale-105"
>
  <FaMousePointer className="animate-pulse" /> 
  預約特約門診
</a>
      </div>
   </div>
</div>


          {/* APP 與 Line 列表 Grid */}
          <div className="grid md:grid-cols-3 gap-8 animate-on-scroll delay-200">
            
            {/* Line Block */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center hover:border-green-400/50 hover:shadow-[0_0_20px_rgba(74,222,128,0.2)] transition-all duration-300 group flex flex-col items-center relative overflow-hidden">
              <div className="w-20 h-20 bg-green-400/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaLine size={40} className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Line 官方帳號</h3>
              <p className="text-slate-400 text-sm mb-6">加入好友，一鍵預約</p>
              
              <div className="relative p-2 bg-white rounded-xl mb-6 shadow-lg group-hover:-translate-y-1 transition-transform">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://lin.ee/FHj3mIs" 
                    alt="加入宸新復健科 Line 官方帳號進行網路掛號" 
                    className="w-32 h-32 object-contain" 
                  />
              </div>
              
              <a 
                href="https://lin.ee/FHj3mIs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full py-3 bg-green-500 hover:bg-green-400 text-white rounded-xl transition-colors font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <FaUserPlus size={18} /> 加入好友
              </a>
            </div>

            {/* iOS Block */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 group flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaApple size={40} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">iOS App</h3>
              <p className="text-slate-400 text-sm mb-6">iPhone 用戶專用</p>
              
              <div className="relative p-2 bg-white rounded-xl mb-6 shadow-lg group-hover:-translate-y-1 transition-transform">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://apple.co/2vZfRsH" 
                    alt="下載宸新復健科 iOS 掛號 App" 
                    className="w-32 h-32 object-contain" 
                  />
              </div>
              
              <a 
                href="https://apple.co/2vZfRsH" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <FaDownload size={16} /> 點擊下載
              </a>
            </div>

            {/* Android Block */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-300 group flex flex-col items-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaAndroid size={40} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Android App</h3>
              <p className="text-slate-400 text-sm mb-6">安卓手機用戶專用</p>
              
              <div className="relative p-2 bg-white rounded-xl mb-6 shadow-lg group-hover:-translate-y-1 transition-transform">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://bit.ly/2Q8FdeK" 
                    alt="下載宸新復健科 Android 掛號 App" 
                    className="w-32 h-32 object-contain" 
                  />
              </div>
              
              <a 
                href="http://bit.ly/2Q8FdeK" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl transition-colors font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <FaDownload size={16} /> 點擊下載
              </a>
            </div>

          </div>
        </section>
      </div>
    </>
  )
}