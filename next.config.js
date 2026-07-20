const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  // ✨ 補上 Cross-Origin-Opener-Policy 解決 Best Practices 警告
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  // ✨ 補上 X-Robots-Tag 滿足 SEO 檢查
  { key: 'X-Robots-Tag', value: 'index, follow' }
];

const nextConfig = {
  // 1. 基本效能與安全性
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false, // 5. 網址標準化 (移至此處統一基礎設定)

  // 2. ✨ 影像優化設定
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // ✨ 修正重點：同時許可 YouTube 與 QR Code 網域 ✨
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // 3. ✨ 編譯器優化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 4. 標頭設定
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ],
      },
    ];
  },
};

module.exports = nextConfig;