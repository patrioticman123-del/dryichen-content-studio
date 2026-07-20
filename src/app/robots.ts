import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dryichen.com.tw'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/booking/selfpay/doctor', // 🌟 新增：禁止搜尋引擎索引自費醫師後台系統
        '/api/',       // 1. 隱藏後端 API 路徑，增加安全性
        '/_next/',     // 2. 避免機器人去爬取 Next.js 的系統檔案（節省爬取配額）
        '/private/',   // 3. 既有的私密路徑
        '/*?*',        // 4. (選用) 避免爬取帶有搜尋參數的網址，防止重複內容 SEO 問題
      ],
    },
    // 使用變數確保 Sitemap 網址與主網域同步
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}