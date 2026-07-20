'use client';

import React, { useState } from 'react';

// =====================================================================
// 資料庫區 (100% 完整 8 道食譜與 DRIs)
// =====================================================================
const nutrientData: Record<string, any> = {
  '1-3': { protein: { boy: '20g', girl: '20g' }, calcium: { boy: '500mg', girl: '500mg' }, vitaminD: { boy: '10µg', girl: '10µg' }, zinc: { boy: '5.5mg', girl: '5.5mg' }, magnesium: { boy: '80mg', girl: '80mg' }, vitaminK: { boy: '30µg', girl: '30µg' }, folate: { boy: '170µg', girl: '170µg' } },
  '4-6': { protein: { boy: '30g', girl: '30g' }, calcium: { boy: '600mg', girl: '600mg' }, vitaminD: { boy: '10µg', girl: '10µg' }, zinc: { boy: '8mg', girl: '7mg' }, magnesium: { boy: '120mg', girl: '120mg' }, vitaminK: { boy: '55µg', girl: '55µg' }, folate: { boy: '200µg', girl: '200µg' } },
  '7-9': { protein: { boy: '40g', girl: '40g' }, calcium: { boy: '800mg', girl: '800mg' }, vitaminD: { boy: '10µg', girl: '10µg' }, zinc: { boy: '10mg', girl: '8mg' }, magnesium: { boy: '170mg', girl: '170mg' }, vitaminK: { boy: '60µg', girl: '60µg' }, folate: { boy: '250µg', girl: '250µg' } },
  '10-12': { protein: { boy: '55g', girl: '50g' }, calcium: { boy: '1000mg', girl: '1000mg' }, vitaminD: { boy: '10µg', girl: '10µg' }, zinc: { boy: '13mg', girl: '10mg' }, magnesium: { boy: '230mg', girl: '230mg' }, vitaminK: { boy: '80µg', girl: '70µg' }, folate: { boy: '300µg', girl: '300µg' } },
  '13-15': { protein: { boy: '70g', girl: '60g' }, calcium: { boy: '1200mg', girl: '1000mg' }, vitaminD: { boy: '10µg', girl: '10µg' }, zinc: { boy: '15mg', girl: '12mg' }, magnesium: { boy: '350mg', girl: '320mg' }, vitaminK: { boy: '110µg', girl: '90µg' }, folate: { boy: '400µg', girl: '400µg' } },
  '16-18': { protein: { boy: '75g', girl: '55g' }, calcium: { boy: '1200mg', girl: '1000mg' }, vitaminD: { boy: '10µg', girl: '10µg' }, zinc: { boy: '15mg', girl: '12mg' }, magnesium: { boy: '360mg', girl: '320mg' }, vitaminK: { boy: '120µg', girl: '90µg' }, folate: { boy: '400µg', girl: '400µg' } }
};

const recipes = [
  { category: 'protein', title: '藜麥鮮蔬蒸雞肉', description: '藜麥含完全蛋白質，搭配雞胸肉與多彩蔬菜，提供長高所需的精胺酸與纖維。', ingredients: ['雞胸肉丁 150g', '熟藜麥 2大匙', '玉米筍/紅蘿蔔丁', '少許鹽麴'], steps: '雞肉用鹽麴抓醃，拌入藜麥與蔬菜丁，放入電鍋蒸熟即可。' },
  { category: 'protein', title: '牛肉菠菜厚蛋燒', description: '牛肉富含鐵與鋅，菠菜提供葉酸，蛋是優質蛋白，適合早餐或點心。', ingredients: ['雞蛋 3顆', '牛絞肉 50g', '菠菜碎 少許', '牛奶 20ml'], steps: '牛絞肉炒香。蛋液混合牛奶與菠菜，倒入鍋中半凝固時撒上牛肉捲起。' },
  { category: 'calcium', title: '高鈣黑豆芝麻漿', description: '植物性鈣質的冠軍組合，香氣濃育，適合乳糖不耐的孩子。', ingredients: ['熟黑豆 1杯', '黑芝麻粉 2大匙', '無糖豆漿 200ml'], steps: '將所有材料放入果汁機打勻，可視喜好微加熱。' },
  { category: 'calcium', title: '小魚乾海帶芽味噌湯', description: '經典日式家常湯，小魚乾與豆腐雙重補鈣，海帶芽補充碘。', ingredients: ['小魚乾 1把', '嫩豆腐 1盒', '乾燥海帶芽', '味噌'], steps: '水滾後放入小魚乾熬湯，加入豆腐與海帶芽，熄火前溶入味噌。' },
  { category: 'auxiliary', title: '鮮蝦腰果快炒 (鋅)', description: '蝦仁與腰果都是鋅的良好來源，能促進食慾與生長激素運作。', ingredients: ['蝦仁 10隻', '無調味腰果 1把', '甜豆莢', '蒜片'], steps: '爆香蒜片，放入蝦仁與甜豆莢快炒，起鍋前拌入腰果。' },
  { category: 'auxiliary', title: '芭樂奇異果優格飲 (C)', description: '高維生素C水果組合，幫助膠原蛋白合成，鞏固骨骼結構。', ingredients: ['芭樂 半顆', '奇異果 1顆', '無糖優格 1杯', '蜂蜜'], steps: '水果切塊，與優格一同攪打，富含益生菌與維生素C。' },
  { category: 'auxiliary', title: '南瓜鴻喜菇燉飯 (A/D)', description: '菇類含維生素D，南瓜富含維生素A，守護骨骼與視力。', ingredients: ['南瓜泥', '鴻喜菇', '雞腿肉', '白飯', '牛奶'], steps: '炒香雞肉與菇類，加入南瓜泥與牛奶燉煮，拌入米飯收汁。' },
  { category: 'protein', title: '毛豆鮭魚飯糰', description: '鮭魚Omega-3抗發炎，毛豆是植物蛋白之王，適合活動後補充。', ingredients: ['熟鮭魚碎', '燙熟毛豆仁', '海苔酥', '白飯'], steps: '將所有食材拌勻，捏成圓形或三角形飯糰。' }
];

export default function GrowthNutritionCalculator() {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');
  const [conditions, setConditions] = useState({ isPicky: false, isVegetarian: false, isAllergic: false, isHighActivity: false });
  const [allergyText, setAllergyText] = useState('');
  const [recipeFilter, setRecipeFilter] = useState('all');
  const [result, setResult] = useState<any>(null);

  const handleGenerate = () => {
    const ageNum = parseInt(age);
    if (!ageNum || ageNum < 1 || ageNum > 18) {
      alert('請輸入 1-18 歲之間的年齡');
      return;
    }
    const range = ageNum <= 3 ? '1-3' : ageNum <= 6 ? '4-6' : ageNum <= 9 ? '7-9' : ageNum <= 12 ? '10-12' : ageNum <= 15 ? '13-15' : '16-18';
    setResult({ age: ageNum, gender, rec: nutrientData[range], conditions, allergyText });
  };

  const filteredRecipes = recipeFilter === 'all' ? recipes : recipes.filter(r => r.category === recipeFilter);

  return (
    <article className="space-y-8">
      {/* Header Section */}
      <header className="text-center mb-8 relative">
        <h1 className="text-3xl md:text-4xl font-bold text-[#fffbeb] pb-2 px-4">兒童長高營養指南</h1>
        <p className="text-[#fcd34d] mt-2 text-lg font-medium opacity-90 hidden md:block">結合醫師專業建議與數據，為孩子計算每日需求與食譜。</p>
      </header>

      {/* 1. 基本檔案輸入 (還原原始 Checkbox 樣式) */}
      <section aria-label="基本資料輸入" className="bg-[#fffbeb] border-2 border-[#fbbf24] rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-[#b45309] border-b-2 border-[#fcd34d] pb-3 mb-6 flex items-center">
          <span className="bg-[#f59e0b] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
          建立孩子的基本檔案
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6 text-[#92400e]">
            <label className="block text-base font-bold mb-1">孩子的年齡 (1-18歲)</label>
            <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} className="w-full rounded-xl border-2 border-[#fbbf24] p-4 text-[#78350f] outline-none" placeholder="例如：10" />
            <span className="block text-base font-bold mt-4 mb-2">生理性別</span>
            <div className="flex gap-4">
              <button onClick={()=>setGender('boy')} className={`flex-1 py-3.5 rounded-xl border-2 font-bold ${gender==='boy'?'bg-[#fcd34d] border-[#b45309] text-[#78350f] ring-2 ring-[#fcd34d]':'bg-white text-amber-500'}`}>👦 男孩</button>
              <button onClick={()=>setGender('girl')} className={`flex-1 py-3.5 rounded-xl border-2 font-bold ${gender==='girl'?'bg-[#fcd34d] border-[#b45309] text-[#78350f] ring-2 ring-[#fcd34d]':'bg-white text-amber-500'}`}>👧 女孩</button>
            </div>
          </div>
          <div>
            <h3 className="block text-base font-bold text-[#92400e] mb-3">飲食習慣與特殊狀況</h3>
            <div className="grid grid-cols-2 gap-3">
              {['isPicky', 'isAllergic', 'isHighActivity'].map((k: any) => (
                <label key={k} className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${(conditions as any)[k] ? 'bg-[#fff7ed] border-[#b45309]' : 'bg-white border-transparent'}`}>
                  <input type="checkbox" checked={(conditions as any)[k]} onChange={(e)=>setConditions({...conditions,[k]:e.target.checked})} className="h-5 w-5 text-[#b45309]" />
                  <span className="ml-2 font-medium text-[#92400e]">{k==='isPicky'?'愛挑食':k==='isAllergic'?'食物過敏':'高活動量'}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <button onClick={handleGenerate} className="w-full mt-8 bg-[#b45309] text-white py-4 rounded-full font-bold text-lg">✨ 生成專屬營養建議</button>
      </section>

      {/* 2. 運算結果區 */}
      {result && (
        <section className="bg-white border-2 border-[#e2e8f0] rounded-2xl p-6 md:p-8 shadow-lg animate-fadeIn text-[#0e7490]">
          <h2 className="text-2xl font-bold text-center mb-6">{result.age}歲{result.gender==='boy'?'男孩':'女孩'}的目標數據</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#f0f9ff] p-5 border-l-4 border-[#0891b2] rounded-lg">
              <h3 className="font-bold mb-3">📊 核心營養</h3>
              <p>蛋白質: {result.rec.protein[result.gender]}</p>
              <p>鈣質: {result.rec.calcium[result.gender]}</p>
              <p>維生素 D: {result.rec.vitaminD[result.gender]}</p>
            </div>
            <div className="bg-[#f0f9ff] p-5 border-l-4 border-[#0891b2] rounded-lg font-bold">
              <h3 className="mb-3">💊 微量元素</h3>
              <p>鋅: {result.rec.zinc[result.gender]}</p>
              <p>鎂: {result.rec.magnesium[result.gender]}</p>
            </div>
          </div>
        </section>
      )}

      {/* 3. 衛教資訊 (100% 完整說明) */}
      <section className="bg-[#fffbeb] border-2 border-[#fbbf24] rounded-2xl p-6 md:p-8 shadow-lg text-[#92400e]">
        <h2 className="text-xl md:text-2xl font-bold border-b-2 border-[#fcd34d] pb-3 mb-6 flex items-center">
          <span className="bg-[#f59e0b] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
          解密長高的營養密碼
        </h2>
        <div className="space-y-6">
          <div>
            <strong className="text-[#b45309] text-lg block mb-2">1. 長高黃金金三角：生長的基礎建材</strong>
            <p className="mb-3">蛋白質、鈣質、維生素 D 是長高絕對不可或缺的基礎：</p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 list-none p-0 text-center font-bold">
              <li className="bg-white p-3 rounded-lg border border-[#fcd34d] text-[#dc2626]">蛋白質 (肌肉/生長激素)</li>
              <li className="bg-white p-3 rounded-lg border border-[#fcd34d] text-[#dc2626]">鈣質 (骨骼硬度)</li>
              <li className="bg-white p-3 rounded-lg border border-[#fcd34d] text-[#dc2626]">維生素 D (鈣質搬運)</li>
            </ul>
          </div>
          <div className="border-t border-[#fcd34d]/50 pt-6">
            <strong className="text-[#0891b2] text-lg block mb-4">2. 成長加速器：不可或缺的輔助隊友</strong>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0">
              <li><strong>鋅：</strong>催化細胞分裂與蛋白質合成，是生長激素運作的點火器。推薦：蛤蜊、紅肉。</li>
              <li><strong>鎂：</strong>放鬆神經、引導深層睡眠，掌握夜晚生長激素分泌高峰。推薦：菠菜、堅果。</li>
              <li><strong>魚油 (Omega-3)：</strong>降低體內微發炎，穩定發育環境。推薦：鮭魚、鯖魚、核桃。</li>
              <li><strong>維生素 A / K2 / 葉酸：</strong>調節骨代謝、修復 DNA，守護生長原動力。</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. 食譜資料庫 (還原選取與篩選功能) */}
      <section className="bg-[#fffbeb] border-2 border-[#fbbf24] rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-[#b45309] border-b-2 border-[#fcd34d] pb-3 mb-6 flex items-center">
          <span className="bg-[#f59e0b] text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
          長高食譜資料庫
        </h2>

        {/* 篩選 Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'all', label: '全部食譜' },
            { id: 'protein', label: '💪 優質蛋白' },
            { id: 'calcium', label: '🥛 高鈣強骨' },
            { id: 'auxiliary', label: '🥗 營養神隊友' }
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setRecipeFilter(tab.id)}
              className={`py-2 px-5 rounded-full text-sm font-bold border-2 transition-all ${recipeFilter===tab.id ? 'bg-[#b45309] text-white border-[#b45309] shadow-md':'bg-white text-[#92400e] border-[#fcd34d] hover:bg-amber-50'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 8 道完整食譜卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((r, idx) => (
            <article key={idx} className="bg-white rounded-2xl p-6 border-2 border-[#fcd34d]/50 shadow-sm hover:shadow-xl transition-all flex flex-col h-full">
              <h3 className="text-lg font-bold text-[#b45309] mb-2">{r.title}</h3>
              <p className="text-sm text-slate-600 mb-4 flex-grow italic">{r.description}</p>
              <div className="space-y-2 border-t border-amber-100 pt-4 text-xs text-[#b45309]">
                <p><strong>食材：</strong>{r.ingredients.join('、')}</p>
                <p className="text-slate-500"><strong>步驟：</strong>{r.steps}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}