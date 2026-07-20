# 数据文件使用说明

## 如何添加新的疾病类别

只需要在 `diseases.ts` 文件中添加新的类别数据，**无需修改任何 React 代码**。

### 示例：添加"颈部疾病"类别

```typescript
{
  slug: 'neck',  // URL 路径：/diseases/neck
  title: '頸部',
  description: '頸部相關疾病',
  seoKeywords: ['頸部', '頸椎'],
  seoDescription: '頸部相關疾病介紹',
  diseases: [
    {
      id: 'neck-pain',  // URL 路径：/diseases/neck/neck-pain
      title: '頸部疼痛',
      description: '頸部疼痛的簡短描述',
      content: '詳細內容，支持 HTML 或 Markdown 格式',
      symptoms: ['症狀1', '症狀2'],
      treatments: ['治療1', '治療2'],
      seoKeywords: ['頸部疼痛', '復健'],
      seoDescription: 'SEO 描述',
      imageUrl: '/images/neck-pain.jpg',  // 可选
    }
  ]
}
```

### 数据字段说明

#### 类别字段 (DiseaseCategory)
- `slug`: URL 路径标识符（必填）
- `title`: 显示标题（必填）
- `description`: 类别描述（可选）
- `seoKeywords`: SEO 关键词数组（可选）
- `seoDescription`: SEO 描述（可选）
- `imageUrl`: 类别图片（可选）
- `diseases`: 疾病数组（必填）

#### 疾病字段 (DiseaseItem)
- `id`: 唯一标识符，用于生成 URL（必填）
- `title`: 疾病标题（必填）
- `description`: 简短描述（必填）
- `content`: 详细内容，支持 HTML 或 Markdown（可选）
- `symptoms`: 症状数组（可选）
- `treatments`: 治疗建议数组（可选）
- `seoKeywords`: SEO 关键词数组（可选）
- `seoDescription`: SEO 描述（可选）
- `imageUrl`: 疾病图片（可选）

### 自动生成的功能

添加数据后，以下功能会自动生成：

1. **静态路径生成** (`generateStaticParams`)
   - 自动生成所有类别页面路径
   - 自动生成所有疾病详情页面路径

2. **SEO 元数据** (`generateMetadata`)
   - 自动生成页面标题
   - 自动生成页面描述
   - 自动生成关键词

3. **面包屑导航**
   - 自动生成正确的导航路径

4. **页面渲染**
   - 类别页面自动列出该类别下的所有疾病
   - 详情页面自动显示完整内容

### 内容格式支持

`content` 字段支持两种格式：

1. **HTML 格式**：直接使用 HTML 标签
   ```html
   <p>这是段落</p><h2>这是标题</h2>
   ```

2. **Markdown 格式**：使用 Markdown 语法（会自动转换为 HTML）
   ```markdown
   ## 标题
   这是段落内容
   - 列表项1
   - 列表项2
   ```

系统会自动检测内容格式并正确渲染。
