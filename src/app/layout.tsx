// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script' // ✨ 新增：引入 Next.js 內建的 Script 組件
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dryichen.com.tw').trim();

export const viewport: Viewport = {
  themeColor: '#0d9488', // 🌟 已修改：將全站主題顏色調整為要求的 #0d9488
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// ==========================================
// 1. 全站 Metadata 配置
// ==========================================
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: '/manifest.json', // 🌟 新增：由 Next.js 自動生成 <link rel="manifest" href="/manifest.json" />
  title: {
    // 當子頁面沒有設定 title 時顯示的預設標題
    default: '新竹宸新復健科診所 - 骨科/復健/兒童早療推薦 | 林羿辰醫師',
    // 子頁面標題的模板：%s 會被子頁面的 title 取代
    // 重要：請確保所有子頁面 page.tsx 內的 title 不要再包含「 | 新竹宸新復健科」
    template: '%s'
  },
  description: '新竹推薦復健科，由台大醫師林羿辰院長親自看診。提供高解析超音波導引PRP注射、聚焦式震波治療、徒手物理治療與兒童骨齡生長評補。',
  keywords: ['新竹復健科', '新竹骨科', '林羿辰醫師', 'PRP注射', '震波治療', '兒童早療', '新竹物理治療', '竹科復健推薦'],
  
  verification: {
    google: null, 
  },
  formatDetection: {
    telephone: false,
  },
  alternates: {
    // 修正：首頁使用絕對路徑以利 SEO
    canonical: SITE_URL,
  },
  
  // ✨ 全站地理位置標記 (Local SEO 核心)
  other: {
    'geo.region': 'TW-HCH',
    'geo.placename': '新竹市',
  },

  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: SITE_URL,
    siteName: '新竹宸新復健科診所',
    title: '新竹宸新復健科診所 - 骨科/復健/兒童早療推薦',
    description: '新竹推薦復健科，由台大醫師林羿辰院長親自看診。提供高解析超音波導引PRP注射、聚焦式震波治療與兒童早療評估。',
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: '新竹宸新復健科診所 - 林羿辰醫師',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '新竹宸新復健科診所 - 林羿辰醫師',
    description: '專業 PRP 注射、震波治療與兒童早療評估。',
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// ==========================================
// 2. Root Layout 組件
// ==========================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 診所結構化數據 (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: '新竹宸新復健科診所',
    alternateName: 'Chenxin Rehabilitation Clinic',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    image: `${SITE_URL}/images/og-default.jpg`,
    description: '新竹推薦復健科，提供專業 PRP、震波治療與兒童早療評估。',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '新竹市', 
      addressRegion: 'TW',
      postalCode: '300',
      streetAddress: '東區光復路一段371號B1',
    },
    telephone: '+886-3-564-7999', 
    priceRange: '$$',
    openingHours: [
      'Mo,Tu,We,Th,Fr 08:00-21:00',
      'Sa 08:00-18:00'
    ], 
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '24.7833314', 
      longitude: '121.0170937'
    }
  };

  return (
    <html lang="zh-TW" className="scroll-smooth">
      <head>
        {/* 結構化數據 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* 外部資源預連接 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        
        {/* 全域樣式補強 */}
        <style>{`
          img { height: auto; }
          h1 { font-size: 2.25rem; }
          section h1, article h1, nav h1, aside h1 { font-size: 2.25rem; }
        `}</style>
      </head>
      
      <body className={`${inter.className} bg-slate-900 text-slate-300 antialiased min-h-screen flex flex-col`}>
        {/* ✨ 將 Google Analytics 移至 body 內，確保 Next.js 順利執行 Script 組件 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GCXZ5W7NS2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GCXZ5W7NS2');
          `}
        </Script>

        <Navigation />
        <main className="flex-grow pt-14 md:pt-20">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}