// src/app/weight-bone/child/page.tsx
import GrowthAnalysisMRI from '@/components/tools/GrowthAnalysisMRI';
import { Metadata } from 'next';
import Link from 'next/link';

// 1. 豐富 Metadata：針對「生長曲線」與「發育評估」設定關鍵字
export const metadata: Metadata = {
  title: '兒童生長曲線評估儀 - 檢查身高體重百分位 | 新竹宸新復健科 | 林羿辰醫師',
  description: '孩子太矮還是太胖？輸入身高體重，透過台灣最新兒童常模，立即計算生長百分位(PR值)。由林羿辰醫師設計，協助新竹/竹北家長篩檢生長遲緩或性早熟風險。',
  keywords: ['兒童生長曲線', '身高百分位', '生長遲緩', '性早熟', '兒童肥胖', '新竹轉骨', '竹北復健科', '林羿辰', '生長激素', '骨齡檢查'],
  alternates: {
    canonical: 'https://www.dryichen.com.tw/weight-bone/child',
  },
  openGraph: {
    title: '我的孩子發育正常嗎？兒童生長曲線線上檢測',
    description: '別讓孩子輸在起跑點！輸入數據，立即獲得醫師專業的落點分析與建議。',
    url: 'https://www.dryichen.com.tw/weight-bone/child',
    siteName: '新竹宸新復健科診所',
    locale: 'zh_TW',
    type: 'website',
  },
};

export default function GrowthAnalysisPage() {
  // 2. 建構 SEO 結構化資料 (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": "https://www.dryichen.com.tw/weight-bone/child/#webpage",
        "url": "https://www.dryichen.com.tw/weight-bone/child",
        "name": "兒童生長曲線評估儀 - 身高體重百分位計算",
        "description": "線上計算兒童生長百分位，評估發育落點是否符合台灣常模標準。",
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
            "name": "Child Development"
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
                "name": "生長曲線評估",
                "item": "https://www.dryichen.com.tw/weight-bone/child"
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
          
          {/* 生長曲線計算工具 */}
          <GrowthAnalysisMRI />

          {/* 4. 新增長篇專業衛教文章區塊 (SEO Content Strategy) */}
          <article className="max-w-4xl mx-auto mt-16 space-y-12">
            
            {/* 引言與文獻依據 */}
            <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 shadow-lg">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-cyan-500 rounded-full"></span>
                家長必讀：如何解讀兒童生長曲線？
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                當您使用上方的工具計算出孩子的百分位後，這些數字究竟代表什麼意義？
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                本工具的運算核心，是依據台灣最具權威的學術研究——由 <strong>Chen W & Chang MH</strong> 發表於 <em>Pediatrics & Neonatology (2010)</em> 的論文。該研究採集了大量台灣本土兒童與青少年的數據，制定出符合台灣人基因與環境的生長常模，這也是目前國內小兒科與復健科醫師臨床評估的黃金標準。
              </p>
            </section>

            {/* 百分位 (PR值) 深度解析 */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold text-cyan-400">一、什麼是 PR 值 (百分位)？</h3>
              <p className="text-slate-300 leading-relaxed">
                所謂的「生長百分位」 (Percentile, PR)，是將 100 位同年齡、同性別的孩子由小到大排列。
              </p>
              <ul className="grid gap-4 md:grid-cols-2 mt-4">
                <li className="bg-slate-800 p-5 rounded-lg border-l-4 border-cyan-500">
                  <strong className="text-white text-lg block mb-1">PR 50 (第50百分位)</strong>
                  <span className="text-slate-400">代表最中間的平均值，表示孩子的發育剛剛好，位於正中央。</span>
                </li>
                <li className="bg-slate-800 p-5 rounded-lg border-l-4 border-emerald-500">
                  <strong className="text-white text-lg block mb-1">PR 85 (第85百分位)</strong>
                  <span className="text-slate-400">代表孩子贏過 85% 的同齡人，屬於較高大的族群。</span>
                </li>
                <li className="bg-slate-800 p-5 rounded-lg border-l-4 border-amber-500">
                  <strong className="text-white text-lg block mb-1">PR 3 (第3百分位)</strong>
                  <span className="text-slate-400">這是一個關鍵警戒線。代表在100個孩子中，他是最小的那3個之一，可能需要評估生長遲緩。</span>
                </li>
                <li className="bg-slate-800 p-5 rounded-lg border-l-4 border-red-500">
                  <strong className="text-white text-lg block mb-1">PR 97 (第97百分位)</strong>
                  <span className="text-slate-400">這也是警戒線。若是身高，代表極度高大；若是體重，則代表可能過度肥胖。</span>
                </li>
              </ul>
            </section>

            {/* 警示區間表格 */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold text-cyan-400">二、身高與體重的常態分佈：落點在哪裡要注意？</h3>
              <p className="text-slate-300 leading-relaxed">
                根據 <em>Pediatr Neonatol 2010</em> 的數據分佈，我們可以將生長狀況劃分為幾個區間。請注意，單一次的落點並不代表定局，但若落在極端值，建議尋求醫療諮詢。
              </p>

              <div className="overflow-x-auto my-6">
                <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-cyan-900/40 text-cyan-100">
                      <th className="p-4 font-semibold w-1/4">百分位區間</th>
                      <th className="p-4 font-semibold w-1/4">臨床定義</th>
                      <th className="p-4 font-semibold">醫師建議與潛在風險</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 bg-slate-800">
                    {/* 低於 3% */}
                    <tr className="bg-red-900/10">
                      <td className="p-4 text-red-400 font-bold">&lt; 3rd (第3百分位)</td>
                      <td className="p-4 text-slate-200">生長遲緩 / 過輕</td>
                      <td className="p-4 text-slate-300">
                        <div className="mb-2"><strong className="text-red-300">高度警示：</strong> 可能有生長激素缺乏、甲狀腺功能低下、營養吸收不良或透納氏症(Turner syndrome)等染色體問題。</div>
                        <div className="text-sm text-slate-400">➜ 建議安排：骨齡 X 光、內分泌血液檢查。</div>
                      </td>
                    </tr>
                    {/* 3% - 15% */}
                    <tr>
                      <td className="p-4 text-amber-400 font-bold">3rd - 15th</td>
                      <td className="p-4 text-slate-200">偏矮 / 偏瘦</td>
                      <td className="p-4 text-slate-300">
                        雖在正常範圍邊緣，但需密切追蹤「生長速度」。若一年長高不到 4 公分，即視為異常。建議檢視日常飲食蛋白質攝取與睡眠品質。
                      </td>
                    </tr>
                    {/* 15% - 85% */}
                    <tr>
                      <td className="p-4 text-emerald-400 font-bold">15th - 85th</td>
                      <td className="p-4 text-slate-200">標準範圍</td>
                      <td className="p-4 text-slate-300">
                        符合大多數兒童的發育軌跡。請繼續維持均衡營養與運動，並每半年紀錄一次數值即可。
                      </td>
                    </tr>
                    {/* 85% - 97% */}
                    <tr>
                      <td className="p-4 text-amber-400 font-bold">85th - 97th</td>
                      <td className="p-4 text-slate-200">偏高 / 過重</td>
                      <td className="p-4 text-slate-300">
                         若是身高較高通常無需擔心；但若是<strong className="text-amber-300">體重</strong>在此區間，則屬於「過重」，需開始控制糖分攝取，預防兒童肥胖。
                      </td>
                    </tr>
                    {/* 高於 97% */}
                    <tr className="bg-red-900/10">
                      <td className="p-4 text-red-400 font-bold">&gt; 97th (第97百分位)</td>
                      <td className="p-4 text-slate-200">超高 / 肥胖</td>
                      <td className="p-4 text-slate-300">
                        <div className="mb-2"><strong className="text-red-300">特殊警示：</strong> 若身高突然飆高突破 97%，需懷疑<strong className="text-red-300">「性早熟」</strong>的可能性。</div>
                        <div className="text-sm text-slate-400">因為性荷爾蒙會加速骨骼生長，但也加速骨骺板閉合，導致「小時候高，長大反而矮」。➜ 務必檢查骨齡。</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 動態曲線的重要性 */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold text-cyan-400">三、比「落點」更重要的是「曲線軌跡」</h3>
              <p className="text-slate-300 leading-relaxed">
                很多家長看到孩子落在 PR 15 就很焦慮，其實大可不必。遺傳佔了身高的 70% 影響力，如果父母都不高，孩子落在 PR 15 且「沿著這條線穩定生長」，那就是正常的。
              </p>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                 <h4 className="text-lg font-bold text-white mb-3">⚠️ 什麼時候該看醫生？「跨線」危機</h4>
                 <p className="text-slate-300 mb-4">
                    生長曲線圖上通常會有 3, 15, 50, 85, 97 五條主要曲線。如果孩子的生長軌跡出現以下狀況，即稱為「跨線」 (Crossing Percentiles)：
                 </p>
                 <ul className="space-y-3 list-disc list-inside text-slate-300">
                    <li><strong className="text-red-400">向下跨兩條線：</strong> 例如從 PR 50 掉到 PR 15，甚至掉到 PR 3。這暗示近期身體出現狀況（如腸胃吸收問題、慢性發炎）。</li>
                    <li><strong className="text-amber-400">向上衝太快：</strong> 雖然長高很高興，但如果原本在 PR 50 突然衝到 PR 97，這往往是性早熟的徵兆，代表生長板正在快速消耗。</li>
                 </ul>
              </div>
            </section>

            {/* 骨齡與結論 */}
            <section className="space-y-6">
              <h3 className="text-2xl font-semibold text-cyan-400">四、看不見的關鍵：骨齡 (Bone Age)</h3>
              <p className="text-slate-300 leading-relaxed">
                生長曲線看的是「實際年齡」的身高，但醫學上更精準的是看「生理年齡」，也就是<strong>骨齡</strong>。
              </p>
              <p className="text-slate-300 leading-relaxed">
                有些孩子雖然現在身高在 PR 85，但骨齡已經超前兩年（例如實際 10 歲，骨齡 12 歲），這代表他的生長板剩下的時間比別人少兩年，最終成人身高可能反而會落後。反之，有些孩子雖然現在矮（PR 15），但骨齡落後一年，這代表他有「晚長」的本錢，未來有機會追上。
              </p>

              <div className="mt-8 bg-gradient-to-r from-cyan-900/40 to-slate-900 p-8 rounded-2xl border border-cyan-800/30 text-center">
                 <h4 className="text-2xl font-bold text-white mb-4">擔心孩子的生長進度嗎？</h4>
                 <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                    宸新復健科提供完整的「兒童生長發育評估」，包含 X 光照骨齡，TW3法骨齡判讀、生長板檢查以及個人化的運動營養處方。我們不只看現在的數字，更預測未來的潛力。
                 </p>
                 <Link 
                     href="/weight-bone/bone-age"
                     className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-cyan-500/30"
                 >
                     了解兒童生長評估門診
                 </Link>
              </div>
            </section>

          </article>
        </div>
      </main>
    </div>
  );
}