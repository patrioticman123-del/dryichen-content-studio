import type { ApprovalCheck, ArticleVersion, TopicScore } from './types';

export function calculateTopicScore(input: Omit<TopicScore, 'total'>): TopicScore {
  const total = Math.round(
    input.timeliness * 0.35 +
    input.patientRelevance * 0.25 +
    input.clinicalFit * 0.2 +
    input.searchIntent * 0.1 +
    input.differentiation * 0.1,
  );

  return { ...input, total };
}

export function runApprovalChecks(version: ArticleVersion): ApprovalCheck[] {
  const plainText = version.contentHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const hasMedicalDisclaimer = /衛教|診斷|醫師|就醫/.test(plainText);

  return [
    {
      id: 'title',
      label: '標題與 SEO 標題',
      passed: version.title.length >= 12 && version.seoTitle.length >= 12,
      blocking: true,
      detail: '標題至少 12 個字，並包含獨立 SEO 標題。',
    },
    {
      id: 'summary',
      label: '摘要完整度',
      passed: version.summary.length >= 50 && version.seoDescription.length >= 50,
      blocking: true,
      detail: '摘要與 SEO 描述需足以讓讀者理解文章內容。',
    },
    {
      id: 'body',
      label: '文章基本篇幅',
      passed: plainText.length >= 500,
      blocking: true,
      detail: '本機示範稿至少需要 500 個純文字字元。',
    },
    {
      id: 'keywords',
      label: '長尾關鍵字',
      passed: version.keywords.length >= 3,
      blocking: true,
      detail: '至少保留 3 組可追蹤的長尾關鍵字。',
    },
    {
      id: 'references',
      label: '參考資料',
      passed: version.references.length >= 2,
      blocking: true,
      detail: '至少列出 2 個可回查來源；正式發布前仍需人工確認內容相符。',
    },
    {
      id: 'disclaimer',
      label: '醫療安全提醒',
      passed: hasMedicalDisclaimer,
      blocking: true,
      detail: '文章需提醒讀者衛教內容不能取代個別診斷。',
    },
  ];
}
