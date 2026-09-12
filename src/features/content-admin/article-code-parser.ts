/** Read string-only article objects without eval, Function, or executing pasted code. */
export function readArticleObject(raw: string): Record<string, string | string[]> {
  if (!raw.trim()) throw new Error('請先貼上 Claude 生成的完整文章程式碼。');
  if (raw.length > 500000) throw new Error('程式碼太長，請確認只貼上一篇文章。');
  const fences = [...raw.matchAll(/```(?:javascript|js|typescript|ts|json)?[^\S\r\n]*\r?\n([\s\S]*?)```/gi)];
  if (fences.length > 1) throw new Error('偵測到多個程式碼區塊，請只貼上一篇完整的文章物件。');
  let source = fences.length === 1 ? fences[0][1] : raw;
  source = source.trim().replace(/^(?:(?:export\s+)?(?:const|let)\s+[\w$]+(?:\s*:\s*[\w$]+)?\s*=\s*|export\s+default\s+)/, '');
  let cursor = 0;
  const fail = (message: string): never => { throw new Error(`${message}（約第 ${source.slice(0, cursor).split('\n').length} 行）。請讓 Claude 回傳完整文章物件，不要 React 元件或可執行程式。`); };
  function skip() {
    while (cursor < source.length) {
      if (/\s/.test(source[cursor])) { cursor++; continue; }
      if (source.startsWith('//', cursor)) { const end = source.indexOf('\n', cursor + 2); cursor = end < 0 ? source.length : end + 1; continue; }
      if (source.startsWith('/*', cursor)) { const end = source.indexOf('*/', cursor + 2); if (end < 0) fail('註解未結束'); cursor = end + 2; continue; }
      break;
    }
  }
  function expect(character: string) { skip(); if (source[cursor] !== character) fail(`缺少 ${character}`); cursor++; }
  function readString(): string {
    skip();
    const quote = source[cursor++];
    if (!['"', "'", '`'].includes(quote)) fail('欄位必須是引號或反引號包住的文字');
    let result = '';
    while (cursor < source.length) {
      const character = source[cursor++];
      if (character === quote) return result;
      if (quote === '`' && character === '$' && source[cursor] === '{') fail('不支援 ${...} 動態插值，請改成完整靜態 HTML');
      if (character !== '\\') {
        if (quote !== '`' && /[\r\n]/.test(character)) fail('多行 HTML 請使用反引號');
        result += character; continue;
      }
      if (cursor >= source.length) fail('跳脫字元不完整');
      const escaped = source[cursor++];
      const escapes: Record<string, string> = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', v: '\v', '0': '\0' };
      if (escaped === 'u' || escaped === 'x') {
        const length = escaped === 'u' ? 4 : 2;
        const hex = source.slice(cursor, cursor + length);
        if (!new RegExp(`^[0-9a-fA-F]{${length}}$`).test(hex)) fail('Unicode 跳脫格式錯誤');
        result += String.fromCharCode(parseInt(hex, 16)); cursor += length;
      } else if (escaped === '\r' || escaped === '\n') { if (escaped === '\r' && source[cursor] === '\n') cursor++; }
      else result += escapes[escaped] ?? escaped;
    }
    return fail('文字引號未結束，文章可能尚未複製完整');
  }
  expect('{');
  const fields: Record<string, string | string[]> = Object.create(null);
  while (true) {
    skip(); if (source[cursor] === '}') { cursor++; break; }
    let key: string;
    if (source[cursor] === '"' || source[cursor] === "'") key = readString();
    else {
      const match = source.slice(cursor).match(/^[A-Za-z_$][\w$]*/);
      if (!match) fail('無法辨識文章欄位名稱');
      key = match![0]; cursor += key.length;
    }
    if (Object.prototype.hasOwnProperty.call(fields, key)) fail(`欄位 ${key} 重複`);
    expect(':'); skip();
    if (source[cursor] === '[') {
      cursor++; const values: string[] = [];
      while (true) {
        skip(); if (source[cursor] === ']') { cursor++; break; }
        values.push(readString()); skip();
        if (source[cursor] === ',') cursor++;
        else if (source[cursor] !== ']') fail('陣列項目之間缺少逗號');
      }
      fields[key] = values;
    } else fields[key] = readString();
    skip();
    if (source[cursor] === ',') cursor++;
    else if (source[cursor] !== '}') fail('文章欄位之間缺少逗號');
  }
  skip(); if (source[cursor] === ',' || source[cursor] === ';') { cursor++; skip(); }
  if (cursor !== source.length) fail('文章物件後還有其他程式碼');
  return fields;
}
