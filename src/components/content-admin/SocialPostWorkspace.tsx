'use client';

import { useEffect, useRef, useState } from 'react';
import type { ExternalArticleCode } from '@/features/content-admin/article-prompt';
import type { SocialPlatform, SocialPostResult, SocialStyle } from '@/features/content-admin/social-content';

const platformLabels: Record<SocialPlatform, string> = { facebook: 'Facebook', instagram: 'Instagram', threads: 'Threads' };
const styleOptions: Array<[SocialStyle, string, string]> = [
  ['professional', '專業可信', '清楚、穩重、適合正式醫療衛教'],
  ['warm', '溫暖關懷', '降低焦慮，著重理解與陪伴'],
  ['story', '故事共鳴', '以生活情境帶入，不虛構病患'],
  ['bold', '反差吸睛', '用反差與好奇抓住注意力，不誇大'],
  ['minimal', '精簡俐落', '短句、留白、快速看懂重點'],
];

const themes: Record<SocialStyle, { top: string; bottom: string; accent: string; ink: string; soft: string }> = {
  professional: { top: '#0f766e', bottom: '#0f172a', accent: '#5eead4', ink: '#ffffff', soft: '#ccfbf1' },
  warm: { top: '#c2410c', bottom: '#431407', accent: '#fed7aa', ink: '#ffffff', soft: '#ffedd5' },
  story: { top: '#7c3aed', bottom: '#2e1065', accent: '#ddd6fe', ink: '#ffffff', soft: '#ede9fe' },
  bold: { top: '#e11d48', bottom: '#111827', accent: '#fef08a', ink: '#ffffff', soft: '#ffe4e6' },
  minimal: { top: '#f8fafc', bottom: '#e2e8f0', accent: '#0f766e', ink: '#0f172a', soft: '#334155' },
};

function plainArticle(article: ExternalArticleCode) {
  const container = document.createElement('div');
  container.innerHTML = `${article.contentHtml} ${article.referencesHtml}`;
  container.querySelectorAll('script,style').forEach((element) => element.remove());
  return `${article.title}\n${article.summary}\n${container.textContent || ''}`.replace(/\s+/g, ' ').slice(0, 40000);
}

function wrapLines(context: CanvasRenderingContext2D, value: string, width: number, maximum: number) {
  const lines: string[] = [];
  let line = '';
  for (const character of Array.from(value.trim())) {
    const next = line + character;
    if (line && context.measureText(next).width > width) { lines.push(line.trim()); line = character; }
    else line = next;
    if (lines.length === maximum) break;
  }
  if (lines.length < maximum && line.trim()) lines.push(line.trim());
  const consumed = lines.join('').replace(/\s/g, '').length;
  if (consumed < value.replace(/\s/g, '').length && lines.length) lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[，。、；：…]?$/, '')}…`;
  return lines.slice(0, maximum);
}

function SocialImageCard({ copy, style }: { copy: SocialPostResult['image']; style: SocialStyle }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [format, setFormat] = useState<'square' | 'portrait'>('square');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 1080; canvas.height = format === 'square' ? 1080 : 1350;
    const context = canvas.getContext('2d');
    if (!context) return;
    const theme = themes[style];
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, theme.top); gradient.addColorStop(1, theme.bottom);
    context.fillStyle = gradient; context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = style === 'minimal' ? 0.08 : 0.12;
    context.fillStyle = theme.accent; context.beginPath(); context.arc(925, 140, 260, 0, Math.PI * 2); context.fill();
    context.beginPath(); context.arc(110, canvas.height - 80, 210, 0, Math.PI * 2); context.fill(); context.globalAlpha = 1;

    context.fillStyle = theme.accent; context.font = '700 34px "Microsoft JhengHei", sans-serif';
    context.fillText(copy.eyebrow, 88, 115);
    context.fillStyle = theme.ink; context.font = `900 ${copy.headline.length > 16 ? 68 : 78}px "Microsoft JhengHei", sans-serif`;
    const titleLines = wrapLines(context, copy.headline, 880, 3);
    const start = format === 'square' ? 255 : 340;
    titleLines.forEach((line, index) => context.fillText(line, 88, start + index * 104));
    const subtitleY = start + titleLines.length * 104 + 38;
    context.fillStyle = style === 'minimal' ? theme.soft : '#e2e8f0'; context.font = '500 38px "Microsoft JhengHei", sans-serif';
    wrapLines(context, copy.subheadline, 850, 3).forEach((line, index) => context.fillText(line, 88, subtitleY + index * 60));

    const bottom = canvas.height - 105;
    context.strokeStyle = theme.accent; context.globalAlpha = 0.65; context.lineWidth = 2; context.beginPath(); context.moveTo(88, bottom - 68); context.lineTo(992, bottom - 68); context.stroke(); context.globalAlpha = 1;
    context.fillStyle = theme.ink; context.font = '700 30px "Microsoft JhengHei", sans-serif'; context.fillText('林羿辰醫師｜宸新復健科', 88, bottom);
    context.textAlign = 'right'; context.fillStyle = style === 'minimal' ? theme.soft : '#cbd5e1'; context.font = '500 24px "Microsoft JhengHei", sans-serif'; context.fillText('一般衛教資訊・不能取代醫師診斷', 992, bottom); context.textAlign = 'left';
  }, [copy, format, style]);

  function blob() { return new Promise<Blob>((resolve, reject) => canvasRef.current?.toBlob((value) => value ? resolve(value) : reject(new Error('無法輸出圖片。')), 'image/png')); }
  async function copyImage() {
    try { const image = await blob(); await navigator.clipboard.write([new ClipboardItem({ 'image/png': image })]); setNotice('圖片已複製，可以直接貼到支援圖片貼上的 App。'); }
    catch { setNotice('這個瀏覽器不支援直接複製圖片，請使用「下載 PNG」。'); }
  }
  async function download() {
    const image = await blob(); const link = document.createElement('a'); link.href = URL.createObjectURL(image); link.download = `social-${format}-${Date.now()}.png`; link.click(); window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  return <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
    <div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-sm font-black text-slate-800">社群發布圖片</p><p className="mt-1 text-xs text-slate-500">免費產生品牌文字圖，不使用或假造醫療影像。</p></div><div className="flex gap-2"><button type="button" onClick={() => setFormat('square')} className={`rounded-lg px-3 py-2 text-xs font-bold ${format === 'square' ? 'bg-teal-700 text-white' : 'bg-white text-slate-600'}`}>方形 1:1</button><button type="button" onClick={() => setFormat('portrait')} className={`rounded-lg px-3 py-2 text-xs font-bold ${format === 'portrait' ? 'bg-teal-700 text-white' : 'bg-white text-slate-600'}`}>直式 4:5</button></div></div>
    <canvas ref={canvasRef} className="h-auto w-full rounded-xl shadow-sm" aria-label="社群發布圖片預覽" />
    <div className="grid grid-cols-2 gap-2"><button type="button" onClick={copyImage} className="min-h-11 rounded-xl border border-teal-300 bg-white text-sm font-black text-teal-800">複製圖片</button><button type="button" onClick={download} className="min-h-11 rounded-xl bg-teal-700 text-sm font-black text-white">下載 PNG</button></div>
    {notice && <p className="text-xs leading-5 text-slate-600">{notice}</p>}
  </div>;
}

export default function SocialPostWorkspace({ article, embedded = false }: { article?: ExternalArticleCode; embedded?: boolean }) {
  const [selected, setSelected] = useState<Record<SocialPlatform, boolean>>({ facebook: true, instagram: false, threads: false });
  const [sourceMode, setSourceMode] = useState<'article' | 'url' | 'content'>('content');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [style, setStyle] = useState<SocialStyle>('professional');
  const [emojiCount, setEmojiCount] = useState(2);
  const [result, setResult] = useState<SocialPostResult>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copyNotice, setCopyNotice] = useState('');

  useEffect(() => { if (article && !content.trim()) setSourceMode('article'); }, [article, content]);

  async function generate() {
    const platforms = (Object.keys(selected) as SocialPlatform[]).filter((platform) => selected[platform]);
    if (!platforms.length) return setError('請至少選擇一個平台。');
    if (sourceMode === 'article' && !article) return setError('請先完成文章預覽，或改貼網址／文章內容。');
    setBusy(true); setError(''); setCopyNotice('');
    try {
      const sourceContent = sourceMode === 'article' && article ? plainArticle(article) : content;
      const response = await fetch('/api/admin/social-posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sourceMode, url, content: sourceContent, platforms, style, emojiCount }), signal: AbortSignal.timeout(115000) });
      const data = await response.json().catch(() => ({ error: '伺服器沒有完整回應。' }));
      if (!response.ok) throw new Error(data.error || '無法產生社群貼文。');
      setResult(data);
    } catch (reason) { setError(reason instanceof Error && ['AbortError', 'TimeoutError'].includes(reason.name) ? '等待時間已到，請稍後再試。' : reason instanceof Error ? reason.message : '無法產生社群貼文。'); }
    finally { setBusy(false); }
  }

  async function copy(value: string, label: string) {
    try { await navigator.clipboard.writeText(value); setCopyNotice(`${label} 已複製，可以直接貼上。`); }
    catch { setCopyNotice('瀏覽器無法自動複製，請長按文字全選複製。'); }
  }

  const selectedPlatforms = (Object.keys(selected) as SocialPlatform[]).filter((platform) => selected[platform]);
  return <section className={`space-y-4 ${embedded ? 'rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5' : ''}`}>
    <div><h2 className="text-lg font-black text-slate-900">{embedded ? '4. 生成社群貼文與發布圖片' : '社群貼文與發布圖片'}</h2><p className="mt-1 text-sm leading-6 text-slate-500">三個平台會分別改寫，不是同一篇文字截短。Facebook 預設勾選；生成後仍可自行修改再發布。每天最多生成 30 次。</p></div>

    <details className="rounded-xl border border-slate-200 bg-slate-50 p-3"><summary className="cursor-pointer text-sm font-black text-slate-700">查看三個平台完整比較</summary><div className="mt-3 overflow-x-auto"><table className="min-w-[760px] border-collapse text-left text-xs text-slate-700"><thead><tr className="bg-slate-900 text-white"><th className="p-3">比較項目</th><th className="p-3">Facebook</th><th className="p-3">Instagram</th><th className="p-3">Threads</th></tr></thead><tbody>{[
      ['核心特色', '故事、信任', '視覺、影片', '觀點、討論'], ['建議長度', '300–800 字', '50–200 字', '40–150 字'], ['最重要的開頭', '前 2–3 行', '前 1 秒畫面', '第一句話'], ['主要內容', '故事＋衛教', 'Reels＋輪播圖', '短觀點＋問題'], ['吸引方式', '情感共鳴', '視覺衝擊', '反差、好奇'], ['重要互動', '分享、留言', '分享、觀看、收藏', '回覆、轉發'], ['起步節奏', '每週 3–4 篇', '每週 3–5 則', '每週 5–10 篇'], ['主要目標', '增加信任與就診意願', '開發新受眾', '建立話題與人格魅力'],
    ].map((row, index) => <tr key={row[0]} className={index % 2 ? 'bg-white' : 'bg-slate-100'}>{row.map((cell) => <td key={cell} className="border-b border-slate-200 p-3">{cell}</td>)}</tr>)}</tbody></table></div></details>

    <div className="space-y-3 rounded-xl border border-slate-200 p-3">
      <p className="text-sm font-black text-slate-800">選擇來源</p>
      <div className="grid gap-2 sm:grid-cols-3">
        <button type="button" disabled={!article} onClick={() => setSourceMode('article')} className={`min-h-11 rounded-xl border px-3 text-sm font-bold disabled:opacity-40 ${sourceMode === 'article' ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-slate-200 text-slate-600'}`}>目前預覽文章</button>
        <button type="button" onClick={() => setSourceMode('url')} className={`min-h-11 rounded-xl border px-3 text-sm font-bold ${sourceMode === 'url' ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-slate-200 text-slate-600'}`}>貼上文章網址</button>
        <button type="button" onClick={() => setSourceMode('content')} className={`min-h-11 rounded-xl border px-3 text-sm font-bold ${sourceMode === 'content' ? 'border-teal-600 bg-teal-50 text-teal-800' : 'border-slate-200 text-slate-600'}`}>貼上文章內容</button>
      </div>
      {sourceMode === 'article' && <p className="rounded-lg bg-teal-50 p-3 text-sm text-teal-800">將使用：{article?.title || '請先完成上方文章預覽'}</p>}
      {sourceMode === 'url' && <label className="block text-sm font-bold text-slate-700">公開文章網址<input value={url} onChange={(event) => setUrl(event.target.value)} type="url" placeholder="https://example.com/article" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-3 font-normal" /></label>}
      {sourceMode === 'content' && <label className="block text-sm font-bold text-slate-700">文章內容<textarea value={content} onChange={(event) => setContent(event.target.value)} rows={8} maxLength={40000} placeholder="貼上完整文章或至少 40 個字的內容…" className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal leading-6" /></label>}
    </div>

    <div className="grid gap-3 rounded-xl border border-slate-200 p-3 sm:grid-cols-2">
      <fieldset><legend className="text-sm font-black text-slate-800">發布平台</legend><div className="mt-3 space-y-2">{(Object.keys(platformLabels) as SocialPlatform[]).map((platform) => <label key={platform} className="flex min-h-11 items-center gap-3 rounded-lg bg-slate-50 px-3 text-sm font-bold text-slate-700"><input type="checkbox" checked={selected[platform]} onChange={(event) => setSelected((current) => ({ ...current, [platform]: event.target.checked }))} className="h-5 w-5" />{platformLabels[platform]}</label>)}</div></fieldset>
      <div className="space-y-3"><label className="block text-sm font-black text-slate-800">文字與圖片風格<select value={style} onChange={(event) => setStyle(event.target.value as SocialStyle)} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal">{styleOptions.map(([value, label, note]) => <option key={value} value={value}>{label}｜{note}</option>)}</select></label><label className="block text-sm font-black text-slate-800">每篇 Emoji 數量<select value={emojiCount} onChange={(event) => setEmojiCount(Number(event.target.value))} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 font-normal">{Array.from({ length: 9 }, (_, value) => <option key={value} value={value}>{value === 0 ? '0 個（不要 Emoji）' : `${value} 個`}</option>)}</select></label></div>
    </div>

    <button type="button" onClick={generate} disabled={busy || !selectedPlatforms.length} className="min-h-12 w-full rounded-xl bg-teal-700 px-4 py-3 text-sm font-black text-white disabled:opacity-40">{busy ? '正在分平台撰寫與設計圖片…' : `生成 ${selectedPlatforms.map((platform) => platformLabels[platform]).join('、') || '社群'} 內容`}</button>
    {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm leading-6 text-rose-700">{error}</p>}
    {copyNotice && <p role="status" className="rounded-xl bg-teal-50 p-3 text-sm text-teal-800">{copyNotice}</p>}

    {result && <div className="space-y-4"><p className="text-xs text-slate-500">使用模型：{result.model}。建議發布前再確認醫療敘述、連結與個人經歷是否正確。</p>{selectedPlatforms.map((platform) => <article key={platform} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between gap-3"><h3 className="font-black text-slate-900">{platformLabels[platform]} 貼文</h3><span className="text-xs text-slate-400">{result.posts[platform].length} 字元</span></div><textarea readOnly value={result.posts[platform]} rows={platform === 'facebook' ? 12 : 7} className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-7 text-slate-700" /><button type="button" onClick={() => copy(result.posts[platform], platformLabels[platform])} className="mt-3 min-h-11 w-full rounded-xl bg-slate-900 text-sm font-black text-white">一鍵複製 {platformLabels[platform]}</button></article>)}<SocialImageCard copy={result.image} style={style} /></div>}
  </section>;
}
