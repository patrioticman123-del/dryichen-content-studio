const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText, filename);
const { readArticleObject } = require('../src/features/content-admin/article-code-parser.ts');
const { parseExternalArticleCode, buildArticlePrompt, buildClaudeHandoffPrompt } = require('../src/features/content-admin/article-prompt.ts');
const { generateFreeDraft, FREE_DRAFT_MODEL } = require('../src/features/content-admin/free-draft.ts');
const article = { id: 'test-knee', title: '膝蓋疼痛：測試文章', lastModified: '2026-09-12', category: '衛教文章', date: '2026-09-12', summary: '只供測試的摘要', coverImage: '', seoTitle: '膝痛', seoDescription: '測試', keywords: ['膝痛', '復健'], contentHtml: '<h2>一、重點</h2><p>只供測試的文章。</p>', referencesHtml: '<ol><li>尚未查證</li></ol>' };
const topic = { id: 'unit-test-topic', title: article.title, category: '復健', summary: article.summary, rationale: '測試', sources: [], longTailKeywords: ['膝蓋痛'], score: { total: 80 }, status: 'new' };

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
  assert.doesNotMatch(buildClaudeHandoffPrompt('base'), /test-knee/);
});

test('Gemini returns a genuine complete draft with no search tools or paid fallback', async () => {
  const previousFetch = global.fetch; const previousKey = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = 'test-key-not-real';
  const complete = { ...article, contentHtml: Array.from({ length: 5 }, (_, index) => `<h2>${index + 1}、完整段落</h2><p>${'這是測試用的白話內容，不是醫療建議。'.repeat(30)}</p>`).join('') };
  let calls = 0;
  global.fetch = async (url, options) => {
    calls++; assert.ok(url.includes(FREE_DRAFT_MODEL)); assert.equal(options.headers['x-goog-api-key'], 'test-key-not-real');
    const request = JSON.parse(options.body); assert.equal(request.tools, undefined); assert.equal(request.generationConfig.responseMimeType, 'application/json');
    return new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: 'hidden thought', thought: true }, { text: JSON.stringify(complete) }] } }] }));
  };
  try {
    assert.equal((await generateFreeDraft(topic)).title, article.title); assert.equal(calls, 1);
    global.fetch = async () => { calls++; return new Response('{}', { status: 429 }); };
    await assert.rejects(generateFreeDraft(topic), /免費額度/); assert.equal(calls, 2);
    global.fetch = async () => new Response(JSON.stringify({ candidates: [{ finishReason: 'MAX_TOKENS' }] }));
    await assert.rejects(generateFreeDraft(topic), /截斷/);
    global.fetch = async () => new Response(JSON.stringify({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(article) }] } }] }));
    await assert.rejects(generateFreeDraft(topic), /短文或模板/);
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
