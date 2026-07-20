// src/app/about/clinic/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { facilitiesData, getFacilityById } from '@/data/facilities'
import { getTreatmentBySlug, getAllTreatmentSlugs } from '@/data/treatments'
import ArticleDetail, { ArticleData } from '@/components/ArticleDetail'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dryichen.com.tw').trim()

interface PageProps { params: { slug: string } } 

// ==========================================
// 1. SSG: 產生所有路徑
// ==========================================
export async function generateStaticParams() {
  const facilities = facilitiesData.map((item) => ({ slug: item.id }));
  const treatments = getAllTreatmentSlugs(); 
  return [...facilities, ...treatments];
}

// ==========================================
// 2. Meta 設定 (SEO)
// ==========================================
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug; 

  // A. 檢查是否為設備
  const facility = getFacilityById(slug);
  if (facility && !(facility as any).isTreatment) {
    const canonicalUrl = `${SITE_URL}/about/clinic/${slug}`;
    return {
      // 修正：移除後綴，交給 layout.tsx 模板處理以避免重複
      title: `${facility.title} - 診所設備介紹 | 新竹宸新復健科`, 
      authors: [{ name: '林羿辰醫師', url: SITE_URL }],
      publisher: '宸新復健科診所-林羿辰醫師',
      description: facility.description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: `${facility.title} | 新竹宸新復健科`,
        description: facility.description,
        url: canonicalUrl, // 修正：OG URL 應指向具體頁面而非首頁
        type: 'website',
        siteName: '新竹宸新復健科診所',
      },
      // 補上在地化標記
      other: {
        'geo.region': 'TW-HCH',
        'geo.placename': '新竹市',
      }
    };
  }

  // B. 檢查是否為治療
  const treatment = getTreatmentBySlug(slug);
  if (treatment) {
    const canonicalUrl = `${SITE_URL}/treatments/${slug}`;
    return {
      title: `${treatment.title} (設備介紹)`, 
      description: treatment.description,
      alternates: {
        canonical: canonicalUrl, // 指向本尊
      },
      openGraph: {
        title: `${treatment.title} | 新竹宸新復健科`,
        description: treatment.description,
        url: canonicalUrl,
        type: 'website',
      },
      other: {
        'geo.region': 'TW-HCH',
        'geo.placename': '新竹市',
      }
    };
  }

  return { title: '頁面不存在' };
}

// ==========================================
// 3. 頁面主體
// ==========================================
export default function ClinicHybridPage({ params }: PageProps) {
  const slug = params.slug; 
  const currentUrl = `${SITE_URL}/about/clinic/${slug}`;

  // ----------------------------------------------------
  // 情境 A: 這是原本的診所設備
  // ----------------------------------------------------
  const facility = getFacilityById(slug);
  if (facility && !(facility as any).isTreatment) {
    const articleData: ArticleData = {
      title: facility.title,
      description: facility.description,
      contentHtml: facility.contentHtml,
      heroImage: facility.imageUrl, 
      youtubeVideoId: (facility as any).youtubeVideoId,
      keywords: facility.keywords,
    };

    const jsonLdDevice = {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: `${facility.title} - 設備介紹`,
        description: facility.description,
        url: currentUrl,
        mainEntity: {
            '@type': 'MedicalDevice',
            name: facility.title,
            image: facility.imageUrl,
        }
    };

    return (
      <>
        <JsonLd data={jsonLdDevice} />
        <ArticleDetail 
          data={articleData} 
          backLink={{ href: '/about/clinic', label: '返回設備列表' }}
          currentUrl={currentUrl}
          layoutStyle="hero"
        />
      </>
    );
  }

  // ----------------------------------------------------
  // 情境 B: 治療項目
  // ----------------------------------------------------
  const treatment = getTreatmentBySlug(slug);
  if (treatment) {
      const articleData: ArticleData = {
        title: treatment.title,
        subtitle: treatment.subtitle,
        description: treatment.description,
        contentHtml: treatment.contentHtml,
        images: treatment.images,
        youtubeVideoId: treatment.youtubeVideoId,
        whyChooseUs: treatment.whyChooseUs,
        treatmentFocus: treatment.treatmentFocus,
        qaList: treatment.qaList,
      };

      return (
        <ArticleDetail 
          data={articleData} 
          backLink={{ href: '/about/clinic', label: '返回設備列表' }}
          currentUrl={currentUrl}
          layoutStyle="standard" 
        />
      );
  }

  notFound();
}