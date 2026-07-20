# 圖片使用指南

## ✅ 已完成的配置

### 1. 資料夾結構
已創建完整的圖片資料夾結構：
```
public/images/
├── clinic/              # 診所相關圖片
├── doctor/              # 醫師相關圖片
├── treatments/          # 治療方式圖片
│   ├── prp/
│   ├── shockwave/
│   └── exercise-therapy/
├── diseases/            # 疾病相關圖片
│   ├── spine-hip/
│   ├── shoulder/
│   ├── elbow/
│   ├── hand/
│   ├── knee/
│   └── ankle/
├── weight-loss/         # 減重相關圖片
└── icons/               # 圖標
```

### 2. 圖片優化組件
- ✅ 創建 `OptimizedImage` 組件，支援懶加載和 SEO
- ✅ 自動添加 `alt` 文字和適當的尺寸屬性
- ✅ 支援優先載入（priority）用於首屏圖片

### 3. SEO 整合
- ✅ 所有圖片都包含在 JSON-LD Schema 中
- ✅ Open Graph 圖片標籤已配置
- ✅ 圖片 URL 自動包含在 sitemap 中

### 4. 資料結構更新
- ✅ 治療方式資料已更新，支援 `imageUrl`、`seoKeywords`、`seoDescription`
- ✅ 疾病資料已支援圖片
- ✅ 所有頁面已整合圖片顯示

## 📝 如何使用

### 添加新圖片

1. **準備圖片**
   - 優化圖片（建議使用 WebP 格式）
   - 使用描述性檔案名稱
   - 確保圖片大小 < 500KB

2. **放置圖片**
   ```bash
   # 例如：添加旋轉肌撕裂示意圖
   # 將圖片放置在：
   public/images/diseases/shoulder/rotator-cuff-tear.jpg
   ```

3. **更新資料檔案**
   ```typescript
   // 在 src/data/diseases.ts 中
   {
     id: 'rotator-cuff-tear',
     title: '旋轉肌撕裂',
     imageUrl: '/images/diseases/shoulder/rotator-cuff-tear.jpg',
     // ...
   }
   ```

4. **重新建置**
   ```bash
   npm run build
   ```

### 圖片命名規範

✅ **正確範例：**
- `rotator-cuff-tear.jpg`
- `prp-treatment.jpg`
- `dr-lin-photo.jpg`

❌ **錯誤範例：**
- `IMG_1234.jpg`
- `圖片1.jpg`
- `rotator cuff tear.jpg` (包含空格)

### 圖片尺寸建議

| 用途 | 建議尺寸 | 格式 |
|------|---------|------|
| Logo | 200x200px | PNG/SVG |
| 醫師照片 | 400x400px | JPG/WebP |
| 治療方式圖片 | 800x600px | JPG/WebP |
| 疾病示意圖 | 600x400px | JPG/WebP/SVG |
| 列表縮圖 | 400x300px | WebP |

## 🚀 圖片優化技巧

### 1. 使用 WebP 格式
WebP 格式可以減少 25-35% 的檔案大小，同時保持良好品質。

### 2. 提供多種尺寸
為不同用途準備不同尺寸的圖片：
- 縮圖：400x300px（列表頁面）
- 中等：800x600px（詳情頁面）
- 完整：1200x900px（需要時）

### 3. 壓縮圖片
使用工具壓縮圖片：
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [ImageOptim](https://imageoptim.com/)

### 4. 懶加載
所有圖片都自動使用懶加載（除了首屏圖片），提升頁面載入速度。

## 🔍 SEO 最佳實踐

### 1. Alt 文字
確保所有圖片都有描述性的 alt 文字：
```tsx
<OptimizedImage
  src="/images/diseases/shoulder/rotator-cuff-tear.jpg"
  alt="旋轉肌撕裂示意圖，顯示肩膀旋轉肌群的位置和撕裂情況"
/>
```

### 2. 檔案名稱
使用包含關鍵詞的檔案名稱：
- ✅ `rotator-cuff-tear-treatment.jpg`
- ❌ `img_123.jpg`

### 3. 圖片 Schema
圖片會自動包含在 JSON-LD Schema 中，幫助搜尋引擎理解圖片內容。

## 📋 待添加的圖片清單

詳細清單請參考：`public/images/PLACEHOLDER.md`

主要需要添加的圖片：
- [ ] 診所 Logo
- [ ] 醫師照片
- [ ] 各治療方式的示意圖/照片
- [ ] 各疾病的示意圖
- [ ] 減重項目的圖片

## ⚠️ 注意事項

1. **版權**：確保所有圖片都有適當的使用授權
2. **隱私**：不要使用包含患者臉部的照片
3. **檔案大小**：建議每張圖片 < 500KB
4. **格式**：優先使用 WebP 格式以提升載入速度
5. **備份**：保留原始高解析度圖片作為備份

## 🛠️ 工具推薦

- **圖片壓縮**：TinyPNG, Squoosh
- **格式轉換**：CloudConvert, Online-Convert
- **圖片編輯**：GIMP, Photoshop, Canva
- **醫學插圖**：可考慮使用專業醫學插圖庫
