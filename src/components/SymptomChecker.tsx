'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { diseaseCategories } from '@/data/diseases';

// ✨ 引入所需的 React Icons，確保 AI 分析介面圖示穩定顯示
import { 
  FaRobot, 
  FaSpinner, 
  FaMagnifyingGlass, 
  FaPaperPlane, 
  FaXmark, 
  FaClipboardCheck, 
  FaFileMedical, 
  FaArrowRight, 
  FaCircleExclamation 
} from "react-icons/fa6"; // 使用 fa6 版本更接近您原本的樣式

// 定義回傳資料的型別
interface AIResult {
  recommendedIds: string[];
  externalSuggestions: string[];
  urgent?: boolean;
}

// 定義要存入 Storage 的資料結構
const STORAGE_KEY = 'ai_symptom_cache';

function parseAIResult(value: unknown): AIResult | null {
  if (!value || typeof value !== 'object') return null;

  const candidate = value as Record<string, unknown>;
  if (!Array.isArray(candidate.recommendedIds) || !Array.isArray(candidate.externalSuggestions)) {
    return null;
  }

  if (
    !candidate.recommendedIds.every((id) => typeof id === 'string') ||
    !candidate.externalSuggestions.every((name) => typeof name === 'string')
  ) {
    return null;
  }

  return {
    recommendedIds: candidate.recommendedIds,
    externalSuggestions: candidate.externalSuggestions,
    urgent: candidate.urgent === true,
  };
}

export default function SymptomChecker() {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const formRef = useRef<HTMLFormElement>(null);
  const requestInFlightRef = useRef(false);

  // ============================================================
  // 💾 新增功能 1：組件載入時，檢查有沒有「暫存結果」
  // ============================================================
  useEffect(() => {
    try {
        const cachedData = sessionStorage.getItem(STORAGE_KEY);
        if (cachedData) {
            const parsed = JSON.parse(cachedData);
            const cachedResult = parseAIResult(parsed.result);
            if (
                typeof parsed.input === 'string' &&
                cachedResult &&
                (cachedResult.recommendedIds.length > 0 || cachedResult.externalSuggestions.length > 0)
            ) {
                setInput(parsed.input);
                setResult(cachedResult);
                setIsExpanded(true); 
            }
        }
    } catch (e) {
        console.error("讀取暫存失敗", e);
    }
  }, []);

  // 點擊外部自動收合
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node) && !input.trim()) {
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [input]);

  const handleManualSubmit = async () => {
    if (!input.trim() || requestInFlightRef.current) return;
    requestInFlightRef.current = true;
    setLoading(true);
    setResult(null);
    setErrorMessage(null);
    setIsExpanded(true); 
    sessionStorage.removeItem(STORAGE_KEY);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 50_000);

    try {
      const res = await fetch('/api/ai-triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptom: input }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error || 'AI 服務目前無法使用');
      }

      const parsedResult = parseAIResult(data);
      if (!parsedResult) throw new Error('AI 回傳格式異常，請稍後再試');
      
      setResult(parsedResult);

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
          input: input,
          result: parsedResult
      }));

    } catch (error) {
      const message =
        error instanceof DOMException && error.name === 'AbortError'
          ? '分析等待時間過長，請稍後再試'
          : error instanceof Error
            ? error.message
            : 'AI 服務目前無法使用';
      setErrorMessage(message);
    } finally {
      window.clearTimeout(timeoutId);
      requestInFlightRef.current = false;
      setLoading(false);
    }
  };

  const handleClear = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); 
    setResult(null); 
    setErrorMessage(null);
    setInput(''); 
    setIsExpanded(false);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const getRecommendedItems = () => {
    if (!result?.recommendedIds) return [];
    const foundItems: any[] = [];

    result.recommendedIds.forEach(targetId => {
      for (const category of diseaseCategories) {
        const match = category.diseases?.find(d => d.id === targetId || d.slug === targetId);
        if (match) {
          foundItems.push({
            ...match,
            categorySlug: category.slug 
          });
          break;
        }
      }
    });
    return foundItems;
  };

  const internalCards = getRecommendedItems();
  const externalDiagnoses = result?.externalSuggestions || [];
  const hasAnyResult = internalCards.length > 0 || externalDiagnoses.length > 0;

  return (
    <div className="w-full max-w-3xl mx-auto transition-all duration-300">
      
      {/* 輸入區塊 */}
      <form 
        ref={formRef}
        onClick={() => {
            setIsExpanded(true);
            const textarea = formRef.current?.querySelector('textarea');
            if (textarea) textarea.focus();
        }}
        onSubmit={(e) => {
            e.preventDefault(); 
            handleManualSubmit();
        }} 
        className={`relative group bg-slate-800 border-2 transition-all duration-300 ease-in-out
          ${isExpanded 
            ? 'rounded-2xl border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.3)]' 
            : 'rounded-full border-cyan-400/70 shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]'
          }`}
      >
        <div className="absolute left-4 top-4 text-cyan-400 pointer-events-none z-10 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
          {loading ? <FaSpinner className="animate-spin text-xl" /> : <FaRobot className="text-xl" />}
        </div>

        <textarea
          value={input}
          maxLength={1000}
          onFocus={() => setIsExpanded(true)}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              if (!loading && input.trim()) {
                handleManualSubmit();
              }
            }
          }}
          placeholder={isExpanded ? "請簡短重點輸入症狀，越有辨識度越好，如內側外側，合併麻或是舉不起來等。（例如：膝蓋內側疼痛，手掌麻等）..." : "AI 症狀分析 (點擊輸入)"}
          
          className={`w-full bg-transparent text-slate-200 placeholder-slate-400 focus:outline-none resize-none py-4 pl-12 leading-relaxed transition-all duration-300 relative z-0
            ${isExpanded 
                ? 'h-40 pr-4 pb-14 overflow-y-auto whitespace-pre-wrap'
                : 'h-14 pr-12 overflow-hidden whitespace-nowrap'
            }`}
        />

        <div className={`absolute right-2 z-20 transition-all duration-300 
            ${isExpanded ? 'bottom-3 right-3' : 'top-2'}`}
        >
            <button
            type="button" 
            onClick={(e) => {
                e.stopPropagation(); 
                handleManualSubmit(); 
            }}
            disabled={loading || !input.trim()}
            className={`bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-all flex items-center justify-center shadow-lg
                ${isExpanded ? 'px-6 py-2 rounded-lg text-sm' : 'w-10 h-10 rounded-full'}`}
            >
            {isExpanded ? (
              <>分析 <FaPaperPlane className="ml-2" /></>
            ) : (
              <FaMagnifyingGlass />
            )}
            </button>
        </div>
      </form>

      {errorMessage && (
        <div
          role="alert"
          className="mt-4 flex items-center rounded-xl border border-red-500/40 bg-red-950/40 px-5 py-4 text-red-200"
        >
          <FaCircleExclamation className="mr-3 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 結果顯示區 */}
      {result && (
        <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 relative">
             <button onClick={handleClear} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
                <FaXmark className="text-xl" />
             </button>

            <div className="mb-6 border-b border-slate-700/50 pb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                    <h3 className="text-cyan-400 font-bold text-xl flex items-center shrink-0">
                        <FaClipboardCheck className="mr-2" />
                        AI初步診斷
                    </h3>
                    <div className="text-slate-400 text-sm font-normal bg-slate-900/40 px-3 py-1.5 rounded-lg border border-slate-700/50 inline-block w-fit">
                        (⚠️ 僅供參考，請務必由醫師親自評估。)
                    </div>
                </div>
            </div>

            {hasAnyResult ? (
                <div className="flex flex-col gap-3">
                    
                    {internalCards.map((item) => (
                    <Link 
                        key={item.id} 
                        href={`/diseases/${item.categorySlug}/${item.slug || item.id}`} 
                        className="flex items-center justify-between bg-slate-900/60 hover:bg-slate-700 p-5 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all group"
                    >
                        <div className="flex-grow min-w-0 mr-4">
                            <h4 className="text-slate-200 text-xl font-bold truncate group-hover:text-cyan-400 flex items-center">
                              <FaFileMedical className="text-slate-500 mr-3 group-hover:text-cyan-400 text-lg" />
                              {item.title}
                            </h4>
                        </div>
                        <div className="flex-shrink-0">
                            <span className="text-sm font-medium text-cyan-500 flex items-center bg-cyan-500/10 px-4 py-2 rounded-lg group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                              閱讀全文 <FaArrowRight className="ml-2 text-xs" />
                            </span>
                        </div>
                    </Link>
                    ))}

                    {externalDiagnoses.map((diseaseName, index) => (
                        <div 
                            key={`ext-${index}`}
                            className="flex items-center justify-between bg-slate-800/40 p-5 rounded-xl border border-dashed border-slate-600 cursor-default"
                        >
                            <div className="flex-grow min-w-0">
                                <h4 className="text-slate-300 text-xl font-bold flex items-center">
                                  <FaCircleExclamation className="text-amber-500/80 mr-3 text-lg" />
                                  {diseaseName}
                                  <span className="ml-3 text-xs text-slate-500 font-normal bg-slate-700/50 px-2 py-1 rounded">
                                    {result?.urgent ? '請立即就醫' : '本站尚無文章'}
                                  </span>
                                </h4>
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <div className="text-center py-4 text-slate-500">
                    <p>AI 暫時無法判定您的症狀，建議直接諮詢醫師。</p>
                </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}
