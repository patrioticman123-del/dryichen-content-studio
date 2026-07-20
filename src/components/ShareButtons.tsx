// src/components/ShareButtons.tsx
'use client'

import { useState, useEffect } from 'react'
// ✨ 引入所需的 React Icons，確保分享按鈕圖示不閃爍、不消失
import { 
  FaLine, 
  FaFacebookMessenger, 
  FaFacebook, 
  FaCheck, 
  FaLink, 
  FaCalendarCheck 
} from "react-icons/fa";

interface ShareButtonsProps {
  url?: string 
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  // ⚠️ 請在此設定您的正式網址 (結尾不要加斜線)
  const SITE_DOMAIN = 'https://www.dryichen.com.tw'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let path = ''
      if (url) {
        if (url.startsWith('http')) {
          setShareUrl(url)
          return
        }
        path = url.startsWith('/') ? url : `/${url}`
      } else {
        path = window.location.pathname
      }
      setShareUrl(`${SITE_DOMAIN}${path}`)
    }
  }, [url])

  if (!shareUrl) return null

  const handleLineShare = () => {
    window.open(
      `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    )
  }

  const handleFBShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      '_blank'
    )
  }

  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('複製失敗', err)
    }
  }

  const handleMessengerShare = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

    if (isMobile) {
      window.location.href = `fb-messenger://share/?link=${encodeURIComponent(shareUrl)}`
    } else {
      copyLinkToClipboard()
      alert('Messenger 分享功能主要支援手機 App。\n\n已為您複製文章連結，您可以直接貼上對話框傳送給朋友！')
    }
  }

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mt-8">
      
      {/* LINE 分享 */}
      <button
        onClick={handleLineShare}
        className="w-full sm:w-auto px-6 py-3 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-full transition-all font-bold shadow-lg hover:shadow-[#06C755]/30 flex items-center justify-center gap-2 transform hover:-translate-y-1"
      >
        <FaLine size={24} />
        分享到 LINE
      </button>

      {/* Messenger 分享 */}
      <button
        onClick={handleMessengerShare}
        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#00B2FF] to-[#006AFF] hover:from-[#0099FF] hover:to-[#0055EE] text-white rounded-full transition-all font-bold shadow-lg hover:shadow-[#0099FF]/30 flex items-center justify-center gap-2 transform hover:-translate-y-1"
      >
        <FaFacebookMessenger size={24} />
        傳送給朋友
      </button>

      {/* FB 分享 */}
      <button
        onClick={handleFBShare}
        className="w-full sm:w-auto px-6 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-full transition-all font-bold shadow-lg hover:shadow-[#1877F2]/30 flex items-center justify-center gap-2 transform hover:-translate-y-1"
      >
        <FaFacebook size={24} />
        分享到 FB
      </button>

      {/* 複製連結 */}
      <button
        onClick={copyLinkToClipboard}
        className={`w-full sm:w-auto px-6 py-3 border-2 rounded-full transition-all font-bold flex items-center justify-center gap-2 transform hover:-translate-y-1 ${
          isCopied
            ? 'bg-slate-200 border-slate-200 text-slate-800'
            : 'border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]'
        }`}
      >
        {isCopied ? (
          <>
            <FaCheck size={20} /> 已複製
          </>
        ) : (
          <>
            <FaLink size={20} /> 複製網址
          </>
        )}
      </button>

      {/* 預約掛號按鈕 */}
      <a
        href="https://www.dryichen.com.tw/booking"
        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full transition-all font-bold shadow-lg hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] flex items-center justify-center gap-2 transform hover:-translate-y-1 no-underline"
      >
        <FaCalendarCheck size={20} />
        預約掛號
      </a>
      
    </div>
  )
}