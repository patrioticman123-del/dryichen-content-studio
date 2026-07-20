// src/app/weight-bone/BMI/page.tsx
import WeightLossCalculator from '@/components/tools/WeightLossCalculator';
import { Metadata } from 'next';
import Link from 'next/link';

// 1. 強化 Metadata：鎖定高流量關鍵字 (BMI, BMR, 減重)
export const metadata: Metadata = {
  title: 'BMI計算機 & BMR基礎代謝率檢測 | 醫師專業減重評估 | 新竹宸新復健科',
  description: '想減肥卻卡關？輸入身高體重，立即計算 BMI、體脂肪率與每日總熱量消耗 (TDEE/BMR)。由林羿辰醫師親自設計，協助新竹/竹北民眾制定科學的增肌減脂計畫。',
  keywords: ['BMI計算', 'BMR計算', '基礎代謝率', '減重門診', '增肌減脂', '體脂肪計算', '新竹減肥', '竹北復健科', '林羿辰', '瘦身'],
  alternates: {
    canonical: 'https://www.dryichen.com.tw/weight-bone/BMI',
  },
  openGraph: {
    title: '我的代謝正常嗎？BMI與基礎代謝率線上檢測',
    description: '別再盲目節食！透過醫學公式計算您的代謝優勢，獲得醫師的專屬減重建議。',
    url: 'https://www.dryichen.com.tw/weight-bone/BMI',
    siteName: '新竹宸新復健科診所',
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function CalculatorPage() {
  // 2. 建構 SEO 結構化資料 (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": "https://www.dryichen.com.tw/weight-bone/BMI/#webpage",
        "url": "https://www.dryichen.com.tw/weight-bone/BMI",
        "name": "BMI與基礎代謝率(BMR)計算機",
        "description": "提供成人BMI數值計算、體位判定與基礎代謝率分析，作為體重管理之參考。",
        "author": {
          "@type": "Physician",
          "name": "林羿辰醫師",
          "url": "https://www.dryichen.com.tw/",
          "affiliation": {
            "@type": "MedicalOrganization",
            "name": "新竹宸新復健科診所",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Zhubei City",
              "addressRegion": "Hsinchu County",
              "addressCountry": "TW"
            }
          }
        },
        "audience": {
          "@type": "Patient",
          "audienceType": "People with Obesity",
          "healthCondition": {
            "@type": "MedicalCondition",
            "name": "Obesity"
          }
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "首頁",
                "item": "https://www.dryichen.com.tw/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "減重與骨齡門診",
                "item": "https://www.dryichen.com.tw/weight-bone"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "BMI代謝檢測",
                "item": "https://www.dryichen.com.tw/weight-bone/BMI"
            }
            ]
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300">
      
      {/* 3. 注入 JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-grow pt-0 -mt-10 md:-mt-12 pb-12 fade-in relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 返回按鈕 */}
          <div className="max-w-4xl mx-auto mb-6">
            <Link 
              href="/weight-bone" 
              className="text-cyan-400 hover:text-white flex items-center gap-2 w-fit transition-colors group"
              aria-label="返回減重與骨齡門診總覽"
            >
              <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i> 
              <span>返回減重與骨齡門診</span>
            </Link>
          </div>
          
          {/* 計算機組件 */}
          <WeightLossCalculator />

          {/* 4. 新增長篇衛教文章區塊 (SEO Content Strategy) */}
          <article className="max-w-4xl mx-auto mt-16 space-y-12">
            
            {/* 引言 */}
            <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-lg">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-cyan-500 rounded-full"></span>
                不僅僅是數字：醫師教你讀懂 BMI 與體脂密碼
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                在復健科門診中，我常聽到患者問：「林醫師，我BMI正常，為什麼看起來還是肉肉的？」或是「我體重沒變，為什麼腰圍變粗了？」
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                體重管理是一門科學，光看體重機上的數字是不夠的。透過上方的計算機，您已經得到了初步的數據，接下來，讓我們從醫學角度深入解析這些數字背後的健康意義，以及如何透過正確的飲食策略，達成真正的「增肌減脂」。
              </p>
            </section>

            {/* BMI 與 體脂率解析 */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold text-cyan-400">一、BMI 與體脂率：誰才是胖？</h3>
              <p className="text-slate-300 leading-relaxed">
                <strong>BMI (Body Mass Index)</strong> 是世界衛生組織推薦的初步篩檢工具，計算公式為「體重(kg) / 身高(m)²」。它能快速反映一個人的重量是否超出骨架負荷，但它有一個致命缺點：<strong>無法區分肌肉與脂肪</strong>。
              </p>
              <p className="text-slate-300 leading-relaxed">
                這就是為什麼許多健身教練 BMI 超標卻全是肌肉，而許多上班族 BMI 正常卻是「泡芙人（Skinny Fat）」——內臟脂肪過高，肌肉量不足，這反而對健康風險（如糖尿病、高血壓）有更高的隱憂。
              </p>
              
              <div className="overflow-x-auto my-6">
                <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-cyan-900/40 text-cyan-100">
                      <th className="p-4 font-semibold">成人數值標準</th>
                      <th className="p-4 font-semibold">BMI 範圍 (kg/m²)</th>
                      <th className="p-4 font-semibold">體脂率建議 (男性)</th>
                      <th className="p-4 font-semibold">體脂率建議 (女性)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 bg-slate-800">
                    <tr>
                      <td className="p-4 text-emerald-400 font-medium">體重過輕</td>
                      <td className="p-4 text-slate-300">&lt; 18.5</td>
                      <td className="p-4 text-slate-400" rowSpan={2}>14% - 20%<br/><span className="text-xs">(運動員可能更低)</span></td>
                      <td className="p-4 text-slate-400" rowSpan={2}>17% - 24%<br/><span className="text-xs">(維持荷爾蒙正常)</span></td>
                    </tr>
                    <tr>
                      <td className="p-4 text-emerald-400 font-medium">健康體位</td>
                      <td className="p-4 text-slate-300">18.5 - 24</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-amber-400 font-medium">體重過重</td>
                      <td className="p-4 text-slate-300">24 - 27</td>
                      <td className="p-4 text-slate-300">20% - 25%</td>
                      <td className="p-4 text-slate-300">25% - 30%</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-red-400 font-medium">輕度肥胖</td>
                      <td className="p-4 text-slate-300">27 - 30</td>
                      <td className="p-4 text-slate-300" rowSpan={3}>&gt; 25%<br/><span className="text-xs text-red-300">(需醫療介入)</span></td>
                      <td className="p-4 text-slate-300" rowSpan={3}>&gt; 30%<br/><span className="text-xs text-red-300">(需醫療介入)</span></td>
                    </tr>
                    <tr>
                      <td className="p-4 text-red-400 font-medium">中度肥胖</td>
                      <td className="p-4 text-slate-300">30 - 35</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-red-400 font-medium">重度肥胖</td>
                      <td className="p-4 text-slate-300">&gt; 35</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-slate-500 mt-2 text-right">資料來源：參考衛福部國健署成人肥胖定義</p>
              </div>
            </section>

            {/* BMR 與 TDEE */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold text-cyan-400">二、吃太少反而瘦不了？BMR 與 TDEE 的秘密</h3>
              <p className="text-slate-300 leading-relaxed">
                很多人減肥的第一步是「節食」，這在復健科醫師眼中是非常危險的策略。要理解原因，必須先搞懂兩個數據：
              </p>
              <ul className="list-none space-y-4">
                <li className="bg-slate-800 p-5 rounded-lg border-l-4 border-emerald-500">
                  <strong className="text-white text-lg block mb-1">BMR (基礎代謝率)</strong>
                  <span className="text-slate-400">這是你整天躺著不動，維持呼吸、心跳、器官運作所需的最低熱量。如果你攝取的熱量長期低於 BMR，身體會啟動「求生機制」，開始分解肌肉來獲取能量，並降低代謝率。結果就是：<strong>越吃越少，卻越來越難瘦，一恢復飲食馬上復胖。</strong></span>
                </li>
                <li className="bg-slate-800 p-5 rounded-lg border-l-4 border-blue-500">
                  <strong className="text-white text-lg block mb-1">TDEE (每日總熱量消耗)</strong>
                  <span className="text-slate-400">這才是你一天真正消耗的熱量，包含了 BMR + 活動量 + 運動消耗 + 消化食物的熱量。</span>
                </li>
              </ul>
              
              <div className="bg-slate-800/80 p-6 rounded-xl mt-4">
                <h4 className="text-lg font-bold text-white mb-3 text-center">🏆 醫師的熱量設定黃金法則</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-emerald-400 font-bold text-xl mb-1">減脂期</div>
                    <div className="text-sm text-slate-300">TDEE 減去 300~500卡</div>
                    <div className="text-xs text-slate-500 mt-1">(不可低於 BMR)</div>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-blue-400 font-bold text-xl mb-1">維持期</div>
                    <div className="text-sm text-slate-300">等於 TDEE</div>
                    <div className="text-xs text-slate-500 mt-1">(體重穩定)</div>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-purple-400 font-bold text-xl mb-1">增肌期</div>
                    <div className="text-sm text-slate-300">TDEE 加上 200~300卡</div>
                    <div className="text-xs text-slate-500 mt-1">(需配合重訓)</div>
                  </div>
                </div>
              </div>
            </section>

            {/* 營養素建議 */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold text-cyan-400">三、增肌減脂怎麼吃？三大營養素建議</h3>
              <p className="text-slate-300 leading-relaxed">
                控制總熱量只是第一步，<strong>「吃什麼」決定了你減去的是脂肪還是珍貴的肌肉</strong>。在宸新復健科，我們建議採用「高蛋白、適量碳水、好油脂」的策略。
              </p>

              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-drumstick-bite text-amber-500"></i> 蛋白質 (Protein)
                  </h4>
                  <p className="text-slate-400 mb-2 text-sm">肌肉修復與合成的關鍵原料，且飽足感最高。</p>
                  <ul className="space-y-2 text-slate-300 list-disc list-inside">
                    <li><strong className="text-white">一般人/久坐：</strong> 體重 × 1.0 公克</li>
                    <li><strong className="text-white">減脂期/輕度運動：</strong> 體重 × 1.2 ~ 1.5 公克</li>
                    <li><strong className="text-white">高強度重訓/增肌：</strong> 體重 × 1.6 ~ 2.0 公克</li>
                  </ul>
                  <div className="mt-3 p-3 bg-slate-800 rounded text-sm text-slate-400">
                    💡 舉例：60公斤想減脂的人，每天至少需攝取 60 × 1.5 = 90g 蛋白質 (約等於3隻大雞腿或12顆雞蛋的蛋白量)。
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-bowl-rice text-white"></i> 碳水化合物 (Carbs)
                  </h4>
                  <p className="text-slate-400 mb-2 text-sm">提供能量，但過量會轉化為體脂肪儲存。</p>
                  <ul className="space-y-2 text-slate-300 list-disc list-inside">
                    <li><strong className="text-white">減脂期：</strong> 建議控制在總熱量的 20-30% (低碳飲食)。</li>
                    <li><strong className="text-white">種類選擇：</strong> 優先選擇原型食物（地瓜、糙米、燕麥），避免精緻澱粉（麵包、白麵條、含糖飲料）。</li>
                    <li><strong className="text-white">時機：</strong> 集中在運動前後攝取，幫助肝醣回填，不易堆積脂肪。</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 實戰策略 */}
            <section className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">👨‍⚕️ 林醫師的日常飲食實戰心法：211 餐盤</h3>
              <p className="text-slate-300 mb-6">
                如果你覺得計算卡路里太麻煩，最簡單且有效的方法是執行<strong>「211 餐盤」</strong>法則。準備一個圓盤，將食物按照以下比例擺放：
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                 {/* 這裡使用 CSS 繪製一個示意圖，避免依賴外部圖片 */}
                 <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-slate-600 shadow-xl shrink-0">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-green-800/80 flex items-center justify-center text-green-100 font-bold">
                      <span className="translate-y-4">2份 蔬菜</span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-amber-900/80 flex items-center justify-center text-amber-100 font-bold">
                       <span className="-translate-y-4">1份 蛋白質</span>
                    </div>
                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-slate-200/20 flex items-center justify-center text-white font-bold">
                       <span className="-translate-y-4">1份 澱粉</span>
                    </div>
                 </div>
                 
                 <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold mt-1">50%</span>
                        <p className="text-slate-300"><strong>蔬菜佔 1/2：</strong>各種顏色的蔬菜，提供纖維與飽足感，穩定血糖。</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="bg-amber-600 text-white px-2 py-1 rounded text-xs font-bold mt-1">25%</span>
                        <p className="text-slate-300"><strong>蛋白質佔 1/4：</strong>豆魚蛋肉類，優先選擇白肉與植物性蛋白。</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="bg-slate-600 text-white px-2 py-1 rounded text-xs font-bold mt-1">25%</span>
                        <p className="text-slate-300"><strong>全穀澱粉佔 1/4：</strong>飯量減少，保留給高品質的五穀雜糧。</p>
                    </div>
                 </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                 <p className="text-slate-400 text-center italic">
                    「減重不是一場百米衝刺，而是一場馬拉松。找到一個你能長期維持的飲食方式，比短期激烈的節食更重要。」
                 </p>
                 <div className="mt-8 text-center">
                    <p className="text-lg text-cyan-300 font-semibold mb-4">數值計算出來異常，或遇到減重停滯期嗎？</p>
                    <Link 
                        href="/weight-bone/mounjaro"
                        className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-cyan-500/30"
                    >
                        了解減重新星-猛健樂
                    </Link>
                 </div>
              </div>
            </section>

          </article>
        </div>
      </main>
    </div>
  );
}