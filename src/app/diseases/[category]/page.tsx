// src/app/diseases/[category]/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { diseaseCategories } from '@/data/diseases'
import JsonLd from '@/components/JsonLd'
import ScrollAnimation from '@/components/ScrollAnimation'

// 定義常數
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dryichen.com.tw').trim()

interface PageProps {
  params: {
    category: string
  }
}

// 1. 動態產生 Metadata (優化 Title 並加入 Geo 標籤)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = diseaseCategories.find((c) => c.slug === params.category)

  if (!category) {
    return { title: '找不到分類' }
  }

  const ogImage = category.image || '/images/default-og.jpg'
  const canonicalUrl = `${SITE_URL}/diseases/${params.category}`

  return {
    metadataBase: new URL(SITE_URL),
    
    // 修正：移除後綴診所名，避免與 layout.tsx 模板疊加
    title: `${category.title} - 症狀與治療介紹 | 新竹宸新復健科`,
    description: `新竹宸新復健科提供${category.title}相關的疾病衛教，包含：${category.diseases.map(d => d.title).join('、')}等常見症狀與治療方式。`,
    keywords: [`${category.title}`, '新竹骨科', '新竹復健', '宸新復健科', ...category.diseases.map(d => d.title)],
    
    alternates: {
      canonical: canonicalUrl,
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

    openGraph: {
      title: `${category.title} - 症狀與治療介紹 | 新竹宸新復健科`,
      description: category.description,
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: category.title }],
      type: 'website',
      siteName: '新竹宸新復健科診所',
    },
    // 加入在地化 Geo 標記
    other: {
      'geo.region': 'TW-HCH',
      'geo.placename': '新竹市',
    }
  }
}

// 2. 靜態路徑生成 (SSG)
export async function generateStaticParams() {
  return diseaseCategories.map((category) => ({
    category: category.slug,
  }))
}

export default function DiseaseCategoryPage({ params }: PageProps) {
  const category = diseaseCategories.find((c) => c.slug === params.category)

  if (!category) {
    notFound()
  }

  const currentUrl = `${SITE_URL}/diseases/${category.slug}`

  // Schema 1: 麵包屑
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首頁', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '疾病衛教', item: `${SITE_URL}/diseases` },
      { '@type': 'ListItem', position: 3, name: category.title, item: currentUrl },
    ],
  }

  // Schema 2: 醫療列表頁面
  const jsonLdCategory = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${currentUrl}#webpage`,
    name: `${category.title} - 症狀與治療介紹`,
    description: category.description,
    url: currentUrl,
    author: {
        '@type': 'MedicalOrganization',
        name: '新竹宸新復健科',
        url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: category.diseases.map((disease, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${currentUrl}/${disease.slug}`,
        name: disease.title
      }))
    }
  }

  return (
    <>
      <JsonLd data={jsonLdBreadcrumb} />
      <JsonLd data={jsonLdCategory} />

      <ScrollAnimation />

      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300">

        <main className="flex-grow pt-0 -mt-10 md:-mt-12 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header 區塊 */}
            <div className="mb-10 animate-on-scroll">
              <Link
                href="/diseases"
                // ✨ 依照建議修改：拔除 prefetch={false}，回歸純靜態秒開體感
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-2 transition-colors group text-sm font-medium"
              >
                <i className="fa-solid fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
                返回所有部位
              </Link>

              <div className="border-b border-slate-700 pb-6 text-center">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold font-sans text-white tracking-wide mb-3">
                  {category.description}
                  </h1>
                </div>
              </div>
            </div>

            {/* 疾病卡片列表 */}
            {category.diseases.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 animate-on-scroll delay-100">
                {category.diseases.map((disease) => (
                  <Link
                    key={disease.slug}
                    href={`/diseases/${category.slug}/${disease.slug}`}
                    // ✨ 依照建議修改：拔除 prefetch={false}，解凍背景預載以達到無縫切換
                    className="group bg-slate-800/40 backdrop-blur border border-slate-700/80 rounded-2xl overflow-hidden hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 flex flex-col h-full"
                  >
                    {/* 1. 圖片區塊 (優化 Alt) */}
                    <div className="h-56 overflow-hidden relative bg-slate-900">
                      {disease.images && disease.images.length > 0 ? (
                        <img
                          src={disease.images[0].src}
                          alt={`新竹復健科：${disease.title}專業治療與復健建議`}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full relative">
                          <img
                            src={category.image || '/images/default-medical.webp'}
                            alt={`新竹復健科：${category.title}相關病症衛教`}
                            className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-500 transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <i className="fa-solid fa-notes-medical text-4xl text-slate-600 group-hover:text-cyan-400/80 transition-colors"></i>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                      <div className="absolute bottom-0 left-0 p-6 w-full">
                        {/* H2 應用於特定疾病列表標題 */}
                        <h2 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors drop-shadow-md">
                          {disease.title}
                        </h2>
                      </div>
                    </div>

                    {/* 2. 內容區塊 */}
                    <div className="p-6 pt-4 flex flex-col flex-grow border-t border-slate-700/50">
                      {disease.symptoms && disease.symptoms.length > 0 && (
                        <div className="hidden md:flex flex-wrap gap-1.5 mb-4">
                          {disease.symptoms.slice(0, 3).map((symptom, idx) => (
                            <span key={idx} className="text-[11px] font-medium bg-slate-700/50 text-cyan-200/80 px-2 py-1 rounded-md border border-slate-600/50">
                              #{symptom}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-slate-400 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                        {disease.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-slate-700/50 flex justify-between items-center text-sm">
                        <span className="text-slate-500 group-hover:text-slate-400 transition-colors">
                          閱讀衛教
                        </span>
                        <span className="flex items-center text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                          詳細內容 <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              // 空狀態處理
              <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700 animate-on-scroll delay-100">
                <i className="fa-solid fa-folder-open text-4xl text-slate-600 mb-4"></i>
                <p className="text-slate-400">目前此分類尚無文章，資料陸續更新中。</p>
              </div>
            )}

            {/* 底部導航區 (優化：加入 H2 補強層級) */}
            <div className="text-center border-t border-slate-800 pt-12 animate-on-scroll delay-200">
              <h2 className="sr-only">探索其他部位的骨科復健衛教與治療資訊</h2>
              <p className="text-slate-500 mb-6">想了解其他部位的不適症狀嗎？</p>
              <Link
                href="/diseases"
                // ✨ 依照建議修改：移除 prefetch={false} 屬性
                className="inline-flex items-center px-8 py-3 bg-slate-800 text-slate-300 rounded-full border border-slate-700 hover:bg-cyan-900/20 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 shadow-lg"
              >
                <i className="fa-solid fa-table-cells-large mr-3"></i>
                查看所有疾病衛教
              </Link>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}