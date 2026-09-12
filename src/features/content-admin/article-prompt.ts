import type { ContentTopic } from './types';
import { readArticleObject } from './article-code-parser';

export interface ExternalArticleCode {
  id: string;
  title: string;
  lastModified: string;
  category: string;
  date: string;
  summary: string;
  coverImage: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  contentHtml: string;
  referencesHtml: string;
}

export const ARTICLE_CODE_TEMPLATE = `{
  id: 'english-kebab-case-slug',
  title: '文章主標題',
  lastModified: 'YYYY-MM-DD',
  category: '衛教文章',
  date: 'YYYY-MM-DD',
  summary: '適合搜尋結果與文章列表顯示的繁體中文摘要',
  coverImage: '/images/news/article/english-kebab-case-slug.webp',
  seoTitle: 'SEO 標題',
  seoDescription: 'SEO 描述',
  keywords: ['主要關鍵字', '長尾關鍵字一', '長尾關鍵字二'],
  contentHtml: \`
<div style="background-color:#f8fafc;border-left:4px solid #0284c7;padding:1.5rem;margin-bottom:2rem;border-radius:.5rem;">
  <h2 style="margin-top:0;color:#0369a1;">📝 總結摘要與核心觀點</h2>
  <p style="margin-bottom:0;line-height:1.6;color:#334155;">摘要正文；本段至少放入三個對應文獻標號，例如 <sup><a href="已查證網址" target="_blank" rel="noopener noreferrer" style="color:#2dd4bf;text-decoration:underline;">[1]</a></sup></p>
</div>
<hr style="margin:3rem 0;border-top:1px solid #e2e8f0;">

<section style="margin-bottom:3.5rem;">
  <h2 style="font-size:1.75rem;font-weight:bold;color:#ffffff;margin-bottom:1.5rem;">一、第一個重要段落</h2>
  <p style="color:#cbd5e1;line-height:1.7;font-size:1.1rem;margin-bottom:1.5rem;">用民眾看得懂的語言說明，重要結論後加入引用 <sup><a href="已查證網址" target="_blank" rel="noopener noreferrer" style="color:#2dd4bf;text-decoration:underline;">[1]</a></sup></p>
  <h3 style="font-size:1.4rem;font-weight:bold;color:#ffffff;margin-bottom:1rem;">段落小標題</h3>
  <ul style="color:#cbd5e1;list-style-type:disc;padding-left:1.5rem;line-height:1.7;font-size:1.1rem;margin-bottom:2rem;">
    <li style="margin-bottom:.5rem;">具體且能執行的重點</li>
  </ul>
</section>

<hr style="margin:3rem 0;border-top:1px solid #e2e8f0;">

<div style="background-color:#f0f9ff;padding:1.5rem;border-left:4px solid #0891b2;border-radius:.5rem;margin:1.5rem 0;">
  <h4 style="margin-top:0;color:#0e7490;font-weight:bold;font-size:1.15rem;margin-bottom:.5rem;">💡 臨床獨特見解 #1</h4>
  <p style="margin-bottom:0;color:#334155;line-height:1.6;font-size:1.05rem;">只能寫合理的一般臨床觀察，不可捏造病人案例或醫師個人經歷。</p>
</div>

<hr style="margin:3rem 0;border-top:1px solid #e2e8f0;">

<section style="margin-bottom:3.5rem;">
  <h2 style="font-size:1.75rem;font-weight:bold;color:#ffffff;margin-bottom:1.5rem;">二、重點比較表</h2>
  <p style="color:#cbd5e1;line-height:1.7;font-size:1.1rem;margin-bottom:1.5rem;">先用白話說明讀表方式、適用限制與重要結論，必要處加入論文引用。</p>
  <div class="custom-table-container" style="width:100%;overflow-x:auto;margin:20px 0;border-radius:8px;box-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06);">
    <table class="modern-table" style="width:100%;border-collapse:collapse;font-family:'PingFang TC','Microsoft JhengHei',sans-serif;font-size:15px;background-color:#ffffff;color:#1f2937;min-width:850px;">
      <thead><tr style="background-color:#1e3a8a;color:#ffffff;text-align:left;font-weight:bold;"><th style="padding:16px 12px;border-bottom:2px solid #111827;">比較項目</th><th style="padding:16px 12px;border-bottom:2px solid #111827;">特色</th><th style="padding:16px 12px;border-bottom:2px solid #111827;">注意事項</th><th style="padding:16px 12px;border-bottom:2px solid #111827;">適用情況</th></tr></thead>
      <tbody><tr><td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;">項目一</td><td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;">完整內容</td><td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;">完整內容</td><td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;">完整內容</td></tr><tr style="background-color:#f3f4f6;"><td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;">項目二</td><td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;">完整內容</td><td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;">完整內容</td><td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;">完整內容</td></tr></tbody>
    </table>
  </div>
</section>

<hr style="margin:3rem 0;border-top:1px solid #e2e8f0;">

<section style="margin-bottom:3.5rem;">
  <h2 style="font-size:1.75rem;font-weight:bold;color:#ffffff;margin-bottom:1.5rem;">三、常見症狀、原因或判斷方式</h2>
  <p style="color:#cbd5e1;line-height:1.7;font-size:1.1rem;margin-bottom:1.5rem;">依本次主題完整說明，不可只保留一小段示意文字；重要醫療主張後加入論文引用。</p>
  <div style="background-color:#fff7ed;border:1px solid #fed7aa;padding:16px;border-radius:8px;margin-bottom:24px;">
    <p style="color:#9a3412;font-size:1rem;line-height:1.6;margin:0;"><strong>⚠️ 需要儘快就醫的警訊：</strong><br><br>依主題列出真正需要就醫或緊急處理的狀況，不製造恐慌，也不做個人診斷。</p>
  </div>
</section>

<hr style="margin:3rem 0;border-top:1px solid #e2e8f0;">

<section style="margin-bottom:3.5rem;">
  <h2 style="font-size:1.75rem;font-weight:bold;color:#ffffff;margin-bottom:1.5rem;">四、治療、復健或自我照護怎麼選？</h2>
  <p style="color:#cbd5e1;line-height:1.7;font-size:1.1rem;margin-bottom:1.5rem;">說明證據支持的選項、限制、何時不適合，以及病患下一步可以怎麼做。</p>
  <ul style="color:#cbd5e1;list-style-type:disc;padding-left:1.5rem;line-height:1.7;font-size:1.1rem;margin-bottom:2rem;">
    <li style="margin-bottom:.75rem;"><strong style="color:#ffffff;">第一個實用重點：</strong>完整說明與適用條件。</li>
    <li style="margin-bottom:.75rem;"><strong style="color:#ffffff;">第二個實用重點：</strong>完整說明與安全限制。</li>
  </ul>
</section>

<div style="background-color:#f0f9ff;padding:1.5rem;border-left:4px solid #0891b2;border-radius:.5rem;margin:1.5rem 0;">
  <h4 style="margin-top:0;color:#0e7490;font-weight:bold;font-size:1.15rem;margin-bottom:.5rem;">💡 臨床獨特見解 #2</h4>
  <p style="margin-bottom:0;color:#334155;line-height:1.6;font-size:1.05rem;">補充一般臨床判斷重點，以及最容易被民眾誤會之處。</p>
</div>

<hr style="margin:3rem 0;border-top:1px solid #e2e8f0;">

<section style="margin-bottom:3.5rem;">
  <h2 style="font-size:1.75rem;font-weight:bold;color:#ffffff;margin-bottom:1.5rem;">五、病患可以如何執行與追蹤？</h2>
  <p style="color:#cbd5e1;line-height:1.7;font-size:1.1rem;margin-bottom:1.5rem;">提供具體、保守、安全的執行方式與追蹤指標；不能開立個人處方或保證療效。</p>
</section>

<hr style="margin:3rem 0;border-top:1px solid #e2e8f0;">

<section style="margin-bottom:3.5rem;">
  <div style="background-color:#fffbeb;border:2px solid #fbbf24;border-radius:1rem;padding:1.5rem;margin:2rem 0;">
    <h2 style="color:#b45309;margin-top:0;font-weight:bold;font-size:1.4rem;border-bottom:2px solid #fcd34d;padding-bottom:.5rem;">📢 六、常見三大誤區解析</h2>
    <ul style="list-style:none;padding:0;margin-top:1rem;color:#92400e;">
      <li style="margin-bottom:1.5rem;"><strong>❌ 誤區一：本主題常見錯誤說法</strong><br><span style="display:block;margin-top:.5rem;line-height:1.6;">用白話更正，並在醫療主張後加入引用。</span></li>
      <li style="margin-bottom:1.5rem;"><strong>❌ 誤區二：本主題常見錯誤說法</strong><br><span style="display:block;margin-top:.5rem;line-height:1.6;">用白話更正，並說明限制。</span></li>
      <li style="margin-bottom:0;"><strong>❌ 誤區三：本主題常見錯誤說法</strong><br><span style="display:block;margin-top:.5rem;line-height:1.6;">用白話更正，並告訴讀者正確下一步。</span></li>
    </ul>
  </div>
</section>

<hr style="margin:3rem 0;border-top:1px solid #e2e8f0;">

<section style="background-color:#0f172a;border:1px solid #1e293b;border-radius:1.5rem;overflow:hidden;margin:3rem 0;">
  <div style="background-color:#1e293b;padding:1rem 1.5rem;border-bottom:1px solid #334155;">
    <h2 style="color:#22d3ee;margin:0;font-size:1.25rem;font-weight:bold;">🏆 FAQ 常見問題</h2>
  </div>
  <div style="padding:2rem 1.25rem 1.2rem;">
    <h3 style="color:#f8fafc;margin-top:0;margin-bottom:.75rem;font-size:1.2rem;font-weight:bold;">Q1：民眾最常問的問題？</h3>
    <p style="color:#94a3b8;line-height:1.8;font-size:1.05rem;margin-bottom:2rem;">清楚回答，必要時加入引用。</p>
    <h3 style="color:#f8fafc;margin-top:0;margin-bottom:.75rem;font-size:1.2rem;font-weight:bold;">Q2：第二個常見問題？</h3>
    <p style="color:#94a3b8;line-height:1.8;font-size:1.05rem;margin-bottom:2rem;">清楚回答，必要時加入引用。</p>
    <h3 style="color:#f8fafc;margin-top:0;margin-bottom:.75rem;font-size:1.2rem;font-weight:bold;">Q3：第三個常見問題？</h3>
    <p style="color:#94a3b8;line-height:1.8;font-size:1.05rem;margin-bottom:2rem;">清楚回答，必要時加入引用。</p>
    <h3 style="color:#f8fafc;margin-top:0;margin-bottom:.75rem;font-size:1.2rem;font-weight:bold;">Q4：什麼情況需要看醫師？</h3>
    <p style="color:#94a3b8;line-height:1.8;font-size:1.05rem;margin-bottom:0;">提供安全、清楚而不誇大的就醫建議。</p>
  </div>
</section>

<div style="background-color:#f8fafc;color:#334155;padding:32px;border-radius:12px;border-left:6px solid #64748b;margin-bottom:32px;line-height:1.7;">
  <h2 style="color:#1e293b;margin-top:0;font-size:1.5rem;font-weight:bold;border-bottom:1px solid #e2e8f0;padding-bottom:12px;">結語與行動建議</h2>
  <p style="color:#475569;margin-top:16px;font-size:1.05rem;">收束全文並提供安全、具體的行動建議。</p>
  <div style="background-color:#f1f5f9;padding:16px;border-radius:8px;margin:20px 0;text-align:center;">
    <p style="margin-bottom:0;color:#1e293b;font-weight:bold;font-size:1.05rem;">💡 立即行動：依主題撰寫下一步。</p>
  </div>
  <div style="text-align:center;width:100%;"><a href="/booking" style="display:inline-block;background-color:#375987;color:#f8fafc;font-weight:bold;padding:12px 24px;border-radius:9999px;text-decoration:none;font-size:1.05rem;">預約林醫師評估</a></div>
</div>
<div style="background-color:#fffbeb;border:2px solid #fbbf24;border-radius:1rem;padding:1.5rem;color:#92400e;"><strong>醫療安全提醒：</strong>本文為一般衛教內容，不能取代醫師診斷、檢查或個別治療建議。</div>
  \`,
  referencesHtml: \`
<h2>📚 參考文獻 (References)</h2>
<div style="background-color:#f8fafc;padding:1.5rem;border-radius:.75rem;margin-top:1.5rem;font-size:.95rem;color:#475569;border:1px solid #e2e8f0;line-height:1.6;word-break:break-all;">
  <ol style="padding-left:0;margin:0;list-style-type:decimal;list-style-position:inside;color:#2563eb;font-weight:bold;">
    <li style="margin-bottom:.8rem;"><span style="color:#475569;font-weight:normal;margin-left:.5rem;">作者（年份）。論文標題。期刊。<a href="真實 DOI、PubMed 或 PMC 網址" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;text-underline-offset:3px;">DOI / PubMed / PMC</a></span></li>
    <!-- 逐篇完整列出 8 至 12 篇已查證的論文；若直接相關論文不足可少於 8 篇，但不可用新聞、部落格或診所網頁湊數。編號必須與內文引用一致。 -->
  </ol>
</div>
  \`
},`;

export function buildArticlePrompt(topic: ContentTopic): string {
  const sourceSignals = topic.sources.map((source, index) =>
    `${index + 1}. ${source.label}（${source.sourceType}）：${source.note}${source.url ? `\n   ${source.url}` : ''}`,
  ).join('\n');

  return `請先開啟網路搜尋與查證功能，幫我寫一篇完整的繁體中文醫療衛教文章，並給我可直接貼回網站預覽的完整 JavaScript 文章物件程式碼。這不是 React／Next.js 頁面，也不要產生整個專案。

【本次文章任務】
主題：${topic.title}
分類：${topic.category}
文章方向：${topic.summary}
選題原因：${topic.rationale}
長尾關鍵字：${topic.longTailKeywords.join('、')}

【目前提供的來源線索】
${sourceSignals || '目前沒有來源線索，請自行查找可驗證的一手醫學文獻。'}

【研究與醫療安全要求】
1. 先查證資料再寫作，優先使用 PubMed、PMC、DOI 原始論文、系統性回顧、醫學會或政府官方資料。
2. 優先查找 8 至 12 篇直接相關、可驗證的學術論文；至少應有 6 篇。參考文獻只能列學術論文、系統性回顧、統合分析或正式臨床指引，不可以新聞、診所網頁、部落格、Wikipedia、社群貼文或搜尋結果頁湊數。每篇都要有可開啟的 DOI、PubMed 或 PMC 網址；不足時寧可少列並清楚說明限制，不可杜撰。內文重要醫療主張、數字與治療效果後要用 [1]、[2] 形式標註，編號必須與 referencesHtml 完全一致。
3. 最前面的「總結摘要與核心觀點」至少引用 3 篇不同文獻。
4. 絕對不可捏造作者、年份、論文、DOI、PubMed/PMC 編號、網址、統計數字或名人案例。無法查證的內容不要寫，或明確標示「需人工查證」。
5. 不得做個人診斷、保證療效或提供取代就醫的處方；需列出警訊、就醫時機與醫療安全提醒。
6. 臨床觀點只能寫一般性觀察，不可捏造病人故事，也不可替林醫師創造未提供的專長或經歷。
7. 全文需有 6 至 8 個主要章節、至少 2 個臨床獨特見解卡片、重點比較表、警訊提醒卡、三大常見誤區、4 至 6 題 FAQ、結語與行動建議、醫療安全提醒。章節之間使用範本的 hr。
8. 用台灣一般民眾看得懂的繁體中文，多說明結論、能怎麼做與何時該就醫；少用英文與艱深術語，必要術語先用白話解釋。
9. 不要在正文逐篇交代研究是哪國、什麼設計或收了多少人；研究出處與方法細節放參考資料，正文重點是合理結論及限制。
10. 時事須核對事件日期與報導日期。新聞、Threads、廣告及搜尋入口只是線索，不是療效證據或已證實的搜尋熱度。不能捏造球星傷勢與病史。
11. 如果目前不能上網查證，請先告知，不要把未讀過的資料當成已核對文獻。

【輸出格式要求】
- 只輸出一個完整 JavaScript 文章物件，不要加說明文字，不要省略任何程式碼。
- 必須包含 id、title、lastModified、category、date、summary、coverImage、seoTitle、seoDescription、keywords、contentHtml、referencesHtml。
- contentHtml 與 referencesHtml 必須使用反引號包住。
- 所有欄位都必須是靜態文字，keywords 是文字陣列；不要 import、函式、JSX、React 元件、動態插值或額外的可執行程式。反引號內若需反引號字元請正確跳脫。
- 不要留下「正文待補」、假連結或範例文字。正文沒有實際圖片時不輸出 img 標籤，保留 coverImage 欄位即可。
- 下方是從物件開頭到 referencesHtml 結尾的完整範本，不是摘要版。排版、區塊順序、文字階層、顏色與參考資料格式都必須遵循；依本次主題替換所有示意文字，不可刪除必要區塊或照抄佔位文字。

【文章程式碼範本】
${ARTICLE_CODE_TEMPLATE}`;
}

export function parseExternalArticleCode(raw: string): ExternalArticleCode {
  const fields = readArticleObject(raw);
  const text = (key: string, fallback = '') => typeof fields[key] === 'string' ? (fields[key] as string).trim() : fallback;
  const contentHtml = text('contentHtml');
  const referencesHtml = text('referencesHtml');
  const title = text('title');
  const summary = text('summary');
  if (!title || !summary || !contentHtml || !referencesHtml) {
    throw new Error('程式碼格式不完整，必須包含 title、summary、contentHtml 與 referencesHtml。');
  }

  return {
    id: text('id', `article-${Date.now()}`),
    title,
    lastModified: text('lastModified'),
    category: text('category', '衛教文章'),
    date: text('date'),
    summary,
    coverImage: text('coverImage'),
    seoTitle: text('seoTitle', title),
    seoDescription: text('seoDescription', summary),
    keywords: Array.isArray(fields.keywords) ? fields.keywords.slice(0, 30) : [],
    contentHtml,
    referencesHtml,
  };
}

export function buildClaudeHandoffPrompt(prompt: string, draft?: ExternalArticleCode, instructions = ''): string {
  return `${prompt}\n\n【我的正式撰寫要求】\n${instructions.trim() || '請依照上述議題與版型完整撰寫，以白話結論與病患可以採取的行動為主。'}${draft ? `\n\n【免費 AI 初稿：僅供方向參考，不是已查證資料】\n請重新上網查證時事、醫療主張及全部引用；不要沿用未核對的文獻或把原稿的說法當證據。依我的要求修正錯誤、補強內容並輸出完整文章物件。查證完成後移除「AI 初稿」的版型提醒，但保留實際證據限制。\n${JSON.stringify(draft, null, 2)}` : ''}`;
}

export function sanitizeArticleHtml(html: string): string {
  if (typeof DOMParser === 'undefined') return '';
  const document = new DOMParser().parseFromString(html, 'text/html');
  document.querySelectorAll('script,iframe,object,embed,form,input,button,textarea,meta,link,base,style').forEach((element) => element.remove());
  const allowedTags = new Set(['DIV', 'SECTION', 'P', 'H2', 'H3', 'H4', 'SPAN', 'STRONG', 'EM', 'UL', 'OL', 'LI', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD', 'HR', 'IMG', 'A', 'BR', 'SUP']);
  const allowedAttributes = new Set(['style', 'class', 'href', 'src', 'alt', 'target', 'rel', 'colspan', 'rowspan']);

  for (const element of Array.from(document.body.querySelectorAll('*'))) {
    if (!allowedTags.has(element.tagName)) {
      element.replaceWith(...Array.from(element.childNodes));
      continue;
    }
    for (const attribute of Array.from(element.attributes)) {
      const name = attribute.name.toLowerCase();
      if (!allowedAttributes.has(name) || name.startsWith('on')) element.removeAttribute(attribute.name);
    }
    const style = element.getAttribute('style');
    if (style && /url\s*\(|expression\s*\(|javascript:|@import/i.test(style)) element.removeAttribute('style');
    for (const name of ['href', 'src']) {
      const value = element.getAttribute(name);
      if (value && !/^(https?:\/\/|\/|#)/i.test(value)) element.removeAttribute(name);
    }
    if (element.tagName === 'A') {
      element.setAttribute('target', '_blank');
      element.setAttribute('rel', 'noopener noreferrer');
    }
  }
  return document.body.innerHTML;
}
