'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const isArticlePreview = /^\/admin\/articles\/[^/]+\/preview\/?$/.test(pathname);
  const showWebsiteChrome = !isAdminRoute || isArticlePreview;

  return (
    <>
      {showWebsiteChrome && <Navigation />}
      <main className={`flex-grow ${showWebsiteChrome ? 'pt-14 md:pt-20' : ''}`}>
        {children}
      </main>
      {showWebsiteChrome && <Footer />}
    </>
  );
}
