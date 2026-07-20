// ==========================================
// 1. 引入分開的資料檔
// ==========================================
import { articlesData } from './articles';
import { noticesData } from './notices';

// ==========================================
// 2. 定義資料介面 (共用)
// ==========================================
export interface NewsPost {
  id: string;
  title: string;
  category: '門診公告' | '衛教文章' | '醫學新知' | '診所活動'| '診間隨筆';
  date: string;       // YYYY-MM-DD
  displayTag?: string;// 置頂或重要標籤
  summary: string;
  coverImage: string;
  contentHtml: string;
  lastModified?: string;
  referencesHtml?: string;
  
  // SEO 欄位
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

// ==========================================
// 3. 合併資料 (Source of Truth)
// ==========================================
// 將文章與公告合併，這樣動態路由 id 搜尋時才能兩個都找得到
const fullNewsData: NewsPost[] = [...articlesData, ...noticesData];

// ==========================================
// 4. 自動化列表 (去除 contentHtml 以瘦身)
// ==========================================
export const newsList = fullNewsData.map((post) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { contentHtml, ...lightweightData } = post;
  return lightweightData;
});

// ==========================================
// 5. Helper Functions (供頁面使用)
// ==========================================

// 給 [id]/page.tsx 用：不管是公告還是文章，都從這裡抓
export function getNewsById(id: string): NewsPost | undefined {
  return fullNewsData.find((post) => post.id === id);
}

// 給 Sitemap 用
export function getAllNews() {
  return newsList;
}

// (選用) 如果你想在程式碼中明確只抓文章
export function getArticles() {
  return articlesData.map(({ contentHtml, ...rest }) => rest);
}

// (選用) 如果你想在程式碼中明確只抓公告
export function getNotices() {
  return noticesData.map(({ contentHtml, ...rest }) => rest);
}