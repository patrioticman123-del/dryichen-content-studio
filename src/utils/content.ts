/**
 * 内容渲染工具函数
 * 支持 Markdown 和 HTML 内容
 */

/**
 * 检查内容是否为 HTML
 */
function isHTML(str: string): boolean {
  return /<[a-z][\s\S]*>/i.test(str)
}

/**
 * 简单的 Markdown 转 HTML（基础支持）
 * 如果需要完整 Markdown 支持，建议使用 markdown-it 或 remark
 */
function markdownToHTML(markdown: string): string {
  let html = markdown
  
  // 标题
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  
  // 粗体
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // 斜体
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  
  // 列表
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/^\+ (.*$)/gim, '<li>$1</li>')
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>')
  
  // 段落（将换行转换为 <br>）
  html = html.split('\n\n').map(para => {
    if (para.trim() && !para.match(/^<[h|u|o|l]/)) {
      return `<p>${para.trim().replace(/\n/g, '<br>')}</p>`
    }
    return para
  }).join('')
  
  return html
}

/**
 * 渲染内容（自动检测 Markdown 或 HTML）
 */
export function renderContent(content?: string): string {
  if (!content) return ''
  
  // 如果已经是 HTML，直接返回
  if (isHTML(content)) {
    return content
  }
  
  // 否则当作 Markdown 处理
  return markdownToHTML(content)
}
