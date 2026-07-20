interface JsonLdProps {
  data: Record<string, any>
}

/**
 * JSON-LD 结构化数据组件
 * 用于 SEO 和搜索引擎理解页面内容
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
