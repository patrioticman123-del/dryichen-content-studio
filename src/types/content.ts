/**
 * 标准内容数据接口
 * 用于所有内容类型（疾病、治疗方式、减重项目等）
 */
export interface ContentItem {
  /** 唯一标识符（用于生成 URL slug） */
  id: string
  /** 标题 */
  title: string
  /** 简短描述 */
  description: string
  /** 完整内容（支持 Markdown 或 HTML） */
  content?: string
  /** SEO 关键词 */
  seoKeywords?: string[]
  /** SEO 描述 */
  seoDescription?: string
  /** 图片 URL */
  imageUrl?: string
}

/**
 * 疾病特定字段（继承 ContentItem）
 */
export interface DiseaseItem extends ContentItem {
  /** 常见症状 */
  symptoms?: string[]
  /** 治疗建议 */
  treatments?: string[]
}

/**
 * 治疗方式特定字段（继承 ContentItem）
 */
export interface TreatmentItem extends ContentItem {
  /** 适用症状 */
  applicableConditions?: string[]
  /** 特色功能 */
  features?: string[]
}

/**
 * 减重项目特定字段（继承 ContentItem）
 */
export interface WeightLossItem extends ContentItem {
  /** 特色功能 */
  features?: string[]
}
