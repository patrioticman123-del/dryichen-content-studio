// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local', // 開發模式下儲存在本機檔案
  },
  collections: {
    news: collection({
      label: '最新消息 (News)',
      slugField: 'title', // 網址會依據標題自動產生
      path: 'src/content/news/*', // 文章檔案儲存的位置
      format: { contentField: 'content' }, // 使用 MDX/Markdoc 格式儲存內文
      schema: {
        title: fields.slug({ name: { label: '文章標題' } }),
        
        category: fields.select({
          label: '文章分類',
          description: '請選擇文章的類型',
          options: [
            { label: '門診公告', value: '門診公告' },
            { label: '衛教文章', value: '衛教文章' },
            { label: '醫學新知', value: '醫學新知' },
            { label: '診所活動', value: '診所活動' },
          ],
          defaultValue: '衛教文章',
        }),

        date: fields.date({ 
          label: '發布日期',
          validation: { isRequired: true }
        }),

        summary: fields.text({ 
          label: '短摘要', 
          description: '顯示在列表頁的簡短說明',
          multiline: true 
        }),

        coverImage: fields.image({
          label: '封面圖片',
          directory: 'public/images/news', // 圖片實際存檔路徑
          publicPath: '/images/news',      // 網頁讀取圖片的路徑
        }),

        content: fields.document({
          label: '文章內文',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/news/content',
            publicPath: '/images/news/content',
          },
        }),
        
        // SEO 相關欄位 (選填)
        seoTitle: fields.text({ label: 'SEO 標題 (選填)' }),
        seoDescription: fields.text({ label: 'SEO 描述 (選填)', multiline: true }),
      },
    }),
  },
});