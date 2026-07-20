// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { newsList } from '@/data/news' 
import { casesData } from '@/data/cases'
// 提醒：這裡假設你在 treatments.ts、weightLoss.ts、facilities.ts 最後有正確 export 對應變數
import { treatmentsList } from '@/data/treatments' 
import { weightLossPrograms } from '@/data/weightLoss'
import { facilitiesData } from '@/data/facilities'
import { diseaseCategories } from '@/data/diseases' // ✨ 修正匯入名稱

// 設定快取 24 小時 (單位：秒)
export const revalidate = 86400

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dryichen.com.tw'

// ✨ 安全解析日期的工具函式，避免產生 Invalid Date 導致 Sitemap 報錯
function safeDate(dateStr?: string, fallbackStr?: string): Date {
  if (dateStr) {
    const d = new Date(dateStr)
    if (!isNaN(d.getTime())) return d
  }
  if (fallbackStr) {
    const d = new Date(fallbackStr)
    if (!isNaN(d.getTime())) return d
  }
  return new Date() // 若資料庫忘記填日期，預設使用專案部署的當下時間
}

export default function sitemap(): MetadataRoute.Sitemap {
  const buildTime = new Date()

  // 1. 固定靜態頁面 (已包含 weight-bone 的核心分類導覽頁)
  const staticRoutes = [
    '',
    '/about',
    '/about/doctors',
    '/about/clinic',
    '/about/news',
    '/about/cases',
    '/treatments',
    '/diseases',
    '/weight-bone',
    '/weight-bone/BMI',
    '/weight-bone/child',
    '/weight-bone/calculator',
    '/weight-bone/nutrition',
    '/booking',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: buildTime,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 2. 動態文章頁面 (News) -> 這才是所有衛教文章真正要被 Google 索引的「正宮網址」
  const newsRoutes = newsList.map((post) => ({
    url: `${SITE_URL}/about/news/${post.id}`,
    // 優先使用 lastModified，若無則使用發布日期 date
    lastModified: safeDate(post.lastModified, post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 3. 動態案例頁面 (Cases)
  const casesRoutes = casesData.map((post) => ({
    url: `${SITE_URL}/about/cases/${post.id}`,
    // 根據您提供的 CaseStudy 介面，目前只有 date，這裡幫你保留彈性
    lastModified: safeDate((post as any).lastModified, post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 4. 動態治療項目 (Treatments)
  const treatmentRoutes = treatmentsList.map((t) => ({
    url: `${SITE_URL}/treatments/${t.slug}`,
    lastModified: safeDate(t.lastModified),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 5. 動態疾病衛教 (Diseases)
  // 5-1. 分類頁面
  const diseaseCategoryRoutes = diseaseCategories.map((c) => ({
    url: `${SITE_URL}/diseases/${c.slug}`,
    lastModified: safeDate(c.lastModified),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 5-2. 疾病單頁
  const diseaseDetailRoutes = diseaseCategories.flatMap(c => 
    c.diseases.map(d => ({
      url: `${SITE_URL}/diseases/${c.slug}/${d.slug}`,
      lastModified: safeDate(d.lastModified),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  )

// 6. 減重與骨齡項目 (✨ 採用方法 A 強化過濾)
  const weightRoutes = weightLossPrograms
    .map((p) => ({
      url: `${SITE_URL}/weight-bone/${p.slug}`,
      lastModified: safeDate(p.lastModified),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }))
    // ✨ 核心修正：精確過濾掉 /weight-bone/sports-injuries/ 後面的所有子資料網址，以及其他重複的文章分類路徑
    .filter((route) => {
      const is分身網址 = 
        route.url.includes('/weight-bone/sports-injuries/') || 
        route.url.includes('/nutrition/') || 
        route.url.includes('/diary/') || 
        route.url.includes('/problem/') || 
        route.url.includes('/medical-updates/');
      return !is分身網址;
    })

  // 7. 診所設備 (Facilities)
  const facilityRoutes = facilitiesData.map((f) => ({
    url: `${SITE_URL}/about/clinic/${f.id}`,
    // 根據 FacilityMetadata 介面，其實是有 lastModified 欄位的
    lastModified: safeDate(f.lastModified),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...newsRoutes,
    ...casesRoutes,
    ...treatmentRoutes,
    ...diseaseCategoryRoutes,
    ...diseaseDetailRoutes,
    ...weightRoutes,
    ...facilityRoutes,
  ]
}