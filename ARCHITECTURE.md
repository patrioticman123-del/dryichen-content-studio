# 项目架构说明

## 动态路由静态生成架构

本项目使用 Next.js 14+ App Router，支持 GitHub Pages 静态导出。所有动态路由都通过 `generateStaticParams` 在构建时生成静态页面。

## 核心设计原则

### 1. 数据驱动架构
- 所有内容数据存储在 `src/data/` 文件夹
- 修改内容只需编辑数据文件，无需修改 React 代码
- 使用 TypeScript 接口确保数据结构一致性

### 2. 通用化设计
- 所有路由逻辑完全通用
- 添加新类别/项目只需在数据文件中添加数据
- 自动生成静态路径、SEO 元数据、面包屑导航

## 数据接口标准

### ContentItem 基础接口
```typescript
interface ContentItem {
  id: string              // 唯一标识符（用于 URL）
  title: string           // 标题
  description: string     // 简短描述
  content?: string        // 详细内容（支持 HTML/Markdown）
  seoKeywords?: string[]  // SEO 关键词
  seoDescription?: string // SEO 描述
  imageUrl?: string       // 图片 URL
}
```

### 扩展接口
- `DiseaseItem`: 继承 ContentItem，添加 `symptoms` 和 `treatments`
- `TreatmentItem`: 继承 ContentItem，添加 `applicableConditions` 和 `features`
- `WeightLossItem`: 继承 ContentItem，添加 `features`

## 路由结构

### 疾病卫教路由
```
/diseases                          # 总览页面
/diseases/[category]               # 类别页面（如：肩膀疾病列表）
/diseases/[category]/[slug]       # 疾病详情页面
```

**静态生成函数：**
- `generateAllCategoryParams()`: 生成所有类别路径
- `generateAllDiseaseParams()`: 生成所有疾病路径

### 治疗方式路由
```
/treatments                        # 总览页面
/treatments/[slug]                 # 治疗详情页面
```

### 减重与骨龄路由
```
/weight-loss                       # 总览页面
/weight-loss/[slug]                # 项目详情页面
```

## 如何添加新类别（以疾病为例）

### 步骤 1: 在 `diseases.ts` 中添加数据

```typescript
{
  slug: 'new-category',
  title: '新类别',
  description: '类别描述',
  diseases: [
    {
      id: 'new-disease',
      title: '新疾病',
      description: '疾病描述',
      content: '详细内容',
      symptoms: ['症状1', '症状2'],
      treatments: ['治疗1', '治疗2'],
    }
  ]
}
```

### 步骤 2: 构建项目

```bash
npm run build
```

系统会自动：
- ✅ 生成 `/diseases/new-category` 页面
- ✅ 生成 `/diseases/new-category/new-disease` 页面
- ✅ 生成 SEO 元数据
- ✅ 生成面包屑导航

**无需修改任何 React 代码！**

## 内容渲染

### 支持格式
- **HTML**: 直接使用 HTML 标签
- **Markdown**: 使用 Markdown 语法（自动转换）

### 渲染函数
`src/utils/content.ts` 中的 `renderContent()` 函数会自动检测内容格式并正确渲染。

## SEO 优化

每个页面都通过 `generateMetadata()` 函数自动生成：
- 页面标题
- 页面描述
- 关键词
- Open Graph 标签

## 静态导出配置

`next.config.js` 已配置：
```javascript
output: 'export'        // 静态导出
images: {
  unoptimized: true     // GitHub Pages 不支持图片优化
}
trailingSlash: true     // 添加尾部斜杠
```

## 文件结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── diseases/
│   │   ├── [category]/
│   │   │   ├── page.tsx    # 类别列表页面
│   │   │   └── [slug]/
│   │   │       └── page.tsx # 疾病详情页面
│   ├── treatments/
│   └── weight-loss/
├── components/             # 共用组件
├── data/                   # 数据文件（数据驱动）
│   ├── diseases.ts
│   ├── treatments.ts
│   └── weightLoss.ts
├── types/                  # TypeScript 类型定义
│   └── content.ts
└── utils/                  # 工具函数
    └── content.ts
```

## 构建与部署

### 本地开发
```bash
npm run dev
```

### 构建静态网站
```bash
npm run build
```

构建完成后，静态文件在 `out/` 文件夹，可直接部署到 GitHub Pages。

### GitHub Pages 部署
1. 构建项目：`npm run build`
2. 将 `out/` 文件夹内容推送到 `gh-pages` 分支
3. 在 GitHub 设置中启用 GitHub Pages

## 优势

1. **完全数据驱动**: 修改内容无需改代码
2. **自动静态生成**: 所有页面在构建时生成
3. **SEO 友好**: 自动生成元数据
4. **类型安全**: TypeScript 确保数据结构正确
5. **易于扩展**: 添加新内容只需添加数据
