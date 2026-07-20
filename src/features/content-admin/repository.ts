import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { createSeedStore } from './seed';
import type { ArticleVersion, ContentAdminStore, ContentTopic, GeneratedArticle, TopicStatus } from './types';

const dataDirectory = path.join(process.cwd(), '.local-data');
const dataFile = path.join(dataDirectory, 'content-admin.json');

async function readStore(): Promise<ContentAdminStore> {
  try {
    return JSON.parse(await fs.readFile(dataFile, 'utf8')) as ContentAdminStore;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    const seed = createSeedStore();
    await writeStore(seed);
    return seed;
  }
}

async function writeStore(store: ContentAdminStore): Promise<void> {
  await fs.mkdir(dataDirectory, { recursive: true });
  const temporaryFile = `${dataFile}.${process.pid}.tmp`;
  await fs.writeFile(temporaryFile, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
  await fs.rename(temporaryFile, dataFile);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  })[character] || character);
}

export function slugify(topic: ContentTopic): string {
  return `${topic.category === '兒童成長' ? 'child-growth' : 'rehab'}-${Date.now().toString(36)}`;
}

export function buildArticleVersion(topic: ContentTopic, version = 1, changeRequest?: string): ArticleVersion {
  const title = topic.title;
  const keywords = topic.longTailKeywords;
  const editorNote = changeRequest
    ? `<div style="margin: 1.5rem 0; padding: 1rem; border: 1px solid #22d3ee; border-radius: 0.75rem; background: rgba(8,145,178,.12);"><strong style="color:#67e8f9">第 ${version} 版修改紀錄：</strong> ${escapeHtml(changeRequest)}</div>`
    : '';

  return {
    version,
    title,
    summary: `${topic.summary} 本文將從常見疑問、可執行步驟、風險警訊與就醫判斷四個方向整理，協助讀者先建立正確觀念，再與醫療專業人員討論個別情況。`,
    seoTitle: `${title}｜復健科醫師完整說明`,
    seoDescription: `${topic.summary} 整理實際可執行的照護原則、常見迷思與需要就醫的警訊，提供民眾作為就診前的衛教參考。`,
    keywords,
    contentHtml: `
      <div style="background:#f8fafc;border-left:4px solid #06b6d4;padding:1.5rem;margin-bottom:2rem;border-radius:.5rem;color:#334155">
        <h2 style="color:#0e7490;margin-top:0">先說結論</h2>
        <p>${escapeHtml(topic.summary)} 真正合適的做法仍會受到年齡、病程、身體狀況與治療方式影響，不宜只用單一時間或單一動作判斷。</p>
      </div>
      ${editorNote}
      <section style="margin-bottom:3rem">
        <h2 style="color:#fff">為什麼這個問題值得特別注意？</h2>
        <p>${escapeHtml(topic.rationale)} 搜尋到的資訊常把不同族群與不同病程放在一起比較，容易造成過度期待或不必要的擔心。比較安全的方式，是先分辨症狀階段、功能限制與是否存在危險警訊。</p>
        <p>建議記錄症狀出現的時間、誘發活動、持續多久、是否影響睡眠，以及最近是否有受傷或治療。這些資訊能幫助醫師在門診更快掌握問題。</p>
      </section>
      <section style="margin-bottom:3rem">
        <h2 style="color:#fff">可以先做的三個步驟</h2>
        <ol>
          <li><strong>先降低明顯誘發症狀的負荷：</strong>不是完全不動，而是在可接受範圍內保留日常活動。</li>
          <li><strong>以隔天反應調整：</strong>若活動後不適持續增加或隔天明顯惡化，代表目前劑量可能過高。</li>
          <li><strong>建立可回顧的紀錄：</strong>記下活動種類、時間、症狀強度與恢復速度，回診時比單靠印象更有幫助。</li>
        </ol>
      </section>
      <section style="margin-bottom:3rem">
        <h2 style="color:#fff">哪些情況應儘早就醫？</h2>
        <p>若疼痛快速加劇、明顯腫脹發熱、肢體無力或麻木、無法承重、夜間痛持續惡化，或伴隨發燒與全身不適，應停止自行嘗試並儘早接受專業評估。</p>
        <p>即使沒有上述警訊，若問題已影響睡眠、工作、上學或運動超過一至兩週，也適合安排評估，找出限制恢復的因素。</p>
      </section>
      <section style="margin-bottom:3rem">
        <h2 style="color:#fff">常見問題</h2>
        <h3 style="color:#67e8f9">只要照網路上的時間表就可以嗎？</h3>
        <p>時間表只能作為一般方向，不能取代個別評估。恢復速度、疾病嚴重度、既往受傷與日常負荷都可能改變安排。</p>
        <h3 style="color:#67e8f9">症狀稍微出現就要完全休息嗎？</h3>
        <p>不一定。多數情況需要的是調整強度與動作品質；但若出現急性警訊，就不應勉強活動。</p>
      </section>
      <div style="background:#fffbeb;border:2px solid #fbbf24;border-radius:1rem;padding:1.5rem;color:#92400e">
        <strong>醫療安全提醒：</strong>本文為一般衛教內容，不能取代醫師診斷、檢查或個別治療建議。若症狀持續或出現警訊，請儘早就醫。
      </div>`,
    references: [
      { label: 'PubMed 醫學文獻資料庫', url: 'https://pubmed.ncbi.nlm.nih.gov/', note: '示範來源；正式發布前需替換為與主題直接相關的研究。' },
      { label: 'World Health Organization Health Topics', url: 'https://www.who.int/health-topics/', note: '示範來源；正式發布前需人工確認引用內容。' },
    ],
    changeRequest,
    createdAt: new Date().toISOString(),
  };
}

export async function listTopics(): Promise<ContentTopic[]> {
  if (process.env.CONTENT_ADMIN_STORAGE === 'postgres') {
    return (await import('./postgres-repository')).listPostgresTopics();
  }
  return (await readStore()).topics.sort((a, b) => b.score.total - a.score.total);
}

export async function updateTopicStatus(id: string, status: TopicStatus): Promise<ContentTopic | null> {
  if (process.env.CONTENT_ADMIN_STORAGE === 'postgres') {
    return (await import('./postgres-repository')).updatePostgresTopicStatus(id, status);
  }
  const store = await readStore();
  const topic = store.topics.find((item) => item.id === id);
  if (!topic) return null;
  topic.status = status;
  topic.updatedAt = new Date().toISOString();
  await writeStore(store);
  return topic;
}

export async function generateArticle(topicId: string): Promise<GeneratedArticle | null> {
  if (process.env.CONTENT_ADMIN_STORAGE === 'postgres') {
    return (await import('./postgres-repository')).generatePostgresArticle(topicId);
  }
  const store = await readStore();
  const topic = store.topics.find((item) => item.id === topicId);
  if (!topic) return null;
  if (topic.articleId) return store.articles.find((item) => item.id === topic.articleId) || null;

  const timestamp = new Date().toISOString();
  const article: GeneratedArticle = {
    id: randomUUID(), topicId, slug: slugify(topic), category: '衛教文章', status: 'drafting',
    currentVersion: 1, versions: [buildArticleVersion(topic)], createdAt: timestamp, updatedAt: timestamp,
  };
  store.articles.push(article);
  topic.articleId = article.id;
  topic.status = 'drafting';
  topic.updatedAt = timestamp;
  await writeStore(store);
  return article;
}

export async function getArticle(id: string): Promise<GeneratedArticle | null> {
  if (process.env.CONTENT_ADMIN_STORAGE === 'postgres') {
    return (await import('./postgres-repository')).getPostgresArticle(id);
  }
  return (await readStore()).articles.find((item) => item.id === id) || null;
}

export async function createRevision(id: string, changeRequest: string): Promise<GeneratedArticle | null> {
  if (process.env.CONTENT_ADMIN_STORAGE === 'postgres') {
    return (await import('./postgres-repository')).createPostgresRevision(id, changeRequest);
  }
  const store = await readStore();
  const article = store.articles.find((item) => item.id === id);
  const topic = article && store.topics.find((item) => item.id === article.topicId);
  if (!article || !topic) return null;
  const nextVersion = article.currentVersion + 1;
  article.versions.push(buildArticleVersion(topic, nextVersion, changeRequest));
  article.currentVersion = nextVersion;
  article.status = 'drafting';
  article.updatedAt = new Date().toISOString();
  await writeStore(store);
  return article;
}

export async function approveArticle(id: string): Promise<GeneratedArticle | null> {
  if (process.env.CONTENT_ADMIN_STORAGE === 'postgres') {
    return (await import('./postgres-repository')).approvePostgresArticle(id);
  }
  const store = await readStore();
  const article = store.articles.find((item) => item.id === id);
  if (!article) return null;
  article.status = 'approved';
  article.approvedAt = new Date().toISOString();
  article.updatedAt = article.approvedAt;
  await writeStore(store);
  return article;
}

export async function publishArticle(id: string): Promise<GeneratedArticle | null> {
  if (process.env.CONTENT_ADMIN_STORAGE === 'postgres') {
    return (await import('./postgres-repository')).publishPostgresArticle(id);
  }
  const store = await readStore();
  const article = store.articles.find((item) => item.id === id && item.status === 'approved');
  if (!article) return null;
  article.status = 'published';
  article.publishedAt = new Date().toISOString();
  article.updatedAt = article.publishedAt;
  await writeStore(store);
  return article;
}
