import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: '文章工作台',
  description: '醫療熱門議題、文章生成、審核與發布前預覽工作台。',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f8fafc',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-700 antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
