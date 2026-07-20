// components/ClinicHome.tsx
'use client'

import React, { useState, useEffect } from 'react'

export default function ClinicHome() {
  const [activeTab, setActiveTab] = useState('about')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])

  // 模擬搜尋資料庫 (SEO 內容也可以放在這裡讓爬蟲抓取，但在 React 中我們用 state 管理顯示)
  const searchDatabase = [
    { id: 'prp', title: 'PRP 高純度血小板注射', category: 'treatment' },
    { id: 'shockwave', title: '體外震波治療', category: 'treatment' },
    { id: 'weight', title: '減重門診與瘦瘦筆', category: 'weight-bone' },
    { id: 'bone', title: '兒童骨齡評估', category: 'weight-bone' },
    { id: 'pain', title: '慢性疼痛治療', category: 'treatment' },
    { id: 'knee', title: '膝蓋退化性關節炎', category: 'disease' },
    { id: 'shoulder', title: '五十肩沾黏', category: 'disease' },
  ]

  // 處理搜尋邏輯
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([])
      return
    }
    const results = searchDatabase.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setSearchResults(results)
  }, [searchQuery])

  // 切換 Tab 並滾動到頂部
  const handleTabSwitch = (tabId: string) => {
    setActiveTab(tabId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300 font-sans antialiased selection:bg-cyan-500/30">
      
      {/* --- Header & Navigation --- */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-lg shadow-cyan-900/20">
        <div className="container mx-auto px-3">
          <div className="relative flex items-center justify-between py-2 md:py-3 border-b border-slate-800/50 min-h-[52px] md:min-h-[60px]">
            
            {/* Logo Area */}
            <div 
              className="flex items-center gap-2.5 group cursor-pointer md:absolute md:left-1/2 md:-translate-x-1/2 z-10"
              onClick={() => handleTabSwitch('about')}
            >
              {/* 圖片請填入之後的連結 */}
              <img 
                src="https://duk.tw/iHBaCj.webp" 
                alt="新竹宸新復健科診所 Logo" 
                className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-300"
              />
              <div className="text-left">
                <h1 className="text-base md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 leading-tight">
                  運動教練醫師-林羿辰
                </h1>
                <p className="text-[10px] md:text-xs text-slate-400 tracking-wider leading-none mt-0.5">
                  宸新復健科診所院長
                </p>
              </div>
            </div>

            {/* Social Icons (Hidden on mobile, visible on tablet+) */}
            <div className="flex items-center gap-2 ml-auto z-20">
              <div className="hidden sm:flex items-center gap-2">
                <button 
                  onClick={() => handleTabSwitch('about')} 
                  title="回到首頁" 
                  className="w-8 h-8 rounded-full bg-slate-800 text-cyan-400 border border-cyan-400 flex items-center justify-center text-xs hover:bg-slate-700 transition-colors"
                >
                  <i className="fa-solid fa-house"></i>
                </button>
                <a href="https://www.facebook.com/DrYiChen" target="_blank" className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs hover:scale-110 transition-transform"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/dryichen/" target="_blank" className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center text-xs hover:scale-110 transition-transform"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://youtube.com/@dryichen" target="_blank" className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs hover:scale-110 transition-transform"><i className="fa-brands fa-youtube"></i></a>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="w-full overflow-x-auto py-2 text-center no-scrollbar">
            <ul className="inline-flex justify-center min-w-max gap-1 p-0.5 bg-slate-800/30 rounded-full">
              {[
                { id: 'about', label: '關於我們' },
                { id: 'treatments', label: '治療方式' },
                { id: 'weight-bone', label: '減重與骨齡' },
                { id: 'diseases', label: '疾病衛教' },
              ].map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => handleTabSwitch(tab.id)}
                    className={`px-3.5 py-1.5 md:px-4 md:py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'text-cyan-400 bg-slate-800 border-b-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleTabSwitch('booking')}
                  className={`px-3.5 py-1.5 md:px-4 md:py-2 rounded-full text-sm font-medium transition-all ml-1 ${
                    activeTab === 'booking'
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-[0_0_10px_rgba(236,72,153,0.5)]'
                      : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-[0_0_10px_rgba(236,72,153,0.5)]'
                  }`}
                >
                  <i className="fa-solid fa-calendar-check mr-1"></i> 預約
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow relative">
        
        {/* --- Tab Content: About (關於我們) --- */}
        {activeTab === 'about' && (
          <section className="animate-fade-in space-y-12">
            {/* Doctor Profile */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-slate-800/60 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative min-h-[400px]">
                    {/* 圖片位置 */}
                    <img src="https://duk.tw/UXXvK3.webp" alt="林羿辰醫師" className="absolute inset-0 w-full h-full object-cover object-top opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r"></div>
                  </div>
                  <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center relative z-10">
                    <h2 className="text-4xl font-bold text-white mb-2">林羿辰 <span className="text-xl text-cyan-400">醫師</span></h2>
                    <p className="text-lg text-slate-300 mb-6 border-l-4 border-cyan-500 pl-4">新竹宸新復健科診所院長 | 運動教練醫師</p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">學歷與資格</h3>
                        <ul className="space-y-2 text-slate-300">
                          <li><span className="text-cyan-500 mr-2">▹</span>國立台灣大學醫學系</li>
                          <li><span className="text-cyan-500 mr-2">▹</span>雙專科醫師 (復健專科 + 骨鬆專科)</li>
                          <li><span className="text-cyan-500 mr-2">▹</span>ACE-CPT 美國運動學會國際私人教練認證</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">經歷</h3>
                        <ul className="space-y-2 text-slate-300">
                          <li><span className="text-cyan-500 mr-2">▹</span>馬偕紀念醫院 主治醫師</li>
                          <li><span className="text-cyan-500 mr-2">▹</span>台灣大學網球校隊</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinic Info */}
            <div className="max-w-6xl mx-auto w-full">
               <div className="flex items-center gap-3 mb-6">
                  <span className="bg-cyan-500/20 text-cyan-400 p-3 rounded-lg border border-cyan-500/30"><i className="fa-solid fa-hospital text-xl"></i></span>
                  <h2 className="text-3xl font-bold text-white">診所資訊 <span className="text-slate-500 text-lg font-normal">Clinic Info</span></h2>
              </div>
              
              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 md:p-8 shadow-lg backdrop-blur-sm">
                 <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    <div className="lg:w-5/12 flex-shrink-0">
                        <div className="h-full w-full min-h-[300px] rounded-lg overflow-hidden border border-slate-600 relative">
                             {/* 圖片位置: 診所照片 */}
                            <img src="https://duk.tw/PLVLuz.webp" alt="診所環境" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="lg:w-7/12 flex flex-col">
                        <h3 className="text-3xl font-bold text-white mb-6 border-b border-slate-700 pb-4">新竹市宸新復健科</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h4 className="text-lg font-bold text-cyan-400 mb-3 border-l-4 border-cyan-500 pl-3">診所特色項目</h4>
                                <ul className="space-y-2 text-slate-300 text-base">
                                    <li><span className="text-cyan-500 mr-2">▹</span>醫學中心級數位X光機</li>
                                    <li><span className="text-cyan-500 mr-2">▹</span>頂規高畫質超音波檢查</li>
                                    <li><span className="text-cyan-500 mr-2">▹</span>台大醫師團隊</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-cyan-400 mb-3 border-l-4 border-pink-500 pl-3">診所特色治療</h4>
                                <ul className="space-y-2 text-slate-300 text-base">
                                    <li><span className="text-pink-500 mr-2">▹</span>瑞士進口震波治療</li>
                                    <li><span className="text-pink-500 mr-2">▹</span>高純度血小板再生治療 (PRP)</li>
                                    <li><span className="text-pink-500 mr-2">▹</span>美國進口高能量雷射</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-auto bg-slate-900/40 p-4 rounded-lg border border-slate-700/50">
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <div className="text-slate-200">
                                     <p className="flex items-center gap-2 mb-2"><i className="fa-solid fa-location-dot text-cyan-400"></i> 300新竹市東區光復路一段371號B1</p>
                                     <p className="flex items-center gap-2"><i className="fa-solid fa-phone text-cyan-400"></i> (03) 564-7999</p>
                                </div>
                                <a href="https://goo.gl/maps/placeholder" target="_blank" className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all text-sm font-medium whitespace-nowrap">
                                    <i className="fa-solid fa-map-location-dot mr-1"></i> Google 地圖
                                </a>
                            </div>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          </section>
        )}

        {/* --- Tab Content: Treatments (治療方式) --- */}
        {activeTab === 'treatments' && (
          <section className="animate-fade-in max-w-6xl mx-auto">
             <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-500 pl-4">專業治療項目</h2>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['PRP 增生療法', '體外震波治療', '高能量雷射', '徒手物理治療', '運動治療', '超音波導引注射'].map((item, idx) => (
                    <div key={idx} className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all cursor-pointer group">
                        <div className="h-40 bg-slate-700/50 rounded-lg mb-4 flex items-center justify-center text-slate-500">
                           {/* 圖片位置 */}
                           <span className="text-sm">圖片: {item}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{item}</h3>
                        <p className="text-slate-400 text-sm mt-2">提供專業的{item}服務，針對疼痛源頭進行精準治療。</p>
                    </div>
                ))}
             </div>
          </section>
        )}

        {/* --- Tab Content: Weight & Bone (減重與骨齡) --- */}
        {activeTab === 'weight-bone' && (
          <section className="animate-fade-in max-w-6xl mx-auto">
             <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-500 pl-4">減重與兒童生長</h2>
             <div className="grid md:grid-cols-2 gap-8">
                 <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl">
                     <h3 className="text-2xl font-bold text-white mb-4">科學減重門診</h3>
                     {/* 圖片位置 */}
                     <div className="h-64 bg-slate-700/30 rounded-xl mb-6 flex items-center justify-center">圖片: 減重示意圖</div>
                     <ul className="space-y-3 text-slate-300">
                         <li className="flex items-center"><i className="fa-solid fa-check text-green-500 mr-2"></i> InBody 身體組成分析</li>
                         <li className="flex items-center"><i className="fa-solid fa-check text-green-500 mr-2"></i> 醫師處方藥物 (瘦瘦筆/口服藥)</li>
                         <li className="flex items-center"><i className="fa-solid fa-check text-green-500 mr-2"></i> 運動處方規劃</li>
                     </ul>
                 </div>
                 <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl">
                     <h3 className="text-2xl font-bold text-white mb-4">兒童骨齡與生長</h3>
                     {/* 圖片位置 */}
                     <div className="h-64 bg-slate-700/30 rounded-xl mb-6 flex items-center justify-center">圖片: 骨齡X光示意圖</div>
                     <p className="text-slate-300 mb-4">把握孩子黃金生長與發育期，透過左手掌 X 光片精準評估骨骼年齡。</p>
                     <button onClick={() => handleTabSwitch('booking')} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full transition-colors">預約評估</button>
                 </div>
             </div>
          </section>
        )}

        {/* --- Tab Content: Diseases (疾病衛教) - New --- */}
        {activeTab === 'diseases' && (
          <section className="animate-fade-in max-w-6xl mx-auto">
             <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-cyan-500 pl-4">常見疾病衛教</h2>
             <div className="grid md:grid-cols-3 gap-6">
                {['頸椎與腰椎退化', '五十肩與旋轉肌', '網球肘/高爾夫球肘', '膝蓋退化性關節炎', '足底筋膜炎', '運動傷害'].map((disease, idx) => (
                    <div key={idx} className="bg-slate-800/40 border border-slate-700 p-5 rounded-lg hover:bg-slate-800 transition-all">
                        <h4 className="text-lg font-bold text-cyan-400 mb-2">{disease}</h4>
                        <p className="text-slate-400 text-sm">點擊查看關於 {disease} 的詳細症狀與治療建議。</p>
                    </div>
                ))}
             </div>
          </section>
        )}

        {/* --- Tab Content: Booking (預約) --- */}
        {activeTab === 'booking' && (
           <section className="animate-fade-in">
              <div className="flex items-center gap-3 mb-8 justify-center">
                  <span className="bg-pink-500/20 text-pink-400 p-3 rounded-lg border border-pink-500/30"><i className="fa-solid fa-calendar-check text-xl"></i></span>
                  <h2 className="text-3xl font-bold text-white">馬上預約 <span className="text-slate-500 text-lg font-normal">Book Now</span></h2>
              </div>
              <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
                  {/* Android */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center hover:border-green-500/50 transition-all group">
                      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20">
                          <i className="fa-brands fa-android text-3xl text-green-500"></i>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Android 下載</h3>
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://bit.ly/2Q8FdeK`} alt="Android QR" className="w-40 h-40 mx-auto mb-4 rounded-lg bg-white p-2" />
                      <a href="http://bit.ly/2Q8FdeK" target="_blank" className="inline-block px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm">點擊下載</a>
                  </div>
                  {/* iOS */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all group">
                      <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/20">
                          <i className="fa-brands fa-apple text-3xl text-blue-500"></i>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">iOS 下載</h3>
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://apple.co/2vZfRsH`} alt="iOS QR" className="w-40 h-40 mx-auto mb-4 rounded-lg bg-white p-2" />
                      <a href="https://apple.co/2vZfRsH" target="_blank" className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm">點擊下載</a>
                  </div>
                  {/* Line */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center hover:border-green-400/50 transition-all group">
                      <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-400/20">
                          <i className="fa-brands fa-line text-3xl text-green-400"></i>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Line 預約</h3>
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://lin.ee/FHj3mIs`} alt="Line QR" className="w-40 h-40 mx-auto mb-4 rounded-lg bg-white p-2" />
                      <a href="https://lin.ee/FHj3mIs" target="_blank" className="inline-block px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg text-sm">加入好友</a>
                  </div>
              </div>
           </section>
        )}

        {/* --- Visual Navigation (快速導覽圖) --- */}
        <section className="mt-16 pt-12 border-t border-slate-800">
            <h2 className="text-2xl font-bold text-white text-center mb-8 tracking-wide">
                <span className="text-cyan-400">快速</span>導覽
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
                {[
                  { title: '治療方式', id: 'treatments', img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=800' },
                  { title: '減重與骨齡', id: 'weight-bone', img: 'https://duk.tw/R97hvw.webp' },
                  { title: '預約看診', id: 'booking', img: '/* 圖片路徑 */' }, // 圖片空白
                  { title: '關於我們', id: 'about', img: '/* 圖片路徑 */' },   // 圖片空白
                ].map((item, idx) => (
                  <div key={idx} onClick={() => handleTabSwitch(item.id)} className="cursor-pointer group rounded-xl relative h-40 overflow-hidden shadow-lg border border-slate-700 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
                      {item.img.startsWith('http') ? (
                         <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                         <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-600">圖片待補</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent flex items-end p-4">
                          <span className="text-white font-bold group-hover:text-cyan-400 transition-colors">{item.title}</span>
                      </div>
                  </div>
                ))}
            </div>
        </section>

        {/* --- Search & Footer Area --- */}
        <section className="max-w-5xl mx-auto mt-16 mb-8">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-8 shadow-2xl">
                
                {/* Site Search */}
                <div className="mb-10">
                    <h3 className="text-xl font-bold text-white mb-4"><i className="fa-solid fa-magnifying-glass text-cyan-400 mr-2"></i> 站內搜尋</h3>
                    <div className="relative">
                        <input 
                          type="text" 
                          placeholder="輸入關鍵字搜尋疾病或治療方式 (例如: 膝蓋, 震波)" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 pl-12 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        />
                        <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                    </div>
                    
                    {/* Search Results Display */}
                    {searchQuery && (
                      <div className="mt-4 space-y-2">
                        {searchResults.length > 0 ? (
                          searchResults.map((res) => (
                            <div key={res.id} onClick={() => handleTabSwitch(res.category)} className="bg-slate-700/50 p-3 rounded cursor-pointer hover:bg-slate-600 transition-colors border border-slate-600 flex justify-between items-center">
                               <span className="font-bold text-cyan-400">{res.title}</span>
                               <span className="text-xs text-slate-400"><i className="fa-solid fa-arrow-right"></i> 前往</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-slate-500 text-sm p-2">查無相關結果，請嘗試其他關鍵字。</div>
                        )}
                      </div>
                    )}
                </div>

                {/* Footer Info & Stats */}
                <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-slate-700">
                    <div className="flex flex-col justify-center gap-4">
                         <h3 className="text-2xl font-bold text-white">追蹤我們</h3>
                         <div className="flex gap-3 items-center flex-wrap">
                            {/* Social Links Here (Same as header) */}
                            <a href="#" className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110"><i className="fa-brands fa-facebook-f"></i></a>
                            {/* ... more icons ... */}
                         </div>
                         <div className="flex items-center gap-2 mt-2">
                            <i className="fa-solid fa-eye text-cyan-400 text-xl"></i>
                            <span className="text-xl font-bold text-white">累計瀏覽:</span>
                            {/* Visitor Counter Placeholder */}
                            <span id="busuanzi_container_site_pv" className="text-xl font-bold text-white font-mono">
                               <span id="busuanzi_value_site_pv">--</span>
                            </span>
                         </div>
                    </div>
                    <div className="text-left md:text-right flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-white mb-2">宸新復健科診所</h3>
                        <p className="text-slate-300">300新竹市東區光復路一段371號B1</p>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center">
          <p className="text-slate-500 text-xs">
              © 2024 宸新復健科診所 林羿辰醫師. All Rights Reserved.<br/>
              <span className="text-slate-600">本網站內容僅供衛教參考，不能取代專業醫師診斷。</span>
          </p>
      </footer>
    </div>
  )
}