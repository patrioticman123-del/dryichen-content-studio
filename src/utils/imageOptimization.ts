/**
 * 圖片優化工具函數
 */

/**
 * 生成圖片的多種尺寸 URL（如果使用 CDN）
 */
export function getImageSrcSet(src: string, sizes: number[] = [400, 800, 1200]): string {
  // 如果使用 CDN，可以生成不同尺寸的 URL
  // 這裡返回原始 URL，實際使用時可以根據需要調整
  return src
}

/**
 * 生成 WebP 版本的圖片 URL
 */
export function getWebPUrl(src: string): string {
  if (src.endsWith('.webp') || src.endsWith('.webp')) {
    return src.replace(/\.(jpg|jpeg)$/i, '.webp')
  }
  return src
}

/**
 * 生成縮圖 URL
 */
export function getThumbnailUrl(src: string): string {
  // 如果使用 CDN，可以添加縮圖參數
  // 例如：/images/disease.webp?w=400
  return src
}

/**
 * 檢查圖片是否存在
 */
export async function checkImageExists(src: string): Promise<boolean> {
  try {
    const response = await fetch(src, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/**
 * 生成 SEO 友好的圖片文件名
 */
export function generateImageFileName(title: string, category?: string): string {
  // 移除特殊字符，轉換為小寫，使用連字符
  let fileName = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  if (category) {
    fileName = `${category}-${fileName}`
  }

  return fileName
}
