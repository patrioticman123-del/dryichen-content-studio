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

const ARTICLE_CODE_TEMPLATE = `{
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
<!-- 若沒有實際圖片檔案，請用註解寫圖片建議，不要捏造圖片路徑 -->
<hr style="margin:3rem 0;border-top:1px solid #e2e8f0;">

<section style="margin-bottom:3.5rem;">
  <h2 style="font-size:1.75rem;font-weight:bold;color:#ffffff;margin-bottom:1.5rem;">一、第一個重要段落</h2>
  <p style="color:#cbd5e1;line-height:1.7;font-size:1.1rem;margin-bottom:1.5rem;">用民眾看得懂的語言說明，重要結論後加入引用 <sup><a href="已查證網址" target="_blank" rel="noopener noreferrer" style="color:#2dd4bf;text-decoration:underline;">[1]</a></sup></p>
  <h3 style="font-size:1.4rem;font-weight:bold;color:#ffffff;margin-bottom:1rem;">段落小標題</h3>
  <ul style="color:#cbd5e1;list-style-type:disc;padding-left:1.5rem;line-height:1.7;font-size:1.1rem;margin-bottom:2rem;">
    <li style="margin-bottom:.5rem;">具體且能執行的重點</li>
  </ul>
</section>

<div style="background-color:#f0f9ff;padding:1.5rem;border-left:4px solid #0891b2;border-radius:.5rem;margin:1.5rem 0;">
  <h4 style="margin-top:0;color:#0e7490;font-weight:bold;font-size:1.15rem;margin-bottom:.5rem;">💡 臨床獨特見解</h4>
  <p style="margin-bottom:0;color:#334155;line-height:1.6;font-size:1.05rem;">只能寫合理的一般臨床觀察，不可捏造病人案例或醫師個人經歷。</p>
</div>

<section style="margin-bottom:3.5rem;">
  <h2 style="font-size:1.75rem;font-weight:bold;color:#ffffff;margin-bottom:1.5rem;">二、重點比較表</h2>
  <div class="custom-table-container">
    <table class="modern-table">
      <thead><tr><th>比較項目</th><th>特色</th><th>注意事項</th><th>適用情況</th></tr></thead>
      <tbody><tr><td>項目一</td><td>內容</td><td>內容</td><td>內容</td></tr></tbody>
    </table>
  </div>
</section>

<section style="margin-bottom:3.5rem;">
  <div style="background-color:#fffbeb;border:2px solid #fbbf24;border-radius:1rem;padding:1.5rem;margin:2rem 0;">
    <h2 style="color:#b45309;margin-top:0;font-weight:bold;font-size:1.4rem;border-bottom:2px solid #fcd34d;padding-bottom:.5rem;">📢 常見三大誤區解析</h2>
    <ol style="color:#92400e;padding-left:1.5rem;line-height:1.7;">
      <li style="margin-bottom:1rem;"><strong>常見錯誤說法：</strong>正確解釋與引用。</li>
    </ol>
  </div>
</section>

<!-- 依主題繼續完成約 6 至 8 個完整章節，每章之間放置 hr -->

<section style="background-color:#0f172a;border:1px solid #1e293b;border-radius:1.5rem;overflow:hidden;margin:3rem 0;">
  <div style="background-color:#1e293b;padding:1rem 1.5rem;border-bottom:1px solid #334155;">
    <h2 style="color:#22d3ee;margin:0;font-size:1.25rem;font-weight:bold;">🏆 FAQ 常見問題</h2>
  </div>
  <div style="padding:2rem 1.25rem 1.2rem;">
    <h3 style="color:#f8fafc;margin-top:0;margin-bottom:.75rem;font-size:1.2rem;font-weight:bold;">Q1：民眾最常問的問題？</h3>
    <p style="color:#94a3b8;line-height:1.8;font-size:1.05rem;margin-bottom:2rem;">清楚回答，必要時加入引用。</p>
    <!-- 共 4 至 6 題 -->
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
    <!-- 至少列出 10 篇，而且編號必須與內文引用一致 -->
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
2. 優先查找至少 10 篇直接相關、可驗證的參考資料；不足時寧可少列並清楚說明限制，不可為了湊數杜撰。內文重要醫療主張、數字與治療效果後要用 [1]、[2] 形式標註，編號必須與 referencesHtml 完全一致。
3. 最前面的「總結摘要與核心觀點」至少引用 3 篇不同文獻。
4. 絕對不可捏造作者、年份、論文、DOI、PubMed/PMC 編號、網址、統計數字或名人案例。無法查證的內容不要寫，或明確標示「需人工查證」。
5. 不得做個人診斷、保證療效或提供取代就醫的處方；需列出警訊、就醫時機與醫療安全提醒。
6. 臨床觀點只能寫一般性觀察，不可捏造病人故事，也不可替林醫師創造未提供的專長或經歷。
7. 全文需有 6 至 8 個主要章節、重點比較表、三大常見誤區、4 至 6 題 FAQ、結語與行動建議。
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
- 排版、文字階層、顏色與參考資料格式必須遵循下列範本；依本次主題替換內容，不要照抄範本中的示意文字。

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
