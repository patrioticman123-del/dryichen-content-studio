# 宸新復健科診所網站

使用 Next.js 14+ (App Router)、TypeScript 和 Tailwind CSS 建構的靜態網站，支援 GitHub Pages 部署。

## 📋 目錄

- [專案結構](#專案結構)
- [快速開始](#快速開始)
- [如何新增內容](#如何新增內容)
- [本地開發與測試](#本地開發與測試)
- [部署到 GitHub Pages](#部署到-github-pages)
- [SEO 配置](#seo-配置)

## 📁 專案結構

```
├── src/
│   ├── app/                    # Next.js App Router 頁面
│   │   ├── page.tsx           # 首頁
│   │   ├── layout.tsx         # 根布局
│   │   ├── globals.css        # 全局樣式
│   │   ├── treatments/        # 治療方式路由
│   │   │   ├── page.tsx       # 治療方式總覽
│   │   │   └── [slug]/        # 動態路由：具體治療項目
│   │   ├── weight-loss/       # 減重與骨齡路由
│   │   │   ├── page.tsx       # 減重門診總覽
│   │   │   └── [slug]/        # 動態路由：具體減重項目
│   │   └── diseases/          # 疾病衛教路由
│   │       ├── page.tsx       # 疾病衛教總覽
│   │       ├── [category]/    # 動態路由：疾病類別
│   │       └── [category]/[slug]/  # 動態路由：具體疾病
│   ├── components/            # 共用組件
│   │   ├── Navigation.tsx     # 導航欄
│   │   ├── BottomNav.tsx       # 底部導航（移動端）
│   │   ├── Breadcrumbs.tsx    # 麵包屑導覽
│   │   ├── Footer.tsx         # 頁尾
│   │   └── JsonLd.tsx         # JSON-LD 結構化數據
│   ├── data/                   # 資料檔案（資料驅動）
│   │   ├── treatments.ts      # 治療方式資料
│   │   ├── weightLoss.ts       # 減重與骨齡資料
│   │   └── diseases.ts         # 疾病資料
│   ├── types/                  # TypeScript 類型定義
│   │   └── content.ts          # 內容資料介面
│   └── utils/                  # 工具函數
│       └── content.ts          # 內容渲染工具
├── next.config.js             # Next.js 配置
├── next-sitemap.config.js     # Sitemap 配置
├── tailwind.config.js         # Tailwind CSS 配置
└── tsconfig.json              # TypeScript 配置
```

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 建置靜態網站

```bash
npm run build
```

建置完成後，靜態檔案會輸出到 `out` 資料夾。

## ✏️ 如何新增內容

### 重要：資料驅動架構

**所有內容都儲存在 `src/data/` 資料夾中，修改內容時只需編輯這些檔案，無需修改任何 React 程式碼！**

### 1. 新增疾病類別

編輯 `src/data/diseases.ts`，在 `diseaseCategories` 陣列中添加新類別：

```typescript
{
  slug: 'neck',  // URL 路徑：/diseases/neck
  title: '頸部',
  description: '頸部相關疾病',
  seoKeywords: ['頸部', '頸椎'],
  seoDescription: '頸部相關疾病介紹',
  diseases: [
    {
      id: 'neck-pain',  // URL 路徑：/diseases/neck/neck-pain
      title: '頸部疼痛',
      description: '頸部疼痛的簡短描述',
      content: '詳細內容，支持 HTML 或 Markdown 格式',
      symptoms: ['症狀1', '症狀2'],
      treatments: ['治療1', '治療2'],
      seoKeywords: ['頸部疼痛', '復健'],
      seoDescription: 'SEO 描述',
      imageUrl: '/images/neck-pain.jpg',  // 可選
    }
  ]
}
```

### 2. 新增治療方式

編輯 `src/data/treatments.ts`，在 `treatments` 陣列中添加新項目：

```typescript
{
  slug: 'new-treatment',
  title: '新治療方式',
  description: '治療方式描述',
  content: '詳細內容',
  features: ['特色1', '特色2'],
  applicableConditions: ['適用症狀1', '適用症狀2'],
}
```

### 3. 新增減重項目

編輯 `src/data/weightLoss.ts`，在 `weightLossPrograms` 陣列中添加新項目：

```typescript
{
  slug: 'new-program',
  title: '新減重項目',
  description: '項目描述',
  content: '詳細內容',
  features: ['特色1', '特色2'],
}
```

### 4. 內容格式支援

`content` 欄位支援兩種格式：

**HTML 格式：**
```html
<p>這是段落</p>
<h2>這是標題</h2>
<ul><li>列表項</li></ul>
```

**Markdown 格式：**
```markdown
## 標題
這是段落內容
- 列表項1
- 列表項2
```

系統會自動檢測格式並正確渲染。

### 5. 重新建置

修改資料後，重新建置網站：

```bash
npm run build
```

系統會自動：
- ✅ 生成所有新頁面
- ✅ 更新 sitemap.xml
- ✅ 更新 robots.txt
- ✅ 生成 SEO 元數據

## 🧪 本地開發與測試

### 開發模式

```bash
npm run dev
```

- 自動熱重載
- 修改檔案後自動刷新
- 可在瀏覽器中查看即時變更

### 測試靜態生成

```bash
npm run build
```

建置完成後，檢查 `out` 資料夾：
- 確認所有頁面都已生成
- 檢查 `sitemap.xml` 和 `robots.txt` 是否正確生成
- 驗證所有動態路由是否包含在 sitemap 中

### 本地預覽靜態網站

建置完成後，可以使用任何靜態檔案伺服器預覽：

```bash
# 使用 Python
cd out
python -m http.server 8000

# 或使用 Node.js serve
npx serve out
```

然後訪問 http://localhost:8000

## 📤 部署到 GitHub Pages

### 方法 1: 手動部署

1. **建置專案**
   ```bash
   npm run build
   ```

2. **初始化 Git（如果尚未初始化）**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **推送到 GitHub**
   ```bash
   git remote add origin https://github.com/your-username/your-repo.git
   git branch -M main
   git push -u origin main
   ```

4. **創建 gh-pages 分支並推送 out 資料夾**
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r out/* .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

5. **在 GitHub 設定中啟用 GitHub Pages**
   - 前往 Repository Settings > Pages
   - Source 選擇 `gh-pages` 分支
   - 儲存設定

### 方法 2: 使用 GitHub Actions 自動部署

創建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build
        env:
          SITE_URL: https://your-username.github.io/your-repo

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### 更新網站 URL

如果您的 GitHub Pages URL 不同，請更新：

1. **更新 `next-sitemap.config.js`**
   ```javascript
   siteUrl: 'https://your-username.github.io/your-repo',
   ```

2. **或在建置時設定環境變數**
   ```bash
   SITE_URL=https://your-username.github.io/your-repo npm run build
   ```

## 🔍 SEO 配置

### Metadata API

所有頁面都使用 Next.js 的 `generateMetadata` 函數自動生成 SEO 元數據：
- 頁面標題
- 頁面描述
- 關鍵詞
- Open Graph 標籤

### JSON-LD 結構化數據

網站包含以下 Schema.org 結構化數據：
- **首頁**: `MedicalClinic` - 診所資訊
- **疾病頁面**: `MedicalCondition` - 疾病資訊
- **治療頁面**: `MedicalProcedure` - 治療方式資訊

### Sitemap 和 Robots.txt

使用 `next-sitemap` 自動生成：
- `sitemap.xml` - 包含所有頁面的網站地圖
- `robots.txt` - 搜尋引擎爬蟲規則

在建置完成後，這些檔案會自動生成在 `out` 資料夾中。

### 驗證 SEO

部署後，可以使用以下工具驗證：
- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

## 📝 資料檔案格式說明

### 疾病資料 (diseases.ts)

```typescript
interface DiseaseItem {
  id: string                    // 唯一標識符（用於 URL）
  title: string                 // 標題
  description: string           // 簡短描述
  content?: string              // 詳細內容（支援 HTML/Markdown）
  symptoms?: string[]           // 症狀列表
  treatments?: string[]         // 治療建議列表
  seoKeywords?: string[]        // SEO 關鍵詞
  seoDescription?: string       // SEO 描述
  imageUrl?: string             // 圖片 URL
}
```

### 治療方式資料 (treatments.ts)

```typescript
interface Treatment {
  slug: string                  // URL 路徑標識符
  title: string                 // 標題
  description: string           // 描述
  content?: string              // 詳細內容
  features?: string[]           // 特色功能
  applicableConditions?: string[] // 適用症狀
}
```

### 減重項目資料 (weightLoss.ts)

```typescript
interface WeightLossProgram {
  slug: string                  // URL 路徑標識符
  title: string                 // 標題
  description: string           // 描述
  content?: string              // 詳細內容
  features?: string[]           // 特色功能
}
```

## 🛠️ 技術棧

- **Next.js 14+** - React 框架（App Router）
- **TypeScript** - 型別安全
- **Tailwind CSS** - 實用優先的 CSS 框架
- **next-sitemap** - 自動生成 Sitemap 和 Robots.txt
- **靜態導出** - 支援 GitHub Pages 部署

## 📚 更多資源

- [Next.js 文檔](https://nextjs.org/docs)
- [Tailwind CSS 文檔](https://tailwindcss.com/docs)
- [Schema.org 醫療結構化數據](https://schema.org/MedicalClinic)
- [GitHub Pages 文檔](https://docs.github.com/pages)

## 📄 授權

© 2024 宸新復健科診所 林羿辰醫師. All Rights Reserved.
