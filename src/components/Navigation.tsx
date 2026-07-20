'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image' 
import { usePathname } from 'next/navigation'

import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaCalendarCheck, 
  FaHome, 
  FaChevronDown, 
  FaCaretRight 
} from "react-icons/fa";
import { SiThreads } from "react-icons/si";

// 定義子選單結構
type SubItem = {
  name: string;
  path: string;
}

type NavItem = {
  name: string;
  path: string;
  subItems?: SubItem[];
}

export default function Navigation() {
  const pathname = usePathname()
  const isSelfPayPage = pathname === '/booking/selfpay' || pathname === '/booking/selfpay/doctor'

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname?.startsWith(path)
  }

  // ==========================================
  // 🟢 導覽列資料結構
  // ==========================================
  const navItems: NavItem[] = [
    { 
        name: '關於我們', 
        path: '/about',
        subItems: [
            { name: '最新文章與公告', path: '/about/news' },
            { name: '診所環境', path: '/about/clinic' },
            { name: '治療案例分享', path: '/about/cases' },
            { name: '醫師團隊', path: '/about/doctors' },
        ]
    },
    { 
        name: '治療項目', 
        path: '/treatments',
        subItems: [
            { name: 'PRP增生療法', path: '/treatments/prp' },
            { name: '聚焦式震波', path: '/treatments/shockwave' },
            { name: '徒手治療', path: '/treatments/manual' },
            { name: '高能量雷射治療', path: '/treatments/high-intensity-laser' },
            { name: '玻尿酸注射', path: '/treatments/hyaluronic-acid' },
            { name: '肩關節擴張術', path: '/treatments/shoulder-dilation' },
            { name: '超音波導引抽水', path: '/treatments/ultrasound-guided-aspiration' },
            { name: '超音波導引神經解套', path: '/treatments/nerve-hydrodissection' },
            { name: '類固醇注射', path: '/treatments/steroid-injection' },
            { name: '靜脈消炎止痛針', path: '/treatments/iv-pain-relief' },
        ]
    },
    { 
        name: '特色門診', 
        path: '/weight-bone',
        subItems: [
            { name: '猛健樂 (Mounjaro)', path: '/weight-bone/mounjaro' },
            { name: '兒童骨齡評估', path: '/weight-bone/bone-age' },
            { name: '診間病患常見疑問', path: '/weight-bone/sports-injuries/problem' },
            { name: '最新醫療資訊', path: '/weight-bone/sports-injuries/medical-updates' },
            { name: '日常生活醫學知識', path: '/weight-bone/sports-injuries/daycare' },
            { name: '營養補充知識', path: '/weight-bone/sports-injuries/nutrition' },
            { name: '網球運動傷害', path: '/weight-bone/sports-injuries/tennis' },
            { name: '籃球運動傷害', path: '/weight-bone/sports-injuries/basketball' },
            { name: '棒球運動傷害', path: '/weight-bone/sports-injuries/baseball' },
            { name: '重訓運動傷害', path: '/weight-bone/sports-injuries/weight-training' },
            { name: '其他運動傷害', path: '/weight-bone/sports-injuries/other' },
            { name: '診間隨筆', path: '/weight-bone/sports-injuries/diary' },
        ]
    },
    { 
        name: '疾病衛教', 
        path: '/diseases',
        subItems: [
            { name: '總覽', path: '/diseases' },
            { name: '脊椎髖臀', path: '/diseases/spine-hip' },
            { name: '肩膀', path: '/diseases/shoulder' },
            { name: '手肘', path: '/diseases/elbow' },
            { name: '手部', path: '/diseases/hand' },
            { name: '膝蓋', path: '/diseases/knee' },
            { name: '足踝', path: '/diseases/ankle' },
        ]
    },
  ]

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b shadow-lg ${isSelfPayPage
      ? 'bg-white/95 border-slate-200 shadow-slate-200/60'
      : 'bg-slate-900/95 border-slate-700 shadow-cyan-900/20'
    }`}>
      <div className="container mx-auto px-3">
        
        {/* Logo 區塊 */}
        <div className={`relative flex items-center justify-between py-2 md:py-3 border-b min-h-[52px] md:min-h-[60px] ${isSelfPayPage ? 'border-slate-200/80' : 'border-slate-800/50'}`}>
          {/* ✨ 修改處：移除 prefetch={false} 釋放首頁高速預載快取 */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer md:absolute md:left-1/2 md:-translate-x-1/2 z-10" aria-label="宸新復健科首頁">
              <div className={`relative w-10 h-10 md:w-14 md:h-14 ${isSelfPayPage ? 'rounded-full overflow-hidden' : ''}`}>
                  <Image 
                    src="/images/main/logo.webp" 
                    alt="新竹宸新復健科診所 Logo" 
                    fill 
                    sizes="(max-width: 768px) 40px, 56px"
                    className="rounded-full object-cover border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-300"
                  />
              </div>
              <div className="text-left">
                <div className={`text-base md:text-2xl font-bold font-sans leading-tight ${isSelfPayPage
                  ? 'text-slate-800'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400'
                }`}>
                  {isSelfPayPage ? (
                    <><span className="text-cyan-600">運動教練醫師-</span>林羿辰</>
                  ) : '運動教練醫師-林羿辰'}
                </div>
                <p className={`text-[10px] md:text-xs tracking-wider leading-none mt-0.5 ${isSelfPayPage ? 'text-slate-600' : 'text-slate-400'}`}>宸新復健科診所院長</p>
              </div>
          </Link>

          {/* 右側區塊 - 圖示已改為 React Icons */}
          <div className="flex items-center gap-2 ml-auto z-20">
              {/* ✨ 修改處：移除 prefetch={false} 釋放行動版預約頁面背景快取 */}
              <Link 
                href="/booking"
                className="sm:hidden flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-md text-sm active:scale-95 transition-transform"
              >
                 <FaCalendarCheck size={14} /> 預約
              </Link>

              <div className="hidden sm:flex items-center gap-3">
                {/* ✨ 修改處：移除 prefetch={false} */}
                <Link href="/" title="回到首頁" 
                  className={isSelfPayPage
                    ? 'w-9 h-9 rounded-full bg-cyan-600 text-white border border-cyan-600 flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30'
                    : 'w-10 h-10 rounded-full bg-slate-800 text-cyan-400 border border-cyan-400 flex items-center justify-center text-lg hover:bg-slate-700 transition-colors shadow-md'}>
                  <FaHome size={18} className={isSelfPayPage ? 'text-white' : 'text-cyan-400'} />
                </Link>
                <a href="https://www.facebook.com/DrYiChen" target="_blank" rel="noopener noreferrer" className={isSelfPayPage
                  ? 'w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-500/30'
                  : 'w-10 h-10 rounded-full bg-[#1877F2] border border-[#1877F2] text-white flex items-center justify-center text-lg hover:scale-110 transition-transform shadow-md'}>
                  <FaFacebookF size={18} className="text-white" />
                </a>
                <a href="https://www.instagram.com/dryichen/" target="_blank" rel="noopener noreferrer" className={isSelfPayPage
                  ? 'w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-pink-500/30'
                  : 'w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center text-lg border-none hover:scale-110 transition-transform shadow-md'}>
                  <FaInstagram size={18} className="text-white" />
                </a>
                <a href="https://www.threads.net/@dryichen" target="_blank" rel="noopener noreferrer" className={isSelfPayPage
                  ? 'w-9 h-9 rounded-full bg-white text-black border border-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-slate-400/30'
                  : 'w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-lg border-none hover:scale-110 transition-transform shadow-md'}>
                  <SiThreads size={18} className="text-black" />
                </a>
                <a href="https://youtube.com/@dryichen" target="_blank" rel="noopener noreferrer" className={isSelfPayPage
                  ? 'w-9 h-9 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-red-500/30'
                  : 'w-10 h-10 rounded-full bg-[#FF0000] border border-[#FF0000] text-white flex items-center justify-center text-lg border-none hover:scale-110 transition-transform shadow-md'}>
                  <FaYoutube size={isSelfPayPage ? 20 : 18} className="text-white" />
                </a>
              </div>
          </div>
        </div>

        {/* 導覽選單 */}
        <nav className="w-full py-1.5 md:py-2 text-center relative">
           <ul className={`flex w-full overflow-x-auto xl:overflow-visible justify-start md:justify-center gap-1 p-0.5 rounded-none md:rounded-full no-scrollbar px-2 md:px-0 ${isSelfPayPage ? 'bg-slate-100/80' : 'bg-slate-800/30'}`}>
              
              {navItems.map((item) => (
                <li key={item.path} className="relative group shrink-0 flex-1 sm:flex-none">
                   
                   <div className="relative">
                       {/* ✨ 修改處：移除四大主選單的 prefetch={false} 屬性 */}
                       <Link 
                         href={item.path} 
                         className={`
                           px-1.5 py-1.5 text-sm 
                           md:px-4 md:py-2 md:text-base 
                           rounded-full font-medium transition-all block whitespace-nowrap flex items-center justify-center
                           ${isActive(item.path)
                             ? (isSelfPayPage
                               ? 'text-cyan-700 bg-cyan-50 border-b-2 border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.18)]'
                               : 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]')
                             : (isSelfPayPage
                               ? 'text-slate-700 hover:text-cyan-700 hover:bg-white border-b-2 border-transparent'
                               : 'text-slate-300 hover:text-white hover:bg-slate-700 border-b-2 border-transparent')}
                         `}
                       >
                         {item.name}
                         
                         {item.subItems && (
                            <span className="hidden md:block ml-1.5">
                                <FaChevronDown size={10} className="transition-transform duration-300 group-hover:rotate-180" />
                      </span>
                         )}
                       </Link>
                   </div>

                   {item.subItems && (
                     <div className={`
                        hidden md:block
                        absolute left-1/2 -translate-x-1/2 mt-2 w-48 border rounded-xl shadow-xl overflow-hidden z-50
                        transition-all duration-300 origin-top
                        opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100
                        ${isSelfPayPage ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700'}
                     `}>
                        <div className="py-1">
                            {item.subItems.map((sub) => (
                                /* ✨ 修改處：移除下拉選單所有疾病、療程子項目的 prefetch={false} 屬性，全面回復秒開體感 */
                                <Link 
                                    key={sub.path} 
                                    href={sub.path}
                                    className={`block px-4 py-3 text-sm text-left border-b last:border-0 ${isSelfPayPage
                                      ? 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 border-slate-100'
                                      : 'text-slate-300 hover:bg-slate-800 hover:text-cyan-400 border-slate-800'
                                    }`}
                                >
                                    <FaCaretRight size={10} className={`inline-block mr-2 ${isSelfPayPage ? 'text-slate-400' : 'text-slate-600'}`} />
                                    {sub.name}
                                </Link>
                            ))}
                        </div>
                     </div>
                   )}
                </li>
              ))}
              
              {/* 電腦版預約按鈕 */}
              <li className="hidden sm:block shrink-0">
                  {/* ✨ 修改處：移除電腦版預約連結的 prefetch={false} */}
                  <Link 
                    href="/booking" 
                    className={`
                      px-3.5 py-1.5 md:px-4 md:py-2 rounded-full text-base font-medium transition-all ml-1 block flex items-center gap-1.5
                      ${isActive('/booking') 
                        ? 'text-white bg-gradient-to-r from-pink-600 to-rose-600 shadow-[0_0_10px_rgba(236,72,153,0.5)]' 
                        : 'text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:shadow-[0_0_10px_rgba(236,72,153,0.5)]'}
                    `}
                  >
                    <FaCalendarCheck size={16} /> 預約
                  </Link>
              </li>
           </ul>
        </nav>
      </div>
    </header>
  )
}
