export type TopicStatus = 'new' | 'saved' | 'dismissed' | 'generating' | 'drafting';
export type ArticleStatus = 'drafting' | 'reviewing' | 'approved' | 'published' | 'failed';

export interface TopicScore {
  timeliness: number;
  patientRelevance: number;
  clinicalFit: number;
  searchIntent: number;
  differentiation: number;
  total: number;
}

export interface TopicSourceSignal {
  label: string;
  sourceType: 'official' | 'search-trend' | 'news' | 'medical-literature' | 'clinic-observation';
  note: string;
  url?: string;
}

export interface ContentTopic {
  id: string;
  title: string;
  category: string;
  summary: string;
  rationale: string;
  longTailKeywords: string[];
  score: TopicScore;
  sources: TopicSourceSignal[];
  status: TopicStatus;
  runDate?: string;
  discoveredAt: string;
  updatedAt: string;
  articleId?: string;
}

export interface ArticleReference {
  label: string;
  url: string;
  note?: string;
}

export interface ArticleVersion {
  version: number;
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  contentHtml: string;
  references: ArticleReference[];
  changeRequest?: string;
  createdAt: string;
}

export interface GeneratedArticle {
  id: string;
  topicId: string;
  slug: string;
  category: '衛教文章' | '醫學新知';
  status: ArticleStatus;
  currentVersion: number;
  versions: ArticleVersion[];
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  publishedAt?: string;
}

export interface ContentAdminStore {
  topics: ContentTopic[];
  articles: GeneratedArticle[];
}

export interface DailyTopicRefreshResult {
  runDate: string;
  created: boolean;
  pending?: boolean;
  topics: ContentTopic[];
}

export interface ApprovalCheck {
  id: string;
  label: string;
  passed: boolean;
  blocking: boolean;
  detail: string;
}
