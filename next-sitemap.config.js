/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://chenshinrehab.github.io/dr-lin-rehab',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404', '/_not-found'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/404', '/_not-found'],
      },
    ],
  },
  outDir: './out',  // 输出到 out 文件夹（与 Next.js 静态导出一致）
  // 由于我们使用静态导出，next-sitemap 会自动扫描 out 文件夹中的页面
  // 所有动态路由都会在构建时生成，因此会自动包含在 sitemap 中
}
