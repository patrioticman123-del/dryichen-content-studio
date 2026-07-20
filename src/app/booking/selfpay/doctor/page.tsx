'use client';

import React, { useState, useEffect } from 'react';

type SlotStatus = 'open' | 'reserved';
type SlotSettings = Record<string, SlotStatus>;

const normalizeSlotSettings = (value: unknown): SlotSettings => {
  const parsed = typeof value === 'string' ? JSON.parse(value) : value;
  if (Array.isArray(parsed)) {
    return parsed.reduce<SlotSettings>((slots, time) => {
      if (typeof time === 'string') slots[time] = 'open';
      return slots;
    }, {});
  }
  if (parsed && typeof parsed === 'object') {
    return Object.entries(parsed as Record<string, unknown>).reduce<SlotSettings>((slots, [time, status]) => {
      if (status === 'open' || status === 'reserved') slots[time] = status;
      return slots;
    }, {});
  }
  return {};
};

export default function DoctorAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState<'list' | 'settings'>('list');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
  
  const [filterDate, setFilterDate] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  // 🌟 新增：月份選擇狀態
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  
  const [activeSlots, setActiveSlots] = useState<SlotSettings>({});
  const [allSchedules, setAllSchedules] = useState<Record<string, SlotSettings>>({});
  const [isListLoading, setIsListLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  
  // 日曆月份控制狀態
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const slotsData = {
    morning: [{v:"09:00", t:"09:00 AM"}, {v:"09:30", t:"09:30 AM"}, {v:"10:00", t:"10:00 AM"}, {v:"10:30", t:"10:30 AM"}, {v:"11:00", t:"11:00 AM"}, {v:"11:30", t:"11:30 AM"}],
    afternoon: [{v:"14:00", t:"02:00 PM"}, {v:"14:30", t:"02:30 PM"}, {v:"15:00", t:"03:00 PM"}, {v:"15:30", t:"03:30 PM"}, {v:"16:00", t:"04:00 PM"}, {v:"16:30", t:"04:30 PM"}],
    evening: [{v:"18:00", t:"06:00 PM"}, {v:"18:30", t:"06:30 PM"}, {v:"19:00", t:"07:00 PM"}, {v:"19:30", t:"07:30 PM"}, {v:"20:00", t:"08:00 PM"}, {v:"20:30", t:"08:30 PM"}]
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
      fetchConfiguredDates();
      
      const now = new Date();
      const offset = now.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(now.getTime() - offset)).toISOString().split('T')[0];
      setSelectedDate(localISOTime);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedDate && isAuthenticated) {
      loadDoctorSettingsForDate(selectedDate);
    }
  }, [selectedDate, isAuthenticated]);

  // 🌟 新增：當 appointments, filterDate 或 selectedMonth 改變時，自動重新計算過濾清單
  useEffect(() => {
    applyFilters(appointments);
  }, [appointments, filterDate, selectedMonth]);

  // 🌟 新增：統一的過濾邏輯（包含特定日期、特定月份、以及預設近30天）
  const applyFilters = (allAppointments: any[]) => {
    if (filterDate) {
      // 1. 如果有選取左側日曆的特定一天
      setFilteredAppointments(allAppointments.filter((a: any) => a.date === filterDate));
    } else if (selectedMonth) {
      // 2. 如果有選取特定月份 (格式為 "YYYY-MM")
      setFilteredAppointments(allAppointments.filter((a: any) => a.date && a.date.startsWith(selectedMonth)));
    } else {
      // 3. 如果都沒有選取，預設跳出近 30 天的預約資訊（從今天算起 30 天內）
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const thirtyDaysLater = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
      
      const fallbackList = allAppointments.filter((a: any) => {
        if (!a.date) return false;
        const appDate = new Date(a.date);
        return appDate >= today && appDate <= thirtyDaysLater;
      });
      setFilteredAppointments(fallbackList);
    }
  };

  const fetchAppointments = async () => {
    setIsListLoading(true);
    try {
      const res = await fetch(`/api/reserve?action=getAllAppointments`);
      const data = await res.json();
      const list = data.list || [];
      setAppointments(list);
      applyFilters(list);
    } catch (err) {
      console.error(err);
    } finally {
      setIsListLoading(false);
    }
  };

  const fetchConfiguredDates = async () => {
    try {
      const res = await fetch(`/api/doctor-settings`);
      const data = await res.json();
      if (data && data.success) {
        const schedules = Object.entries(data.settings || {}).reduce<Record<string, SlotSettings>>((result, [date, slots]) => {
          result[date] = normalizeSlotSettings(slots);
          return result;
        }, {});
        setAllSchedules(schedules);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadDoctorSettingsForDate = async (dateStr: string) => {
    try {
      const res = await fetch(`/api/doctor-settings`);
      const data = await res.json();
      if (data && data.success) {
        const schedules = data.settings || {};
        setActiveSlots(normalizeSlotSettings(schedules[dateStr] || {}));
      }
    } catch (err) {
      console.error("載入特定日期排班失敗:", err);
    }
  };

  const handleFilterDateChangeDirect = (dateStr: string) => {
    setFilterDate(dateStr);
    // 點選左側特定日期時，清除月份選取，以單日查閱為主
    if (dateStr !== '') {
      setSelectedMonth('');
    }
  };

  const handleSlotToggle = (timeText: string) => {
    setActiveSlots(current => {
      const currentStatus = current[timeText];
      if (currentStatus === 'open') return { ...current, [timeText]: 'reserved' };
      if (currentStatus === 'reserved') {
        const { [timeText]: _, ...remaining } = current;
        return remaining;
      }
      return { ...current, [timeText]: 'open' };
    });
  };

  const handleGroupSelectAll = (groupKey: 'morning' | 'afternoon' | 'evening', isChecked: boolean) => {
    const groupTexts = slotsData[groupKey].map(item => item.t);
    if (isChecked) {
      setActiveSlots(current => groupTexts.reduce<SlotSettings>((slots, time) => ({ ...slots, [time]: 'open' }), current));
    } else {
      setActiveSlots(current => Object.fromEntries(Object.entries(current).filter(([time]) => !groupTexts.includes(time))) as SlotSettings);
    }
  };

  const saveDoctorSettings = async () => {
    if (!selectedDate) { alert('請先選擇維護日期！'); return; }
    
    const inputPass = prompt("🏥 變更自費排班設定安全管制：\n請輸入授權金鑰密碼以確認儲存：");
    if (inputPass !== '7999') {
      alert("❌ 安全金鑰錯誤，排班未儲存更新！");
      return;
    }

    setIsSaveLoading(true);
    try {
      const response = await fetch('/api/doctor-settings', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, timeSlots: activeSlots }) 
      });
      const res = await response.json();
      if (res.success || response.ok) {
        fetchConfiguredDates();
      } else {
        alert('同步未成功：' + (res.error || '後端異常'));
      }
    } catch (err) {
      alert('同步失敗，請檢查網路連線或確定 API 設定無誤。');
    } finally {
      setIsSaveLoading(false);
    }
  };

  const handleCancelAppointment = async (appointment: any, idx: number) => {
    const inputPass = prompt(`⚠️ 確定要取消【${appointment.name}】的這筆預約嗎？\n請輸入授權金鑰密碼以確認：`);
    if (inputPass === null) return; 
    
    if (inputPass !== '7999') {
      alert("❌ 安全金鑰錯誤，無法取消預約！");
      return;
    }

    try {
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'cancelAppointment',
          id: appointment.id
        })
      });
      const res = await response.json();
      if (res.success || response.ok) {
        alert('🎉 已成功取消該病患之預約，該時段已重新釋出。');
        setExpandedRows(prev => ({ ...prev, [idx]: false }));
        fetchAppointments();
      } else {
        alert('取消失敗：' + (res.error || '後端異常'));
      }
    } catch (err) {
      alert('網路或連線失敗，請稍後再試。');
    }
  };

  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const todayStr = (new Date(now.getTime() - offset)).toISOString().split('T')[0];
  
  const dashboardDate = activeTab === 'list' ? (filterDate || todayStr) : (selectedDate || todayStr);
  const dashboardPatientCount = appointments.filter(a => a.date === dashboardDate).length;
  
  const getOpenSlotsCountForDate = (dateStr: string) => {
    const raw = allSchedules[dateStr];
    if (!raw) return 0;
    return Object.values(raw).filter(status => status === 'open').length;
  };

  const dashboardOpenSlotsCount = activeTab === 'settings' && dashboardDate === selectedDate 
    ? Object.values(activeSlots).filter(status => status === 'open').length
    : getOpenSlotsCountForDate(dashboardDate);

  const renderCalendarWidget = (type: 'list' | 'settings') => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-1"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateObj = new Date(year, month, i);
      const dateStr = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000).toISOString().split('T')[0];
      
      const isPast = dateStr < todayStr;
      const isSelected = type === 'list' ? filterDate === dateStr : selectedDate === dateStr;
      
      const hasPatients = appointments.some(a => a.date === dateStr);
      const hasConfiguredSlots = getOpenSlotsCountForDate(dateStr) > 0;

      let boxCustomClass = '';
      if (!isSelected && !isPast) {
        if (type === 'settings' && hasConfiguredSlots) {
          boxCustomClass = 'after:absolute after:inset-1 after:border-2 after:border-emerald-500 after:bg-emerald-50/20 after:rounded-lg';
        } else if (type === 'list' && hasPatients) {
          boxCustomClass = 'after:absolute after:inset-1 after:border-2 after:border-cyan-600 after:bg-cyan-50/20 after:rounded-lg';
        }
      }

      days.push(
        <button
          key={i}
          type="button"
          disabled={isPast}
          onClick={() => {
            if (type === 'list') {
              handleFilterDateChangeDirect(dateStr);
            } else {
              setSelectedDate(dateStr);
            }
          }}
          className={`mx-auto flex flex-col items-center justify-center font-bold transition-all relative select-none
            h-9 w-9 text-xs rounded-lg
            sm:h-10 sm:w-10 sm:text-sm sm:rounded-lg
            ${isSelected ? 'bg-teal-600 text-white shadow scale-105 !border-none after:hidden' : 
              isPast ? 'text-slate-300 opacity-20 cursor-not-allowed bg-transparent !border-none after:hidden' : 
              `text-slate-700 hover:bg-slate-200 ${boxCustomClass}`
            }
          `}
        >
          <span className="relative z-10">{i}</span>
        </button>
      );
    }
    return days;
  };

  const formatMobileDate = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) return `${parts[1]}-${parts[2]}`;
    return dateStr;
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        body, html, main, #__next, .flex-grow { background-color: #f8fafc !important; }
      `}} />

      <main className="max-w-6xl mx-auto p-4 md:py-6 md:px-10 space-y-5 text-base md:text-lg">
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch justify-between">
          <div className="flex items-center justify-center md:justify-end min-w-[200px] order-1 md:order-2">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'list' ? 'settings' : 'list')}
              className="w-full md:w-auto px-8 py-4 md:py-5 rounded-2xl text-base font-black text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {activeTab === 'list' ? <>⚙️ 切換至：時段設定</> : <>📋 切換至：預約名單</>}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-6 flex-grow order-2 md:order-1">
            <div className="bg-white border border-slate-200 p-3 md:p-6 rounded-2xl flex justify-between items-center shadow-sm">
              <div>
                <p className="text-[11px] md:text-sm font-bold text-slate-500 mb-1">({dashboardDate}) 本日就診</p>
                <h4 className="text-xl md:text-3xl font-black text-slate-900">{dashboardPatientCount} 人次</h4>
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-3 md:p-6 rounded-2xl flex justify-between items-center shadow-sm">
              <div>
                <p className="text-[11px] md:text-sm font-bold text-slate-500 mb-1">({dashboardDate}) 開放時段</p>
                <h4 className="text-xl md:text-3xl font-black text-slate-900">{dashboardOpenSlotsCount} 個</h4>
              </div>
            </div>
          </div>
        </div>

        {activeTab === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900">1. 選擇查閱報表日期</h3>
                <p className="text-xs text-slate-400 mt-1">過去無預約日期已反灰；<span className="text-cyan-600 font-bold">藍色方框</span>代表有病患特約登記</p>
              </div>
              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/60">
                <div className="flex items-center justify-between mb-4">
                  <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="text-slate-500 hover:text-teal-600 font-bold p-1">◀</button>
                  <span className="font-black text-sm text-slate-800">{currentMonth.getFullYear()}年 {currentMonth.getMonth() + 1}月</span>
                  <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="text-slate-500 hover:text-teal-600 font-bold p-1">▶</button>
                </div>
                <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
                  {['日','一','二','三','四','五','六'].map(d => <div key={d} className="font-bold text-slate-400 pb-1">{d}</div>)}
                  {renderCalendarWidget('list')}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-slate-500">查閱日期：</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-cyan-600 bg-cyan-50 px-3 py-1 rounded-lg border border-cyan-200">{filterDate || "全部顯示"}</span>
                  {filterDate && <button type="button" onClick={() => handleFilterDateChangeDirect('')} className="text-xs text-rose-500 hover:underline font-bold">重置全部</button>}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
              <div className="p-4 md:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base md:text-xl font-bold text-slate-900 mb-1">即時自費特約報表</h2>
                  <p className="text-xs text-slate-500">
                    {filterDate ? `已選擇單日：${filterDate}` : selectedMonth ? `目前顯示：${selectedMonth} 月分預約` : '預設顯示：近 30 天預約名單'}
                  </p>
                </div>
                {/* 🌟 新增：選取月份的 UI 控制項 */}
                <div className="flex items-center gap-2">
                  <label className="text-xs font-black text-slate-600 whitespace-nowrap">選擇月份：</label>
                  <input 
                    type="month" 
                    value={selectedMonth}
                    onChange={(e) => {
                      setSelectedMonth(e.target.value);
                      setFilterDate(''); // 切換月份時，清除單日篩選
                    }}
                    className="text-xs font-bold p-2 bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:border-teal-500"
                  />
                  {selectedMonth && (
                    <button 
                      type="button" 
                      onClick={() => setSelectedMonth('')} 
                      className="text-xs text-rose-500 hover:underline font-bold whitespace-nowrap"
                    >
                      清除
                    </button>
                  )}
                </div>
              </div>

              <div className="w-full">
                <table className="w-full table-fixed">
                  <thead className="bg-slate-100 text-slate-700 text-xs md:text-sm font-black border-b border-slate-200">
                    <tr>
                      <th className="p-3 md:p-5 text-left w-[24%] sm:w-[25%]">日期</th>
                      <th className="p-3 md:p-5 text-left w-[26%] sm:w-[25%]">時間</th>
                      <th className="p-3 md:p-5 text-left w-[22%] sm:w-[25%]">姓名</th>
                      <th className="p-3 md:p-5 text-left w-[28%] sm:w-[25%]">手機</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs md:text-sm text-slate-700">
                    {isListLoading ? (
                      <tr><td colSpan={4} className="p-10 text-center text-lg text-slate-400 font-bold">資料讀取中...</td></tr>
                    ) : filteredAppointments.length > 0 ? (
                      filteredAppointments.map((r, idx) => {
                        const rawLineId = r.line_user_id || r.lineUserId;
                        const isLineBooking = rawLineId && rawLineId !== '未關聯' && rawLineId !== '';

                        return (
                          <React.Fragment key={idx}>
                            <tr onClick={() => setExpandedRows(prev => ({...prev, [idx]: !prev[idx]}))} className="hover:bg-slate-50 cursor-pointer transition text-left">
                              <td className="p-3 md:p-5 font-bold text-slate-600 break-all flex flex-col sm:flex-row sm:items-center gap-1">
                                {isLineBooking && (
                                  <span className="inline-block bg-emerald-100 text-emerald-700 border border-emerald-300 rounded px-1 py-0.5 text-[10px] font-black tracking-tighter whitespace-nowrap sm:mr-1">
                                    LINE
                                  </span>
                                )}
                                <span className="inline sm:hidden">{formatMobileDate(r.date)}</span>
                                <span className="hidden sm:inline">{r.date}</span>
                              </td>
                              <td className="p-3 md:p-5 break-all">
                                <span className="bg-teal-50 text-teal-600 border border-teal-200 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-lg font-black text-[11px] sm:text-sm inline-block">
                                  {r.time || r.time_slot}
                                </span>
                              </td>
                              <td className={`p-3 md:p-5 font-black text-sm sm:text-base break-all ${isLineBooking ? 'text-emerald-600' : 'text-slate-900'}`}>
                                ▼&nbsp;{r.name}
                              </td>
                              <td className="p-3 md:p-5 text-slate-700 font-mono font-bold text-sm sm:text-base break-all">{r.phone}</td>
                            </tr>
                            
                            {expandedRows[idx] && (
                              <tr className="bg-slate-50/50">
                                <td colSpan={4} className="p-2 sm:p-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm w-full shadow-sm">
                                    
                                    <div className="md:col-span-2 w-full">
                                      <span className="font-black text-slate-400 block mb-1 text-xs">病患 LINE 實名暱稱：</span>
                                      <span className="text-emerald-700 block bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-200 font-bold break-all">
                                        {(() => {
                                          if (r.line_display_name || r.lineDisplayName) {
                                            return `👤 暱稱：${r.line_display_name || r.lineDisplayName}`;
                                          }
                                          const rawLineStr = r.line_user_id || r.lineUserId || '';
                                          if (rawLineStr.includes('_')) {
                                            const parts = rawLineStr.split('_');
                                            return `👤 暱稱：${parts[1]}`;
                                          }
                                          if (isLineBooking) {
                                            return `👤 暱稱：${rawLineStr}`;
                                          }
                                          return '未綁定/無紀錄';
                                        })()}
                                      </span>
                                    </div>
                                    <div className="w-full">
                                      <span className="font-black text-slate-400 block mb-1 text-xs">電子郵件：</span>
                                      <span className="text-slate-700 block bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-bold break-all whitespace-pre-wrap">{r.email || '無'}</span>
                                    </div>
                                    <div className="w-full">
                                      <span className="font-black text-slate-400 block mb-1 text-xs">看診不適部位：</span>
                                      <span className="text-teal-600 font-black block bg-teal-50 p-2.5 rounded-lg border border-slate-200 break-all whitespace-pre-wrap">{r.part || '無'}</span>
                                    </div>
                                    <div className="md:col-span-2 w-full">
                                      <span className="font-black text-slate-400 block mb-1 text-xs">發生主訴原因：</span>
                                      <div className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 font-medium leading-relaxed break-all whitespace-pre-wrap text-justify">{r.reason || '無'}</div>
                                    </div>
                                    <div className="md:col-span-2 w-full">
                                      <span className="font-black text-slate-400 block mb-1 text-xs">過去病史與放射治療史：</span>
                                      <div className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 font-medium block leading-relaxed break-all whitespace-pre-wrap text-justify">{r.treatment || '無'}</div>
                                    </div>

                                    <div className="md:col-span-2 border-t border-slate-100 pt-4 mt-2 flex justify-end">
                                      <button
                                        type="button"
                                        onClick={() => handleCancelAppointment(r, idx)}
                                        className="px-5 py-2.5 text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 active:bg-rose-700 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
                                      >
                                        ❌ 取消此筆特約預約
                                      </button>
                                    </div>

                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <tr><td colSpan={4} className="p-12 text-center text-slate-400 text-base font-bold bg-white">當前選定條件查無特約登記明細。</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 space-y-8 shadow-xl">
            <h2 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-4">調整自費排班門診診期</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <label className="block text-slate-600 font-black text-sm mb-4">1. 選定維護日期</label>
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="text-slate-500 hover:text-teal-600 font-bold p-1">◀</button>
                    <span className="font-black text-sm text-slate-800">{currentMonth.getFullYear()}年 {currentMonth.getMonth() + 1}月</span>
                    <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="text-slate-500 hover:text-teal-600 font-bold p-1">▶</button>
                  </div>
                  <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
                    {['日','一','二','三','四','五','六'].map(d => <div key={d} className="font-bold text-slate-400 pb-1">{d}</div>)}
                    {renderCalendarWidget('settings')}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">目前選定維護：</span>
                  <span className="text-sm font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200">{selectedDate || "請選擇"}</span>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-bold leading-relaxed text-amber-800">時段依序點選：一般開放 → 保留（病患端顯示「已預約」）→ 不開放。</p>
                <label className="block text-slate-500 font-black text-sm">2. 勾選當日特約診次時段</label>
                {['morning', 'afternoon', 'evening'].map((group) => {
                  const groupKey = group as 'morning' | 'afternoon' | 'evening';
                  const groupTexts = slotsData[groupKey].map(item => item.t);
                  const isAllGroupSelected = groupTexts.every(t => activeSlots[t] === 'open');

                  return (
                    <div key={group} className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">
                          {group === 'morning' ? '☀️ 上午診 (09:00 AM - 11:30 AM)' : group === 'afternoon' ? '⛅ 下午診 (02:00 PM - 04:30 PM)' : '🌙 晚上診 (06:00 PM - 08:30 PM)'}
                        </h3>
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-black text-teal-600 hover:text-teal-700 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-sm transition-all select-none">
                          <input type="checkbox" checked={isAllGroupSelected && groupTexts.length > 0} onChange={(e) => handleGroupSelectAll(groupKey, e.target.checked)} className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer" />
                          <span>一鍵全選</span>
                        </label>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {slotsData[groupKey].map(item => {
                          const status = activeSlots[item.t];
                          const isOpen = status === 'open';
                          const isReserved = status === 'reserved';
                          return (
                            <button key={item.v} type="button" onClick={() => handleSlotToggle(item.t)} className={`flex min-h-[76px] flex-col items-center justify-center p-3.5 border-2 rounded-xl cursor-pointer text-sm font-black transition-all ${isOpen ? 'bg-teal-50 border-teal-500 text-teal-600 shadow-sm' : isReserved ? 'bg-amber-50 border-amber-400 text-amber-700 shadow-sm' : 'border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:border-slate-400'}`}>
                              <span>{item.t}</span>
                              <span className="mt-1 text-[11px]">{isOpen ? '一般開放' : isReserved ? '保留／已預約' : '不開放'}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pt-6 border-t border-slate-200 mt-8">
              <button onClick={saveDoctorSettings} disabled={isSaveLoading} className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-black py-5 rounded-2xl shadow-lg transition-all disabled:from-slate-300 disabled:to-slate-300 text-lg tracking-widest">
                {isSaveLoading ? "同步排班數據中..." : "儲存同步此日期開放時段"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
