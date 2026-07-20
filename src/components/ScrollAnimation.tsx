'use client';

import { useEffect } from 'react';

export default function ScrollAnimation() {
  useEffect(() => {
    // 檢查瀏覽器是否支援 IntersectionObserver，不支援則直接顯示
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            
            // 使用 requestAnimationFrame 確保在最順暢的幀進行變更
            requestAnimationFrame(() => {
              target.classList.add('is-visible');
            });
            
            // 觸發後立即停止偵測，釋放記憶體
            observer.unobserve(target);
          }
        });
      },
      { 
        threshold: 0.001, // 極小閾值，只要露出一像素就觸發
        // 改為正值 10%：代表元素還沒進入視窗、距離底部還有 10% 距離時就提早開始動畫
        // 這樣可以解決「首屏元件不顯示」的問題
        rootMargin: '0px 0px 10% 0px' 
      }
    );

    // 縮短延遲偵測時間，讓首屏元件更快反應
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        // 額外檢查：如果元件已經在視窗內，直接顯示 (解決 Next.js 路由跳轉後的載入問題)
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('is-visible');
        } else {
          observer.observe(el);
        }
      });
    }, 50); // 從 150ms 縮短至 50ms

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <style jsx global>{`
      /* ============================================================
          ✨ 1. 初始狀態
          ============================================================ */
      .animate-on-scroll {
        opacity: 0;
        transform: translate3d(0, 20px, 0); 
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        backface-visibility: hidden;
        pointer-events: none;
      }

      /* ============================================================
          ✨ 2. 進場狀態
          ============================================================ */
      .animate-on-scroll.is-visible {
        opacity: 1 !important;
        transform: translate3d(0, 0, 0) !important;
        pointer-events: auto !important;
      }

      /* ============================================================
          ✨ 3. 延遲設定
          ============================================================ */
      .delay-100 { transition-delay: 100ms; }
      .delay-200 { transition-delay: 200ms; }
      .delay-300 { transition-delay: 300ms; }
      
      /* ============================================================
          ✨ 4. 電腦版設定
          ============================================================ */
      @media (min-width: 768px) {
        .animate-on-scroll {
          transform: translate3d(0, 30px, 0);
          transition-duration: 0.8s;
        }
      }

      /* ============================================================
          ✨ 5. 手機版與效能優化
          ============================================================ */
      @media (max-width: 767px) {
        @media (prefers-reduced-motion: reduce) {
          .animate-on-scroll {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        /* 修正 LCP，縮短手機版位移距離 */
        .animate-on-scroll {
          transform: translate3d(0, 10px, 0);
        }

        .backdrop-blur, 
        .backdrop-blur-md, 
        .backdrop-blur-lg {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          background-color: rgba(15, 23, 42, 0.98) !important;
        }
      }
    `}</style>
  );
}