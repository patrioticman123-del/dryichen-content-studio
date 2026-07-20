'use client';

import React, { useState } from 'react';

type Gender = 'male' | 'female';

export default function WeightLossCalculator() {
  // 輸入狀態 (維持不變)
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bodyFat, setBodyFat] = useState<string>(''); 

  // 計算結果狀態 (維持不變)
  const [result, setResult] = useState<{
    bmi: number;
    bmiStatus: 'underweight' | 'normal' | 'overweight' | 'mild_obesity' | 'severe_obesity';
    idealWeight: number; 
    bmr: number; 
    bodyFatStatus?: 'low' | 'normal' | 'high' | 'very_high';
    bmrPosition: number; 
  } | null>(null);

  // 計算邏輯 (維持不變)
  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseFloat(age);
    const bf = bodyFat ? parseFloat(bodyFat) : null;

    if (!h || !w || !a) {
      alert('請填寫年齡、身高與體重以進行計算');
      return;
    }

    const heightInMeters = h / 100;
    const bmiVal = w / (heightInMeters * heightInMeters);
    const bmi = parseFloat(bmiVal.toFixed(1));

    let status: any = 'normal';
    if (bmi < 18.5) status = 'underweight';
    else if (bmi >= 18.5 && bmi < 24) status = 'normal';
    else if (bmi >= 24 && bmi < 27) status = 'overweight';
    else if (bmi >= 27 && bmi < 30) status = 'mild_obesity';
    else if (bmi >= 30) status = 'severe_obesity';

    let pos = ((bmi - 15) / (35 - 15)) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;

    const idealW = 22 * heightInMeters * heightInMeters;

    let bmrVal = 0;
    if (gender === 'male') {
      bmrVal = (10 * w) + (6.25 * h) - (5 * a) + 5;
    } else {
      bmrVal = (10 * w) + (6.25 * h) - (5 * a) - 161;
    }

    let bfStatus: any = undefined;
    if (bf !== null) {
      if (gender === 'male') {
        if (bf < 10) bfStatus = 'low';
        else if (bf <= 20) bfStatus = 'normal';
        else if (bf <= 25) bfStatus = 'high';
        else bfStatus = 'very_high';
      } else {
        if (bf < 20) bfStatus = 'low';
        else if (bf <= 30) bfStatus = 'normal';
        else if (bf <= 35) bfStatus = 'high';
        else bfStatus = 'very_high';
      }
    }

    setResult({
      bmi,
      bmiStatus: status,
      idealWeight: parseFloat(idealW.toFixed(1)),
      bmr: Math.round(bmrVal),
      bodyFatStatus: bfStatus,
      bmrPosition: pos
    });
  };

  const getBMIInfo = (status: string) => {
    switch (status) {
      case 'underweight': return { text: '體重過輕', color: 'text-yellow-400', bg: 'bg-yellow-400' };
      case 'normal': return { text: '體位正常', color: 'text-green-400', bg: 'bg-green-400' };
      case 'overweight': return { text: '體重過重', color: 'text-orange-400', bg: 'bg-orange-400' };
      case 'mild_obesity': return { text: '輕度肥胖', color: 'text-red-400', bg: 'bg-red-400' };
      case 'severe_obesity': return { text: '中重度肥胖', color: 'text-red-600', bg: 'bg-red-600' };
      default: return { text: '-', color: 'text-slate-200', bg: 'bg-slate-200' };
    }
  };

  // === SEO 修改：JSON-LD 結構化資料 ===
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "減重自我評估計算機 (BMI & BMR)",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "TWD" },
    "featureList": "BMI計算, 基礎代謝率BMR分析, 體脂肪判讀, 理想體重建議",
    "author": { "@type": "Physician", "name": "林羿辰醫師" },
    "description": "輸入身高、體重與年齡，醫師幫您快速計算 BMI 指數、基礎代謝率 (BMR) 並評估肥胖風險。"
  };
  // ===================================

  return (
    // SEO 修改：div -> section，增加 aria-label
    <section aria-label="減重評估計算機" className="max-w-5xl mx-auto p-6 md:p-10 bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 my-10 font-sans text-slate-100">
      
      {/* SEO 修改：注入 JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />

      {/* 標題區 */}
      <div className="mb-10 border-l-8 border-[#22d3ee] pl-6">
        {/* SEO 修改：h2 -> h1 */}
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
          減重自我評估計算機
        </h1>
        <p className="text-slate-400 text-lg">
          輸入基本數值，快速檢測 BMI、代謝率與肥胖風險
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* 左側：輸入面板 */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* 性別切換 */}
          <div className="bg-slate-700 p-2 rounded-2xl flex relative border border-slate-600" role="group" aria-label="性別選擇">
            <button
              onClick={() => setGender('male')}
              className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                gender === 'male'
                  ? 'bg-[#0ea5e9]/20 text-[#38bdf8] border-2 border-[#0ea5e9]/50 shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-600 border-2 border-transparent'
              }`}
              aria-pressed={gender === 'male'}
            >
              <span className="text-2xl" role="img" aria-label="男生">👨</span> 男生
            </button>
            <button
              onClick={() => setGender('female')}
              className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                gender === 'female'
                  ? 'bg-[#ec4899]/20 text-[#f472b6] border-2 border-[#ec4899]/50 shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-600 border-2 border-transparent'
              }`}
              aria-pressed={gender === 'female'}
            >
              <span className="text-2xl" role="img" aria-label="女生">👩</span> 女生
            </button>
          </div>

          <div className="space-y-5">
            <h3 className="text-[#22d3ee] font-bold border-b border-slate-700 pb-2 mb-4">
              基本資料
            </h3>
            
            <div className="grid grid-cols-2 gap-5">
              <div className="group">
                {/* SEO 修改：加入 htmlFor 綁定 id */}
                <label htmlFor="input-age" className="block text-sm font-bold text-slate-300 mb-2">年齡 (歲)</label>
                <input
                  id="input-age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="如: 35"
                  className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 focus:bg-slate-600 focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent outline-none transition-all font-bold text-white text-lg placeholder:text-slate-500"
                />
              </div>
              <div className="group">
                <label htmlFor="input-height" className="block text-sm font-bold text-slate-300 mb-2">身高 (cm)</label>
                <input
                  id="input-height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="如: 170"
                  className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 focus:bg-slate-600 focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent outline-none transition-all font-bold text-white text-lg placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="group">
                <label htmlFor="input-weight" className="block text-sm font-bold text-slate-300 mb-2">目前體重 (kg)</label>
                <input
                  id="input-weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="如: 75"
                  className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 focus:bg-slate-600 focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent outline-none transition-all font-bold text-white text-lg placeholder:text-slate-500"
                />
              </div>
              <div className="group">
                <label htmlFor="input-bodyfat" className="block text-sm font-bold text-slate-300 mb-2">
                    體脂肪率 (%) 
                    <span className="text-xs font-normal text-slate-500 ml-1">選填</span>
                </label>
                <input
                  id="input-bodyfat"
                  type="number"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
                  placeholder="選填 如: 28"
                  className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 focus:bg-slate-600 focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent outline-none transition-all font-bold text-white text-lg placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full py-4 mt-4 bg-gradient-to-r from-[#0891b2] to-[#22d3ee] hover:from-[#0e7490] hover:to-[#0891b2] text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/30 transform active:scale-[0.98] transition-all text-xl flex items-center justify-center gap-2"
          >
            <span role="img" aria-label="計算">⚖️</span> 開始評估
          </button>
        </div>

        {/* 右側：結果顯示區 */}
        {/* SEO 修改：加入 aria-live 通知動態更新 */}
        <div className="lg:col-span-7" aria-live="polite">
          <div className="h-full bg-slate-800/50 rounded-3xl p-6 md:p-8 border border-slate-700 relative overflow-hidden flex flex-col justify-center">
            
            {!result ? (
              <div className="text-center text-slate-400 py-12 flex flex-col items-center">
                <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-600">
                  <span className="text-4xl opacity-50">📋</span>
                </div>
                <h3 className="text-xl font-bold text-slate-300 mb-2">等待數據輸入</h3>
                <p className="max-w-xs mx-auto text-sm opacity-70">了解自己的身體數據，是健康減重的第一步。</p>
              </div>
            ) : (
              <div className="space-y-6 animate-fadeIn z-10 relative">
                
                {/* 1. BMI 主卡片 */}
                {/* SEO 修改：使用 article 強調重要性 */}
                <article className="bg-slate-700 rounded-2xl p-6 shadow-lg border-l-4 border-[#22d3ee]">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-slate-300 font-bold text-sm">您的 BMI 指數</p>
                            <div className="flex items-baseline gap-3 mt-1">
                                <span className="text-5xl font-black text-white tracking-tighter">
                                    {result.bmi}
                                </span>
                                <span className={`text-xl font-bold px-3 py-1 rounded-lg bg-opacity-20 ${getBMIInfo(result.bmiStatus).bg} ${getBMIInfo(result.bmiStatus).color}`}>
                                    {getBMIInfo(result.bmiStatus).text}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* BMI 彩色量表 Bar */}
                    {/* SEO 修改：加入 role="img" 與 aria-label */}
                    <div className="relative pt-4 pb-2" role="img" aria-label={`BMI 量表：您的數值為 ${result.bmi}，處於 ${getBMIInfo(result.bmiStatus).text} 範圍`}>
                        <div className="h-4 w-full rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 relative">
                            {/* 刻度標記 */}
                            <div className="absolute top-0 bottom-0 left-[17.5%] w-0.5 bg-slate-800/30"></div> {/* ~18.5 */}
                            <div className="absolute top-0 bottom-0 left-[45%] w-0.5 bg-slate-800/30"></div> {/* ~24 */}
                            <div className="absolute top-0 bottom-0 left-[60%] w-0.5 bg-slate-800/30"></div> {/* ~27 */}
                        </div>
                        
                        {/* 指標 */}
                        <div 
                            className="absolute top-2 -translate-x-1/2 transition-all duration-700"
                            style={{ left: `${result.bmrPosition}%` }}
                        >
                             <div className="w-4 h-4 bg-white border-4 border-slate-800 rounded-full shadow-lg"></div>
                        </div>
                        
                        <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-medium" aria-hidden="true">
                            <span>過輕</span>
                            <span className="pl-4">正常</span>
                            <span className="pl-2">過重</span>
                            <span>肥胖</span>
                        </div>
                    </div>
                </article>

                {/* 2. 數據網格 (BMR, 理想體重, 體脂) */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700 p-4 rounded-2xl border border-slate-600">
                        <p className="text-xs text-slate-400 font-bold mb-1">基礎代謝率 (BMR)</p>
                        <p className="text-2xl font-bold text-[#22d3ee]">{result.bmr} <span className="text-sm text-slate-500">kcal/日</span></p>
                        <p className="text-[10px] text-slate-500 mt-1">維持生命所需最低熱量</p>
                    </div>
                    <div className="bg-slate-700 p-4 rounded-2xl border border-slate-600">
                        <p className="text-xs text-slate-400 font-bold mb-1">建議理想體重</p>
                        <p className="text-2xl font-bold text-green-400">{result.idealWeight} <span className="text-sm text-slate-500">kg</span></p>
                        <p className="text-[10px] text-slate-500 mt-1">以 BMI 22 為標準</p>
                    </div>
                    
                    {/* 如果有輸入體脂才顯示 */}
                    {result.bodyFatStatus && (
                        <div className="col-span-2 bg-slate-700 p-4 rounded-2xl border border-slate-600 flex justify-between items-center">
                            <div>
                                <p className="text-xs text-slate-400 font-bold mb-1">體脂肪評估</p>
                                <p className={`text-xl font-bold ${
                                    result.bodyFatStatus === 'high' || result.bodyFatStatus === 'very_high' ? 'text-red-400' : 'text-green-400'
                                }`}>
                                    {result.bodyFatStatus === 'low' ? '偏低' : 
                                     result.bodyFatStatus === 'normal' ? '標準' : 
                                     result.bodyFatStatus === 'high' ? '偏高 (隱形肥胖風險)' : '過高'}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl" role="img" aria-hidden="true">
                                    {result.bodyFatStatus === 'normal' ? '💪' : result.bodyFatStatus === 'low' ? '🏃' : '⚠️'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* 3. 醫師評估建議 (保留亮色區塊) */}
                <article className="bg-[#fffbeb] border-2 border-[#fbbf24] rounded-2xl p-6 shadow-md">
                  <h4 className="text-[#b45309] font-bold text-lg mb-3 flex items-center">
                    <span className="bg-[#f59e0b] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2 shadow-sm">!</span>
                    醫師專業建議
                  </h4>
                  <p className="text-[#78350f] leading-relaxed font-medium">
                    {result.bmiStatus === 'normal' ? (
                        <>
                            恭喜！您的體位處於<strong>健康標準範圍</strong>。建議維持目前的飲食與運動習慣。若想進一步雕塑線條，可專注於<strong>增肌訓練</strong>，提高基礎代謝率。
                        </>
                    ) : result.bmiStatus === 'underweight' ? (
                        <>
                            您的體重過輕，可能導致免疫力下降或骨質疏鬆。建議諮詢營養師進行<strong>增重計畫</strong>，攝取優質蛋白質並搭配阻力訓練。
                        </>
                    ) : result.bmiStatus === 'overweight' ? (
                        <>
                            您目前處於<strong>體重過重</strong>階段。這是一個關鍵轉折點！建議開始進行<strong>飲食控制 (高蛋白低碳)</strong> 搭配每週 150 分鐘的有氧運動，即可有效逆轉。
                        </>
                    ) : (
                        <>
                            注意！您已進入<strong>肥胖</strong>區間，這是高血壓、糖尿病的高風險群。建議尋求專業醫療協助，我們可透過<strong>藥物輔助 (如 GLP-1)</strong> 或賀爾蒙調理，幫助您安全且有效地減重。
                        </>
                    )}
                    
                    {/* 體脂過高的額外建議 */}
                    {result.bmiStatus === 'normal' && (result.bodyFatStatus === 'high' || result.bodyFatStatus === 'very_high') && (
                        <span className="block mt-2 pt-2 border-t border-orange-200 text-[#c2410c]">
                            <strong>特別提醒：</strong> 雖然體重正常，但體脂偏高，屬於「泡芙人」體質。請減少精緻澱粉攝取，並務必增加重訓比例。
                        </span>
                    )}
                  </p>
                </article>

              </div>
            )}
            
            {/* 背景裝飾 */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-900/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-10 -left-10 w-32 h-32 bg-cyan-900/20 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}