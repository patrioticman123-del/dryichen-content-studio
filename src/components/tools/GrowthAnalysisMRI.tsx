'use client';

import React, { useState, useMemo } from 'react';

// =====================================================================
// 台灣兒童生長曲線數據庫 (維持不變)
// =====================================================================

type GrowthTable = { [age: number]: number[] };

// ... (DATA_BOY_HEIGHT, DATA_GIRL_HEIGHT, DATA_BOY_WEIGHT, DATA_GIRL_WEIGHT 數據維持不變，省略以節省空間) ...
const DATA_BOY_HEIGHT: GrowthTable = {
  0: [46.3, 47.9, 49.9, 51.8, 53.4], 0.5: [63.6, 65.4, 67.6, 69.8, 71.6], 1: [71.3, 73.3, 75.7, 78.2, 80.2], 1.5: [77.2, 79.5, 82.3, 85.1, 87.3], 2: [82.1, 84.6, 87.8, 91.0, 93.6], 2.5: [85.5, 88.4, 91.9, 95.5, 98.3], 3: [89.1, 92.2, 96.1, 99.9, 103.1], 3.5: [92.4, 95.7, 99.9, 104.0, 107.3], 4: [95.4, 99.0, 103.5, 107.7, 111.2], 4.5: [98.4, 102.1, 106.7, 111.2, 115.0], 5: [101.2, 105.2, 110.0, 114.8, 118.7], 5.5: [103.9, 107.9, 112.8, 117.7, 121.8], 6: [106.5, 110.5, 115.6, 120.6, 124.9], 6.5: [109.2, 113.2, 118.4, 123.6, 128.1], 7: [111.8, 115.8, 121.2, 126.5, 131.2], 7.5: [114.5, 118.5, 124.0, 129.4, 134.3], 8: [117.0, 121.3, 126.8, 132.2, 137.2], 8.5: [119.5, 124.0, 129.5, 135.0, 140.0], 9: [121.8, 126.0, 131.8, 137.5, 142.5], 9.5: [124.0, 128.0, 134.0, 140.0, 145.0], 10: [126.0, 130.5, 136.5, 142.8, 148.3], 10.5: [128.0, 133.0, 139.0, 145.5, 151.5], 11: [130.5, 135.6, 142.0, 149.4, 156.1], 11.5: [133.0, 138.1, 145.0, 153.2, 160.7], 12: [135.6, 141.1, 148.8, 157.1, 164.4], 12.5: [138.2, 144.0, 152.5, 161.0, 168.0], 13: [141.9, 148.5, 156.9, 164.9, 171.0], 13.5: [145.5, 153.0, 161.2, 168.7, 174.0], 14: [149.3, 156.3, 163.7, 170.8, 176.0], 14.5: [153.0, 159.6, 166.2, 172.8, 178.0], 15: [155.5, 161.3, 167.6, 173.9, 179.0], 15.5: [158.0, 163.0, 169.0, 175.0, 180.0], 16: [159.3, 164.0, 170.0, 175.8, 180.5], 16.5: [160.5, 165.0, 171.0, 176.5, 181.0], 17: [160.9, 165.5, 171.5, 176.8, 181.5], 17.5: [161.0, 166.0, 172.0, 177.0, 182.0], 18: [161.5, 166.0, 172.0, 177.3, 182.0], 18.5: [162.0, 166.0, 172.0, 177.5, 182.0]
};
const DATA_GIRL_HEIGHT: GrowthTable = {
  0: [45.6, 47.2, 49.1, 51.1, 52.7], 0.5: [61.5, 63.4, 65.7, 68.1, 70.0], 1: [69.2, 71.3, 74.0, 76.7, 78.9], 1.5: [75.2, 77.7, 80.7, 83.7, 86.2], 2: [80.3, 83.1, 86.4, 89.8, 92.5], 2.5: [84.0, 87.0, 90.7, 94.3, 97.3], 3: [87.9, 91.1, 95.1, 99.0, 102.2], 3.5: [91.4, 94.8, 99.0, 103.3, 106.7], 4: [94.6, 98.3, 102.7, 107.2, 110.8], 4.5: [97.6, 101.5, 106.2, 110.9, 114.7], 5: [100.5, 104.5, 109.4, 114.4, 118.4], 5.5: [103.0, 107.1, 112.1, 117.1, 121.3], 6: [105.5, 109.7, 114.8, 119.9, 124.2], 6.5: [108.1, 112.3, 117.6, 122.6, 127.2], 7: [110.6, 114.9, 120.3, 125.4, 130.1], 7.5: [113.1, 117.5, 123.0, 128.1, 133.0], 8: [115.7, 120.3, 125.8, 131.3, 136.5], 8.5: [118.3, 123.0, 128.5, 134.5, 140.0], 9: [120.7, 125.5, 131.3, 137.8, 143.5], 9.5: [123.0, 128.0, 134.0, 141.0, 147.0], 10: [125.8, 131.0, 137.5, 144.8, 150.8], 10.5: [128.5, 134.0, 141.0, 148.5, 154.5], 11: [131.8, 137.5, 144.5, 151.8, 157.3], 11.5: [135.0, 141.0, 148.0, 155.0, 160.0], 12: [137.9, 143.8, 150.5, 157.0, 161.8], 12.5: [140.8, 146.5, 153.0, 159.0, 163.5], 13: [143.2, 148.5, 154.5, 160.3, 164.8], 13.5: [145.5, 150.5, 156.0, 161.5, 166.0], 14: [146.8, 151.3, 156.8, 162.3, 167.0], 14.5: [148.0, 152.0, 157.5, 163.0, 167.9], 15: [148.5, 152.5, 157.9, 163.5, 168.2], 15.5: [149.0, 153.0, 158.3, 164.0, 168.5], 16: [149.5, 153.5, 158.7, 164.2, 168.8], 16.5: [150.0, 154.0, 159.0, 164.4, 169.0], 17: [150.0, 154.0, 159.3, 164.7, 169.0], 17.5: [150.0, 154.0, 159.5, 165.0, 169.0], 18: [150.0, 154.0, 159.5, 165.0, 169.0], 18.5: [150.0, 154.0, 159.5, 165.0, 169.0]
};
const DATA_BOY_WEIGHT: GrowthTable = {
  0: [2.5, 2.9, 3.3, 3.9, 4.4], 1: [7.8, 8.6, 9.6, 10.8, 11.8], 2: [9.8, 10.9, 12.2, 13.7, 15.0], 3: [11.5, 12.8, 14.3, 16.2, 17.8], 4: [13.0, 14.5, 16.3, 18.6, 21.0], 5: [14.6, 16.2, 18.3, 21.0, 24.2], 6: [16.5, 18.3, 20.6, 24.0, 28.3], 7: [18.5, 20.5, 22.9, 27.0, 32.5], 8: [20.6, 23.0, 25.9, 31.3, 38.3], 9: [22.8, 25.5, 29.0, 35.6, 44.1], 10: [25.0, 28.0, 32.0, 40.0, 50.0], 11: [28.0, 31.5, 36.5, 46.0, 57.5], 12: [31.0, 35.0, 41.0, 52.0, 65.0], 13: [34.6, 39.3, 46.0, 57.3, 70.0], 14: [38.3, 43.6, 51.0, 62.6, 75.0], 15: [42.0, 48.0, 56.0, 68.0, 80.0], 16: [44.6, 50.3, 58.3, 70.3, 82.6], 17: [47.3, 52.6, 60.6, 72.6, 85.3], 18: [50.0, 55.0, 63.0, 75.0, 88.0]
};
const DATA_GIRL_WEIGHT: GrowthTable = {
  0: [2.4, 2.8, 3.2, 3.7, 4.2], 1: [7.1, 7.9, 8.9, 10.1, 11.0], 2: [9.2, 10.2, 11.5, 13.1, 14.5], 3: [11.0, 12.2, 13.9, 15.8, 17.5], 4: [12.5, 13.9, 16.0, 18.5, 21.0], 5: [14.0, 15.6, 18.2, 21.2, 24.5], 6: [15.7, 17.7, 20.3, 23.8, 27.7], 7: [17.5, 19.8, 22.4, 26.5, 31.0], 8: [19.6, 22.2, 25.6, 31.0, 36.6], 9: [21.8, 24.6, 28.8, 35.5, 42.3], 10: [24.0, 27.0, 32.0, 40.0, 48.0], 11: [28.0, 31.5, 37.0, 45.0, 54.0], 12: [32.0, 36.0, 42.0, 50.0, 60.0], 13: [34.6, 39.0, 45.3, 53.3, 63.3], 14: [37.3, 42.0, 48.6, 56.6, 66.6], 15: [40.0, 45.0, 52.0, 60.0, 70.0], 16: [40.6, 45.3, 52.6, 61.0, 70.6], 17: [41.3, 45.6, 53.3, 62.0, 71.3], 18: [42.0, 46.0, 54.0, 63.0, 72.0]
};

type Gender = 'boy' | 'girl';

export default function GrowthAnalysisMRI() {
  const [gender, setGender] = useState<Gender>('boy');
  const [ageYear, setAgeYear] = useState<string>('');
  const [ageMonth, setAgeMonth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  // 1. 線性插值函數 (維持不變)
  const interpolate = (age: number, table: GrowthTable, percentileIndex: number) => {
    const ages = Object.keys(table).map(Number).sort((a, b) => a - b);
    
    if (age <= ages[0]) return table[ages[0]][percentileIndex];
    if (age >= ages[ages.length - 1]) return table[ages[ages.length - 1]][percentileIndex];

    let lower = ages[0], upper = ages[ages.length - 1];
    for (let i = 0; i < ages.length - 1; i++) {
      if (age >= ages[i] && age <= ages[i+1]) {
        lower = ages[i];
        upper = ages[i+1];
        break;
      }
    }

    const ratio = (age - lower) / (upper - lower);
    const valLower = table[lower][percentileIndex];
    const valUpper = table[upper][percentileIndex];
    
    return valLower + (valUpper - valLower) * ratio;
  };

  // 2. 計算結果 (維持不變)
  const result = useMemo(() => {
    const y = parseFloat(ageYear);
    const m = parseFloat(ageMonth || '0');
    const h = parseFloat(height);
    const w = parseFloat(weight);
    
    if (isNaN(y)) return null;
    if (isNaN(h) || isNaN(w)) return null;

    const totalAge = y + m / 12;
    const hTable = gender === 'boy' ? DATA_BOY_HEIGHT : DATA_GIRL_HEIGHT;
    const wTable = gender === 'boy' ? DATA_BOY_WEIGHT : DATA_GIRL_WEIGHT;

    const hPoints = [0,1,2,3,4].map(i => interpolate(totalAge, hTable, i));
    const wPoints = [0,1,2,3,4].map(i => interpolate(totalAge, wTable, i));

    const getPercentile = (val: number, points: number[]) => {
      if (val < points[0]) return 1;
      if (val > points[4]) return 99;
      const ranges = [3, 15, 50, 85, 97];
      for (let i = 0; i < 4; i++) {
        if (val >= points[i] && val <= points[i+1]) {
          const ratio = (val - points[i]) / (points[i+1] - points[i]);
          return ranges[i] + (ranges[i+1] - ranges[i]) * ratio;
        }
      }
      return 50;
    };

    return {
      age: totalAge,
      hPercentile: Math.round(getPercentile(h, hPoints)),
      wPercentile: Math.round(getPercentile(w, wPoints)),
      hRange: hPoints,
      wRange: wPoints
    };
  }, [ageYear, ageMonth, height, weight, gender]);

  // 3. 水平長條圖繪製函式 (SEO 修改：增加 aria-label 與 role)
  const renderPercentileBar = (type: 'h' | 'w', value: number, percentile: number) => {
    const width = 300;
    const height = 50;
    const barHeight = 12;
    const barY = 25;
    const positionX = (Math.max(2, Math.min(98, percentile)) / 100) * width;
    const mainColor = type === 'h' ? '#22d3ee' : '#f472b6';
    const chartLabel = type === 'h' ? '身高百分位圖表' : '體重百分位圖表'; // SEO: 輔助標籤
    
    return (
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible" role="img" aria-label={`${chartLabel}：您的落點在第 ${percentile} 百分位`}>
        <defs>
          <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="3%" stopColor="#ef4444" />
            <stop offset="3%" stopColor="#eab308" />
            <stop offset="15%" stopColor="#eab308" />
            <stop offset="15%" stopColor="#22c55e" />
            <stop offset="85%" stopColor="#22c55e" />
            <stop offset="85%" stopColor="#eab308" />
            <stop offset="97%" stopColor="#eab308" />
            <stop offset="97%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {[3, 15, 50, 85, 97].map(p => (
           <g key={p}>
             <line x1={(p/100)*width} y1={barY - 8} x2={(p/100)*width} y2={barY + barHeight + 8} stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
             <text x={(p/100)*width} y={barY + barHeight + 18} fontSize="9" fill="#94a3b8" textAnchor="middle">{p}</text>
           </g>
        ))}

        <rect x="0" y={barY} rx={barHeight/2} ry={barHeight/2} width={width} height={barHeight} fill="url(#growthGradient)" opacity="0.8" />

        <g transform={`translate(${positionX}, ${barY + barHeight/2})`}>
          <circle r="8" fill={mainColor} opacity="0.3"><animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" /></circle>
          <circle r="5" fill="#ffffff" stroke={mainColor} strokeWidth="2" />
          <g transform="translate(0, -18)">
             <rect x="-20" y="-14" width="40" height="16" rx="4" fill={mainColor} />
             <text x="0" y="-2" fontSize="10" fontWeight="bold" fill="#1e293b" textAnchor="middle">PR{percentile}</text>
             <path d="M-4,2 L4,2 L0,6 Z" fill={mainColor} />
          </g>
        </g>
      </svg>
    );
  };

  // === SEO 修改：JSON-LD 結構化資料 ===
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "兒童生長發育評估儀",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "TWD" },
    "featureList": "台灣兒童身高體重常模比對, 生長遲緩篩檢, 性早熟風險評估",
    "author": { "@type": "Physician", "name": "林羿辰醫師" },
    "description": "輸入兒童年齡、身高與體重，立即比對台灣最新兒童生長曲線，計算生長百分位(PR值)，評估發育狀況。"
  };
  // ==================================

  return (
    // SEO 修改：使用 section 並加上 aria-label
    <section aria-label="兒童生長曲線計算機" className="max-w-5xl mx-auto p-6 md:p-10 bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 my-10 font-sans text-slate-100">
      
      {/* SEO 修改：注入 JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      {/* 標題區 */}
      <div className="mb-10 border-l-8 border-[#22d3ee] pl-6 flex justify-between items-end">
        <div>
          {/* SEO 修改：h2 -> h1 (作為此工具的主標題) */}
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            兒童生長發育評估儀
          </h1>
          <p className="text-slate-400 text-lg">
            對照最新台灣兒童生長曲線，精準定位生長落點
          </p>
        </div>
        <div className="hidden md:block text-slate-500 text-xs text-right opacity-60">
            Based on Chen W & Chang MH<br/>Pediatr Neonatol 2010
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* 左側：控制台 */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 性別開關 */}
          <div className="bg-slate-700 p-1.5 rounded-2xl flex relative border border-slate-600" role="group" aria-label="選擇性別">
            <button
              onClick={() => setGender('boy')}
              className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                gender === 'boy'
                  ? 'bg-[#0ea5e9]/20 text-[#38bdf8] border border-[#0ea5e9]/50 shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              aria-pressed={gender === 'boy'}
            >
              <span className="text-2xl" role="img" aria-label="男孩">👦</span> 男孩
            </button>
            <button
              onClick={() => setGender('girl')}
              className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                gender === 'girl'
                  ? 'bg-[#ec4899]/20 text-[#f472b6] border border-[#ec4899]/50 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              aria-pressed={gender === 'girl'}
            >
              <span className="text-2xl" role="img" aria-label="女孩">👧</span> 女孩
            </button>
          </div>

          <div className="bg-slate-700/50 p-6 rounded-2xl border border-slate-600 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                {/* SEO 修改：加入 htmlFor 綁定 id */}
                <label htmlFor="input-age-year" className="text-xs font-bold text-slate-400 mb-2 block uppercase">年齡 (歲)</label>
                <input
                  id="input-age-year"
                  type="number"
                  value={ageYear}
                  onChange={(e) => setAgeYear(e.target.value)}
                  placeholder="8"
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent outline-none text-white font-bold text-lg text-center"
                />
              </div>
              <div className="group">
                <label htmlFor="input-age-month" className="text-xs font-bold text-slate-400 mb-2 block uppercase">月份</label>
                <input
                  id="input-age-month"
                  type="number"
                  value={ageMonth}
                  onChange={(e) => setAgeMonth(e.target.value)}
                  placeholder="0"
                  max="11"
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent outline-none text-white font-bold text-lg text-center"
                />
              </div>
            </div>

            <div className="border-t border-slate-600 pt-4 space-y-4">
                <div className="group">
                    <label htmlFor="input-height" className="text-xs font-bold text-slate-400 mb-2 block uppercase">身高 (cm)</label>
                    <input
                    id="input-height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="125"
                    className="w-full p-3 rounded-xl bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent outline-none text-white font-bold text-lg text-center"
                    />
                </div>
                <div className="group">
                    <label htmlFor="input-weight" className="text-xs font-bold text-slate-400 mb-2 block uppercase">體重 (kg)</label>
                    <input
                    id="input-weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="25"
                    className="w-full p-3 rounded-xl bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent outline-none text-white font-bold text-lg text-center"
                    />
                </div>
            </div>
          </div>
        </div>

        {/* 右側：分析儀表板 */}
        {/* SEO 修改：加入 aria-live 支援動態更新通知 */}
        <div className="lg:col-span-8" aria-live="polite">
          <div className="h-full bg-slate-900/80 rounded-3xl p-6 md:p-8 border border-slate-700 relative overflow-hidden flex flex-col justify-center">
            
            {!result ? (
              <div className="text-center text-slate-500 py-12">
                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 mx-auto border border-slate-700 animate-pulse">
                  <span className="text-4xl opacity-50">📊</span>
                </div>
                <p className="text-lg font-medium">等待數據輸入...</p>
                <p className="text-sm opacity-60 mt-2 max-w-xs mx-auto">請在左側輸入孩子的生長數據，系統將自動比對台灣常模資料庫。</p>
              </div>
            ) : (
              <div className="space-y-6 animate-fadeIn z-10 relative">
                
                {/* 1. 身高分析區塊 */}
                {/* SEO 修改：使用 article 增加語意 */}
                <article className="bg-slate-800 rounded-2xl p-5 border border-slate-600 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-6xl" role="img" aria-hidden="true">📏</span>
                    </div>
                    
                    <div className="flex justify-between items-end mb-2 relative z-10">
                        <div>
                            <h3 className="text-[#22d3ee] font-bold text-lg flex items-center gap-2">
                                身高百分位
                                <span className="text-xs text-slate-400 font-normal px-2 py-0.5 bg-slate-700 rounded-full">
                                    PR {result.hPercentile}
                                </span>
                            </h3>
                            <p className="text-white text-3xl font-black tracking-tight mt-1">
                                {height} <span className="text-lg font-medium text-slate-500">cm</span>
                            </p>
                        </div>
                        <div className="text-right">
                             <p className="text-xs text-slate-400 mb-1">同齡正常範圍 (3~97th)</p>
                             <p className="text-sm font-bold text-white">{result.hRange[0].toFixed(1)} ~ {result.hRange[4].toFixed(1)} cm</p>
                        </div>
                    </div>
                    
                    {/* 水平長條圖區塊 */}
                    <div className="bg-slate-900/50 rounded-lg border border-slate-700/50 px-4 py-2 mt-2">
                        {renderPercentileBar('h', parseFloat(height), result.hPercentile)}
                    </div>
                </article>

                {/* 2. 體重分析區塊 */}
                <article className="bg-slate-800 rounded-2xl p-5 border border-slate-600 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-6xl" role="img" aria-hidden="true">⚖️</span>
                    </div>

                    <div className="flex justify-between items-end mb-2 relative z-10">
                        <div>
                            <h3 className="text-[#f472b6] font-bold text-lg flex items-center gap-2">
                                體重百分位
                                <span className="text-xs text-slate-400 font-normal px-2 py-0.5 bg-slate-700 rounded-full">
                                    PR {result.wPercentile}
                                </span>
                            </h3>
                            <p className="text-white text-3xl font-black tracking-tight mt-1">
                                {weight} <span className="text-lg font-medium text-slate-500">kg</span>
                            </p>
                        </div>
                        <div className="text-right">
                             <p className="text-xs text-slate-400 mb-1">同齡正常範圍 (3~97th)</p>
                             <p className="text-sm font-bold text-white">{result.wRange[0].toFixed(1)} ~ {result.wRange[4].toFixed(1)} kg</p>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg border border-slate-700/50 px-4 py-2 mt-2">
                          {renderPercentileBar('w', parseFloat(weight), result.wPercentile)}
                    </div>
                </article>

                {/* 3. 醫師建議 (亮色區塊) */}
                {/* SEO 修改：使用 article 強調這是獨立的建議內容 */}
                <article className="bg-[#fffbeb] border-2 border-[#fbbf24] rounded-2xl p-5 shadow-lg relative">
                    <h4 className="text-[#b45309] font-bold text-lg mb-2 flex items-center">
                        <span className="bg-[#f59e0b] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 shadow-sm">!</span>
                        醫師專業評估
                    </h4>
                    <div className="text-[#78350f] text-sm leading-relaxed font-medium space-y-2">
                        {result.hPercentile < 3 ? (
                            <p>⚠️ <strong>生長遲緩警訊：</strong> 身高低於第 3 百分位。強烈建議至<strong>兒童內分泌科</strong>安排骨齡與生長激素檢查。</p>
                        ) : result.hPercentile < 15 ? (
                            <p>📉 <strong>身高偏矮：</strong> 雖然在正常範圍內，但屬於後段班。建議加強跳躍運動與睡眠管理（22:00前入睡）。</p>
                        ) : result.hPercentile > 97 ? (
                            <p>🚀 <strong>生長超前：</strong> 身高非常高，需注意是否伴隨<strong>性早熟</strong>徵兆（如過早發育），以免生長板提早閉合。</p>
                        ) : (
                            <p>✅ <strong>發育狀況良好：</strong> 身高符合該年齡層標準，請繼續維持良好的生活作息。</p>
                        )}
                        
                        {result.wPercentile > 85 && (
                             <p className="border-t border-orange-200 pt-2 mt-2">
                                🍔 <strong>體重注意：</strong> 體重百分位較高 (&gt;85th)。過重可能導致<strong>骨齡超前</strong>，進而壓縮未來的長高空間，建議減少甜食攝取。
                             </p>
                        )}
                    </div>
                </article>

              </div>
            )}
            
            {/* 裝飾光暈 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#22d3ee]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0ea5e9]/10 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}