-- Production schema blueprint. The local pilot uses .local-data/content-admin.json.
CREATE TABLE IF NOT EXISTS topic_runs (
  id TEXT PRIMARY KEY, run_date DATE NOT NULL, timezone TEXT NOT NULL DEFAULT 'Asia/Taipei',
  status TEXT NOT NULL, started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), completed_at TIMESTAMPTZ,
  UNIQUE (run_date, timezone)
);
CREATE TABLE IF NOT EXISTS topics (
  id TEXT PRIMARY KEY, run_id TEXT REFERENCES topic_runs(id), title TEXT NOT NULL, category TEXT NOT NULL,
  summary TEXT NOT NULL, rationale TEXT NOT NULL, score JSONB NOT NULL, status TEXT NOT NULL,
  duplicate_level TEXT, deleted_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS topic_keywords (
  id TEXT PRIMARY KEY, topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE, keyword TEXT NOT NULL,
  position INTEGER NOT NULL, UNIQUE(topic_id, position)
);
CREATE TABLE IF NOT EXISTS topic_sources (
  id TEXT PRIMARY KEY, topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE, source_type TEXT NOT NULL,
  label TEXT NOT NULL, url TEXT, note TEXT, observed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY, topic_id TEXT UNIQUE REFERENCES topics(id), slug TEXT NOT NULL UNIQUE, category TEXT NOT NULL,
  status TEXT NOT NULL, current_version INTEGER NOT NULL DEFAULT 1, approved_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS article_versions (
  id TEXT PRIMARY KEY, article_id TEXT NOT NULL REFERENCES articles(id) ON DELETE CASCADE, version INTEGER NOT NULL,
  title TEXT NOT NULL, summary TEXT NOT NULL, seo JSONB NOT NULL, keywords JSONB NOT NULL,
  content_html TEXT NOT NULL, references_json JSONB NOT NULL, change_request TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(article_id, version)
);
CREATE TABLE IF NOT EXISTS style_references (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, rules_json JSONB NOT NULL, active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS publication_jobs (
  id TEXT PRIMARY KEY, article_id TEXT NOT NULL REFERENCES articles(id), status TEXT NOT NULL,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), completed_at TIMESTAMPTZ, error_message TEXT
);
