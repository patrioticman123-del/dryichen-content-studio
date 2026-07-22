import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createSeedStore } from './seed';
import { discoverDailyTopics, taipeiDate } from './topic-discovery';
import type { ContentAdminStore, ContentTopic, DailyTopicRefreshResult, GeneratedArticle, TopicStatus } from './types';

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

export async function listTopics(): Promise<ContentTopic[]> {
  if (process.env.CONTENT_ADMIN_STORAGE === 'postgres') {
    return (await import('./postgres-repository')).listPostgresTopics();
  }
  const topics = (await readStore()).topics;
  const newestDate = topics.map((topic) => topic.runDate || topic.discoveredAt.slice(0, 10)).sort().at(-1);
  return topics.filter((topic) =>
    (topic.runDate || topic.discoveredAt.slice(0, 10)) === newestDate || ['saved', 'drafting', 'generating'].includes(topic.status),
  ).sort((a, b) => b.score.total - a.score.total);
}

export async function refreshDailyTopics(): Promise<DailyTopicRefreshResult> {
  if (process.env.CONTENT_ADMIN_STORAGE === 'postgres') {
    return (await import('./postgres-repository')).refreshPostgresDailyTopics();
  }
  const store = await readStore();
  const runDate = taipeiDate();
  const existing = store.topics.filter((topic) => topic.runDate === runDate);
  if (existing.length) return { runDate, created: false, topics: existing.sort((a, b) => b.score.total - a.score.total) };
  const recentCutoff = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const recent = store.topics.filter((topic) => topic.discoveredAt >= recentCutoff);
  const topics = await discoverDailyTopics({
    runDate,
    recentTopicIds: recent.map((topic) => topic.id),
    recentTitles: store.topics.map((topic) => topic.title),
  });
  store.topics.push(...topics);
  await writeStore(store);
  return { runDate, created: true, topics };
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

export async function getArticle(id: string): Promise<GeneratedArticle | null> {
  if (process.env.CONTENT_ADMIN_STORAGE === 'postgres') {
    return (await import('./postgres-repository')).getPostgresArticle(id);
  }
  return (await readStore()).articles.find((item) => item.id === id) || null;
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
