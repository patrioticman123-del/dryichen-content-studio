'use client';
import { useState } from 'react';
import Image from 'next/image';

interface YoutubeEmbedProps {
  videoId: string;
  title?: string;
}

export default function YoutubeEmbed({ videoId, title = "診所介紹影片" }: YoutubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // 點擊後才載入真正的 iframe
  if (isLoaded) {
    return (
      <iframe 
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      ></iframe>
    );
  }

  // 初始狀態：只顯示圖片門面 (立省 800KiB 流量與 2.1s 阻塞)
  return (
    <div 
      className="absolute inset-0 w-full h-full cursor-pointer group bg-slate-800"
      onClick={() => setIsLoaded(true)}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        fill
        className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
          <i className="fa-solid fa-play text-white text-2xl ml-1"></i>
        </div>
      </div>
    </div>
  );
}