// src/components/weight-bone/WeightLossTools.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

// ✨ 引入所需的 React Icons，解決圖示消失的問題
import { 
  FaCalculator, 
  FaChartLine, 
  FaBone, 
  FaUtensils, 
  FaArrowRight, 
  FaToolbox, 
  FaChevronDown, 
  FaChevronRight 
} from "react-icons/fa";

export default function WeightLossTools() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 點擊外部關閉選單
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const tools = [
    {
      href: '/weight-bone/BMI',
      label: '減重自我評估',
      Icon: FaCalculator,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      href: '/weight-bone/child',
      label: '兒童生長曲線分析',
      Icon: FaChartLine,
      color: 'from-cyan-600 to-teal-500'
    },
    {
      href: '/weight-bone/calculator',
      label: '骨齡與遺傳身高預測',
      Icon: FaBone, // 替換原本不穩定的 x-ray
      color: 'from-blue-500 to-indigo-600'
    },
    {
      href: '/weight-bone/nutrition',
      label: '兒童長高營養指南',
      Icon: FaUtensils,
      color: 'from-cyan-500 to-teal-500'
    }
  ]

  return (
    <div className="w-full my-0">
      
      {/* =======================
          電腦版：橫向一排 (優化寬度分配)
          ======================= */}
      <div className="hidden md:flex flex-nowrap gap-2 lg:gap-4 justify-center items-center w-full">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`group relative flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 lg:gap-2 px-2 lg:px-5 py-3 bg-gradient-to-r ${tool.color} rounded-full text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 whitespace-nowrap text-sm lg:text-base`}
          >
            <span className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <tool.Icon className="text-base lg:text-lg group-hover:animate-pulse" />
            <span className="truncate">{tool.label}</span>
          </Link>
        ))}
      </div>

      {/* =======================
          手機版：下拉選單
          ======================= */}
      <div className="md:hidden relative z-50" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-6 py-4 bg-slate-800 rounded-xl text-white font-bold shadow-lg active:bg-slate-700 transition-colors"
        >
          <div className="flex items-center gap-3">
            <FaToolbox className="text-cyan-400" />
            <span>實用小工具 (點擊展開)</span>
          </div>
          <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* 下拉內容 */}
        <div
          className={`absolute top-full left-0 w-full mt-2 bg-slate-800 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${
            isOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'
          }`}
        >
          <div className="flex flex-col p-2 gap-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors text-slate-200 hover:text-cyan-400"
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${tool.color} flex items-center justify-center text-white text-[10px]`}>
                  <tool.Icon />
                </div>
                <span className="font-medium">{tool.label}</span>
                <FaChevronRight className="ml-auto text-[10px] opacity-50" />
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}