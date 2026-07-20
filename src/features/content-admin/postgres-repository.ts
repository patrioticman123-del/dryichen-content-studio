import { randomUUID } from 'node:crypto';
import { createPool, type VercelPool } from '@vercel/postgres';
import { buildArticleVersion, slugify } from './repository';
import { seedTopics } from './seed';
import type {
  ArticleVersion,
  ContentTopic,
  GeneratedArticle,
  TopicSourceSignal,
  TopicStatus,
} from './types';

let pool: VercelPool | undefined;
let initialization: Promise<void> | undefined;

function database(): VercelPool {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error('CONTENT_ADMIN_STORAGE=postgres，但缺少 DATABASE_URL 或 POSTGRES_URL。');
  }
  pool = createPool({ connectionString });
  return pool;
}

async function initializeDatabase(): Promise<void> {
  if (initialization) return initialization;
  initialization = (async () => {
    const db = database();
    await db.query(`CREATE TABLE IF NOT EXISTS topic_runs (
      id TEXT PRIMARY KEY, run_date DATE NOT NULL, timezone TEXT NOT NULL DEFAULT 'Asia/Taipei',
      status TEXT NOT NULL, started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), completed_at TIMESTAMPTZ,
      UNIQUE (run_date, timezone)
    )`);
    await db.query(`CREATE TABLE IF NOT EXISTS topics (
      id TEXT PRIMARY KEY, run_id TEXT REFERENCES topic_runs(id), title TEXT NOT NULL, category TEXT NOT NULL,
      summary TEXT NOT NULL, rationale TEXT NOT NULL, score JSONB NOT NULL, status TEXT NOT NULL,
      duplicate_level TEXT, deleted_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    await db.query(`CREATE TABLE IF NOT EXISTS topic_keywords (
      id TEXT PRIMARY KEY, topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
      keyword TEXT NOT NULL, position INTEGER NOT NULL, UNIQUE(topic_id, position)
    )`);
    await db.query(`CREATE TABLE IF NOT EXISTS topic_sources (
      id TEXT PRIMARY KEY, topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
      source_type TEXT NOT NULL, label TEXT NOT NULL, url TEXT, note TEXT,
      observed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    await db.query(`CREATE TABLE IF NOT EXISTS articles (
      id TEXT PRIMARY KEY, topic_id TEXT UNIQUE REFERENCES topics(id), slug TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL, status TEXT NOT NULL, current_version INTEGER NOT NULL DEFAULT 1,
      approved_at TIMESTAMPTZ, deleted_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    await db.query(`ALTER TABLE articles ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ`);
    await db.query(`CREATE TABLE IF NOT EXISTS article_versions (
      id TEXT PRIMARY KEY, article_id TEXT NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
      version INTEGER NOT NULL, title TEXT NOT NULL, summary TEXT NOT NULL, seo JSONB NOT NULL,
      keywords JSONB NOT NULL, content_html TEXT NOT NULL, references_json JSONB NOT NULL,
      change_request TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(article_id, version)
    )`);
    await db.query(`CREATE TABLE IF NOT EXISTS style_references (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, rules_json JSONB NOT NULL,
      active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    await db.query(`CREATE TABLE IF NOT EXISTS publication_jobs (
      id TEXT PRIMARY KEY, article_id TEXT NOT NULL REFERENCES articles(id), status TEXT NOT NULL,
      requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), completed_at TIMESTAMPTZ, error_message TEXT
    )`);

    const seedRunId = 'seed-run-2026-07-20';
    await db.query(
      `INSERT INTO topic_runs (id, run_date, timezone, status, completed_at)
       VALUES ($1, $2, 'Asia/Taipei', 'completed', NOW()) ON CONFLICT (id) DO NOTHING`,
      [seedRunId, '2026-07-20'],
    );

    for (const topic of seedTopics) {
      const inserted = await db.query(
        `INSERT INTO topics (id, run_id, title, category, summary, rationale, score, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9, $9)
         ON CONFLICT (id) DO NOTHING RETURNING id`,
        [topic.id, seedRunId, topic.title, topic.category, topic.summary, topic.rationale,
          JSON.stringify(topic.score), topic.status, topic.discoveredAt],
      );
      if (!inserted.rowCount) continue;
      for (const [position, keyword] of topic.longTailKeywords.entries()) {
        await db.query(
          `INSERT INTO topic_keywords (id, topic_id, keyword, position) VALUES ($1, $2, $3, $4)`,
          [`${topic.id}-keyword-${position + 1}`, topic.id, keyword, position],
        );
      }
      for (const [position, source] of topic.sources.entries()) {
        await db.query(
          `INSERT INTO topic_sources (id, topic_id, source_type, label, url, note)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [`${topic.id}-source-${position + 1}`, topic.id, source.sourceType, source.label,
            source.url || null, source.note],
        );
      }
    }
  })().catch((error) => {
    initialization = undefined;
    throw error;
  });
  return initialization;
}

type TopicRow = {
  id: string; title: string; category: string; summary: string; rationale: string;
  score: ContentTopic['score']; status: TopicStatus; created_at: Date | string;
  updated_at: Date | string; article_id: string | null;
};

function iso(value: Date | string | null | undefined): string | undefined {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

async function loadTopics(): Promise<ContentTopic[]> {
  await initializeDatabase();
  const db = database();
  const [topicResult, keywordResult, sourceResult] = await Promise.all([
    db.query<TopicRow>(`SELECT t.*, a.id AS article_id FROM topics t
      LEFT JOIN articles a ON a.topic_id = t.id AND a.deleted_at IS NULL
      WHERE t.deleted_at IS NULL ORDER BY (t.score->>'total')::int DESC`),
    db.query<{ topic_id: string; keyword: string }>(
      `SELECT topic_id, keyword FROM topic_keywords ORDER BY topic_id, position`,
    ),
    db.query<{ topic_id: string; label: string; source_type: TopicSourceSignal['sourceType']; note: string; url: string | null }>(
      `SELECT topic_id, label, source_type, note, url FROM topic_sources ORDER BY observed_at, id`,
    ),
  ]);
  return topicResult.rows.map((row) => ({
    id: row.id, title: row.title, category: row.category, summary: row.summary,
    rationale: row.rationale, score: row.score, status: row.status,
    discoveredAt: iso(row.created_at)!, updatedAt: iso(row.updated_at)!,
    articleId: row.article_id || undefined,
    longTailKeywords: keywordResult.rows.filter((item) => item.topic_id === row.id).map((item) => item.keyword),
    sources: sourceResult.rows.filter((item) => item.topic_id === row.id).map((item) => ({
      label: item.label, sourceType: item.source_type, note: item.note, url: item.url || undefined,
    })),
  }));
}

export async function listPostgresTopics(): Promise<ContentTopic[]> {
  return loadTopics();
}

export async function updatePostgresTopicStatus(id: string, status: TopicStatus): Promise<ContentTopic | null> {
  await initializeDatabase();
  const result = await database().query(
    `UPDATE topics SET status = $2, updated_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING id`,
    [id, status],
  );
  if (!result.rowCount) return null;
  return (await loadTopics()).find((topic) => topic.id === id) || null;
}

type ArticleRow = {
  id: string; topic_id: string; slug: string; category: GeneratedArticle['category'];
  status: GeneratedArticle['status']; current_version: number; created_at: Date | string;
  updated_at: Date | string; approved_at: Date | string | null;
  published_at: Date | string | null;
};

type VersionRow = {
  article_id: string; version: number; title: string; summary: string;
  seo: { title: string; description: string }; keywords: string[]; content_html: string;
  references_json: ArticleVersion['references']; change_request: string | null; created_at: Date | string;
};

function mapArticle(row: ArticleRow, versionRows: VersionRow[]): GeneratedArticle {
  return {
    id: row.id, topicId: row.topic_id, slug: row.slug, category: row.category,
    status: row.status, currentVersion: row.current_version,
    versions: versionRows.filter((item) => item.article_id === row.id).map((item) => ({
      version: item.version, title: item.title, summary: item.summary,
      seoTitle: item.seo.title, seoDescription: item.seo.description,
      keywords: item.keywords, contentHtml: item.content_html,
      references: item.references_json, changeRequest: item.change_request || undefined,
      createdAt: iso(item.created_at)!,
    })),
    createdAt: iso(row.created_at)!, updatedAt: iso(row.updated_at)!, approvedAt: iso(row.approved_at),
    publishedAt: iso(row.published_at),
  };
}

export async function getPostgresArticle(id: string): Promise<GeneratedArticle | null> {
  await initializeDatabase();
  const db = database();
  const [articleResult, versionResult] = await Promise.all([
    db.query<ArticleRow>(`SELECT * FROM articles WHERE id = $1 AND deleted_at IS NULL`, [id]),
    db.query<VersionRow>(`SELECT * FROM article_versions WHERE article_id = $1 ORDER BY version`, [id]),
  ]);
  return articleResult.rows[0] ? mapArticle(articleResult.rows[0], versionResult.rows) : null;
}

async function insertVersion(articleId: string, version: ArticleVersion): Promise<void> {
  await database().query(
    `INSERT INTO article_versions
      (id, article_id, version, title, summary, seo, keywords, content_html, references_json, change_request, created_at)
     VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8, $9::jsonb, $10, $11)`,
    [randomUUID(), articleId, version.version, version.title, version.summary,
      JSON.stringify({ title: version.seoTitle, description: version.seoDescription }),
      JSON.stringify(version.keywords), version.contentHtml, JSON.stringify(version.references),
      version.changeRequest || null, version.createdAt],
  );
}

export async function generatePostgresArticle(topicId: string): Promise<GeneratedArticle | null> {
  await initializeDatabase();
  const existing = await database().query<ArticleRow>(
    `SELECT * FROM articles WHERE topic_id = $1 AND deleted_at IS NULL`, [topicId],
  );
  if (existing.rows[0]) return getPostgresArticle(existing.rows[0].id);
  const topic = (await loadTopics()).find((item) => item.id === topicId);
  if (!topic) return null;
  const articleId = randomUUID();
  const timestamp = new Date().toISOString();
  const articleVersion = buildArticleVersion(topic);
  await database().query(
    `INSERT INTO articles (id, topic_id, slug, category, status, current_version, created_at, updated_at)
     VALUES ($1, $2, $3, '衛教文章', 'drafting', 1, $4, $4)`,
    [articleId, topicId, slugify(topic), timestamp],
  );
  await insertVersion(articleId, articleVersion);
  await database().query(`UPDATE topics SET status = 'drafting', updated_at = NOW() WHERE id = $1`, [topicId]);
  return getPostgresArticle(articleId);
}

export async function createPostgresRevision(id: string, changeRequest: string): Promise<GeneratedArticle | null> {
  const article = await getPostgresArticle(id);
  if (!article) return null;
  const topic = (await loadTopics()).find((item) => item.id === article.topicId);
  if (!topic) return null;
  const nextVersion = article.currentVersion + 1;
  await insertVersion(id, buildArticleVersion(topic, nextVersion, changeRequest));
  await database().query(
    `UPDATE articles SET current_version = $2, status = 'drafting', approved_at = NULL, published_at = NULL, updated_at = NOW()
     WHERE id = $1`, [id, nextVersion],
  );
  return getPostgresArticle(id);
}

export async function approvePostgresArticle(id: string): Promise<GeneratedArticle | null> {
  await initializeDatabase();
  const result = await database().query(
    `UPDATE articles SET status = 'approved', approved_at = NOW(), updated_at = NOW()
     WHERE id = $1 AND deleted_at IS NULL RETURNING id`, [id],
  );
  return result.rowCount ? getPostgresArticle(id) : null;
}

export async function publishPostgresArticle(id: string): Promise<GeneratedArticle | null> {
  await initializeDatabase();
  const result = await database().query(
    `UPDATE articles SET status = 'published', published_at = NOW(), updated_at = NOW()
     WHERE id = $1 AND status = 'approved' AND deleted_at IS NULL RETURNING id`, [id],
  );
  if (!result.rowCount) return null;
  await database().query(
    `INSERT INTO publication_jobs (id, article_id, status, requested_at, completed_at)
     VALUES ($1, $2, 'completed', NOW(), NOW())`,
    [randomUUID(), id],
  );
  return getPostgresArticle(id);
}
