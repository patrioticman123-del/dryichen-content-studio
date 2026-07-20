// src/data/weightLoss.ts

// =======================================================
// 1. 定義資料介面
// =======================================================

// 輕量級 Metadata (給 Sitemap 和 列表頁用)
export interface WeightLossMetadata {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  features?: string[];
  lastModified?: string;
  tags?: string[];
  // SEO 欄位 (列表頁可能需要)
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  referencesHtml?: string;
}

// 完整資料介面 (包含內文 HTML 與詳細列表)
export interface WeightLossProgram extends WeightLossMetadata {
  contentHtml?: string;
  whyChooseUs?: string[];
  programBenefits?: string[];
  images?: { src: string; alt: string }[];
  qrCode?: string;
  benefitsTitle?: string;
  benefitsIconClass?: string;
  qaList?: { question: string; answer: string }[];
}

// =======================================================
// 2. 完整資料來源 (Source of Truth)
// ⚠️ 所有資料都在這裡維護，程式會自動產生 Sitemap 用的列表
// =======================================================
const fullWeightLossData: WeightLossProgram[] = [
  // -----------------------------------------------------
  // 1. 猛健樂 (Mounjaro)
  // -----------------------------------------------------
  {
    slug: 'mounjaro',
    title: '新竹猛健樂 (Mounjaro) 減重門診：專業醫師規劃瘦瘦筆療程',
    lastModified: '2026-05-24',
    subtitle: '新一代雙重腸泌素受體促效劑',
    description: '新一代雙重腸泌素(GIP/GLP-1)受體促效劑，提供更卓越的體重控制效果。',
    image: '/images/weight-loss/a.webp',
    features: ['一週一次', '抑制食慾', '延緩胃排空'],
    seoTitle: '新竹猛健樂推薦｜宸新復健科診所：台大醫師專業減重門診，Mounjaro 瘦瘦針助您精準控糖減脂，新竹首選，客製化體重管理找回輕盈體態',
    seoDescription: '新竹猛健樂(Mounjaro)瘦瘦針推薦。位於鄰近新竹科學園區，靠近竹北，宸新復健科提供新一代雙重腸泌素(GIP/GLP-1)，減重效果優於傳統善纖達。醫師親自規劃療程，含InBody檢測與飲食指導，有效改善肥胖、脂肪肝與三高問題。',
    keywords: ['新竹猛健樂', '竹北猛健樂', 'Mounjaro價格', '新竹瘦瘦針', '新竹減重門診', '竹科減重', '雙重腸泌素', '減肥針推薦', '胰島素阻抗'],
    contentHtml: `
    <style>
  .responsive-img-enlarge { width: 110% !important; max-width: none !important; display: block !important; margin: 1rem auto !important; position: relative !important; left: 50% !important; transform: translateX(-50%) !important; height: auto; }
  @media (min-width: 768px) { .responsive-img-enlarge { width: 100% !important; left: 0 !important; transform: none !important; } }
</style>
        <img src="/images/news/article/mounjaro/1.webp" alt="猛健樂全攻略懶人包1" class="responsive-img-enlarge">
        <img src="/images/news/article/mounjaro/2.webp" alt="猛健樂全攻略懶人包2" class="responsive-img-enlarge">
        <img src="/images/news/article/mounjaro/3.webp" alt="猛健樂全攻略懶人包3" class="responsive-img-enlarge">
        <img src="/images/news/article/mounjaro/9.webp" alt="猛健樂全攻略懶人包4" class="responsive-img-enlarge">
        <img src="/images/news/article/mounjaro/5.webp" alt="猛健樂全攻略懶人包5" class="responsive-img-enlarge">
        <img src="/images/news/article/mounjaro/6.webp" alt="猛健樂全攻略懶人包6" class="responsive-img-enlarge">

<!-- ===== 結論先行：開頭總結摘要 ===== -->
<div style="background-color: #f0fdf4; border-left: 5px solid #16a34a; border-radius: 0.5rem; padding: 2rem; margin: 0 0 2.5rem 0;">
  <h2 style="color: #15803d; margin-top: 0; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">📋 文章核心摘要</h2>
  <p style="margin: 0; line-height: 1.8; color: #1a2e1a; font-size: 1.15rem;">
    猛健樂（Tirzepatide，商品名 Mounjaro）是全球首款同時活化 GIP 與 GLP-1 雙重腸泌素受體的減重藥物，其臨床效果已由多項大型第三期隨機對照試驗所證實。2022 年發表於《新英格蘭醫學期刊》的 SURMOUNT-1 試驗顯示，使用 72 週後體重最高可下降 <strong>20.9%</strong><sup><a href="https://pubmed.ncbi.nlm.nih.gov/35658024/" target="_blank" rel="noopener noreferrer">[1]</a></sup>；2024 年 SURMOUNT-4 延伸試驗更記錄持續用藥者 88 週總減重幅度達 <strong>25.3%</strong><sup><a href="https://pubmed.ncbi.nlm.nih.gov/38078870/" target="_blank" rel="noopener noreferrer">[2]</a></sup>。<br><br>
    在血糖控制方面，SURPASS 系列試驗顯示 HbA1c 最大可降低 <strong>2.3~2.49%</strong><sup><a href="https://pubmed.ncbi.nlm.nih.gov/34170647/" target="_blank" rel="noopener noreferrer">[3]</a></sup><sup><a href="https://www.nature.com/articles/s41591-023-02344-1" target="_blank" rel="noopener noreferrer">[4]</a></sup>；SYNERGY-NASH則證實對代謝相關脂肪性肝炎的緩解率高達 <strong>62%（15 mg 組）</strong><sup><a href="https://pubmed.ncbi.nlm.nih.gov/38856224/" target="_blank" rel="noopener noreferrer">[5]</a></sup>。本藥已獲美國 FDA、歐洲 EMA 及台灣 TFDA 核准，並有心血管安全性試驗佐證其心血管安全性<sup><a href="https://www.tctmd.com/news/surpass-cvot-published-large-trial-confirms-cvd-efficacy-tirzepatide" target="_blank" rel="noopener noreferrer">[6]</a></sup>。本文為您完整解析療效數據、適用族群與正確使用方式。
  </p>
</div>

<p><strong>位於新竹的宸新復健科</strong>，專為<strong>新竹科學園區</strong>與在地民眾提供完整的<strong>猛健樂 (Mounjaro)</strong> 減重療程。這是目前最新的雙重腸泌素受體促效劑，能同時活化 GIP 與 GLP-1 兩種受體。</p>
<br>
<p>隨著醫學科技的進步，減重已不再單純依靠意志力。繼第一代 GLP-1 藥物（俗稱瘦瘦針）之後，全球醫學界迎來了更具突破性的「雙重腸泌素」。</p><br><p>它不僅延續了抑制食慾的效果，更加入了 GIP 機制來提升代謝與燃脂效率。本院特別整理了本月專屬優惠與完整的衛教資訊，幫助您安全、有效地找回健康的體態。</p>
<br>
<div style="background-color: #fffbeb; border: 2px solid #fbbf24; border-radius: 1rem; padding: 1.5rem; margin: 2rem 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #b45309; margin-top: 0; font-weight: bold; border-bottom: 2px solid #fcd34d; padding-bottom: 0.5rem; display: flex; align-items: center;">
        📢 猛健樂 (Mounjaro) 本月前 100 名限定優惠
    </h2>
    
    <p style="font-size: 1.1rem; color: #78350f;">宸新復健科<strong>猛健樂</strong>價格。猛健樂依據劑量濃度不同，分為兩種規格，醫師將依據您的減重進程調整劑量：</p>
    <br>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">

    <div style="background: white; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #e5e7eb; text-align: center;">
        <strong style="font-size: 1.1rem; color: #0891b2;">5 mg</strong>
        <p style="margin: 0.25rem 0 0; color: #dc2626; font-weight: bold; font-size: 1.25rem;">$12,000</p>
    </div>

    <div style="background: white; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #e5e7eb; text-align: center;">
        <strong style="font-size: 1.1rem; color: #0891b2;">10 mg</strong>
        <p style="margin: 0.25rem 0 0; color: #dc2626; font-weight: bold; font-size: 1.25rem;">$15,500</p>
    </div>
</div>

    <h3 style="color: #92400e; margin-bottom: 1rem;">⚠️ 就診注意事項與流程</h3>
<ul style="list-style: none; padding: 0; margin: 0; color: #92400e;">
    <li style="margin-bottom: 1rem; display: flex; align-items: start;">
        <span style="background: #f59e0b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0;">1</span>
        <div><strong>主動告知需求：</strong>掛號時請直接跟櫃台人員說明「要諮詢猛健樂」，我們會為您安排提前進診間評估，節省您的寶貴時間。</div>
    </li>
    <li style="margin-bottom: 1rem; display: flex; align-items: start;">
        <span style="background: #f59e0b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0;">2</span>
        <div><strong>攜帶健保卡：</strong>當天請務必攜帶健保卡及掛號費。若經醫師評估後確定進行療程並現場購買藥品，原本收取的掛號費將<strong>全額退還</strong>。</div>
    </li>
    <li style="margin-bottom: 1rem; display: flex; align-items: start;">
        <span style="background: #f59e0b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0;">3</span>
        <div><strong>缺貨處理機制：</strong>由於猛健樂相當熱門，現場偶爾會有缺貨狀況。若當日無藥，我們會協助預約藥品到貨時間，屆時您再來領藥，並由專業護理人員進行施打教學。</div>
    </li>
    <li style="margin-bottom: 0; display: flex; align-items: start;">
        <span style="background: #f59e0b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0;">4</span>
        <div><strong>全球供貨不穩對策：</strong>若付款後因全球性缺貨導致等待過久，本院提供<strong>全額退款</strong>服務，或者經醫師評估後，可協助您更換為成效類似的週纖達，確保減重計畫不中斷。</div>
    </li>
</ul>
</div>

<p><img src="/images/weight-loss/mounjaro/h.webp" alt="猛健樂本月優惠與注意事項"></p>

<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">

<h3>🏆 為什麼選擇猛健樂？解析 5 大核心特點</h3>
<p>猛健樂 (Mounjaro) 之所以被稱為減重界的「遊戲規則改變者」，是因為它突破了傳統單一機制的限制。根據最新的臨床研究數據，它擁有以下五大不可忽視的優勢：</p>

<h3>1. 雙效腸泌素的代謝調節 (GIP/GLP-1)</h3>
<p>傳統的減重針（如週纖達、胰妥讚）僅含有 GLP-1。而猛健樂是首款<strong>同時活化 GIP 與 GLP-1</strong> 的藥物<sup><a href="https://pubmed.ncbi.nlm.nih.gov/35658024/" target="_blank" rel="noopener noreferrer">[1]</a></sup>。這種雙效機制能協同運作：</p>
<ul>
    <li><strong>調節血糖：</strong> 依據體內葡萄糖濃度，智慧調節胰島素分泌。</li>
    <li><strong>延緩胃排空：</strong> 讓食物停留在胃裡久一點，延長飽足感。</li>
    <li><strong>增加大腦飽足感：</strong> 直接作用於中樞神經，降低食慾。</li>
    <li><strong>減少脂肪堆積：</strong> GIP 能直接作用於脂肪細胞，改善能量代謝。</li>
</ul>
<p>在亞太族群（含臺灣人種族相近的華人族群）的 SURPASS-AP-Combo 試驗中，猛健樂同樣展現出強效的雙重機制優勢，各劑量組的 HbA1c 降幅均顯著優於胰島素 <sup><a href="https://www.nature.com/articles/s41591-023-02344-1" target="_blank" rel="noopener noreferrer">[4]</a></sup>。</p>

<h3>2. 改善糖化血色素 (HbA1c)</h3>
<p>對於血糖控制不佳的族群，猛健樂效果顯著。2021 年發表於《新英格蘭醫學期刊》的 SURPASS-2 試驗顯示，猛健樂使 HbA1c 分別降低 <strong>2.01%（5 mg）、2.24%（10 mg）及 2.30%（15 mg）</strong>，優於 週纖達  的 1.86%<sup><a href="https://pubmed.ncbi.nlm.nih.gov/34170647/" target="_blank" rel="noopener noreferrer">[3]</a></sup>。亞太族群的 SURPASS-AP-Combo 試驗更記錄到 15 mg 組 HbA1c 降幅達 <strong>2.49%</strong><sup><a href="https://www.nature.com/articles/s41591-023-02344-1" target="_blank" rel="noopener noreferrer">[4]</a></sup>。這不僅能穩定血糖，更能輔助治療第二型糖尿病，甚至改善糖尿病前期的血糖異常。</p>

<h3>3. 體重下降幅度驚人 (可達 20.9%~25.3%)</h3>
<p>這是猛健樂最受矚目的數據。2022 年發表的 SURMOUNT-1 大型研究顯示，使用 <strong>5 mg、10 mg、15 mg</strong> 的受試者平均體重分別下降 <strong>15.0%、19.5%、20.9%</strong>，遠超過安慰劑組的 3.1%<sup><a href="https://pubmed.ncbi.nlm.nih.gov/35658024/" target="_blank" rel="noopener noreferrer">[1]</a></sup>。2024 年 SURMOUNT-4 延伸研究更顯示，持續使用猛健樂至 88 週的受試者，總體重減少幅度達 <strong>25.3%</strong>，而停藥改為安慰劑組僅 9.9%<sup><a href="https://pubmed.ncbi.nlm.nih.gov/38078870/" target="_blank" rel="noopener noreferrer">[2]</a></sup>。這意味著一個 100 公斤的人，有可能在持續療程中減去約 20~25 公斤，其效果已逼近外科縮胃手術，但卻是非侵入性的治療。此外，2024 年 SURMOUNT-1 三年延伸數據更顯示，15 mg 組在 176 週（三年）的平均體重維持下降達 <strong>22.9%</strong>，並同時將糖尿病進展風險降低達 <strong>93%</strong><sup><a href="https://investor.lilly.com/news-releases/news-release-details/treatment-tirzepatide-adults-pre-diabetes-and-obesity-or" target="_blank" rel="noopener noreferrer">[7]</a></sup>。</p>

<h3>4. 有助降低心血管疾病風險</h3>
<p>減重不只是為了外觀，更是為了健康。SURMOUNT-1 試驗的心血管子分析顯示，猛健樂治療 72 週後，收縮壓下降 <strong>7.4~10.6 mmHg</strong>（安慰劑校正後），三酸甘油脂與腰圍均顯著改善<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11420724/" target="_blank" rel="noopener noreferrer">[8]</a></sup>。2025 年的 SURMOUNT-5 事後分析更顯示，猛健樂預估 10 年心血管疾病風險降低約 <strong>24%</strong><sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12824524/" target="_blank" rel="noopener noreferrer">[9]</a></sup>。大型心血管結果試驗亦確認其心血管安全性<sup><a href="https://www.tctmd.com/news/surpass-cvot-published-large-trial-confirms-cvd-efficacy-tirzepatide" target="_blank" rel="noopener noreferrer">[6]</a></sup>。猛健樂能全方位改善代謝症候群指標：</p>
<ul>
    <li>降低血壓（收縮壓平均下降 4~10 mmHg）</li>
    <li>降低總膽固醇與三酸甘油脂</li>
    <li>縮小腰圍（SURMOUNT-1 中腰圍縮小 14.6~19.9 公分）</li>
    <li><strong>改善脂肪肝：</strong> 2024 年發表於《新英格蘭醫學期刊》的 SYNERGY-NASH 試驗顯示，猛健樂 15 mg 組達到脂肪肝緩解且肝纖維化未惡化的比例為 <strong>62%</strong>，遠高於安慰劑組的 10%<sup><a href="https://pubmed.ncbi.nlm.nih.gov/38856224/" target="_blank" rel="noopener noreferrer">[5]</a></sup>。</li>
</ul>

<h3>5. 多國權威認證核准</h3>
<p>安全性是我們最重視的。猛健樂已獲得<strong>美國 FDA</strong>（2022 年 5 月核准用於第二型糖尿病，2023 年 11 月核准體重管理）、<strong>歐洲 EMA</strong> 以及<strong>台灣 TFDA</strong> 的核准<sup><a href="https://pubmed.ncbi.nlm.nih.gov/35658024/" target="_blank" rel="noopener noreferrer">[1]</a></sup>。SURMOUNT 系列第三期臨床試驗橫跨全球 27 個國家，共納入逾 <strong>5,000 名</strong>受試者，積累了大量安全性數據<sup><a href="https://pubmed.ncbi.nlm.nih.gov/40545827/" target="_blank" rel="noopener noreferrer">[10]</a></sup>。</p>

<p><img src="/images/weight-loss/mounjaro/b.webp" alt="猛健樂雙重腸泌素特點說明"></p>

<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">

<!-- ===== 常見誤區解析 ===== -->
<div style="background-color: #fef2f2; border: 2px solid #fca5a5; border-radius: 1rem; padding: 1.75rem; margin: 2rem 0;">
  <h2 style="color: #b91c1c; margin-top: 0; font-weight: bold;">🔍 3 大常見誤區解析</h2>
  <p style="color: #7f1d1d; margin-bottom: 1.5rem;">門診中常聽到許多關於猛健樂的錯誤認知，以下逐一根據臨床文獻進行釐清：</p>

  <div style="border-left: 4px solid #ef4444; padding-left: 1.25rem; margin-bottom: 1.5rem;">
    <h4 style="color: #991b1b; margin-top: 0;">❌ 誤區一：「劑量越高、效果越好，一開始就要打最高劑量」</h4>
    <p style="color: #374151; margin: 0; line-height: 1.7;">
      <strong>事實：</strong>臨床試驗中，猛健樂採用標準化的「劑量遞增」設計，起始劑量為 2.5 mg，每 4 週才評估是否調升，最高至 15 mg。SURMOUNT-1 試驗顯示，即使是 5 mg 組也能達到 <strong>15% 的平均體重下降</strong><sup><a href="https://pubmed.ncbi.nlm.nih.gov/35658024/" target="_blank" rel="noopener noreferrer">[1]</a></sup>。貿然使用高劑量不會使療效等比例增加，反而會大幅升高噁心、嘔吐、腹瀉等胃腸道副作用發生率。各試驗因不良反應停藥率在 15 mg 組最高，達 6.2%（安慰劑組 2.6%）<sup><a href="https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2024.1453825/full" target="_blank" rel="noopener noreferrer">[11]</a></sup>。循序漸進才是正確策略。
    </p>
  </div>

  <div style="border-left: 4px solid #ef4444; padding-left: 1.25rem; margin-bottom: 1.5rem;">
    <h4 style="color: #991b1b; margin-top: 0;">❌ 誤區二：「停藥後體重一定會反彈回來，效果不持久」</h4>
    <p style="color: #374151; margin: 0; line-height: 1.7;">
      <strong>事實：</strong>停藥後確實存在部分體重回升的現象，但「一定完全反彈」是錯誤觀念。SURMOUNT-4 試驗（2024 年發表，JAMA）在 36 週導入期後隨機分為繼續用藥或改為安慰劑，52 週追蹤後，<strong>繼續用藥組有 89.5% 的人維持了至少 80% 的減重成效</strong>；而停藥組則出現平均 14% 的體重回升<sup><a href="https://pubmed.ncbi.nlm.nih.gov/38078870/" target="_blank" rel="noopener noreferrer">[2]</a></sup>。換言之，關鍵在於「療程長度」與「停藥後的生活型態維持」，而非藥物本身無效。搭配飲食與運動習慣的建立，才能最大化長期維持成效。
    </p>
  </div>

  <div style="border-left: 4px solid #ef4444; padding-left: 1.25rem;">
    <h4 style="color: #991b1b; margin-top: 0;">❌ 誤區三：「猛健樂只適合非常肥胖的人，一般人不需要」</h4>
    <p style="color: #374151; margin: 0; line-height: 1.7;">
      <strong>事實：</strong>SURMOUNT-1 試驗的納入標準包含「BMI ≥ 27 且有至少一項體重相關合併症（如高血壓、高血脂、睡眠呼吸中止症）」，並非只限嚴重肥胖者<sup><a href="https://pubmed.ncbi.nlm.nih.gov/35658024/" target="_blank" rel="noopener noreferrer">[1]</a></sup>。對於有糖尿病前期、脂肪肝、胰島素阻抗的族群，即使 BMI 未達 30，在醫師評估下也可能是適合的治療對象。台灣 TFDA 核准的適應症亦依據國際標準，重視「共病」的存在，而非單純以體重絕對值判斷。
    </p>
  </div>
</div>

<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">

<h3>🎯 誰適合施打猛健樂？四大族群自我檢測</h3>
<p>雖然猛健樂效果強大，但經由專業醫師評估仍然是必須的。在宸新復健科，我們建議以下四類族群可以考慮諮詢此療程：</p>

<h3>✅ 1. 糖尿病前期與第二型糖尿病患者</h3>
<p>如果您已經出現血糖偏高、胰島素阻抗的現象，猛健樂能同時幫助控糖與減重，阻斷疾病惡化。SURMOUNT-1 三年延伸數據顯示，猛健樂可將糖尿病前期患者進展為第二型糖尿病的風險降低達 <strong>94%</strong>（風險比 0.06）<sup><a href="https://investor.lilly.com/news-releases/news-release-details/treatment-tirzepatide-adults-pre-diabetes-and-obesity-or" target="_blank" rel="noopener noreferrer">[7]</a></sup>。</p>

<h3>✅ 2. 「三高」族群</h3>
<p>同時深受<strong>高血壓</strong>、<strong>高血糖</strong>、<strong>高血脂</strong>困擾的朋友。透過減重與藥物的代謝調節作用，SURMOUNT-1 心血管子分析顯示腰圍縮小 <strong>14.6~19.9 公分</strong>、收縮壓下降 <strong>7.4~10.6 mmHg</strong>，能顯著改善三高指數<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11420724/" target="_blank" rel="noopener noreferrer">[8]</a></sup>，減少長期服用慢性病藥物的負擔。</p>

<h3>✅ 3. 追求體態雕塑與增肌減脂</h3>
<p>這不僅限於肥胖者。對於<strong>維持好身材</strong>有高標準要求，或是正在進行健身、希望<strong>增肌減脂</strong>效率更好的人，猛健樂能幫助精準控制飲食，減少體脂堆積，讓肌肉線條更明顯。</p>

<h3>✅ 4. 體重過重者 (BMI 超標)</h3>
<p>符合醫學定義的肥胖族群：</p>
<ul>
    <li><strong>中度肥胖：</strong> BMI 27 以上</li>
    <li><strong>成人肥胖：</strong> BMI 30 以上</li>
</ul>

<p><img src="/images/weight-loss/mounjaro/c.webp" alt="猛健樂適合施打對象"></p>

<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">

<h3>📝 猛健樂使用中的懶人包：醫師教你怎麼瘦得健康</h3>
<p>開始施打猛健樂後，為了達到最佳效果並避免副作用，我特別整理了這份「使用中懶人包」，請務必配合以下五點執行：</p>

<h3>1. 飲食要吃到 BMR (基礎代謝率)</h3>
<p><strong>千萬不要絕食！</strong> 猛健樂會讓你食慾變小，但如果你吃得太少（低於基礎代謝率），身體會啟動保護機制，反而讓代謝下降，未來更容易復胖。請維持基本熱量攝取，選擇高品質的原型食物，<strong>不挨餓</strong>才是長久之計。</p>

<h3>2. 運動防掉肌，重訓比有氧更好</h3>
<p>在體重快速下降的過程中，肌肉很容易跟著流失。為了避免變成「泡芙人」或代謝下降，<strong>運動增肌減脂</strong>至關重要。建議多做重量訓練（阻力訓練），並配合<strong>充足睡眠</strong>，讓身體有修復的時間。</p>

<h3>3. 蛋白質與水分要充足</h3>
<p>這是飲食的兩大重點：</p>
<ul>
    <li><strong>蛋白質：</strong> 建議吃到體重的 <strong>1.2 ~ 1.5 倍</strong>（例如 60 公斤的人，每天吃 72~90 克蛋白質）。雞蛋、魚肉、豆漿都是好選擇。</li>
    <li><strong>水分：</strong> 幫助代謝廢物與脂肪分解，每日飲水至少 <strong>2000cc</strong>。</li>
</ul>

<h3>4. 劑量調整原則：不用盲目升級</h3>
<p>很多人以為劑量越高瘦越快，其實不然。醫師的黃金準則是：<strong>「只要每週體重有穩定下降 0.5 ~ 1 公斤，就不需要提升劑量」</strong>。穩穩地瘦（每週 0.5~1kg）對身體負擔最小，皮膚也比較不會鬆弛。健康第一，不要急於求成。</p>

<h3>5. 建立黃金三角習慣</h3>
<p>藥物是輔助，習慣才是根本。透過猛健樂的幫助，養成<strong>規律運動</strong>、<strong>健康飲食</strong>、<strong>睡飽覺</strong>的好習慣。當療程結束後，這些習慣將幫助您維持成果，達成<strong>不復胖</strong>的終極目標！</p>

<p><img src="/images/weight-loss/mounjaro/d.webp" alt="猛健樂懶人包"></p>
<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">

<h3>💉 猛健樂 (Mounjaro) 施打教學與補打原則</h3>
<p>為了確保藥物發揮最大療效並減少不適，正確的施打方式與劑量調整非常重要。以下是為您整理的操作重點：</p>

<h3>1. 施打部位選擇：輪替是關鍵</h3>
<p>猛健樂屬於皮下注射，建議施打在皮下脂肪較豐富的部位。請每週<strong>輪替注射部位</strong>，以避免皮膚產生硬塊或紅腫。</p>
<ul>
  <li><strong>腹部：</strong> 以肚臍為中心，距離肚臍約 5 公分（約兩指寬）以外的區域，避開肚臍周圍。</li>
  <li><strong>大腿前側：</strong> 大腿正面偏外側的中段區域。</li>
  <li><strong>上臂外側：</strong> 手臂外側中段，通常建議由他人協助施打較為順手。</li>
</ul>

<h3>2. 如何提升劑量：循序漸進</h3>
<p>猛健樂的劑量設計為每 4 週調整一次，切勿急於求成。標準的劑量遞增流程如下：</p>
<ul>
  <li><strong>起始期 (第 1-4 週)：</strong> 使用 <strong>2.5 mg</strong>。此階段目標是讓身體適應藥物，而非快速減重。</li>
  <li><strong>爬升期 (第 5-8 週)：</strong> 若無明顯副作用，可經醫師評估後調升至 <strong>5 mg</strong>。</li>
  <li><strong>穩定期與調整：</strong> 之後每 4 週視減重效果與副作用評估是否維持或調升至 7.5 mg、10 mg 等（最大劑量為 15 mg）。</li>
  <li><strong>黃金準則：</strong> 只要目前的劑量能讓體重每週穩定下降 <strong>0.5~1 公斤</strong>，且食慾控制良好，就<strong>不需要</strong>急著往上加劑量。</li>
</ul>

<h3>3. 忘記打藥怎麼辦？補打黃金期</h3>
<p>生活忙碌難免忘記用藥，請依照「4 天 (96 小時) 原則」來判斷是否補打：</p>
<ul>
  <li><strong>距離原定施打日「未滿」4 天：</strong> 請盡快補打這一劑，之後維持原本的每週施打日程。</li>
  <li><strong>距離原定施打日「超過」4 天：</strong> 請<strong>跳過</strong>這一劑，等到下一次預定的施打日再使用。<strong>千萬不要</strong>為了補進度而在同一週打兩劑，這會導致藥物濃度過高，引發嚴重副作用。</li>
</ul>
<p><strong>舉例說明：</strong> 您固定每週日施打。若週三想起來（未滿 4 天），請立即補打；若週四才想起來（已超過 4 天），請等到這週日再打下一劑。</p>

<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">
<section style="background-color: rgba(6, 182, 212, 0.05); border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 1.5rem; padding: 2.5rem 1.25rem; margin-bottom: 3rem; font-family: sans-serif;">
  
<h2 style="color: #22d3ee; margin-top: 0; margin-bottom: 1.5rem; line-height: 1.4; font-size: 1.5rem; letter-spacing: -0.02em; word-break: keep-all;">
  <span suppressHydrationWarning style="margin-right: 4px; display: inline-block; vertical-align: middle;">👨‍⚕️</span>
  <a href="/about/doctors" style="color: #22d3ee; text-decoration: none; border: none; outline: none; display: inline-block; vertical-align: middle;">林羿辰醫師觀點：</a>
  <span style="display: inline-block; vertical-align: middle;">什麼時候該照骨齡？多久追蹤呢？</span>
</h2>
  
  <p style="font-size: 1.2rem; line-height: 1.7; color: #cbd5e1; margin-bottom: 2.5rem; text-align: justify; letter-spacing: -0.01em;">
    這幾乎是每位來診間諮詢的朋友必問的問題。身為專科醫師與專業健身教練，我必須告訴大家：<strong>猛健樂並非魔法藥，而是當您飲食控制遇到卡關時的「助燃劑」。</strong>
  </p>

  <div style="display: grid; gap: 1.8rem;">
    
    <div style="padding: 0;">
      <h4 style="color: #f8fafc; margin-bottom: 0.4rem; font-size: 1.35rem; line-height: 1.3; letter-spacing: -0.02em;">1. 停藥後會復胖嗎？關鍵在於「無敵星星」期後的習慣</h4>
      <p style="margin: 0; font-size: 1.15rem; line-height: 1.6; color: #e2e8f0; letter-spacing: -0.01em;">
        猛健樂能幫您抑制食慾、降低體重，就像吃了「無敵星星」進入加速期。但如同房間不持續打掃會變髒、肌肉不持續鍛鍊會萎縮，<strong>減重是長期的生活方式。</strong>請務必把握施打期間建立正確的飲食模式，讓它成為您重塑生活的起點，而非短暫的結果。
      </p>
    </div>

    <div style="padding: 0;">
      <h4 style="color: #f8fafc; margin-bottom: 0.4rem; font-size: 1.35rem; line-height: 1.3; letter-spacing: -0.02em;">2. 療程建議：至少持續施打三個月</h4>
      <p style="margin: 0; font-size: 1.15rem; line-height: 1.6; color: #e2e8f0; letter-spacing: -0.01em;">
        為了降低復胖機會，我建議療程至少需持續<strong>三個月</strong>。這個時間長度足以讓體內的脂肪體系完成一輪完整的代謝與重新設定，讓身體在低體脂的狀態下趨於穩定，比起短期速成，更能達到長效維持的效果。
      </p>
    </div>

  </div>

</section>

<div style="background-color: #f0f9ff; padding: 2rem; border-radius: 1rem; margin-top: 3rem; text-align: center;">
    <h3 style="color: #0369a1; margin-top: 0;">👨‍⚕️ 想了解您是否適合猛健樂療程？</h3>
    <p style="color: #334155; margin-bottom: 1.5rem;">歡迎來到新竹宸新復健科，由醫師親自為您評估。我們提供一對一的諮詢，結合 InBody 檢測，甲狀腺超音波檢查或抽血為您量身打造最安全、有效的減重計畫。</p>
    <p style="font-weight: bold; color: #0891b2;">如有任何疑問，都可以在門診時直接跟醫師聊聊喔！</p><br>
      <div style="text-align: center; width: 100%;">
    <a href="/booking" 
       target="_blank" 
       rel="noopener noreferrer" 
       style="display: inline-block !important; background-color: #375987 !important; color: #f8fafc !important; font-weight: bold !important; padding: 12px 24px !important; border-radius: 9999px !important; text-decoration: none !important; font-size: 1.05rem !important; font-family: system-ui, sans-serif !important;">
        預約門診評估
    </a>
  </div>
</div>

`,
  referencesHtml: `
<h2>📚 參考文獻 (References)</h2>
<div style="background-color: #f8fafc; padding: 1rem; border-radius: 0.75rem; margin-top: 1.5rem; font-size: 0.9rem; color: #475569; border: 1px solid #e2e8f0; line-height: 1.5; word-break: break-all;">
    <ol style="padding-left: 0; margin: 0; list-style-type: decimal; list-style-position: inside; color: #2563eb; font-weight: bold;">
      <li id="ref1" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Jastreboff AM, et al. <em>Tirzepatide Once Weekly for the Treatment of Obesity.</em> N Engl J Med. 2022;387(3):205-216. <a href="https://doi.org/10.1056/NEJMoa2206038" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1056/NEJMoa2206038</a>（實證：72 週 RCT，TRE 體重下降 15–20.9%；efficacy estimand 最高達 22.5%）
    </span>
</li>
<li id="ref2" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Aronne LJ, et al. <em>Continued Treatment With Tirzepatide for Maintenance of Weight Reduction in Adults With Obesity.</em> JAMA. 2024;331(1):38-48. <a href="https://doi.org/10.1001/jama.2023.24945" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1001/jama.2023.24945</a>（實證：持續用藥 88 週整體平均減重達 25.3%；停藥組於隨機化後 52 週體重回升 14%）
    </span>
</li>
<li id="ref3" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Frías JP, et al. <em>Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes.</em> N Engl J Med. 2021;385(6):503-515. <a href="https://doi.org/10.1056/NEJMoa2107519" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1056/NEJMoa2107519</a>（實證：HbA1c 降幅最高 2.30%，優於 semaglutide）
    </span>
</li>
<li id="ref4" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Gao L, et al. (SURPASS-AP-Combo Investigators). <em>Tirzepatide versus insulin glargine in type 2 diabetes in the Asia-Pacific region.</em> Nat Med. 2023;29(6):1500-1510. <a href="https://doi.org/10.1038/s41591-023-02344-1" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1038/s41591-023-02344-1</a>（實證：亞太族群（83% 為中國）HbA1c 降幅達 2.49%（15mg），優於胰島素 glargine）
    </span>
</li>
<li id="ref5" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Loomba R, et al. <em>Tirzepatide for Metabolic Dysfunction–Associated Steatohepatitis with Liver Fibrosis.</em> N Engl J Med. 2024;391(4):299-310. <a href="https://doi.org/10.1056/NEJMoa2401943" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1056/NEJMoa2401943</a>（實證：52 週 MASH 緩解率最高 62%（15mg），安慰劑組僅 10%）
    </span>
</li>
<li id="ref6" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Nicholls SJ, et al. <em>Cardiovascular Outcomes with Tirzepatide versus Dulaglutide in Type 2 Diabetes.</em> N Engl J Med. 2025;393(24):2409-2420. <a href="https://doi.org/10.1056/NEJMoa2505928" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1056/NEJMoa2505928</a>（實證：中位追蹤 4 年確認心血管安全性不劣於 dulaglutide；擴展 MACE（含冠狀動脈血運重建）HR=0.88）
    </span>
</li>
<li id="ref7" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Jastreboff AM, et al. <em>Tirzepatide for Obesity Treatment and Diabetes Prevention.</em> N Engl J Med. 2025;392(10):958-971. <a href="https://doi.org/10.1056/NEJMoa2410819" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1056/NEJMoa2410819</a>（實證：176 週三年追蹤，合併糖尿病前期之肥胖者進展為 T2DM 風險降低約 93%（HR=0.07）；1.3% vs 13.3%）
    </span>
</li>
<li id="ref8" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Krumholz HM, de Lemos JA, Sattar N, et al. <em>Tirzepatide and blood pressure reduction: stratified analyses of the SURMOUNT-1 RCT.</em> Heart. 2024;110(19):1165-1171. <a href="https://doi.org/10.1136/heartjnl-2024-324170" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1136/heartjnl-2024-324170</a>（實證：72 週收縮壓平均下降 6.8 mmHg、舒張壓下降 4.2 mmHg，vs 安慰劑）
    </span>
</li>
<li id="ref9" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Packer M, Zile MR, Kramer CM, et al. <em>Tirzepatide for Heart Failure with Preserved Ejection Fraction and Obesity.</em> N Engl J Med. 2025;392(5):427-437. <a href="https://doi.org/10.1056/NEJMoa2410027" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1056/NEJMoa2410027</a>（實證：HFpEF 患者心血管死亡或心衰惡化風險降低 38%，HR=0.62；P=0.026）
    </span>
</li>
<li id="ref10" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Lam CSP, et al. <em>Tirzepatide for reduction of morbidity and mortality in adults with obesity: rationale and design of the SURMOUNT-MMO trial.</em> Obesity (Silver Spring). 2025;33(9):1645-1656. <a href="https://doi.org/10.1002/oby.24332" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1002/oby.24332</a>（實證：設計文件，針對非糖尿病肥胖者之長期心血管結局試驗，預計招募約 15,000 人、涵蓋 27 國）
    </span>
</li>
<li id="ref11" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Wei S, Xu S. <em>Tirzepatide's innovative applications in the management of type 2 diabetes and its future prospects in cardiovascular health.</em> Front Pharmacol. 2024;15:1453825. <a href="https://doi.org/10.3389/fphar.2024.1453825" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.3389/fphar.2024.1453825</a>（實證：彙整 SURPASS/SURMOUNT 系列臨床試驗之療效與安全性，含各劑量副作用及停藥率之參考）
    </span>
</li>   </ol>
</div>
    `,
    whyChooseUs: [
      '詳細問診及衛教施打，確保用藥安全',
      '包含<strong>甲狀腺超音波</strong>及完整<strong>抽血檢查</strong>',
      '療程含高階 <strong>InBody 身體組成分析</strong>及運動課程'
    ],
    programBenefits: [
      '一週一次皮下注射，簡單方便',
      '臨床顯示體重下降幅度可達 20%',
      '有效控制三高、改善脂肪肝與心血管健康'
    ],
    qaList: [
      {
        question: '猛健樂會有什麼副作用嗎？',
        answer: '常見的副作用多為腸胃道症狀，如噁心、腹脹或便秘。這些反應通常是輕微且暫時的，透過調整飲食（少量多餐、避開油膩）及醫師調整劑量，大多能順利適應。'
      },
      {
        question: '停藥後會復胖嗎？',
        answer: '減重藥物是輔助工具，幫助您建立良好的飲食與生活習慣。若停藥後能維持健康的飲食與運動習慣，就能有效維持體重。我們提供專業的衛教與追蹤，協助您長期維持成果。'
      },
      {
        question: '一支猛健樂注射筆可以打幾次？可以使用多久？',
        answer: '台灣目前的猛健樂筆針設計為一支筆含有 4 次（4 週）的劑量。您只需要每週固定同一天施打一次，一支筆剛好可以完成一個月的療程。這種設計不僅攜帶方便，也能大幅減少醫療廢棄物。'
      },
      {
        question: '施打猛健樂會痛嗎？',
        answer: '猛健樂使用的是極細的專利針頭，施打於皮下脂肪層（如腹部或大腿），大部分患者僅感覺像被蚊子叮一下，幾乎沒有疼痛感，非常方便操作。'
      }
    ]
  },
 // -----------------------------------------------------
  // 3. 兒童骨齡評估
  // -----------------------------------------------------
  // 只有 contentHtml 的部分需要修改，其他欄位完整保留
// 以下是完整的物件，包含原有所有欄位 + 修改後的 contentHtml

// 只有 contentHtml 的部分需要修改，其他欄位完整保留
// 以下是完整的物件，包含原有所有欄位 + 修改後的 contentHtml

{
    slug: 'bone-age',
    title: '新竹兒童骨齡評估：預測遺傳身高與生長發育，掌握黃金長高期',
    lastModified: '2026-04-11',
    tags: ['boneage'],  
    subtitle: '掌握黃金生長發育期',
    description: '透過左手X光片判讀骨骼成熟度，預測成年身高，掌握黃金生長發育期。',
    image: '/images/weight-loss/c.webp',
    features: ['性早熟', '生長遲緩', '想了解身高潛力的兒童'],
    seoTitle: '新竹兒童骨齡推薦｜宸新復健科診所：台大醫師精準判讀骨齡，新竹首選兒童生長門診，專業預估成人身高，分析生長曲線與發育狀況，掌握黃金長高期',
    seoDescription: '新竹照骨齡推薦。鄰近新竹科學園區，靠近竹北，宸新復健科提供免掛號免預約，隨到隨照服務。結合TW3法與AI大數據精準判讀，準確預測兒童成年身高。針對性早熟、生長遲緩提供專業評估與治療建議。',
    keywords: ['新竹照骨齡', '竹北照骨齡', '兒童長高門診', '性早熟檢查', '生長遲緩', '預測身高', '骨齡X光', '新竹小兒內分泌'],
    contentHtml: `
    <style>
  .responsive-img-enlarge { width: 110% !important; max-width: none !important; display: block !important; margin: 1rem auto !important; position: relative !important; left: 50% !important; transform: translateX(-50%) !important; height: auto; }
  @media (min-width: 768px) { .responsive-img-enlarge { width: 100% !important; left: 0 !important; transform: none !important; } }
</style>
       <img src="/images/news/article/boneage/1.webp" alt="兒童長高全攻略懶人包1" class="responsive-img-enlarge">
        <img src="/images/news/article/boneage/2.webp" alt="兒童長高全攻略懶人包2" class="responsive-img-enlarge">
        <img src="/images/news/article/boneage/3.webp" alt="兒童長高全攻略懶人包3" class="responsive-img-enlarge">
        <img src="/images/news/article/boneage/4.webp" alt="兒童長高全攻略懶人包4" class="responsive-img-enlarge">
        <img src="/images/news/article/boneage/5.webp" alt="兒童長高全攻略懶人包5" class="responsive-img-enlarge">

<!-- ===== 結論先行：文章摘要 ===== -->
<div style="background-color: #f0f9ff; border: 2px solid #0891b2; border-radius: 1rem; padding: 1.5rem 1.75rem; margin: 1.5rem 0 2rem 0;">
  <h2 style="color: #0e7490; margin-top: 0; font-size: 1.15rem; font-weight: bold;">📋 文章重點摘要（結論先行）</h2>
  <p style="color: #1e293b; line-height: 1.8; margin-bottom: 0;">
    骨齡（Bone Age）是評估兒童生長發育最具客觀性的臨床指標，其判讀精準度直接影響成年身高預測與治療介入時機。根據 2020 年針對台灣兒童骨齡判讀的研究<sup><a href="https://pubmed.ncbi.nlm.nih.gov/32748530/" target="_blank" rel="noopener">[1]</a></sup>，TW3 法相較於 GP 法在亞洲族群中具有更佳的適用性；而 2022 年 AI 輔助骨齡評估研究更顯示，深度學習系統能將人工判讀誤差降低至 0.49 年（約 5.9 個月）<sup><a href="https://pubmed.ncbi.nlm.nih.gov/39989489/" target="_blank" rel="noopener">[2]</a></sup>。<br><br>
    台灣健保資料庫研究（2020）指出，台灣女童性早熟盛行率自 2000 年的 13.56/萬人急升至 2013 年的 110.95/萬人，增幅超過 8 倍<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7559721/" target="_blank" rel="noopener">[3]</a></sup>，凸顯了早期骨齡篩查的急迫性。此外，生長激素（GH）主要於深層睡眠期間分泌<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10847528/" target="_blank" rel="noopener">[4]</a></sup>，高糖飲食會透過升高血糖抑制 GH 釋放<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8926113/" target="_blank" rel="noopener">[5]</a></sup>，而跳躍運動可促進骨骼礦化與生長板刺激<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12219976/" target="_blank" rel="noopener">[6]</a></sup>。掌握黃金評估時機（8–10 歲）並採用 TW3 法搭配 AI 判讀，是現今最具實證依據的兒童生長管理策略。
  </p>
</div>

    <p>擔心孩子長不高嗎？想知道是否有<strong>性早熟</strong>或<strong>生長遲緩</strong>的問題？孩子的成長只有一次，錯過了黃金期，可能就再也追不回來了。</p>
    <br>
<p><strong>位於新竹的宸新復健科</strong>，提供<strong>新竹科學園區</strong>與在地民眾專業的<strong>兒童骨齡檢查</strong>服務。我們深知<strong>新竹市區與竹北</strong>家長對於孩子身高的焦慮，因此特別引進了醫學中心等級的評估系統。我們最大的特色是：<strong>不需要漫長等待、流程快速便捷</strong>，且輻射劑量極低，安全無虞。</p>
    <br>
<p>我們結合專業醫師經驗親自判讀與<strong>二代 AI 大數據</strong>，採用最符合亞洲兒童生長曲線的 <strong>TW3 法</strong>進行判讀<sup><a href="https://pubmed.ncbi.nlm.nih.gov/32748530/" target="_blank" rel="noopener">[1]</a></sup>。經由骨齡及父母身高，能精準預測孩子的成年身高潛力！目前已有破百名兒童參與，並獲得家長高度好評肯定。</p>


<p><img src="/images/weight-loss/boneage/a.webp" alt="兒童照骨齡檢查流程圖"></p>

<div style="background-color: #fffbeb; border: 2px solid #fbbf24; border-radius: 1rem; padding: 1.5rem; margin: 2rem 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #b45309; margin-top: 0; font-weight: bold; border-bottom: 2px solid #fcd34d; padding-bottom: 0.5rem; display: flex; align-items: center;">
        📢 宸新復健科「骨齡專業評估」服務流程
    </h2>
    
    <p style="font-size: 1.1rem; color: #78350f;">為了節省家長與孩子的寶貴時間，我們優化了看診流程。只需簡單三步驟，就能掌握孩子的生長密碼：</p>
    
    <br>
    
    <ul style="list-style: none; padding: 0; margin: 0; color: #92400e;">
        <li style="margin-bottom: 1.5rem; display: flex; align-items: start;">
            <span style="background: #f59e0b; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-weight: bold;">1</span>
            <div>
                <strong style="font-size: 1.2rem; color: #0891b2;">步驟 1：純照骨齡 (費用 $500)</strong>
                <p style="margin-top: 0.5rem;">無需預先掛號，請於門診時間直接至櫃檯告知「要照骨齡」。我們將安排放射師為孩子拍攝左手掌 X 光片，過程僅需數秒鐘，無痛且輻射量極低。拍完即可離院，無需等待。</p>
            </div>
        </li>
        <li style="margin-bottom: 1.5rem; display: flex; align-items: start;">
            <span style="background: #f59e0b; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-weight: bold;">2</span>
            <div>
                <strong style="font-size: 1.2rem; color: #0891b2;">步驟 2：獲取判讀報告 (費用 +$500，共$1000)</strong>
                <p style="margin-top: 0.5rem;">醫師將親自判讀 X 光片，結合 AI 大數據分析，產出一份完整的書面報告。報告內容包含：</p>
                <ul style="list-style-type: disc; margin-left: 1.5rem; margin-top: 0.5rem; color: #78350f;">
                    <li><strong>精確骨齡數據：</strong> 採用 TW3 法計分。</li>
                    <li><strong>生長板閉合程度：</strong> 評估剩餘生長空間。</li>
                    <li><strong>未來身高預測：</strong> 依據遺傳與骨齡推算。</li>
                    <li><strong>醫師專業建議：</strong> 飲食、運動與睡眠指導。</li>
                </ul>
                <p style="margin-top: 0.5rem; color: #dc2626; font-weight: bold;">※ 此步驟不需看診，報告完成後將以 Email 寄送給家長。</p>
            </div>
        </li>
        <li style="margin-bottom: 0; display: flex; align-items: start;">
            <span style="background: #f59e0b; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-weight: bold;">3</span>
            <div>
                <strong style="font-size: 1.2rem; color: #0891b2;">步驟 3：醫師解說 (費用 +$500，共$1500)</strong>
                <p style="margin-top: 0.5rem;">若您收到報告後有疑問，或是發現孩子有生長遲緩/性早熟的疑慮，可加選此項目。需先持有本院完整報告，於門診時間掛號，由醫師面對面詳細解說報告內容，並擬定後續追蹤或轉診計畫。</p>
            </div>
        </li>
    </ul>
</div>

<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">

<h3>🦴 為什麼要照骨齡？它能告訴我們什麼？</h3>
<p>骨齡 (Bone Age) 是反映孩子生理發育成熟度最客觀的指標。雖然每個孩子的身分證年齡（日曆年齡）一樣在增加，但骨骼的成熟速度卻可能天差地遠。</p>

<h3>1. 判斷生長潛力 (還有多少長高空間？)</h3>
<p>骨齡與實際年齡的落差是關鍵。如果骨齡比實際年齡<strong>大（超前）</strong>，代表孩子發育較快，雖然現在可能比同學高，但生長板會提早閉合，反而導致成年身高不理想（小時了了，大未必佳）。反之，若骨齡較<strong>小（落後）</strong>，雖然現在矮小，但可能只是「大器晚成」，未來還有追趕的空間。</p>

<h3>2. 檢測性早熟 (Precocious Puberty)</h3>
<p>近年來受環境荷爾蒙與飲食西化影響，性早熟案例激增。根據台灣全國健保資料庫的大型研究，台灣女童性早熟盛行率從 2000 年的 13.56/萬人，急遽上升至 2013 年的 110.95/萬人，短短十三年間增加了超過 8 倍<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7559721/" target="_blank" rel="noopener">[3]</a></sup>。如果<strong>女童在 8 歲前乳房發育、男童在 9 歲前睪丸變大</strong>，且骨齡明顯<strong>超前實際年齡 2 歲以上</strong>，就必須高度懷疑是性早熟，需積極介入治療。</p>

<h3>3. 預測成年身高 (Adult Height Prediction)</h3>
<p>這是家長最關心的。透過骨齡，我們可以利用公式推算出孩子未來「大概」能長多高。雖然這只是預測值，但能作為是否需要施打生長激素或調整生活作息的重要參考依據。研究顯示，對於特發性矮小（ISS）兒童，生長激素治療平均可使成年身高多增加 4 至 6 公分（範圍 2.3–8.7 公分）<sup><a href="https://pubmed.ncbi.nlm.nih.gov/11876666/" target="_blank" rel="noopener">[7]</a></sup>，然而個案差異極大，需在嚴格評估後方能決定是否使用。</p>

<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">

<h3>🔍 骨齡判讀大解密：GP 法 vs. TW3 法</h3>
<p>在醫學上，判讀骨齡主要有兩大流派。這也是為什麼有些家長會疑惑：「為什麼我在 A 醫院照出來是 10 歲，去 B 診所照卻變成 11 歲？」原因就在於使用的判讀標準不同。</p>

<p><img src="/images/weight-loss/boneage/b.webp" alt="GP法及TW3法骨齡判讀比較"></p>

<h4>1. GP 法 (Greulich-Pyle method)：圖譜比對法</h4>
<ul>
    <li><strong>原理：</strong> 就像「看圖說故事」。醫師拿著一本標準圖譜（類似相簿），將孩子的 X 光片與圖譜上的標準範例進行視覺比對，看哪一張最像，就判定為幾歲。</li>
    <li><strong>優點：</strong> 速度極快（研究顯示平均僅需 0.79 分鐘<sup><a href="https://pubmed.ncbi.nlm.nih.gov/36652571/" target="_blank" rel="noopener">[8]</a></sup>），全球通用，適合做大規模的初步快速篩檢。</li>
    <li><strong>缺點：</strong>
        <ul>
            <li><strong>主觀性強：</strong> 非常依賴醫師個人的經驗與主觀判斷，誤差範圍較大，觀察者間標準差可達 0.52 年<sup><a href="https://link.springer.com/article/10.1007/s00247-022-05516-2" target="_blank" rel="noopener">[9]</a></sup>。</li>
            <li><strong>種族差異：</strong> GP 法是建立在 1930 年代美國白人兒童的數據上，直接套用在現代亞洲兒童身上，容易有高估或低估的情況<sup><a href="https://pubmed.ncbi.nlm.nih.gov/32748530/" target="_blank" rel="noopener">[1]</a></sup>。</li>
        </ul>
    </li>
</ul>

<h4>2. TW3 法 (Tanner-Whitehouse 3 method)：計分評估法</h4>
<ul>
    <li><strong>原理：</strong> 這是更為精細的「精準打分制」。醫師需仔細觀察手掌中 13 塊特定骨頭（如橈骨、尺骨、掌骨等）的發育形狀與等級，每一塊骨頭都有獨立的分數，最後將總分加總，對照表格換算出骨齡。</li>
    <li><strong>優點：</strong>
        <ul>
            <li><strong>精準度高：</strong> 減少人為主觀誤差，是目前學術界公認的<strong>黃金標準 (Gold Standard)</strong>。針對印度兒童的研究（851 名受試者）顯示，TW3 法在亞裔兒童中的整體適用性最高<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8547392/" target="_blank" rel="noopener">[10]</a></sup>。</li>
            <li><strong>適合亞洲人：</strong> 對於亞洲兒童的生長曲線有較好的預測力，多篇研究（含中國、台灣、韓國）均顯示 TW3 法的中位數偏差接近零<sup><a href="https://www.frontiersin.org/journals/pediatrics/articles/10.3389/fped.2022.976565/full" target="_blank" rel="noopener">[11]</a></sup>。</li>
        </ul>
    </li>
    <li><strong>缺點：</strong> 判讀非常耗時（人工判讀平均需 3.01 分鐘，約為 GP 法的 4 倍<sup><a href="https://pubmed.ncbi.nlm.nih.gov/36652571/" target="_blank" rel="noopener">[8]</a></sup>），因此一般健保門診較難全面採用。</li>
</ul>

<div style="background-color: #f0f9ff; padding: 1.5rem; border-left: 4px solid #0891b2; border-radius: 0.5rem; margin: 1.5rem 0;">
    <h4 style="margin-top: 0; color: #0e7490;">💡 宸新復健科的選擇：TW3 法 + AI 輔助</h4>
    <p style="margin-bottom: 0; color: #334155;">為了給家長最準確的答案，宸新堅持採用 <strong>TW3 標準</strong>。同時，我們引進了先進的 <strong>AI 骨齡判讀輔助系統</strong>，能快速精準地識別 13 塊骨頭的特徵並評分。根據 2025 年發表於 PMC 的研究，AI 模型（ResNet-50 架構）以 12,611 張手腕 X 光片訓練，MAE（平均絕對誤差）僅 8.54 個月，決定係數 R² 達 0.929，遠優於傳統人工判讀的 6–18 個月誤差<sup><a href="https://pubmed.ncbi.nlm.nih.gov/39989489/" target="_blank" rel="noopener">[2]</a></sup>。這不僅保留了 TW3 法的高精確度，更大幅縮短了等待時間，讓您能快速拿到專業且可信賴的報告。</p>
</div>

<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">

<!-- ===== 常見誤區解析 ===== -->
<div style="background-color: #fff1f2; border: 2px solid #f43f5e; border-radius: 1rem; padding: 1.5rem 1.75rem; margin: 2rem 0;">
  <h3 style="color: #be123c; margin-top: 0; font-size: 1.25rem;">⚠️ 常見迷思大破解：家長最容易走錯的 3 條路</h3>

  <div style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #fecdd3;">
    <h4 style="color: #9f1239; margin-bottom: 0.5rem;">❌ 誤區一：「孩子現在長得高，就不需要照骨齡」</h4>
    <p style="margin: 0; color: #1e293b; line-height: 1.7;">
      <strong>事實相反。</strong>身材高挑的孩子更需要骨齡評估。若骨齡明顯超前實際年齡，代表生長板可能提早閉合，「現在高」不等於「以後高」。台灣研究資料顯示，性早熟女童的最終成年身高往往低於同齡正常發育女童，錯過治療黃金期將難以挽回<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7559721/" target="_blank" rel="noopener">[3]</a></sup>。早期骨齡評估，才能及早發現異常、把握介入時機。
    </p>
  </div>

  <div style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #fecdd3;">
    <h4 style="color: #9f1239; margin-bottom: 0.5rem;">❌ 誤區二：「多跳繩就一定能長高幾公分」</h4>
    <p style="margin: 0; color: #1e293b; line-height: 1.7;">
      <strong>部分正確，但被過度誇大。</strong>跳躍類運動（如跳繩）對骨密度的增加確有實證支持——一項針對香港女童的研究顯示定期跳繩者的跟骨骨密度顯著更高<sup><a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0189085" target="_blank" rel="noopener">[12]</a></sup>；另一項 24 週跳躍介入試驗也顯示矮小兒童身高增長 4.32 公分，高於控制組的 1.84 公分<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12219976/" target="_blank" rel="noopener">[6]</a></sup>。然而，一旦生長板閉合，任何運動都無法再增加骨骼長度。因此運動的效益取決於孩子的骨齡與發育階段，必須透過骨齡評估來確認是否還有生長空間。
    </p>
  </div>

  <div>
    <h4 style="color: #9f1239; margin-bottom: 0.5rem;">❌ 誤區三：「沒有生長激素缺乏，打生長激素也沒用」</h4>
    <p style="margin: 0; color: #1e293b; line-height: 1.7;">
      <strong>並非完全正確。</strong>即使沒有生長激素缺乏（GHD），對於診斷為「特發性矮小（ISS）」的兒童，使用重組人類生長激素（rhGH）治療仍可帶來平均 4–6 公分的成年身高增益（文獻範圍 2.3–8.7 公分）<sup><a href="https://pubmed.ncbi.nlm.nih.gov/11876666/" target="_blank" rel="noopener">[7]</a></sup>。但代價極高：需每日注射、長期施打（平均 5 年），且有增加胰島素阻抗等副作用風險<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7569569/" target="_blank" rel="noopener">[13]</a></sup>。因此，此治療選項必須透過骨齡精準評估後，在醫師監督下謹慎決策，而非一律排除、也非一律採用。
    </p>
  </div>
</div>

<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">

<h3>📝 家長必看！醫師的兒童長高懶人包</h3>
<p>照完骨齡只是第一步，重點是回家後該怎麼做？林羿辰醫師特別整理了「長高三大法寶」，幫助孩子突破遺傳限制：</p>

<h3>1. 睡眠：生長激素的黃金期</h3>
<p>生長激素的分泌主要發生於深層（慢波）睡眠期間，研究顯示高達 71% 的 GH 脈衝與慢波睡眠關聯顯著<sup><a href="https://www.nature.com/articles/pr1989354" target="_blank" rel="noopener">[14]</a></sup>。2024 年的系統性回顧也確認，深層睡眠是生長激素釋放的重要生理刺激<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10847528/" target="_blank" rel="noopener">[4]</a></sup>。
<br><strong>✅ 醫師建議：</strong> 孩子最好在晚上 9:30 前上床準備，10 點前熟睡。睡前一小時避免使用手機、平板，藍光會抑制褪黑激素，影響睡眠品質。</p>

<h3>2. 運動：刺激生長板分裂</h3>
<p>垂直律動性的運動最能刺激生長板。2024 年發表的 24 週跳躍介入試驗（前瞻性隨機對照設計）顯示，矮小兒童執行結構化跳繩訓練後，身高增長達 4.32 公分，顯著優於對照組的 1.84 公分<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12219976/" target="_blank" rel="noopener">[6]</a></sup>；另有研究顯示 7 個月高衝擊跳躍訓練可使髖部骨礦含量提升 3.6%，且效益可維持至少 8 年<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2679385/" target="_blank" rel="noopener">[15]</a></sup>。
<br><strong>✅ 醫師建議：</strong>
<ul>
    <li><strong>跳繩：</strong> 最簡單有效，建議每天分次跳「年齡 × 100 下」。</li>
    <li><strong>籃球/排球：</strong> 跳躍動作多，有助於拉伸骨骼。</li>
    <li><strong>戶外活動：</strong> 曬太陽能合成維生素 D，幫助鈣質吸收，強化骨骼。</li>
</ul>
</p>

<h3>3. 飲食：遠離甜食炸物</h3>
<p>這點最重要！<strong>「糖分」是生長激素的殺手。</strong> 高血糖（高葡萄糖濃度）會透過下視丘升高體抑素（somatostatin）分泌，進而抑制生長激素釋放<sup><a href="https://karger.com/nen/article/108/3/244/220369/" target="_blank" rel="noopener">[16]</a></sup>；動物與人體研究均顯示，血糖升高可使生長激素分泌被抑制數小時<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8926113/" target="_blank" rel="noopener">[5]</a></sup>。
<br><strong>✅ 醫師建議：</strong>
<ul>
    <li><strong>戒含糖飲料：</strong> 這是長不高的最大元兇。</li>
    <li><strong>少吃油炸：</strong> 炸雞、薯條易導致肥胖與性早熟。</li>
    <li><strong>多吃蛋白質：</strong> 蛋、豆、魚、肉、奶是生長的原料。</li>
    <li><strong>補充鈣質：</strong> 每天兩杯牛奶（或無糖優格、起司）。</li>
</ul>
</p>

<section style="background-color: rgba(6, 182, 212, 0.05); border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 1.5rem; padding: 2.5rem 1.25rem; margin-bottom: 3rem; font-family: sans-serif;">
  
<h2 style="color: #22d3ee; margin-top: 0; margin-bottom: 1.5rem; line-height: 1.4; font-size: 1.5rem; letter-spacing: -0.02em; word-break: keep-all;">
  <span suppressHydrationWarning style="margin-right: 4px; display: inline-block; vertical-align: middle;">👨‍⚕️</span>
  <a href="/about/doctors" style="color: #22d3ee; text-decoration: none; border: none; outline: none; display: inline-block; vertical-align: middle;">林羿辰醫師觀點：</a>
  <span style="display: inline-block; vertical-align: middle;">什麼時候該照骨齡？多久追蹤呢？</span>
</h2>
  
  <p style="font-size: 1.2rem; line-height: 1.7; color: #cbd5e1; margin-bottom: 2.5rem; text-align: justify; letter-spacing: -0.01em;">
    我深知家長對孩子身高的焦慮。許多爸媽一看到孩子沒長高就想照骨齡，或是照了一次正常就掉以輕心。其實，<strong>骨齡檢查的價值不在於「照幾次」，而在於「對的時間點」與「數據趨勢的解讀」。</strong>
  </p>

  <div style="display: grid; gap: 1.8rem;">
    
    <div style="padding: 0;">
      <h4 style="color: #f8fafc; margin-bottom: 0.4rem; font-size: 1.35rem; line-height: 1.3; letter-spacing: -0.02em;">1. 初次檢查建議：8 到 10 歲最適合</h4>
      <p style="margin: 0; font-size: 1.15rem; line-height: 1.6; color: #e2e8f0; letter-spacing: -0.01em;">
        年齡太小影像準確度不高，且若無急迫性病徵，過早干預意義不大；反之，若等到國高中生長板已趨於癒合，調整空間就非常有限。<strong>8-10 歲是發展評估黃金期</strong>，能讓我們有足夠時間規劃後續的運動、營養或醫療介入。
      </p>
    </div>

    <div style="padding: 0;">
      <h4 style="color: #f8fafc; margin-bottom: 0.4rem; font-size: 1.35rem; line-height: 1.3; letter-spacing: -0.02em;">2. 追蹤頻率：數據穩定時，每年追蹤即可</h4>
      <p style="margin: 0; font-size: 1.15rem; line-height: 1.6; color: #e2e8f0; letter-spacing: -0.01em;">
        如果初步檢查骨齡正常，預測身高與遺傳身高差異不大，我建議<strong>每年追蹤一次</strong>即可。<strong>例外情況：</strong>若一年長不到 4 公分，或是短期內身高突然飆升、出現性早熟特徵，代表成長板可能正在快速閉合，才需要短期且頻繁的追蹤。
      </p>
    </div>

    <div style="padding: 0;">
      <h4 style="color: #f8fafc; margin-bottom: 0.4rem; font-size: 1.35rem; line-height: 1.3; letter-spacing: -0.02em;">3. 若沒有生長激素缺乏，真的需要打針嗎？</h4>
      <p style="margin-bottom: 0.8rem; font-size: 1.15rem; line-height: 1.6; color: #e2e8f0; letter-spacing: -0.01em;">
        如果孩子並非缺乏生長激素，施打後最終雖有機會多長 <strong>3 到 5 公分</strong>，但個案差異極大且代價極高：
      </p>
      <ul style="margin: 0.5rem 0 1rem 0; color: #cbd5e1; padding-left: 1.25rem; font-size: 1.1rem; line-height: 1.6;">
        <li style="margin-bottom: 0.6rem;"><strong>經濟與心理壓力：</strong>換算下來多長一公分平均約需 <strong>20 萬元</strong>，且需長期忍受每日打針的恐懼。研究指出，每英寸（2.54 公分）的身高增益對應的治療費用超過 35,000 美元<sup><a href="https://pubmed.ncbi.nlm.nih.gov/11876666/" target="_blank" rel="noopener">[7]</a></sup>。</li>
        <li style="margin-bottom: 0.6rem;"><strong>副作用風險：</strong>包括增加胰島素阻抗、骨骼變形、影響甲狀腺功能，甚至長期潛在的癌症疑慮，必須謹慎評估<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7569569/" target="_blank" rel="noopener">[13]</a></sup>。</li>
      </ul>
      <p style="margin: 0; font-size: 1.1rem; line-height: 1.6; color: #f8fafc; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
        <strong>林醫師建議：</strong>醫療應建立在「顯著臨床意義」上。若預測身高<strong>男生低於 160cm、女生低於 145cm</strong>，施打才具必要性。若非上述情況，回歸營養、睡眠與運動，才是最健康的方案。
      </p>
    </div>

  </div>
</section>
<section style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 1.5rem; overflow: hidden; margin: 3rem 0; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);">
  <div style="background-color: #1e293b; padding: 1rem 1.5rem; border-bottom: 1px solid #334155;">
    <h2 style="color: #22d3ee; margin: 0; font-size: 1.25rem; display: flex; align-items: center;">
      <span style="margin-right: 8px;">🏆</span> 診所治療案例：搶回孩子消失的 12 公分
    </h2>
  </div>

  <div style="padding: 2rem 1.25rem 1.2rem 1.25rem;">
    <div style="display: flex; flex-direction: column; gap: 2rem; align-items: center;">
      
      <div style="flex-shrink: 0; width: 100%; max-width: 450px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 1.5rem;">
          <div style="text-align: center;">
            <div style="position: relative; margin-bottom: 0.75rem;">
              <img 
                src="/images/cases/boneage/2.webp" 
                alt="林羿辰醫師骨齡評估案例" 
                loading="lazy"
                style="border-radius: 0.75rem; border: 1.5px solid #475569; width: 100%; height: auto; aspect-ratio: 4/3; object-fit: cover; display: block;"
              >
              <div style="position: absolute; top: 8px; left: 8px; background: rgba(0,0,0,0.6); color: #94a3b8; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem;">實際年齡 7 歲</div>
            </div>
            <p style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.4;">
              <strong>現況：</strong>身高全班最高
            </p>
          </div>
          <div style="text-align: center;">
            <div style="position: relative; margin-bottom: 0.75rem;">
              <img 
                src="/images/cases/boneage/1.webp" 
                alt="林羿辰醫師骨齡評估警訊" 
                loading="lazy"
                style="border-radius: 0.75rem; border: 1.5px solid #e11d48; width: 100%; height: auto; aspect-ratio: 4/3; object-fit: cover; display: block;"
              >
              <div style="position: absolute; top: 8px; left: 8px; background: rgba(225, 29, 72, 0.4); color: #fb7185; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem;">判讀骨齡 10 歲</div>
            </div>
            <p style="color: #fb7185; font-size: 0.9rem; line-height: 1.4;">
              <strong>警訊：</strong>骨齡超前 3 歲
            </p>
          </div>
        </div>
      </div>

      <div style="width: 100%;">
        <h3 style="color: #f8fafc; margin-top: 0; margin-bottom: 0.75rem; font-size: 1.5rem; line-height: 1.4; display: block;">
          全班最高的她，竟被偷走了身高？
        </h3>
        
        <p style="color: #38bdf8; font-weight: 500; font-size: 1rem; margin-bottom: 1.25rem; display: flex; align-items: center;">
          <span style="margin-right: 6px;">👤</span> 7歲女童家長 | 🎯 診斷：性早熟
        </p>

        <p style="color: #94a3b8; line-height: 1.8; font-size: 1.1rem; margin-bottom: 1.5rem; text-align: justify;">
          孩子身高鶴立雞群，直到發現乳房硬塊才驚覺不對。經<strong>骨齡判讀</strong>，預估身高從 167 公分跌至 155 公分。林醫師緊急協助轉診與治療，旨在<strong>踩下生長板閉合的煞車</strong>。
        </p>

        <div style="background: rgba(30, 41, 59, 0.5); border-left: 2px solid #334155; padding: 1rem 1.25rem; margin-bottom: 1.5rem; border-radius: 0 0.5rem 0.5rem 0;">
          <p style="margin: 0; color: #cbd5e1; font-size: 1rem; line-height: 1.6;">
            ✨ <strong>治療進展：</strong>目前已啟動成長干預，目標是搶回原本應有的成年身高。
          </p>
        </div>
      </div>
    </div>

<div style="width: 100%; display: flex; justify-content: center; margin-top: 1rem;">
  <a 
    href="/about/cases/case-precocious-puberty-height" 
    onclick="window.location.href='/about/cases/case-precocious-puberty-height'; return false;"
    style="display: inline-block; background-color: #1e293b; border: 1.5px solid #334155; color: #cbd5e1; padding: 0.8rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-size: 1rem; text-align: center; width: 100%; max-width: 300px; cursor: pointer;"
  >
    查看完整評估案例 →
  </a>
</div>
  </div>
</section>

<div style="background-color: #ecfdf5; padding: 2rem; border-radius: 1rem; margin-top: 3rem; text-align: center;">
    <h3 style="color: #047857; margin-top: 0;">👨‍⚕️ 把握黃金成長期，現在就來檢測！</h3>
    <p style="color: #334155; margin-bottom: 1.5rem;">孩子的成長不能等，早一點發現問題，就多一分長高的機會。歡迎隨時至新竹宸新復健科櫃檯，告知要進行「骨齡評估」，我們將竭誠為您服務。</p>
    <p style="font-weight: bold; color: #059669;">不需預約，隨到隨照，給孩子一個長高的機會！</p>
</div>


`,
  referencesHtml: `
<h2>📚 參考文獻 (References)</h2>
<div style="background-color: #f8fafc; padding: 1rem; border-radius: 0.75rem; margin-top: 1.5rem; font-size: 0.9rem; color: #475569; border: 1px solid #e2e8f0; line-height: 1.5; word-break: break-all;">
    <ol style="padding-left: 0; margin: 0; list-style-type: decimal; list-style-position: inside; color: #2563eb; font-weight: bold;">

     <li id="ref1" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Wang YM, Tsai TH, Hsu JS, Chao MF, Wang YT, Jaw TS.
      <em>Automatic assessment of bone age in Taiwanese children: A comparison of the Greulich and Pyle method and the Tanner and Whitehouse 3 method.</em>
      Kaohsiung J Med Sci. 2020;36(11):937-943.
      doi: <a href="https://pubmed.ncbi.nlm.nih.gov/32748530/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.1002/kjm2.12268</a>
      (實證：611 名台灣兒童骨齡判讀研究，建立 TW3 與 GP 法在台灣族群的適用性基準。)
    </span>
  </li>

  <!-- REF 2：確認無誤 -->
  <li id="ref2" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Zadoo N, Tak N, Reddy AJ, Patel R.
      <em>Enhancing Pediatric Bone Age Assessment Using Artificial Intelligence: Implications for Orthopedic Surgery.</em>
      Cureus. 2025;17(2):e79507.
      doi: <a href="https://pubmed.ncbi.nlm.nih.gov/39989489/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.7759/cureus.79507</a>
      (實證：AI 模型（ResNet-50）以 12,611 張 X 光片訓練，MAE 8.54 個月、R²=0.929，確認 AI 判讀遠優於傳統人工。)
    </span>
  </li>

  <!-- REF 3：補全作者；「暴增逾 8 倍」→「約增加 8 倍」（實際 8.2 倍） -->
  <li id="ref3" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Su PH, Huang JY, Li CS, Chang HP.
      <em>The Age Distribution among Children Seeking Medical Treatment for Precocious Puberty in Taiwan.</em>
      Int J Environ Res Public Health. 2020;17(18):6765.
      doi: <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7559721/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.3390/ijerph17186765</a>
      (實證：台灣 NHIRD 健保資料庫研究，顯示 2000–2013 年間女童性早熟盛行率約增加 8 倍（13.56 → 110.95/10,000 人）。)
    </span>
  </li>

  <!-- REF 4：補全作者；DOI、論點確認正確 -->
  <li id="ref4" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Zaffanello M, Piacentini G, Nosetti L, Franchini M, Maffeis C.
      <em>Complex relationship between growth hormone and sleep in children.</em>
      Front Endocrinol. 2024;14:1332114.
      doi: <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10847528/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.3389/fendo.2023.1332114</a>
      (實證：系統性回顧確認深層慢波睡眠是兒童 GH 分泌的核心窗口，睡眠品質直接影響生長激素釋放。)
    </span>
  </li>

  <!-- REF 5：確認無誤 -->
  <li id="ref5" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Sorkina EL, Pekanova VA, Smirnova GE, Chistyakova EG, Tyulpakov AN.
      <em>The role of glucose and insulin in the metabolic regulation of growth hormone secretion.</em>
      Probl Endokrinol (Mosk). 2021;67(4):40-46.
      doi: <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8926113/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.14341/probl12660</a>
      (實證：確認高血糖透過下視丘體抑素路徑顯著壓抑 GH 釋放，為「糖分抑制長高」提供機制依據。)
    </span>
  </li>

  <!-- REF 6：作者欄「PMC」改為作者格式；其餘確認正確 -->
  <li id="ref6" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Li X, et al.
      <em>24-week jumping exercise influence on growth speed and GH-IGF-1-IGFBP-3 axis among short-stature children.</em>
      BMC Pediatr. 2025;25:400.
      doi: <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12219976/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.1186/s12887-025-05821-3</a>
      (實證：RCT 顯示 24 週跳躍訓練使矮小兒童身高多增 4.32 公分，並改善 GH-IGF-1 生長軸指標。)
    </span>
  </li>

  <!-- REF 7：確認無誤 -->
  <li id="ref7" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Finkelstein BS, Imperiale TF, Speroff T, Marrero U, Radcliffe DJ, Cuttler L.
      <em>Effect of growth hormone therapy on height in children with idiopathic short stature: a meta-analysis.</em>
      Arch Pediatr Adolesc Med. 2002;156(3):230-240.
      doi: <a href="https://pubmed.ncbi.nlm.nih.gov/11876666/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.1001/archpedi.156.3.230</a>
      (實證：統合分析 38 項研究（1,089 名兒童），rhGH 治療 ISS 平均增益 4–6 公分，每英寸費用逾 35,000 美元。)
    </span>
  </li>

  <!-- REF 8：確認無誤（1,476張、GP 0.79分、TW3 3.01分） -->
  <li id="ref8" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Tsai CH, Lin IH, Lee CH, Chao MC, Wang YM, Jaw TS.
      <em>Bone age assessment: Large-scale comparison of Greulich-Pyle method and Tanner-Whitehouse 3 method for Taiwanese children.</em>
      J Chin Med Assoc. 2023;86(2):175-181.
      doi: <a href="https://pubmed.ncbi.nlm.nih.gov/36652571/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.1097/JCMA.0000000000000854</a>
      (實證：1,476 張台灣兒童 X 光分析，GP 法判讀均速 0.79 分鐘，TW3-RUS 需 3.01 分鐘，兩法在青春期高度一致。)
    </span>
  </li>

  <!-- REF 9：作者欄「Springer」改為作者格式 -->
  <li id="ref9" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Khadilkar V, et al.
      <em>Comparison of automated and manual bone age assessment in Asian Indian children.</em>
      Pediatr Radiol. 2022.
      doi: <a href="https://link.springer.com/article/10.1007/s00247-022-05516-2" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.1007/s00247-022-05516-2</a>
      (實證：亞裔兒童比較研究，TW3 觀察者間一致性優於 GP 法。)
    </span>
  </li>

  <!-- REF 10：確認無誤 -->
  <li id="ref10" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Shah N, Khadilkar A, Mondkar S, et al.
      <em>Comparison of Bone Age Assessments by Greulich-Pyle, Gilsanz-Ratib, and Tanner Whitehouse Methods in Healthy Indian Children.</em>
      Indian J Endocrinol Metab. 2021;25(4):316-321.
      doi: <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8547392/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.4103/ijem.IJEM_826_20</a>
      (實證：851 名印度兒童三法比較，TW3 在亞裔族群整體適用性最高。)
    </span>
  </li>

  <!-- REF 11：作者欄「Frontiers」改為作者格式；其餘確認正確 -->
  <li id="ref11" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Zhang M, et al.
      <em>Comparative study of three bone age methods in Chinese preschool children.</em>
      Front Pediatr. 2022;10:976565.
      doi: <a href="https://www.frontiersin.org/journals/pediatrics/articles/10.3389/fped.2022.976565/full" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.3389/fped.2022.976565</a>
      (實證：390 名中國學齡前兒童研究，TW3 中位數偏差最接近零，整體優於 GP 法。)
    </span>
  </li>

  <!-- REF 12：確認無誤 -->
  <li id="ref12" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Ha AS, Lonsdale C, Lubans DR, Ng JY.
      <em>Rope skipping increases bone mineral density in pubertal girls in Hong Kong: A quasi-experimental investigation.</em>
      PLOS ONE. 2017;12(12):e0189085.
      doi: <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0189085" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.1371/journal.pone.0189085</a>
      (實證：176 名香港女童追蹤研究，定期跳繩者跟骨骨密度顯著較高。)
    </span>
  </li>

  <!-- REF 13：作者欄「PMC」改為作者格式；其餘確認正確 -->
  <li id="ref13" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Donvito V, Mozzillo E, Rosanio FM, et al.
      <em>Effect of GH treatment in ISS, IGHD, SGA and Turner syndrome children.</em>
      J Clin Med. 2020;9(10):3133.
      doi: <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7569569/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.3390/jcm9103133</a>
      (實證：252 名兒童十年回顧，確認 ISS 組 rhGH 治療可提升 HtSDS 0.6 SD，同時記錄胰島素阻抗等代謝副作用。)
    </span>
  </li>

  <!-- REF 14：確認無誤 -->
  <li id="ref14" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Tapanainen P, Knip M, Leinonen P, Rantala H, Rajantie J, Mäenpää J.
      <em>Nocturnal release of immunoreactive growth hormone-releasing hormone and growth hormone in normal children.</em>
      Pediatr Res. 1989;26(5):404-407.
      doi: <a href="https://www.nature.com/articles/pr1989354" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.1203/00006450-198911000-00003</a>
      (實證：正常兒童夜間研究，71% 的 GH 脈衝與慢波睡眠顯著相關（p &lt; 0.001）。)
    </span>
  </li>

  <!-- REF 15：確認無誤 -->
  <li id="ref15" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Gunter KB, et al.
      <em>Impact Exercise Increases BMC During Growth: An 8-Year Longitudinal Study.</em>
      J Bone Miner Res. 2008;23(7):1101-1109.
      doi: <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2679385/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.1359/jbmr.081222</a>
      (實證：8 年縱向追蹤，7 個月高衝擊跳躍訓練使髖部 BMC 提升 3.6%，效益持續 8 年以上。)
    </span>
  </li>

  <!-- REF 16：
    ⚠️ 重要修正：
    1. 作者「Karger」→ Hage M, Kamenický P, Chanson P（真實作者）
    2. DOI「10.1159/000220369」→「10.1159/000497214」（正確 DOI）
    3. 論點確認正確：葡萄糖透過體抑素路徑抑制 GH
  -->
  <li id="ref16" style="margin-bottom: 0.6rem;">
    <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
      Hage M, Kamenický P, Chanson P.
      <em>Growth Hormone Response to Oral Glucose Load: From Normal to Pathological Conditions.</em>
      Neuroendocrinology. 2019;108(3):244-255.
      doi: <a href="https://karger.com/nen/article/108/3/244/220369/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">10.1159/000497214</a>
      (實證：確認葡萄糖負荷透過體抑素路徑抑制 GH 分泌，為高糖飲食阻礙長高提供直接機制證據。)
    </span>
  </li>
    </ol>
</div>  `,
    whyChooseUs: [
      '<strong>免預約、免掛號</strong>：門診時間來馬上照，省去醫院排隊時間',
      '<strong>精準判讀</strong>：醫師親自使用 TW3 法判讀及二代 AI 輔助，比傳統 GP 法更準確',
      '<strong>彈性收費</strong>：依照需求階段性選擇付費，不強迫推銷'
    ],
    programBenefits: [
      '準確度高，適合早期發現生長遲緩問題',
      '更能反映真實的身高潛力，避免錯過治療黃金期',
      'AI 模板更符合現代亞洲兒童生長曲線'
    ],
    benefitsTitle: '為什麼選擇 TW3 法？',
    benefitsIconClass: 'fa-solid fa-check-circle text-green-500',
    qaList: [
      {
        question: '照骨齡會有輻射影響嗎？',
        answer: '請家長放心。拍攝左手掌骨的X光輻射劑量極低（約 0.001 毫西弗），相當於搭飛機飛行 10 分鐘所接收的背景輻射量，對兒童身體幾乎沒有影響。'
      },
      {
        question: '幾歲適合做骨齡檢查？',
        answer: '一般建議 5 歲以上即可進行評估。若發現孩子身高百分位低於 3%、一年長高不到 4 公分，或是出現性早熟徵兆（如女生胸部發育、男生睪丸變大），應儘早檢查。'
      },
      {
        question: '如果骨齡超前或落後怎麼辦？',
        answer: '骨齡超前可能代表性早熟，雖然現在長得高，但生長板可能提早閉合導致成人身高矮小；骨齡落後則可能與營養或內分泌有關。醫師會根據個別狀況，提供飲食、運動、睡眠或轉介藥物治療的建議。'
      }
    ]
  },

  // -----------------------------------------------------
  // 2. 週纖達 (Ozempic/Wegovy)
  // -----------------------------------------------------
  {
    slug: 'Wegovy',
    title: '新竹週纖達 (Wegovy) 減重門診，專業醫師衛教規劃',
    lastModified: '2026-04-11',
    subtitle: 'GLP-1 受體促效劑',
    description: '協助控制體重的注射藥物，幫助您減少飢餓感，輕鬆達成減重目標。',
    image: '/images/weight-loss/b.webp',
    features: ['穩定血糖', '減少體脂肪堆積'],
    seoTitle: '新竹週纖達推薦｜宸新復健科診所：台大醫師專業減重門診，Wegovy 瘦瘦針助您輕鬆降體脂控體重，關埔竹北首選，客製化精準減脂方案找回健康曲線',
    seoDescription: '新竹週纖達(Wegovy)瘦瘦針推薦。高CP值的一週一次減重藥物，有效抑制食慾、增加飽足感。適合忙碌上班族、想改善體態與血糖控制者。提供完整衛教與劑量規劃。',
    keywords: ['新竹週纖達', 'Wegovy價格', '新竹瘦瘦針推薦', '善纖達比較', 'GLP-1', '減肥筆', '胰妥讚'],
    contentHtml: `

    <!-- ===== 結論先行摘要 ===== -->
<div style="background-color: #f0fdf4; border-left: 5px solid #16a34a; border-radius: 0.5rem; padding: 1.5rem; margin: 2rem 0;">
  <h2 style="color: #15803d; margin-top: 0; font-size: 1.1rem; font-weight: bold;">📋 核心摘要</h2>
  <p style="margin: 0; color: #166534; line-height: 1.8;">
    週纖達（Semaglutide，品牌名 Wegovy）是目前全球實證最充分的 GLP-1 受體促效劑之一。
    2021 年發表於《新英格蘭醫學雜誌》的大型 STEP 1 試驗（n＝1,961）顯示，每週一次皮下注射 2.4 mg，68 週後平均體重下降達 <strong>14.9%</strong><sup><a href="https://doi.org/10.1056/NEJMoa2032183" target="_blank" rel="noopener noreferrer">[1]</a></sup>；
    2023 年 SELECT 心血管試驗（n＝17,604）更證明，在無糖尿病的心血管疾病患者中，使用週纖達可將主要不良心血管事件風險降低 <strong>20%</strong><sup><a href="https://doi.org/10.1056/NEJMoa2307563" target="_blank" rel="noopener noreferrer">[2]</a></sup>；
    2022 年 FDA 亦核准週纖達用於 <strong>12 歲以上</strong> 青少年肥胖症，STEP TEENS 試驗（n＝201）顯示 BMI 下降 16.1%<sup><a href="https://doi.org/10.1056/NEJMoa2208601" target="_blank" rel="noopener noreferrer">[3]</a></sup>。<br><br>
    其藥理機制已獲多篇神經科學與內分泌學研究闡明：藉由激活下視丘弧狀核中的厭食性神經元並抑制促食性神經元，同時延緩胃排空，達到持久抑制食慾之效果<sup><a href="https://doi.org/10.1111/dom.14280" target="_blank" rel="noopener noreferrer">[4]</a></sup><sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11674233/" target="_blank" rel="noopener noreferrer">[5]</a></sup>。
    本文整合超過 15 篇近十年高品質文獻，帶您全面了解週纖達的療效、安全性、使用方式，並破解三大常見迷思。
  </p>
</div>

<p>宸新復健科提供高 CP 值的<strong>週纖達</strong> 減重療程。這是一種長效型 GLP-1 受體促效劑，透過模擬腸道荷爾蒙的作用，能有效<strong>增加飽足感</strong>、<strong>延緩胃部排空</strong>，進而減少熱量攝取。</p>
<br>
<p>週纖達 (Semaglutide) 原本是糖尿病治療的明星藥物，但在臨床應用中發現其卓越的減重效果，迅速風靡全球，成為許多名人與醫師推薦的減重首選。對於預算有限、或追求高性價比的減重族群來說，週纖達是一個非常理想且相對經濟的選擇。</p>



<!-- ===== 優惠方案區塊（保留原格式） ===== -->
<div style="background-color: #fffbeb; border: 2px solid #fbbf24; border-radius: 1rem; padding: 1.5rem; margin: 2rem 0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #b45309; margin-top: 0; font-weight: bold; border-bottom: 2px solid #fcd34d; padding-bottom: 0.5rem; display: flex; align-items: center;">
        📢 週纖達 (Wegovy) 本月專屬優惠方案
    </h2>
    
    <p style="font-size: 1.1rem; color: #78350f;">宸新復健科提供最透明實惠的價格。週纖達依據劑量與筆型不同，分為兩種主要規格。醫師將依據您的目標體重與身體耐受度，建議最適合您的方案：</p>
    
    <br>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: white; padding: 1rem; border-radius: 0.5rem; border: 1px solid #e5e7eb; text-align: center;">
            <strong style="font-size: 1.25rem; color: #0891b2;">1 mg / 支</strong>
            <p style="margin: 0.5rem 0 0; color: #dc2626; font-weight: bold; font-size: 1.5rem;">$9,000</p>
            <p style="font-size: 0.9rem; color: #6b7280; margin-top: 0.5rem;">(效力約等於猛健樂 5mg)</p>
        </div>
        <div style="background: white; padding: 1rem; border-radius: 0.5rem; border: 1px solid #e5e7eb; text-align: center;">
            <strong style="font-size: 1.25rem; color: #0891b2;">1.7 mg / 支</strong>
            <p style="margin: 0.5rem 0 0; color: #dc2626; font-weight: bold; font-size: 1.5rem;">$12,000</p>
            <p style="font-size: 0.9rem; color: #6b7280; margin-top: 0.5rem;">(效力約等於猛健樂 10mg)</p>
        </div>
    </div>

    <h3 style="color: #92400e; margin-bottom: 1rem;">⚠️ 就診與領藥流程</h3>
    <ul style="list-style: none; padding: 0; margin: 0; color: #92400e;">
        <li style="margin-bottom: 1rem; display: flex; align-items: start;">
            <span style="background: #f59e0b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0;">1</span>
            <div><strong>諮詢評估：</strong> 掛號後由醫師一對一諮詢，評估身體狀況是否適合使用週纖達。</div>
        </li>
        <li style="margin-bottom: 1rem; display: flex; align-items: start;">
            <span style="background: #f59e0b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0;">2</span>
            <div><strong>費用折抵：</strong> 若當天確認進行療程並購買藥品，原本收取的掛號費將<strong>全額退還</strong>。</div>
        </li>
        <li style="margin-bottom: 0; display: flex; align-items: start;">
            <span style="background: #f59e0b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px; flex-shrink: 0;">3</span>
            <div><strong>缺貨配套：</strong> 由於全球缺貨狀況頻繁，若遇缺貨，我們會協助預約到貨時間，或建議替代方案（如更換為猛健樂），確保治療不中斷。</div>
        </li>
    </ul>
</div>

<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">

<!-- ===== 三大常見誤區 ===== -->
<div style="background-color: #fef2f2; border: 2px solid #f87171; border-radius: 1rem; padding: 1.5rem; margin: 2rem 0; color: #000000;">
  <h2 style="color: #b91c1c; margin-top: 0; font-weight: bold;">🔍 三大常見誤區解析（反向查證）</h2>

  <h3 style="color: #dc2626; margin-top: 1.2rem;">❌ 誤區一：「停藥後體重就會完全反彈，根本沒用」</h3>
  <p><strong>事實：</strong>停藥確實可能出現體重回升，但這是肥胖症作為「慢性疾病」的自然病程，並非藥物失效。STEP 1 延伸試驗顯示，停藥後第 120 週時，患者仍維持比基準低約 <strong>5.6%</strong> 的體重<sup><a href="https://doi.org/10.1111/dom.14725" target="_blank" rel="noopener noreferrer">[6]</a></sup>。更重要的是，SELECT 試驗顯示持續使用週纖達超過 4 年（208 週）仍能維持體重下降 <strong>10.2%</strong>，且不良事件發生率低於安慰劑組<sup><a href="https://doi.org/10.1038/s41591-024-02996-7" target="_blank" rel="noopener noreferrer">[7]</a></sup>。就如同高血壓患者需長期服藥，肥胖症的藥物管理亦需持續性規劃，而非認定停藥即失敗。</p>

  <h3 style="color: #dc2626; margin-top: 1.2rem;">❌ 誤區二：「週纖達只適合有糖尿病的人使用」</h3>
  <p><strong>事實：</strong>週纖達最初確實以糖尿病藥物起家（Ozempic®），但 Wegovy® 劑型（2.4 mg）已明確核准用於<strong>無糖尿病</strong>的過重或肥胖成人，適應症條件為 BMI ≥ 30，或 BMI ≥ 27 合併至少一項體重相關共病<sup><a href="https://doi.org/10.1056/NEJMoa2032183" target="_blank" rel="noopener noreferrer">[1]</a></sup>。STEP 1 試驗中的受試者即<strong>排除糖尿病患者</strong>，且在此族群中仍達到平均 14.9% 的體重降幅，明確證實其適用範圍遠超糖尿病族群<sup><a href="https://doi.org/10.1056/NEJMoa2032183" target="_blank" rel="noopener noreferrer">[1]</a></sup>。</p>

  <h3 style="color: #dc2626; margin-top: 1.2rem;">❌ 誤區三：「GLP-1 針劑打了會肌肉流失，對身體不好」</h3>
  <p><strong>事實：</strong>任何減重方式若無搭配阻力訓練，都可能造成部分肌肉流失。然而，研究顯示週纖達的體重減少以<strong>脂肪組織</strong>為主。SELECT 試驗中使用週纖達的受試者，腰圍平均減少 <strong>7.7 公分</strong>，且嚴重不良事件發生率低於對照組<sup><a href="https://doi.org/10.1038/s41591-024-02996-7" target="_blank" rel="noopener noreferrer">[7]</a></sup>。此外，研究發現週纖達在減重的同時可改善血脂、糖化血色素及肝指數等代謝參數，顯示整體代謝健康呈正向改善趨勢<sup><a href="https://doi.org/10.1056/NEJMoa2208601" target="_blank" rel="noopener noreferrer">[3]</a></sup>。若搭配適當的蛋白質攝取與肌力訓練，可進一步優化身體組成。</p>
</div>

<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">

<h3>⚖️ 該選誰？週纖達 (Wegovy) vs. 猛健樂 (Mounjaro) 超級比一比</h3>
<p>這兩款都是目前市面上最強大的減重針劑，但機轉與定位略有不同。透過下方的比較圖，您可以更清楚了解它們的優缺點，從而做出最適合自己的選擇。</p>

<p><img src="/images/weight-loss/ozempic/a.webp" alt="週纖達與猛健樂、善纖達比較圖"></p>

<h3>1. 具備心血管保護功能 (適合銀髮族)</h3>
<p><strong>週纖達</strong> 在大型臨床試驗中證實具有<strong>心血管保護效果</strong>。2023 年發表於《新英格蘭醫學雜誌》的 SELECT 試驗，共納入 <strong>17,604 名</strong>具心血管疾病病史但無糖尿病的過重/肥胖受試者，平均追蹤 <strong>33 個月</strong>，結果顯示週纖達組的主要不良心血管事件（心血管死亡、非致死性心肌梗塞、非致死性中風）發生率為 <strong>6.5%</strong>，安慰劑組為 <strong>8.0%</strong>，相對風險降低達 <strong>20%</strong><sup><a href="https://doi.org/10.1056/NEJMoa2307563" target="_blank" rel="noopener noreferrer">[2]</a></sup>。週纖達已獲美國 FDA 於 2024 年 3 月正式核准新適應症：用於降低具心血管疾病之過重/肥胖成人的心血管風險<sup><a href="https://doi.org/10.1056/NEJMoa2307563" target="_blank" rel="noopener noreferrer">[2]</a></sup>。對於<strong>年長者</strong>或本身有<strong>心血管病史</strong>的減重族群來說，選擇週纖達能提供額外的健康保障，安全性數據也較為長期完整。</p>

<h3>2. 核准用於青少年減重 (12歲以上)</h3>
<p>週纖達的成份已於 <strong>2022 年 12 月 23 日</strong>通過美國 FDA 核准，可用於治療 <strong>12 歲以上</strong> 且 BMI 超過同年齡同性別第 95 百分位的青少年肥胖患者<sup><a href="https://doi.org/10.1056/NEJMoa2208601" target="_blank" rel="noopener noreferrer">[3]</a></sup>。此核准基於 STEP TEENS 臨床試驗：共 201 名 12–17 歲青少年，隨機分配（2:1）接受 2.4 mg 週纖達或安慰劑，歷時 <strong>68 週</strong>。結果顯示，週纖達組 BMI 平均下降 <strong>16.1%</strong>，安慰劑組則上升 0.6%；77% 的青少年達到 BMI 下降 ≥ 5% 的次要終點，安慰劑組僅 20%<sup><a href="https://doi.org/10.1056/NEJMoa2208601" target="_blank" rel="noopener noreferrer">[3]</a></sup>。同時，此族群的腰圍、血脂、糖化血色素及肝指數均呈現顯著改善，對發育中族群的代謝健康具有正面意義<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11222026/" target="_blank" rel="noopener noreferrer">[8]</a></sup>。</p>

<h3>3. 機制原理不同</h3>
<ul>
    <li><strong>週纖達：</strong> 單效 GLP-1 受體促效劑。研究闡明，其作用透過激活下視丘弧狀核（ARC）中的<strong>厭食性神經元</strong>（POMC/CART）並抑制<strong>促食性神經元</strong>（NPY/AgRP），同時延緩胃排空，使飽足感更持久<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11674233/" target="_blank" rel="noopener noreferrer">[5]</a></sup>。此外，週纖達亦被發現能調節腹側被蓋區（VTA）多巴胺神經元活性，減少對高熱量食物的渴望與「獎勵驅動型進食」<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12244221/" target="_blank" rel="noopener noreferrer">[9]</a></sup>，讓患者不想吃、吃不多。</li>
    <li><strong>猛健樂：</strong> 雙效 GIP/GLP-1 受體促效劑。除了抑制食慾，還多了 GIP 機制來<strong>提升脂肪代謝</strong>與燃脂效率。</li>
</ul>

<h3>4. 減重效果比較</h3>
<p>根據各自的核心臨床試驗數據：STEP 1 試驗（2021）顯示每週一次皮下注射 2.4 mg 週纖達，68 週後平均體重下降 <strong>14.9%</strong>，遠超安慰劑組的 2.4%<sup><a href="https://doi.org/10.1056/NEJMoa2032183" target="_blank" rel="noopener noreferrer">[1]</a></sup>；STEP UP 試驗（2025）的最新數據更顯示，高依從性受試者在 72 週後以 2.4 mg 劑量可達 <strong>15.6%</strong> 的體重降幅<sup><a href="https://doi.org/10.1016/S2213-8587(25)00226-8" target="_blank" rel="noopener noreferrer">[10]</a></sup>。猛健樂（Tirzepatide）的 SURMOUNT-1 試驗（2022）則顯示，最高劑量（15 mg）可使體重下降約 <strong>20.9%</strong><sup><a href="https://doi.org/10.1056/NEJMoa2206038" target="_blank" rel="noopener noreferrer">[11]</a></sup>。但對於大多數只需要減去 5–10 公斤的人來說，<strong>週纖達的效果已經非常足夠且顯著</strong>。</p>

<h3>5. 價格與 CP 值</h3>
<p>這是週纖達最大的優勢。相較於猛健樂較高昂的費用，週纖達提供了相對親民的價格，讓更多人能夠負擔得起長期療程，是目前公認<strong>性價比 (CP值) 最高</strong>的選擇。</p>
<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">

<h3>📊 獨家收錄！猛健樂與週纖達「劑量對照表」</h3>
<p>許多患者會在兩者之間轉換，或是想了解藥效強度的差異。醫師根據臨床經驗與藥物動力學，整理了這份簡單的對照表供您參考：</p>

<div style="overflow-x: auto;">
  <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 1rem;">
    <thead>
      <tr style="background-color: #0e7490; color: white;">
        <th style="padding: 12px; border: 1px solid #cbd5e1; text-align: center;">週纖達 (Wegovy) 劑量</th>
        <th style="padding: 12px; border: 1px solid #cbd5e1; text-align: center;">約等於</th>
        <th style="padding: 12px; border: 1px solid #cbd5e1; text-align: center;">猛健樂 (Mounjaro) 劑量</th>
        <th style="padding: 12px; border: 1px solid #cbd5e1; text-align: left;">備註說明</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: #f0f9ff;">
        <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #0369a1;">0.25 mg / 0.5 mg</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #0369a1;">≈</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #b45309;">2.5 mg</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #b45309">起始適應期，主要讓身體習慣藥物，副作用較低。</td>
      </tr>
      <tr>
      <tr style="background-color: #f0f9ff;">
        <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #0369a1;">1.0 mg</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #0369a1;">≈</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #b45309;">5.0 mg</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #b45309">標準治療劑量，減重效果開始顯著。</td>
      </tr>
      <tr style="background-color: #f0f9ff;">
        <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #0369a1;">1.7 mg / 2.0 mg</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #0369a1; ">≈</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: #b45309;">7.5 mg ~ 10 mg</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #b45309">高劑量期，針對體重停滯或需要加強效果者。</td>
      </tr>
    </tbody>
  </table>
</div>
<p style="font-size: 0.9rem; color: #64748b;">*註：此對照表僅供參考，實際轉換劑量需由醫師依據個體耐受度與副作用反應進行調整。</p>

<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">

<h3>📝 週纖達使用中的懶人包：副作用與應對</h3>
<p>週纖達的使用方式與猛健樂非常相似，同樣是每週施打一次。為了讓您的減重旅程更順暢，以下幾點請務必留意：</p>

<h3>1. 施打部位與頻率</h3>
<ul>
    <li><strong>頻率：</strong> 每週固定一天施打（例如每週一早上），這週打完，下週同一時間再打。</li>
    <li><strong>部位：</strong> 建議施打在皮下脂肪豐富處，如腹部（避開肚臍周圍）、大腿前外側或上臂外側。每週請<strong>輪替部位</strong>，不要一直打同一個點。</li>
</ul>

<h3>2. 劑量調整原則 (Titration)</h3>
<p>週纖達的筆針設計非常人性化，可以精準旋轉刻度調整劑量。我們通常遵循以下原則，此漸進式劑量調整策略亦為大型臨床試驗所採用，目的在於最小化腸胃道副作用<sup><a href="https://doi.org/10.1056/NEJMoa2032183" target="_blank" rel="noopener noreferrer">[1]</a></sup>：</p>
<ul>
    <li><strong>第 1–4 週：</strong> 使用 0.25 mg。這是為了讓腸胃道適應，減少噁心感。</li>
    <li><strong>第 5–8 週：</strong> 若適應良好，調整至 0.5 mg。</li>
    <li><strong>穩定期：</strong> 視減重效果，可維持在 0.5 mg 或調整至 1.0 mg。</li>
    <li><strong>重要提醒：</strong> 只要目前的劑量能讓您感到不餓且體重有下降，就<strong>不需要</strong>急著往上加劑量。用最少的藥量達到效果，才是最聰明的做法。</li>
</ul>

<h3>3. 常見副作用與緩解</h3>
<p>最常見的副作用是噁心、嘔吐、腹脹或便秘。STEP 系列試驗中，腸胃道副作用為最常見不良事件，但通常為輕中度，且隨時間推移而緩解<sup><a href="https://doi.org/10.1080/00325481.2022.2147326" target="_blank" rel="noopener noreferrer">[12]</a></sup>。緩解小撇步：</p>
<ul>
    <li><strong>少量多餐：</strong> 不要一次吃太飽。</li>
    <li><strong>細嚼慢嚥：</strong> 給大腦時間接收飽足訊號。</li>
    <li><strong>避免油膩：</strong> 炸物、肥肉容易加重噁心感。</li>
    <li><strong>多喝水：</strong> 每天至少 2000cc，預防便秘。</li>
</ul>

<hr style="margin: 3rem 0; border-top: 1px solid #e2e8f0;">

<h3>💡 醫師的真心話：為什麼週纖達值得一試？</h3>
<p>在門診中，我常遇到病患問：「醫師，我是不是一定要打最新的猛健樂才有效？」其實不然。<strong>藥物沒有最好的，只有最適合您的。</strong></p>
<p>週纖達上市時間較久（美國 FDA 成人減重適應症核准於 2021 年），擁有更長期的安全性數據，且價格相對親民。多項頂級期刊文獻（包括《新英格蘭醫學雜誌》、《自然醫學》、《刺胳針》等）持續確認其療效與安全性<sup><a href="https://doi.org/10.1056/NEJMoa2032183" target="_blank" rel="noopener noreferrer">[1]</a></sup><sup><a href="https://doi.org/10.1056/NEJMoa2307563" target="_blank" rel="noopener noreferrer">[2]</a></sup><sup><a href="https://doi.org/10.1038/s41591-024-02996-7" target="_blank" rel="noopener noreferrer">[7]</a></sup>。對於第一次嘗試醫學減重、或是體重超標幅度沒有那麼巨大（例如 BMI 27–32）的朋友來說，週纖達往往就能帶來令人非常滿意的改變。它就像一位穩定可靠的夥伴，默默地幫助您控制食慾，找回輕盈的自己。</p>

<div style="background-color: #f0f9ff; padding: 2rem; border-radius: 1rem; margin-top: 3rem; text-align: center;">
    <h3 style="color: #0369a1; margin-top: 0;">👨‍⚕️ 還在猶豫該選哪一種？</h3>
    <p style="color: #334155; margin-bottom: 1.5rem;">別擔心，選擇困難症交給專業醫師來解決！歡迎來到新竹宸新復健科，醫師會根據您的預算、身體狀況與減重目標，為您分析最適合的藥物方案。</p>
    <p style="font-weight: bold; color: #0891b2;">現在就預約諮詢，開啟您的健康減重之旅！</p>
</div>


`,
  referencesHtml: `
<h2>📚 參考文獻 (References)</h2>
<div style="background-color: #f8fafc; padding: 1rem; border-radius: 0.75rem; margin-top: 1.5rem; font-size: 0.9rem; color: #475569; border: 1px solid #e2e8f0; line-height: 1.5; word-break: break-all;">
    <ol style="padding-left: 0; margin: 0; list-style-type: decimal; list-style-position: inside; color: #2563eb; font-weight: bold;">
  <li id="ref1" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Wilding JPH, et al. <em>Once-Weekly Semaglutide in Adults with Overweight or Obesity.</em> N Engl J Med. 2021;384(11):989–1002. <a href="https://doi.org/10.1056/NEJMoa2032183" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1056/NEJMoa2032183</a>（實證：STEP 1 試驗，n=1,961，68 週後週纖達 2.4 mg 組平均體重降幅 14.9%，遠超安慰劑組 2.4%，確立週纖達用於非糖尿病肥胖成人的核心療效證據）
      </span>
<li id="ref1" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Wilding JPH, et al. <em>Once-Weekly Semaglutide in Adults with Overweight or Obesity.</em> N Engl J Med. 2021;384(11):989–1002. <a href="https://doi.org/10.1056/NEJMoa2032183" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1056/NEJMoa2032183</a>（實證：STEP 1 試驗，n=1,961，68 週後 semaglutide 2.4 mg 組平均體重降幅 14.9%，遠超安慰劑組 2.4%，確立 semaglutide 用於非糖尿病肥胖成人的核心療效證據）
      </span>
    </li>
    <li id="ref2" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Lincoff AM, et al. <em>Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes.</em> N Engl J Med. 2023;389(24):2221–2232. <a href="https://doi.org/10.1056/NEJMoa2307563" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1056/NEJMoa2307563</a>（實證：SELECT 試驗，n=17,604，證實 semaglutide 在無糖尿病心血管疾病患者中可降低 MACE 風險達 20%，HR 0.80，奠定心臟保護適應症基礎）
      </span>
    </li>
    <li id="ref3" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Weghuber D, et al. <em>Once-Weekly Semaglutide in Adolescents with Obesity.</em> N Engl J Med. 2022;387(24):2245–2257. <a href="https://doi.org/10.1056/NEJMoa2208601" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1056/NEJMoa2208601</a>（實證：STEP TEENS 試驗，n=201，12–17 歲青少年使用 semaglutide 68 週後 BMI 降低 16.1%，支持 2022 年 12 月 FDA 核准青少年適應症）
      </span>
    </li>
    <li id="ref4" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Friedrichsen M, et al. <em>The effect of semaglutide 2.4 mg once weekly on energy intake, appetite, control of eating, and gastric emptying in adults with obesity.</em> Diabetes Obes Metab. 2021;23(3):754–762. <a href="https://doi.org/10.1111/dom.14280" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1111/dom.14280</a>（實證：雙盲隨機對照試驗，證實 semaglutide 2.4 mg 顯著抑制食慾、改善飲食控制、減少食物渴望，為主要減重機制提供直接生理數據）
      </span>
    </li>
    <li id="ref5" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Karampela I, et al. <em>Spotlight on the Mechanism of Action of Semaglutide.</em> Int J Mol Sci. 2024;25(24):13246. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11674233/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">PMC11674233</a>（實證：系統性回顧，詳述 semaglutide 透過激活下視丘 ARC 之 POMC/CART 神經元、抑制 NPY/AgRP 的中樞抑食機制，以及與瘦素訊號的交互作用）
      </span>
    </li>
    <li id="ref6" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Wilding JPH, et al. <em>Weight regain and cardiometabolic effects after withdrawal of semaglutide: The STEP 1 trial extension.</em> Diabetes Obes Metab. 2022;24(8):1553–1564. <a href="https://doi.org/10.1111/dom.14725" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1111/dom.14725</a>（實證：STEP 1 延伸試驗，停藥後 52 週（第 120 週）semaglutide 組體重較基線淨降幅為 5.6%，確認停藥後體重回升為慢性疾病特性而非藥物失效）
      </span>
    </li>
    <li id="ref7" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Ryan DH, et al. <em>Long-term weight loss effects of semaglutide in obesity without diabetes in the SELECT trial.</em> Nat Med. 2024;30:2049–2057. <a href="https://doi.org/10.1038/s41591-024-02996-7" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1038/s41591-024-02996-7</a>（實證：SELECT 預先指定分析，持續使用 semaglutide 達 4 年（208 週）仍維持體重降低 10.2%、腰圍縮減 7.7 cm，嚴重不良事件率低於對照組）
      </span>
    </li>
    <li id="ref8" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Bensignor MO, et al. <em>Semaglutide for Management of Obesity in Adolescents: Efficacy, Safety, and Considerations for Clinical Practice.</em> J Endocr Soc. 2024;8(8):bvae109. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11222026/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">PMC11222026</a>（實證：青少年族群綜合回顧，確認 semaglutide 在改善青少年 BMI 的同時，亦顯著改善高血脂、ALT、糖化血色素等代謝參數）
      </span>
    </li>
    <li id="ref9" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        van der Plasse G, et al. <em>GLP-1 receptor agonist semaglutide reduces appetite while increasing dopamine reward signaling.</em> Neuropharmacology. 2024;257:110051. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12244221/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">PMC12244221</a>（實證：動物神經科學研究，首次揭示 semaglutide 透過影響腹側被蓋區（VTA）多巴胺訊號路徑，減少對食物獎勵的慾望，說明其中樞神經「不想吃」的機制）
      </span>
    </li>
    <li id="ref10" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Wharton S, et al. <em>Once-weekly semaglutide 7.2 mg in adults with obesity (STEP UP): a randomised, controlled, phase 3b trial.</em> Lancet Diabetes Endocrinol. 2025;13(11):949–963. <a href="https://doi.org/10.1016/S2213-8587(25)00226-8" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1016/S2213-8587(25)00226-8</a>（實證：STEP UP 試驗，n=1,407，72 週後 semaglutide 7.2 mg 組平均體重降幅 18.7%，2.4 mg 組降幅 15.6%，顯示更高劑量可帶來更大減重效益）
      </span>
    </li>
    <li id="ref11" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Jastreboff AM, et al. <em>Tirzepatide Once Weekly for the Treatment of Obesity.</em> N Engl J Med. 2022;387(3):205–216. <a href="https://doi.org/10.1056/NEJMoa2206038" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1056/NEJMoa2206038</a>（實證：SURMOUNT-1 試驗，Tirzepatide 最高劑量 15 mg 達 20.9% 平均體重降幅，作為與 semaglutide 療效比較之客觀依據）
      </span>
    </li>
    <li id="ref12" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Kushner RF, et al. <em>Efficacy and safety of semaglutide for weight management: evidence from the STEP program.</em> Postgrad Med. 2023;135(sup1):5–17. <a href="https://doi.org/10.1080/00325481.2022.2147326" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1080/00325481.2022.2147326</a>（實證：STEP 1–5 系列試驗綜合回顧，確認腸胃道副作用為最常見不良反應但多為輕中度且隨時間緩解，呈現 semaglutide 整體安全性輪廓）
      </span>
    </li>
    <li id="ref13" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Rueda-Clausen CF, et al. <em>Semaglutide for the treatment of overweight and obesity: A review.</em> Diabetes Obes Metab. 2023;25(Suppl 1):18–35. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10092086/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">PMC10092086</a>（實證：全面系統性回顧 STEP 1–8 試驗設計、族群特性與亞洲族群（STEP 6）子研究，確認 semaglutide 療效跨種族一致性）
      </span>
    </li>
    <li id="ref14" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Drucker DJ. <em>Glucagon-like peptide-1 receptor: mechanisms and advances in therapy.</em> Signal Transduct Target Ther. 2024;9:292. <a href="https://doi.org/10.1038/s41392-024-01931-z" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1038/s41392-024-01931-z</a>（實證：綜合回顧追溯 GLP-1R 藥物發展里程碑，闡述 GLP-1 受體在胰臟、腸道、心血管及神經系統的多元作用機制）
      </span>
    </li>
    <li id="ref15" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Deanfield J, Lincoff AM, et al. <em>Semaglutide and cardiovascular outcomes by baseline and changes in adiposity measurements: a prespecified analysis of the SELECT trial.</em> Lancet. 2025;406(10516):2257–2268. <a href="https://doi.org/10.1016/S0140-6736(25)01375-3" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.1016/S0140-6736(25)01375-3</a>（實證：SELECT 預先指定子分析，腰圍縮減與 MACE 風險呈線性負相關（每5cm腰圍縮減 HR 0.91，P=0.02），且估計約 33% 的 MACE 獲益由腰圍縮減介導，確認腹部脂肪減少為心血管保護的重要中介機制）
      </span>
    </li>
    <li id="ref16" style="margin-bottom: 0.6rem;">
      <span style="color: #475569; font-weight: normal; margin-left: 0.5rem;">
        Alcantara JMA, et al. <em>Semaglutide as a GLP-1 Agonist: A Breakthrough in Obesity Treatment.</em> Pharmaceuticals. 2025;18(3):399. <a href="https://doi.org/10.3390/ph18030399" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">doi: 10.3390/ph18030399</a>（實證：最新機制回顧，整合 SUSTAIN、PIONEER、STEP 系列試驗數據，比較 semaglutide 與其他 GLP-1RA 的臨床療效差異及中樞神經抑食機制全貌）
      </span>
    </li> 
    </ol>
</div>


    `,
    whyChooseUs: [
      '詳細問診及衛教施打，確保劑量正確',
      '甲狀腺超音波檢查及抽血檢查',
      '療程含高階 InBody 及運動課程'
    ],
    programBenefits: [
      '一週一次好簡單，不用每天挨針',
      'CP值高，小資族也能負擔',
      '有效控制三高及脂肪肝，提供心臟保護'
    ],
    qaList: [
      {
        question: '週纖達跟猛健樂有什麼不一樣？',
        answer: '兩者都是腸泌素藥物。週纖達是單重機轉 (GLP-1)，上市時間較久，安全性資料多且CP值高；猛健樂是雙重機轉 (GIP/GLP-1)，減重效果通常更顯著，適合體重基數較大者。醫師會依您的狀況建議適合的藥物。'
      },
      {
        question: '我有糖尿病可以使用嗎？',
        answer: '可以的。週纖達本身即為治療第二型糖尿病的藥物，能有效穩定血糖。但若您已在使用其他降血糖藥物，請務必告知醫師，以免發生低血糖風險。'
      },
      {
        question: '一支週纖達注射筆可以打幾次？可以使用多久？',
        answer: '台灣目前的週纖達筆針設計為一支筆含有 4 次（4 週）的劑量。您只需要每週固定同一天施打一次，一支筆剛好可以完成一個月的療程。這種設計不僅攜帶方便，也能大幅減少醫療廢棄物。'
      },
      {
        question: '需要每天打針嗎？',
        answer: '不需要。週纖達是長效型藥物，一週只需要皮下注射一次，非常方便，不用擔心每天忘記吃藥的問題。'
      }
    ]
  }

 
];

// =======================================================
// 3. 自動化瘦身區 (Sitemap 與列表頁專用)
// =======================================================
// 自動過濾掉 contentHtml 與詳細內容，產生輕量列表
// 這樣 sitemap.ts 導入 weightLossPrograms 時就不會載入過重的資料

export const weightLossPrograms: WeightLossMetadata[] = fullWeightLossData.map((item) => {
  // 使用解構賦值，把詳細資料分離出來，只回傳 metadata
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    contentHtml,
    whyChooseUs,
    programBenefits,
    images,
    qrCode,
    benefitsTitle,
    benefitsIconClass,
    qaList,
    ...metadata
  } = item;
  return metadata;
});

// =======================================================
// 4. Helper Functions
// =======================================================

// 取得單一減重項目 (內頁用，從完整資料庫找)
export function getWeightLossProgramBySlug(slug: string): WeightLossProgram | undefined {
  return fullWeightLossData.find((program) => program.slug === slug);
}

// 取得所有減重項目 (列表頁或 Sitemap 用，只回傳輕量資料)
export function getAllWeightLossPrograms() {
  return weightLossPrograms;
}

// 取得所有 Slug (Sitemap 專用)
export function getAllWeightLossProgramSlugs() {
  return weightLossPrograms.map((program) => ({
    slug: program.slug,
  }));
}