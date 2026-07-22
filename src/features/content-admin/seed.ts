import { calculateTopicScore } from './scoring';
import type { ContentAdminStore, ContentTopic } from './types';

const now = '2026-07-20T00:00:00.000Z';

export const seedTopics: ContentTopic[] = [
  {
    id: 'topic-knee-prp-return-sport',
    title: '膝關節 PRP 後多久可以恢復運動？',
    category: '再生治療',
    summary: '以患者最常詢問的恢復時程為主軸，整理注射後不同階段的活動原則、警訊與回診時機。',
    rationale: '兼具治療決策與術後照護搜尋意圖，也符合診所現有 PRP 專業內容。',
    longTailKeywords: ['膝關節 PRP 後多久可以運動', 'PRP 注射後注意事項', 'PRP 注射後復健時間表'],
    score: calculateTopicScore({ timeliness: 88, patientRelevance: 94, clinicalFit: 96, searchIntent: 86, differentiation: 78 }),
    sources: [
      { label: '診間常見問題', sourceType: 'clinic-observation', note: '患者經常詢問注射後活動限制與回場時程。' },
      { label: 'PubMed', sourceType: 'medical-literature', note: '正式撰稿時需檢索近五年系統性回顧。', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
    ],
    status: 'new', runDate: '2026-07-20', discoveredAt: now, updatedAt: now,
  },
  {
    id: 'topic-frozen-shoulder-night-pain',
    title: '五十肩晚上特別痛，睡覺姿勢怎麼調整？',
    category: '疼痛復健',
    summary: '回應夜間疼痛、側睡壓迫與枕頭支撐等高度生活化問題，並說明何時不宜只靠居家處理。',
    rationale: '搜尋語句具體，容易轉化成清楚的自我照護與就醫判斷文章。',
    longTailKeywords: ['五十肩晚上痛睡不著', '五十肩睡覺姿勢', '肩膀夜間疼痛何時看醫生'],
    score: calculateTopicScore({ timeliness: 80, patientRelevance: 96, clinicalFit: 94, searchIntent: 92, differentiation: 82 }),
    sources: [
      { label: '診間常見問題', sourceType: 'clinic-observation', note: '夜痛與睡姿是肩部患者的高頻問題。' },
      { label: 'WHO 健康資訊', sourceType: 'official', note: '正式撰稿時交叉核對一般健康資訊。', url: 'https://www.who.int/health-topics/' },
    ],
    status: 'new', runDate: '2026-07-20', discoveredAt: now, updatedAt: now,
  },
  {
    id: 'topic-child-growth-exercise',
    title: '孩子長高一定要跳繩嗎？運動與睡眠如何安排',
    category: '兒童成長',
    summary: '釐清單一運動與身高的迷思，提供可執行的運動、睡眠、營養與評估建議。',
    rationale: '家長搜尋需求穩定，適合銜接網站既有兒童成長工具與門診服務。',
    longTailKeywords: ['跳繩真的會長高嗎', '小孩長高運動時間', '兒童生長遲緩看哪一科'],
    score: calculateTopicScore({ timeliness: 76, patientRelevance: 92, clinicalFit: 90, searchIntent: 89, differentiation: 84 }),
    sources: [
      { label: '診間常見問題', sourceType: 'clinic-observation', note: '家長常把單一運動與長高效果直接連結。' },
      { label: 'PubMed', sourceType: 'medical-literature', note: '正式撰稿時檢索兒童活動與生長研究。', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
    ],
    status: 'new', runDate: '2026-07-20', discoveredAt: now, updatedAt: now,
  },
];

export function createSeedStore(): ContentAdminStore {
  return { topics: seedTopics, articles: [] };
}
