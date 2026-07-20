// src/app/weight-bone/calculator/page.tsx
import BoneAgeCalculator from '@/components/tools/BoneAgeCalculator';
import { Metadata } from 'next';
import Link from 'next/link';

// 1. 設定精準且豐富的 Metadata
export const metadata: Metadata = {
  title: '骨齡與遺傳身高預測計算機 - 線上免費檢測 | 新竹宸新復健科 | 林羿辰醫師',
  description: '擔心孩子長不高？輸入骨齡與父母身高，透過台灣常模大數據，科學預測成年潛力身高。由林羿辰醫師設計，協助新竹/竹北家長判斷是否需醫療介入轉骨治療。',
  keywords: ['骨齡計算', '預測身高', '遺傳身高', '性早熟', '生長板', '兒童長高', '新竹轉骨', '竹北復健科', '林羿辰', '生長激素'],
  alternates: {
    canonical: 'https://www.dryichen.com.tw/weight-bone/calculator',
  },
  openGraph: {
    title: '我的孩子將來會多高？骨齡與身高預測計算機',
    description: '別錯過長高黃金期！輸入數據，立即獲得林醫師的專業分析與落點預測。',
    url: 'https://www.dryichen.com.tw/weight-bone/calculator',
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
        "@id": "https://www.dryichen.com.tw/weight-bone/calculator/#webpage",
        "url": "https://www.dryichen.com.tw/weight-bone/calculator",
        "name": "骨齡與遺傳身高預測計算機",
        "description": "提供家長線上計算兒童骨齡對應之成年身高預測，並評估生長發育落點。",
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
          "audienceType": "Parents",
          "healthCondition": {
            "@type": "MedicalCondition",
            "name": "Growth Disorders"
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
                "name": "骨齡預測計算機",
                "item": "https://www.dryichen.com.tw/weight-bone/calculator"
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
          <BoneAgeCalculator />

          {/* 4. 新增長篇專業衛教文章區塊 (SEO Content Strategy) */}
          <article className="max-w-4xl mx-auto mt-16 space-y-12">
            
            {/* 核心觀念：骨齡與生長板 */}
            <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-lg">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-cyan-500 rounded-full"></span>
                決定身高的關鍵密碼：骨齡 (Bone Age)
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                使用完上方的計算機後，您可能會對結果感到驚喜或焦慮。但在解讀數字之前，我們必須先理解「骨齡」的醫學意義。
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                人的年齡有兩種：一種是身分證上的「日曆年齡」，另一種則是身體發育的真實進度，也就是<strong>「生物年齡（骨齡）」</strong>。在復健科與小兒內分泌科，我們會透過左手手掌的 X 光片，觀察生長板（Growth Plate）的閉合程度來判斷。
              </p>
              <div className="bg-slate-900/50 p-6 rounded-xl border-l-4 border-cyan-400">
                <h4 className="text-xl font-bold text-white mb-2">什麼是生長板？</h4>
                <p className="text-slate-400">
                  生長板是位於骨頭兩端的軟骨組織，它是長高的「工廠」。隨著青春期荷爾蒙的分泌，生長板會逐漸鈣化、變硬，最後完全閉合。一旦閉合，骨頭就不會再變長，身高也就此定型。
                </p>
              </div>
            </section>

            {/* 預測結果的正確解讀 */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold text-cyan-400">一、預測身高 ≠ 最終命運：這只是一份「現況報告」</h3>
              <p className="text-slate-300 leading-relaxed">
                這是家長最常誤解的地方。計算機跑出來的「預測成年身高」，<strong>並不是算命，而是一種科學推估</strong>。
              </p>
              <p className="text-slate-300 leading-relaxed">
                它的邏輯是：「如果孩子<strong>從今天開始</strong>，維持跟現在一樣的飲食、一樣的睡眠習慣、一樣的運動量（或缺乏運動），且荷爾蒙分泌沒有劇烈變化，那麼他長大後『大概』會長到這個高度。」
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="bg-red-900/10 border border-red-900/30 p-6 rounded-lg">
                  <h4 className="text-red-400 font-bold text-lg mb-2"><i className="fa-solid fa-triangle-exclamation"></i> 負面變數 (會變矮)</h4>
                  <ul className="list-disc list-inside text-slate-400 space-y-2">
                    <li>長期熬夜 (錯過生長激素分泌高峰)</li>
                    <li>攝取過多精緻糖 (抑制生長激素)</li>
                    <li>缺乏跳躍性運動</li>
                    <li>性早熟 (生長板提早關閉)</li>
                  </ul>
                </div>
                <div className="bg-emerald-900/10 border border-emerald-900/30 p-6 rounded-lg">
                  <h4 className="text-emerald-400 font-bold text-lg mb-2"><i className="fa-solid fa-arrow-trend-up"></i> 正向變數 (會變高)</h4>
                  <ul className="list-disc list-inside text-slate-400 space-y-2">
                    <li>充足且深層的睡眠</li>
                    <li>高蛋白飲食與鈣質補充</li>
                    <li>規律的抗阻力與跳躍運動</li>
                    <li>適時的醫療介入 (如抑制針/生長激素)</li>
                  </ul>
                </div>
              </div>
              <p className="text-slate-200 font-medium mt-4">
                換句話說，如果算出來的預測身高不理想，這反而是好消息——因為我們現在發現了，還有時間透過後天努力來改變這條曲線！
              </p>
            </section>

            {/* 遺傳身高 vs 預測身高 */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold text-cyan-400">二、遺傳身高 vs. 預測身高：差距多少要注意？</h3>
              <p className="text-slate-300 leading-relaxed">
                計算機中另一個重要的數值是<strong>「遺傳身高 (Target Height)」</strong>，這是由爸爸媽媽的身高基因決定的「基本盤」。我們可以透過比較這兩個數值，來判斷孩子的生長狀況：
              </p>

              <div className="overflow-x-auto my-6">
                <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-cyan-900/40 text-cyan-100">
                      <th className="p-4 font-semibold w-1/3">比較情境</th>
                      <th className="p-4 font-semibold">林醫師的臨床解讀與建議</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 bg-slate-800">
                    <tr>
                      <td className="p-4 text-emerald-400 font-bold">預測身高 &gt; 遺傳身高 超過5公分</td>
                      <td className="p-4 text-slate-300">
                        <strong className="text-emerald-400 block mb-1">表現優異！</strong>
                        孩子的後天營養與生活作息良好，成功突破了基因限制。請繼續保持目前的模式。
                        <br/><span className="text-xs text-slate-500">(例外：若是因為骨齡大幅超前導致的暫時性高個子，需警惕性早熟)</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 text-slate-300 font-bold">預測身高 ≈ 遺傳身高</td>
                      <td className="p-4 text-slate-300">
                        <strong className="text-blue-400 block mb-1">符合預期</strong>
                        孩子正常發揮了基因潛力。若對身高不滿意，這時就是介入的最佳時機，透過運動與營養衝刺，爭取額外的 3-5 公分。
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 text-red-400 font-bold">預測身高 &lt; 遺傳身高 超過5公分</td>
                      <td className="p-4 text-slate-300">
                        <strong className="text-red-400 block mb-1">潛力未發揮 (警訊)</strong>
                        代表孩子的生長受到阻礙，可能是營養吸收不良、長期睡眠不足、慢性過敏，或是骨齡異常超前導致生長板即將提早關閉。
                        <br/><strong className="text-white mt-2 inline-block">➜ 建議盡快至復健科或小兒內分泌科評估。</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 後天努力策略 */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold text-cyan-400">三、還想再長高？後天逆轉的三大關鍵</h3>
              <p className="text-slate-300 leading-relaxed">
                醫學研究顯示，雖然遺傳佔了 70%，但剩下的 30% 後天環境，足以影響最終身高達 5-10 公分。想把握最後的生長板衝刺期，請落實以下三點：
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-4">
                {/* 睡眠 */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-colors">
                  <div className="w-12 h-12 bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-400 text-xl mb-4">
                    <i className="fa-solid fa-moon"></i>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">深度睡眠</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    生長激素在熟睡後會大量分泌（約晚上 10 點至凌晨 2 點）。
                    <br/><br/>
                    <strong>目標：</strong> 小學生 9:30 就寢，國中生 10:30 就寢，睡滿 8-9 小時。
                  </p>
                </div>

                {/* 營養 */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 transition-colors">
                  <div className="w-12 h-12 bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-400 text-xl mb-4">
                    <i className="fa-solid fa-utensils"></i>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">精準營養</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    長高需要原料，尤其是蛋白質與鈣質。同時要避開「生長抑制劑」——含糖飲料。
                    <br/><br/>
                    <strong>目標：</strong> 每天兩杯牛奶/豆漿，每餐掌心大肉類，完全戒除手搖飲。
                  </p>
                </div>

                {/* 運動 */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-amber-500 transition-colors">
                  <div className="w-12 h-12 bg-amber-900/50 rounded-full flex items-center justify-center text-amber-400 text-xl mb-4">
                    <i className="fa-solid fa-person-running"></i>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">垂直運動</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    垂直地面的衝擊力能刺激生長板細胞增生。
                    <br/><br/>
                    <strong>目標：</strong> 每天跳繩 500-1000 下，或打籃球、排球 30 分鐘。單純游泳對長高幫助較小。
                  </p>
                </div>
              </div>
            </section>

            {/* 結語與 CTA */}
            <section className="bg-gradient-to-r from-cyan-900/40 to-slate-900 p-8 rounded-2xl border border-cyan-800/30 text-center mt-12">
              <h4 className="text-2xl font-bold text-white mb-4">您的孩子還有多少成長空間？</h4>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                如果計算出的預測身高不理想，或者不知道骨齡是幾歲，建議您帶著孩子來一趟宸新復健科。我們會透過精密的骨齡檢測與個別化評估，為孩子爭取最後的黃金生長期。
              </p>
              <Link 
                  href="/weight-bone/bone-age"
                  className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-cyan-500/30"
              >
                  預約兒童成長門診
              </Link>
            </section>

          </article>
        </div>
      </main>
    </div>
  );
}