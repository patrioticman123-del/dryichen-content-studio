import { Metadata } from 'next';
import GrowthNutritionCalculator from '@/components/tools/GrowthNutritionGuide';

export const metadata: Metadata = {
  title: '兒童長高營養指南 - 客製化飲食建議與食譜 | 新竹宸新復健科',
  description: '由林羿辰醫師親自設計。針對 1-18 歲兒童，依據衛福部 DRIs 提供蛋白質、鈣質精準攝取建議，並附上醫師推薦的長高食譜與轉骨營養知識。',
  keywords: ['兒童長高', '骨齡', '轉骨湯', '長高食譜', '兒童營養計算', '新竹復健科', '林羿辰醫師', '性早熟飲食'],
  openGraph: {
    title: '兒童長高吃什麼？林醫師的客製化營養指南',
    description: '輸入年齡與性別，立即獲得專屬的蛋白質與鈣質攝取目標，還有 8 道美味長高食譜！',
    url: 'https://www.dryichen.com.tw/weight-bone/nutrition',
    siteName: '新竹宸新復健科診所',
    locale: 'zh_TW',
    type: 'website',
    images: [{ url: 'https://www.dryichen.com.tw/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function NutritionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "name": "兒童長高營養指南",
        "author": {
        "@type": "Physician",
        "name": "林羿辰醫師",
        "affiliation": {
          "@type": "MedicalOrganization",
          "name": "新竹宸新復健科診所",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "光復路一段371號B1",
            "addressLocality": "新竹市",
            "addressRegion": "東區",
            "postalCode": "300",
            "addressCountry": "TW"
          },
          "url": "https://www.dryichen.com.tw"
        }
      }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "喝牛奶真的能長高嗎？", "acceptedAnswer": { "@type": "Answer", "text": "牛奶是優質鈣質來源，能增加骨骼硬度。但長高需要生長激素分泌帶動生長板分裂，這需要優質蛋白質與深度睡眠。建議牛奶搭配充足蛋白質，效果才顯著。" } },
          { "@type": "Question", "name": "孩子幾點睡覺對長高最有效？", "acceptedAnswer": { "@type": "Answer", "text": "生長激素分泌高峰在夜間 10 點到凌晨 2 點。建議孩子在晚上 9:30 前準備入睡，確保 10 點進入深層睡眠狀態。" } },
          { "@type": "Question", "name": "如果不愛吃肉，蛋白質不夠怎麼辦？", "acceptedAnswer": { "@type": "Answer", "text": "毛豆、豆腐、無糖豆漿是極佳的植物蛋白來源。雞蛋則是生物價最高的蛋白，早餐一顆蛋配一杯豆漿即是很好的成長組合。" } }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-grow pt-0 -mt-10 md:-mt-12 pb-12 fade-in relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-6">
            <a href="/weight-bone" className="text-cyan-400 hover:text-white flex items-center gap-2 w-fit transition-colors group">
              <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i> 返回減重與骨齡門診
            </a>
          </div>

          {/* 工具主體 (Client Component)：內含計算機、衛教、8道食譜與過濾功能 */}
          <GrowthNutritionCalculator />

          {/* 常見問題 FAQ (Static Content for SEO) */}
          <section aria-label="長高常見問題" className="mt-12 bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-lg text-slate-100">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <i className="fa-regular fa-circle-question text-cyan-400 mr-4"></i>
              醫師解答：關於長高的常見疑問 FAQ
            </h2>
            <div className="grid gap-6">
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-cyan-300 mb-3">喝牛奶真的能長高嗎？</h3>
                <p className="text-slate-300 leading-relaxed text-lg">牛奶是優質鈣質來源，能增加骨骼硬度。但長高需要生長激素分泌帶動生長板分裂，這需要優質蛋白質與深度睡眠。牛奶應視為營養拼圖的一塊，而非全部。</p>
              </div>
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-cyan-300 mb-3">孩子幾點睡覺對長高最有效？</h3>
                <p className="text-slate-300 leading-relaxed text-lg">生長激素分泌高峰在夜間 10 點到凌晨 2 點。建議孩子在晚上 9:30 前準備入睡，確保在高峰期處於深層睡眠狀態，這是目前醫學證實最自然有效的長高方式。</p>
              </div>
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-cyan-300 mb-3">如果不愛吃肉，蛋白質不夠怎麼辦？</h3>
                <p className="text-slate-300 leading-relaxed text-lg">可選擇植物性完全蛋白，如毛豆、豆腐、藜麥。雞蛋也是生物價極高的來源，早餐一顆蛋配一杯豆漿即是很好的成長組合。</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}