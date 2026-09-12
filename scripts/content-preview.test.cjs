const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText, filename);
const { readArticleObject } = require('../src/features/content-admin/article-code-parser.ts');
const { parseExternalArticleCode, buildArticlePrompt, buildClaudeHandoffPrompt } = require('../src/features/content-admin/article-prompt.ts');
const { generateFreeDraft, FREE_DRAFT_MODEL, FREE_DRAFT_MODELS, FREE_DRAFT_RESEARCH_MODEL, validateDraftArticle } = require('../src/features/content-admin/free-draft.ts');
const article = { id: 'test-knee', title: '膝蓋疼痛：測試文章', lastModified: '2026-09-12', category: '衛教文章', date: '2026-09-12', summary: '只供測試的摘要', coverImage: '', seoTitle: '膝痛', seoDescription: '測試', keywords: ['膝痛', '復健'], contentHtml: '<h2>一、重點</h2><p>只供測試的文章。</p>', referencesHtml: '<ol><li>尚未查證</li></ol>' };
const topic = { id: 'unit-test-topic', title: article.title, category: '復健', summary: article.summary, rationale: '測試', sources: [], longTailKeywords: ['膝蓋痛'], score: { total: 80 }, status: 'new' };
const longText = '這是測試用的完整白話醫療衛教內容，清楚說明適用條件、限制與需要就醫的時機，不能取代醫師診斷。'.repeat(22);
const completeReferences = `<h2>📚 參考文獻 (References)</h2><ol>${Array.from({ length: 6 }, (_, index) => `<li>測試作者（2025）。測試論文 ${index + 1}。測試期刊。<a href="https://pubmed.ncbi.nlm.nih.gov/${10000000 + index}/">PubMed</a></li>`).join('')}</ol>`;
const completeContent = `<div><h2>📝 總結摘要與核心觀點</h2><p>${longText}<sup><a href="https://pubmed.ncbi.nlm.nih.gov/10000000/">[1]</a></sup><sup><a href="https://pubmed.ncbi.nlm.nih.gov/10000001/">[2]</a></sup><sup><a href="https://pubmed.ncbi.nlm.nih.gov/10000002/">[3]</a></sup></p></div><hr>${Array.from({ length: 6 }, (_, index) => `<section><h2>${index + 1}、完整章節</h2><p>${longText}<sup><a href="https://pubmed.ncbi.nlm.nih.gov/${10000000 + (index % 6)}/">[${(index % 6) + 1}]</a></sup></p>${index === 1 ? '<div class="custom-table-container"><table class="modern-table"><thead><tr><th>項目</th></tr></thead><tbody><tr><td>內容</td></tr></tbody></table></div>' : ''}${index === 2 ? '<div>⚠️ 需要儘快就醫的警訊</div>' : ''}</section><hr>`).join('')}<div><h4>💡 臨床獨特見解 #1</h4></div><div><h4>💡 臨床獨特見解 #2</h4></div><section><h2>📢 常見三大誤區解析</h2></section><section><h2>🏆 FAQ 常見問題</h2>${Array.from({ length: 4 }, (_, index) => `<h3>Q${index + 1}：常見問題</h3><p>完整回答。</p>`).join('')}</section><div><h2>結語與行動建議</h2><p>安全的下一步。</p></div><div><strong>醫療安全提醒：</strong>本文不能取代診斷。</div>`;
const complete = { ...article, contentHtml: completeContent, referencesHtml: completeReferences };
const unreferencedComplete = { ...complete, contentHtml: completeContent.replace(/<sup>[\s\S]*?<\/sup>/g, ''), referencesHtml: '<h2>📚 參考文獻 (References)</h2><p>本次免費搜尋未取得可核對論文，正式使用前必須補查。</p>' };
const researchResponse = () => new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: '已查得六篇以上的 PubMed 論文，以下逐篇整理作者、年份、標題、研究限制及可支持的結論。'.repeat(12) }] }, groundingMetadata: { groundingChunks: [{ web: { title: 'PubMed', uri: 'https://pubmed.ncbi.nlm.nih.gov/10000000/' } }] } }] }));

test('accepts JSON, fenced JSON, JS templates, escaped strings and trailing comma', () => {
  assert.deepEqual(parseExternalArticleCode(JSON.stringify(article)), article);
  assert.deepEqual(parseExternalArticleCode('以下是程式碼：\n```json\n' + JSON.stringify(article) + '\n```\n'), article);
  const js = "const post = { title: 'Don\\'t panic', summary: '白話說明', keywords: ['膝痛',], contentHtml: `<p>第一段\n第二段</p>`, referencesHtml: `<ol><li>查證來源</li></ol>`, };";
  const result = parseExternalArticleCode(js);
  assert.equal(result.title, "Don't panic"); assert.match(result.contentHtml, /第一段\n第二段/);
  assert.equal(readArticleObject('{title:"\\u9aa8\\x41"}').title, '骨A');
  assert.equal(readArticleObject('{title:`a\\`b \\${literal}`}').title, 'a`b ${literal}');
});

test('rejects incomplete, executable, duplicate and multi-article output', () => {
  for (const bad of ["{title: 'a'", '{title: `a${alert(1)}`}', '{title: (() => "x")()}', '{title:"a",title:"b"}', '{title:"a"}; alert(1)', '{title: "a", summary:["b"]}', '[{title:"a"}]']) {
    assert.throws(() => parseExternalArticleCode(bad));
  }
  assert.throws(() => readArticleObject('```js\n{}\n```\n```js\n{}\n```'), /多個/);
  assert.throws(() => readArticleObject('a'.repeat(500001)), /太長/);
});

test('Claude handoff includes topic, complete layout, draft and user changes with re-verification', () => {
  const prompt = buildClaudeHandoffPrompt(buildArticlePrompt(topic), article, '多寫就醫時機');
  assert.match(prompt, /多寫就醫時機/); assert.match(prompt, /modern-table/); assert.match(prompt, /重新上網查證/); assert.match(prompt, /test-knee/);
  assert.match(prompt, /少用英文/); assert.match(prompt, /不足時寧可少列/);
  assert.match(prompt, /臨床獨特見解 #2/); assert.match(prompt, /Q4：什麼情況需要看醫師/); assert.match(prompt, /至少應有 6 篇/); assert.match(prompt, /overflow-x:auto/); assert.match(prompt, /background-color:#1e3a8a/);
  assert.doesNotMatch(buildClaudeHandoffPrompt('base'), /test-knee/);
});

test('strict draft validation requires the full layout and scholarly references', () => {
  assert.doesNotThrow(() => validateDraftArticle(complete));
  assert.doesNotThrow(() => validateDraftArticle(unreferencedComplete));
  assert.doesNotThrow(() => validateDraftArticle({ ...complete, referencesHtml: completeReferences.replace(/https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/10000000\//, 'https://link.springer.com/article/10.1000/test').replace('PubMed</a></li>', 'Journal article (2025)</a></li>') }));
  assert.doesNotThrow(() => validateDraftArticle({ ...complete, referencesHtml: completeReferences.replace(/https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/10000000\//, 'https://publisher.example.org/record/123').replace('PubMed</a></li>', 'Systematic Review (2025)</a></li>') }));
  assert.throws(() => validateDraftArticle(article), /格式或論文查證未達標/);
  assert.throws(() => validateDraftArticle({ ...complete, referencesHtml: '<ol><li><a href="https://example.com/news">新聞</a></li></ol>' }), /學術論文/);
});

test('Gemini researches first, returns a complete draft and never uses a paid fallback', async () => {
  const previousFetch = global.fetch; const previousKey = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = 'test-key-not-real';
  let calls = 0;
  global.fetch = async (url, options) => {
    calls++; assert.equal(options.headers['x-goog-api-key'], 'test-key-not-real');
    const request = JSON.parse(options.body);
    if (url.includes(FREE_DRAFT_RESEARCH_MODEL)) { assert.deepEqual(request.tools, [{ google_search: {} }]); return researchResponse(); }
    assert.ok(url.includes(FREE_DRAFT_MODEL)); assert.equal(request.tools, undefined); assert.equal(request.generationConfig.responseMimeType, 'application/json'); assert.match(request.contents[0].parts[0].text, /論文查證資料包/);
    return new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: 'hidden thought', thought: true }, { text: JSON.stringify(complete) }] } }] }));
  };
  try {
    const first = await generateFreeDraft(topic);
    assert.equal(first.article.title, article.title); assert.equal(first.model, FREE_DRAFT_MODEL); assert.equal(calls, 2);
    global.fetch = async (url) => {
      calls++;
      if (url.includes(FREE_DRAFT_RESEARCH_MODEL)) return new Response('{}', { status: 429 });
      return new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(unreferencedComplete) }] } }] }));
    };
    const withoutResearch = await generateFreeDraft(topic);
    assert.equal(withoutResearch.article.referencesHtml, unreferencedComplete.referencesHtml); assert.equal(calls, 4);
    let fallbackCalls = 0;
    global.fetch = async (url) => {
      fallbackCalls++;
      if (url.includes(FREE_DRAFT_RESEARCH_MODEL)) return researchResponse();
      if (fallbackCalls === 2) { assert.ok(url.includes(FREE_DRAFT_MODELS[0])); return new Response('{}', { status: 503 }); }
      assert.ok(url.includes(FREE_DRAFT_MODELS[1]));
      return new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(complete) }] } }] }));
    };
    const fallback = await generateFreeDraft(topic);
    assert.equal(fallback.model, FREE_DRAFT_MODELS[1]); assert.equal(fallbackCalls, 3);
    global.fetch = async (url) => url.includes(FREE_DRAFT_RESEARCH_MODEL) ? researchResponse() : new Response(JSON.stringify({ candidates: [{ finishReason: 'MAX_TOKENS' }] }));
    await assert.rejects(generateFreeDraft(topic), /截斷/);
    global.fetch = async (url) => url.includes(FREE_DRAFT_RESEARCH_MODEL) ? researchResponse() : new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(article) }] } }] }));
    await assert.rejects(generateFreeDraft(topic), /格式或論文查證未達標/);
  } finally { global.fetch = previousFetch; if (previousKey === undefined) delete process.env.GEMINI_API_KEY; else process.env.GEMINI_API_KEY = previousKey; }
});

test('durable draft cache coalesces requests, preserves old result on failure and caps daily usage', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'content-preview-test-'));
  const oldCwd = process.cwd(); const oldStorage = process.env.CONTENT_ADMIN_STORAGE;
  process.chdir(directory); process.env.CONTENT_ADMIN_STORAGE = 'local';
  const store = require('../src/features/content-admin/free-draft-store.ts');
  process.chdir(oldCwd);
  try {
    const claims = await Promise.all([store.reserveFreeDraft('one', false), store.reserveFreeDraft('one', false)]);
    assert.equal(claims.filter((item) => item.generate).length, 1);
    assert.equal(claims[0].draft.requestId, claims[1].draft.requestId);
    await assert.rejects(store.reserveFreeDraft('other', false), /試寫中/);
    await store.finishFreeDraft('one', claims[0].draft.requestId, { article, model: FREE_DRAFT_MODEL });
    assert.equal((await store.reserveFreeDraft('one', false)).generate, false);
    const again = await store.reserveFreeDraft('one', true);
    await store.finishFreeDraft('one', again.draft.requestId, { error: 'mock failure' });
    assert.equal((await store.getFreeDraft('one')).article.title, article.title);
    for (let index = 0; index < 8; index++) {
      const next = await store.reserveFreeDraft(`next-${index}`, false);
      await store.finishFreeDraft(`next-${index}`, next.draft.requestId, { error: 'mock failure' });
    }
    await assert.rejects(store.reserveFreeDraft('over-limit', false), /10 次/);
  } finally {
    if (oldStorage === undefined) delete process.env.CONTENT_ADMIN_STORAGE; else process.env.CONTENT_ADMIN_STORAGE = oldStorage;
    if (path.dirname(directory) === os.tmpdir() && path.basename(directory).startsWith('content-preview-test-')) fs.rmSync(directory, { recursive: true, force: true });
  }
});
