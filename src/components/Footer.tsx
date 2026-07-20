'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import FooterSearch from '@/components/FooterSearch';
import ScrollAnimation from '@/components/ScrollAnimation';

// ✨ 僅載入本頁面有用到的小圖示，達到極速載入 (Tree Shaking)
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaPhoneAlt, 
  FaCalendarCheck 
} from "react-icons/fa";
import { SiThreads } from "react-icons/si";
import { HiLocationMarker } from "react-icons/hi";

export default function Footer() {
  const [visitCount, setVisitCount] = useState<string>('---,---')
  const pathname = usePathname()
  const isSelfPayPage = pathname === '/booking/selfpay' || pathname === '/booking/selfpay/doctor'

  // =================================================================
  // 瀏覽人數計算邏輯
  // =================================================================
  useEffect(() => {
    const BASE_VIEWS = 125; 
    const VIEWS_PER_HOUR = 9;
    const ANCHOR_DATE = new Date('2026-01-10T00:00:00').getTime();

    const calculateViews = () => {
      const now = Date.now();
      const timeDiff = now - ANCHOR_DATE;
      const hoursPassed = timeDiff / (1000 * 60 * 60);
      const currentViews = Math.floor(BASE_VIEWS + (hoursPassed * VIEWS_PER_HOUR));
      
      setVisitCount(currentViews.toLocaleString());
    };

    calculateViews();
    const intervalId = setInterval(calculateViews, 10000);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <footer className={`border-t pt-10 pb-6 mt-auto ${isSelfPayPage ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
      
      {/* 載入滾動動畫組件 */}
      <ScrollAnimation />

      <div className="container mx-auto px-4">

        {/* =========================================
            Part 1: 快速導覽 (圖片區)
           ========================================= */}
        <div className="mb-8">
            <h3 className={`text-2xl font-bold font-sans text-center mb-6 tracking-wide ${isSelfPayPage ? 'text-slate-800' : 'text-white'}`}>
                <span className="text-cyan-400">快速</span>導覽
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-2 max-w-6xl mx-auto">
                
               {/* 1. 關於我們 */}
                {/* ✨ 修改處：移除 prefetch={false}，釋放 Next.js 靜態預載，回復點擊秒開體感 */}
                <Link href="/about" className={`animate-on-scroll delay-100 group rounded-xl relative h-28 md:h-36 overflow-hidden shadow-lg border hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all block ${isSelfPayPage ? 'border-transparent' : 'border-slate-700'}`}>
                  <img
                    src="/images/icons/a.webp" 
                    alt="關於我們 - 宸新復健科" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent flex items-end p-3">
                      <span className="text-white font-bold text-sm md:text-base group-hover:text-cyan-400 transition-colors relative z-10">關於我們</span>
                  </div>
                </Link>

                {/* 2. 治療方式 */}
                {/* ✨ 修改處：移除 prefetch={false} */}
                <Link href="/treatments" className={`animate-on-scroll delay-200 group rounded-xl relative h-28 md:h-36 overflow-hidden shadow-lg border hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all block ${isSelfPayPage ? 'border-transparent' : 'border-slate-700'}`}>
                  <img
                    src="/images/icons/b.webp" 
                    alt="治療方式 - PRP與震波" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent flex items-end p-3">
                        <span className="text-white font-bold text-sm md:text-base group-hover:text-cyan-400 transition-colors relative z-10">治療方式</span>
                    </div>
                </Link>

                {/* 3. 減重與骨齡 */}
                {/* ✨ 修改處：移除 prefetch={false} */}
                <Link href="/weight-bone" className={`animate-on-scroll delay-300 group rounded-xl relative h-28 md:h-36 overflow-hidden shadow-lg border hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all block ${isSelfPayPage ? 'border-transparent' : 'border-slate-700'}`}>
                  <img
                    src="/images/icons/e.webp" 
                    alt="特色門診" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent flex items-end p-3">
                        <span className="text-white font-bold text-sm md:text-base group-hover:text-cyan-400 transition-colors relative z-10">特色門診</span>
                    </div>
                </Link>

                {/* 4. 疾病衛教 */}
                {/* ✨ 修改處：移除 prefetch={false} */}
                <Link href="/diseases" className={`animate-on-scroll delay-400 group rounded-xl relative h-28 md:h-36 overflow-hidden shadow-lg border hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all block ${isSelfPayPage ? 'border-transparent' : 'border-slate-700'}`}>
                  <img
                    src="/images/icons/d.webp" 
                    alt="疾病衛教文章" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent flex items-end p-3">
                        <span className="text-white font-bold text-sm md:text-base group-hover:text-cyan-400 transition-colors relative z-10">疾病衛教</span>
                    </div>
                </Link>
            </div>
        </div>

        {/* =========================================
            Part 2: 站內搜尋
           ========================================= */}
        <div className={`max-w-3xl mx-auto mb-6 border-b pb-6 ${isSelfPayPage ? 'border-slate-200' : 'border-slate-800'}`}>
            <FooterSearch lightMode={isSelfPayPage} />
        </div>

        {/* =========================================
            Part 3: 社群、計數器、聯絡資訊
           ========================================= */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-6">
          
          {/* 1. 左側：追蹤我們 + 社群按鈕 + 預約按鈕 */}
          <div className="w-full lg:w-auto">
            <h3 className={`text-lg font-bold mb-3 flex items-center h-[28px] ${isSelfPayPage ? 'text-slate-800' : 'text-white'}`}>
                追蹤我們
            </h3>
            
            <div className="flex gap-3 items-center flex-wrap">
                {/* 使用 React-Icons，取代原本不穩定的 <i> 標籤 */}
                <a href="https://www.facebook.com/DrYiChen" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-500/30" title="Facebook">
                  <FaFacebookF size={18} />
                </a>
                <a href="https://www.instagram.com/dryichen/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-pink-500/30" title="Instagram">
                  <FaInstagram size={18} />
                </a>
                <a href="https://www.threads.net/@dryichen" target="_blank" rel="noopener noreferrer" className={`w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg ${isSelfPayPage ? 'border border-black shadow-slate-400/30' : 'shadow-white/30'}`} title="Threads">
                  <SiThreads size={18} className="text-black" />
                </a>
                <a href="https://youtube.com/@dryichen" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-red-500/30" title="YouTube">
                  <FaYoutube size={20} />
                </a>
                
                {/* 獨立的預約按鈕 */}
                {/* ✨ 修改處：移除 prefetch={false} */}
                <Link href="/booking" className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:shadow-[0_0_10px_rgba(236,72,153,0.5)] transition-all flex items-center gap-1.5 ml-1">
                    <FaCalendarCheck /> 馬上預約
                </Link>
            </div>
          </div>

          {/* 2. 中間：累計瀏覽 */}
          <div className="flex flex-col items-center justify-center w-full lg:w-auto my-4 lg:my-0">
             <div className={`px-6 py-3 rounded-xl border flex items-center gap-3 ${isSelfPayPage
               ? 'bg-slate-50 border-slate-200 shadow-[0_4px_10px_rgba(0,0,0,0.12)]'
               : 'bg-slate-800/80 border-slate-600/50 shadow-[0_4px_10px_rgba(0,0,0,0.2)]'
             }`}>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                
                <span className={`text-sm font-medium ${isSelfPayPage ? 'text-slate-600' : 'text-slate-300'}`}>累計瀏覽:</span>
                
                <span className={`font-mono font-bold tracking-widest text-xl ${isSelfPayPage ? 'text-cyan-700' : 'text-cyan-400'}`}>
                    {visitCount}
                </span>
             </div>
          </div>

          {/* 3. 右側：診所資訊 */}
          <div className={`text-center lg:text-right space-y-1.5 w-full lg:w-auto text-sm ${isSelfPayPage ? 'text-slate-700' : 'text-slate-300'}`}>
          <a 
            href="tel:+886-3-564-7999" 
            className="flex items-center justify-center lg:justify-end gap-2 group cursor-pointer hover:text-cyan-400 transition-colors"
          >
            <FaPhoneAlt size={14} className="text-cyan-400 group-hover:animate-pulse" /> 
            <span className="font-mono tracking-wide text-xl font-bold">(03) 564-7999</span>
          </a>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=宸新復健科診所" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center lg:justify-end gap-2 hover:text-cyan-400 transition-colors"
            >
              <HiLocationMarker size={18} className="text-cyan-400" />
              <span>300新竹市東區光復路一段371號B1</span>
            </a>

            <p className="text-xs text-slate-500 pt-1">
                服務範圍：新竹市東區、竹科園區、關新路周邊復健服務
            </p>

            <p className="text-xs text-slate-500 pt-1">
                如需查詢門診時間或掛號，請前往：
                <a 
                  href="https://www.forcestar.com.tw/clinic/%E6%96%B0%E7%AB%B9%E7%AB%B9%E7%A7%91%E5%AE%B8%E6%96%B0%E5%BE%A9%E5%81%A5%E7%A7%91%E8%A8%BA%E6%89%80/c/jvAUv7dDKT" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-500 hover:text-cyan-400 hover:underline font-medium"
                >
                    新竹復健科首選 - 宸新復健科診所
                </a>
            </p>
          </div>
        </div>

        <div className={`border-t my-4 ${isSelfPayPage ? 'border-slate-200' : 'border-slate-800'}`}></div>

        <div className="text-center">
          <p className={`text-xs leading-relaxed ${isSelfPayPage ? 'text-slate-600' : 'text-slate-500'}`}>
            © {new Date().getFullYear()} 宸新復健科診所 林羿辰醫師. All Rights Reserved.<br />
            <span className={`block mt-1 ${isSelfPayPage ? 'text-slate-500' : 'text-slate-600'}`}>本網站內容僅供衛教參考，不能取代專業醫師診斷。</span>
          </p>
        </div>

      </div>
    </footer>
  )
}
