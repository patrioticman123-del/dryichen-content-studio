'use client';

import React from 'react';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import RelatedCases from '@/components/RelatedCases'; 
import { CaseStudy } from '@/data/cases';

export interface ArticleData {
  title: string;
  subtitle?: string;
  description?: string;
  contentHtml?: string;
  heroImage?: string;
  images?: { src: string; alt?: string }[];
  youtubeVideoId?: string;
  whyChooseUs?: string[];
  treatmentFocus?: string[];
  qaList?: { question: string; answer: string }[];
  keywords?: string[];
  lastModified?: string;
  referencesHtml?: string; // 新增：支援直接傳入 HTML 格式的參考文獻
}

interface ArticleDetailProps {
  data: ArticleData;
  backLink: {
    href: string;
    label: string;
  };
  currentUrl: string;
  layoutStyle: 'hero' | 'standard';
  relatedCases?: CaseStudy[];
}

export default function ArticleDetail({ data, backLink, currentUrl, layoutStyle, relatedCases }: ArticleDetailProps) {
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&bgcolor=ffffff&data=${encodeURIComponent(currentUrl)}`;

  // 取得今天的日期作為最終備案 (ISO 格式: YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* 修正 1：CSS 注入 */}
      <style dangerouslySetInnerHTML={{ __html: `
        .article-content strong { color: #22d3ee !important; font-weight: 700; }
        .article-content a { color: #ec4899 !important; font-weight: 600; text-decoration: none; border-bottom: 1px dashed #ec4899; transition: all 0.2s ease; }
        .article-content a:hover { color: #db2777 !important; border-bottom-style: solid; }
        .article-content h2, .article-content h3 { font-size: 1.5rem; font-weight: 700; color: white; margin-top: 2rem; margin-bottom: 1rem; display: flex; align-items: center; }
        .article-content h2::before, .article-content h3::before { content: ''; display: inline-block; width: 6px; height: 24px; background-color: #06b6d4; margin-right: 12px; border-radius: 2px; }
        .article-content img { max-width: 100%; height: auto; border-radius: 0.75rem; margin: 1.5rem auto; display: block; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3); border: 1px solid #475569; }
        @media (min-width: 768px) { .article-content img { max-width: 85%; } }
        .article-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; color: #cbd5e1; }
        .article-content li { margin-bottom: 0.4rem; }
      `}} />

      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300">
        <main className="flex-grow pt-0 -mt-10 md:-mt-12 pb-0 relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="pt-4">
              {/* ✨ 修改處：移除 prefetch={false} 啟動高速背景快取 */}
              <Link href={backLink.href} className="inline-flex items-center text-cyan-400 mb-4 hover:text-cyan-300 transition-colors group text-sm">
                <i className="fa-solid fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i> 
                {backLink.label}
              </Link>
            </div>
            
            <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
              
              {layoutStyle === 'hero' && data.heroImage && (
                <div className="relative h-64 md:h-96 w-full group">
                  <img src={data.heroImage} alt={data.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-wide">{data.title}</h1>
                  </div>
                </div>
              )}

              <div className="p-4 md:p-10 pb-2">
                
                {/* 頂部標題區塊 */}
                {layoutStyle === 'standard' && (
                  <div className="mb-8 border-l-4 border-cyan-500 pl-4 bg-gradient-to-r from-slate-900/80 to-transparent py-5 rounded-r-xl flex flex-col md:flex-row md:items-center gap-6">
                    <div className="hidden md:block bg-white p-2 rounded-lg shrink-0 shadow-lg ring-2 ring-slate-700">
                      <img className="w-20 h-20 object-contain" src={qrCodeApiUrl} alt="QR" />
                    </div>
                    <div className="flex-grow">
                      <h1 className="text-2xl md:text-4xl font-bold font-sans text-white mb-2 tracking-wide leading-tight">
                        {data.title}
                      </h1>
                      
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
                        <h2 className="text-lg text-cyan-400 font-medium">
                          {data.subtitle}
                        </h2>
                        
                        <div className="text-slate-400 text-xs md:text-sm font-normal flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="flex items-center">
                            撰文者：
                            {/* ✨ 修改處：移除 prefetch={false} 啟動高速背景快取 */}
                            <Link 
                              href="/about/doctors" 
                              className="text-slate-300 hover:text-cyan-400 underline underline-offset-4 decoration-slate-600 transition-colors cursor-pointer"
                            >
                              林羿辰醫師
                            </Link>
                          </span>
                          <span className="hidden md:inline text-slate-600">|</span>
                          <span className="flex items-center">
                            最後更新日期：
                            <time dateTime={data.lastModified || today} itemProp="dateModified">
                              {data.lastModified || today}
                            </time>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 核心重點區塊 */}
                {(data.whyChooseUs || data.treatmentFocus) && (
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
                    {data.whyChooseUs && (
                      <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-700/80 h-full hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all duration-300">
                        <h4 className="text-xl font-bold text-cyan-400 mb-4 border-b border-slate-700 pb-2 flex items-center"><i className="fa-solid fa-thumbs-up mr-3"></i> 為什麼選擇宸新</h4>
                        <ul className="space-y-3 text-slate-300">
                          {data.whyChooseUs.map((item, idx) => (
                            <li key={idx} className="flex items-start"><span className="text-cyan-500 mr-2 mt-1.5 text-xs">●</span><span dangerouslySetInnerHTML={{__html: item}} className="leading-relaxed"></span></li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {data.treatmentFocus && (
                      <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-700/80 h-full hover:border-pink-500/30 hover:bg-slate-900/60 transition-all duration-300">
                        <h4 className="text-xl font-bold text-pink-400 mb-4 border-b border-slate-700 pb-2 flex items-center"><i className="fa-solid fa-crosshairs mr-3"></i> 治療重點</h4>
                        <ul className="space-y-3 text-slate-300">
                          {data.treatmentFocus.map((item, idx) => (
                            <li key={idx} className="flex items-start"><span className="text-pink-500 mr-2 mt-1.5 text-xs">●</span><span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} /></li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* 文章內文 */}
                <div className="article-content text-slate-300 leading-relaxed text-lg mb-4">
                  {data.contentHtml ? <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} /> : <p>{data.description}</p>}
                </div>

                {/* 多媒體內容 */}
                {data.youtubeVideoId && (
                  <div className="mb-14 text-center">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center"><i className="fa-brands fa-youtube text-red-500 mr-3 text-3xl"></i>相關介紹影片</h3>
                    <div className="w-full md:w-[85%] mx-auto">
                      <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-2xl border border-slate-700 group">
                        <iframe src={`https://www.youtube.com/embed/${data.youtubeVideoId}`} title={`${data.title} 介紹影片`} className="absolute top-0 left-0 w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                      </div>
                    </div>
                  </div>
                )}

                {data.images && data.images.length > 0 && (
                  <div className="space-y-8 mb-14">
                    {data.images.map((img, idx) => (
                      <div key={idx} className="text-center group">
                        <div className="relative overflow-hidden rounded-xl shadow-xl inline-block w-full md:w-[85%] border border-slate-700 bg-slate-900">
                          <img src={img.src} alt={img.alt || data.title} className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-700 block" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {data.qaList && data.qaList.length > 0 && (
                  <div className="mt-8 mb-8">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center"><i className="fa-regular fa-circle-question text-cyan-400 mr-3"></i>常見問答</h3>
                    <div className="space-y-4">
                      {data.qaList.map((qa, idx) => (
                        <details key={idx} className="group bg-slate-900/30 rounded-xl border border-slate-700 overflow-hidden open:border-cyan-500/50 open:bg-slate-900/60 transition-all duration-300">
                          <summary className="flex items-start justify-between p-5 cursor-pointer list-none hover:bg-slate-800/50 transition-colors">
                            <h4 className="font-bold text-lg text-slate-200 flex items-start group-hover:text-cyan-300 transition-colors">
                              <span className="text-cyan-500 mr-3 font-black mt-0.5">Q{idx + 1}.</span><span className="leading-relaxed">{qa.question}</span>
                            </h4>
                            <span className="text-slate-500 group-hover:text-cyan-400 group-open:rotate-180 group-open:text-cyan-500 transition-all duration-300 ml-4 mt-1 shrink-0"><i className="fa-solid fa-chevron-down"></i></span>
                          </summary>
                          <div className="px-6 pb-6 pt-0 text-slate-300 leading-relaxed ml-0 md:ml-10">
                            <div className="border-l-2 border-slate-600 pl-4 py-1 text-base md:text-lg animate-in fade-in slide-in-from-top-2">{qa.answer}</div>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {/* 成功案例 */}
                {relatedCases && relatedCases.length > 0 && (
                  <div className="mb-0 pt-0">
                    <RelatedCases cases={relatedCases} />
                  </div>
                )}

                {/* 醫師資歷方塊 */}
                {layoutStyle === 'standard' && (
                  <div className="mt-8 mb-10">
                    <div className="bg-slate-800/40 backdrop-blur border border-slate-700 rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                      
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
                        <div className="flex-grow text-center md:text-left">
                          <div className="mb-2">
                          <h3 className="text-xl font-bold text-white flex flex-col md:flex-row items-center gap-2">
                            本文由 
                            {/* ✨ 修改處：移除 prefetch={false} 啟動高速背景快取 */}
                            <Link 
                              href="/about/doctors"
                              className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer underline underline-offset-4 decoration-cyan-900/50 hover:decoration-cyan-400"
                            >
                              林羿辰醫師
                            </Link> 
                            撰寫與醫學審閱
                            <span className="hidden md:inline-block text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30 font-normal uppercase tracking-wider">
                              Verified Expert
                            </span>
                          </h3>
                            <p className="text-sm text-slate-400 mt-1 font-medium">宸新復健科診所院長 / 復健科專科醫師</p>
                          </div>
                          
                          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                            現任宸新復健科診所院長。畢業於國立台灣大學醫學系，擁有復健科、骨質疏鬆雙專科醫師資歷，專精於精準超音波導引注射治療、增生療法與各類運動傷害。林醫師具備豐富臨床經驗，致力於將醫學實證应用於病患康復。
                          </p>

                          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-5 border-t border-slate-700/50">
                            {/* ✨ 修改處：移除 prefetch={false} 啟動高速背景快取 */}
                            <Link 
                              href="/about/doctors" 
                              className="text-cyan-400 hover:text-cyan-300 text-sm font-bold flex items-center group transition-colors cursor-pointer"
                            >
                              <i className="fa-solid fa-id-card-clip mr-2 text-lg"></i>
                              <span className="border-b border-cyan-500/30 group-hover:border-cyan-300">👉 查看更多醫師資歷、證照認證與學術論文</span>
                              <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                            
                            <div className="flex flex-col items-end gap-1 text-[10px] md:text-xs text-slate-500">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center"><i className="fa-solid fa-check-double mr-1 text-cyan-500/70"></i> 專家審閱完成</span>
                                <span className="flex items-center"><i className="fa-solid fa-database mr-1 text-cyan-500/70"></i> 來源：醫學實證與專科臨床</span>
                              </div>
                              <div className="text-gray-500">
                                最後更新日期：
                                <time dateTime={data.lastModified || today} itemProp="dateModified">
                                  {data.lastModified || today}
                                </time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* FOOTER */}
              <div className="bg-slate-900/80 p-8 md:p-12 border-t border-slate-700 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent blur-sm"></div>
                <h3 className="text-white font-bold text-2xl mb-3 relative z-10">覺得這篇介紹有幫助嗎？</h3>
                <p className="text-slate-400 mb-8 text-lg relative z-10">歡迎分享給親朋好友，讓更多人了解我們的專業。</p>
                <div className="relative z-10 mb-10">
                  <ShareButtons url={currentUrl} title={data.title} />
                </div>
                <div className="pt-8 border-t border-slate-700/50 w-full flex justify-center">
                  {/* ✨ 修改處：移除 prefetch={false} 啟動高速背景快取 */}
                  <Link href={backLink.href} className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold text-cyan-400 border border-cyan-500/30 rounded-full hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 group">
                    查看更多項目
                    <i className="fa-solid fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>

              {/* 參考文獻 (渲染傳入的 HTML) */}
              {data.referencesHtml && (
                <div className="mt-8 mb-10">
                  <div dangerouslySetInnerHTML={{ __html: data.referencesHtml }} />
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </>
  );
}