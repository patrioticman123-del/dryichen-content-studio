import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

/**
 * 優化的圖片組件
 * 提供懶加載、尺寸優化和 SEO 支援
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}: OptimizedImageProps) {
  // 如果是外部 URL，使用普通 img 標籤
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    )
  }

  // 本地圖片使用 Next.js Image（開發時）或普通 img（靜態導出）
  // 由於我們使用靜態導出，直接使用 img 標籤
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
