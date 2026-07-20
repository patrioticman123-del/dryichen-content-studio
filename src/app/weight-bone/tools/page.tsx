import React from 'react'
import WeightLossTools from '@/components/WeightLossTools'

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-slate-900 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white text-center mb-8">健康實用小工具導覽</h1>
        {/* 這裡就會載入你原本的那四個小工具 */}
        <WeightLossTools /> 
      </div>
    </div>
  )
}