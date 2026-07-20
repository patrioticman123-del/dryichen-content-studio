'use client';

import React, { useState, useEffect } from 'react';
// import { Metadata } from 'next'; // 在 'use client' 中通常不直接 export metadata，但保留您的 import
import JsonLd from '@/components/JsonLd';
import ScrollAnimation from '@/components/ScrollAnimation';
import Link from 'next/link';
import Image from 'next/image';

type SlotStatus = 'open' | 'reserved';
type SlotSettings = Record<string, SlotStatus>;

const getSlotStartMinutes = (slot: string) => {
  const match = slot.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return Number.MAX_SAFE_INTEGER;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3]?.toUpperCase();

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

const groupSlotsByTime = (slots: string[]) => {
  const morning: string[] = [];
  const afternoon: string[] = [];
  const evening: string[] = [];

  slots.forEach(slot => {
    const startMinutes = getSlotStartMinutes(slot);
    if (startMinutes < 12 * 60) morning.push(slot);
    else if (startMinutes < 18 * 60) afternoon.push(slot);
    else evening.push(slot);
  });

  return [morning, afternoon, evening].filter(group => group.length > 0);
};

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

import { 
  FaCalendarCheck, 
  FaUser, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFileAlt, 
  FaHistory, 
  FaSearch, 
  FaTrashAlt, 
  FaLine,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaLock,
  FaCalendarAlt
} from "react-icons/fa";

const LINE_CLIENT_ID = "2010496335";
const SITE_URL = "https://dryichen.com.tw"; // 確保常數存在

// --- Schema 資料更新 (強化 SEO/GEO：專攻新竹、預約制、自費復健) ---

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "宸新復健科診所環境與服務介紹 - 林羿辰院長｜新竹預約制自費復健推薦",
  "description": "由台大復健專科林羿辰醫師創立，提供新竹民眾專業的 PRP增生療法、震波治療、兒童早療及專屬預約制自費復健門診服務。",
  "thumbnailUrl": [
    "https://i.ytimg.com/vi/asqbvbEukOM/maxresdefault.jpg"
  ],
  "uploadDate": "2026-01-25T08:00:00+08:00",
  "duration": "PT1M30S", 
  "contentUrl": "https://www.youtube.com/watch?v=asqbvbEukOM",
  "embedUrl": "https://www.youtube.com/embed/asqbvbEukOM",
  "keywords": "新竹復健科, 預約制門診, 自費復健, PRP注射, 震波治療, 林羿辰醫師",
  "publisher": {
    "@type": "Organization",
    "name": "宸新復健科診所",
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/images/logo.webp`,
      "width": 600,
      "height": 60
    }
  }
};

const medicalClinicSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  '@id': `${SITE_URL}/booking/selfpay#webpage`,
  'url': `${SITE_URL}/booking/selfpay`,
  'name': '新竹自費復健科推薦-預約制特約門診掛號｜林羿辰醫師｜宸新復健科診所',
  'description': '新竹宸新復健科診所提供專屬預約制自費門診，由台大復健科專科林羿辰院長親自看診。提供高解析超音波導引PRP注射、震波治療、一對一運動治療等自費復健服務，免除久候，享受完整詳細的醫療評估。',
  'datePublished': '2026-01-25T08:00:00+08:00',
  'dateModified': '2026-04-23T16:00:00+08:00',
  'publisher': {
    '@type': 'Organization',
    'name': '宸新復健科診所',
    'logo': {
      '@type': 'ImageObject',
      'url': `${SITE_URL}/images/logo.webp`
    }
  },
  'mainEntity': {
    '@type': 'MedicalClinic',
    '@id': `${SITE_URL}/#clinic`,
    'name': '宸新復健科診所',
    'alternateName': '林羿辰醫師自費復健診所',
    'description': '新竹專屬預約制復健科，由林羿辰院長親自看診，提供PRP注射、震波治療、一對一運動治療等專業自費復健服務。',
    'image': `${SITE_URL}/images/main/b.webp`,
    'logo': `${SITE_URL}/images/logo.webp`,
    'url': SITE_URL,
    'telephone': '+886-3-564-7999',
    'priceRange': '$$$', // 突顯自費與高品質門診定位
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '光復路一段371號B1',
      'addressLocality': '新竹市',
      'addressRegion': '東區',
      'postalCode': '300',
      'addressCountry': 'TW',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '24.7833314', 
      'longitude': '121.0170937'
    },
    'sameAs': [
      "https://www.facebook.com/DrYiChen", 
      "https://www.instagram.com/dryichen/",
      "https://www.threads.net/@dryichen",
      "https://youtube.com/@dryichen"
    ],
    'openingHoursSpecification': [
      { '@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], 'opens': '09:00', 'closes': '21:30' },
      { '@type': 'OpeningHoursSpecification', 'dayOfWeek': 'Saturday', 'opens': '09:00', 'closes': '12:00' }
    ],
    'medicalSpecialty': [
      'https://schema.org/Physiotherapy',  
      'https://schema.org/Pediatric'
    ],
    'knowsAbout': [
      'Orthopaedic', 
      'Sports Medicine', 
      'Pain Management',
      'Physical Medicine and Rehabilitation',
      'Prolotherapy', // 增生療法
      'Regenerative Medicine' // 再生醫學(自費核心)
    ],
    // 💡 新增 MakesOffer：精確鎖定「預約制」與「自費門診」的服務架構
    'makesOffer': [
      {
        '@type': 'Offer',
        'name': '特約自費門診 (健保身分)',
        'description': '專屬預約制復健科門診，每次25分鐘完整評估，包含詳細高解析度超音波檢查與精準治療規劃，免除現場排隊久候。',
        'price': '1000',
        'priceCurrency': 'TWD',
        'availability': 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        'name': '特約自費門診 (非健保身分)',
        'description': '針對無台灣健保身分之外籍或自費病患提供之專屬預約制門診，含完整醫療評估與諮詢。',
        'price': '1500',
        'priceCurrency': 'TWD',
        'availability': 'https://schema.org/InStock'
      }
    ],
    'employee': {
      '@type': ['Person', 'Physician'], 
      'name': '林羿辰',
      'jobTitle': '院長',
      'image': `${SITE_URL}/images/main/a.webp`,
      'gender': 'http://schema.org/Male',
      'url': `${SITE_URL}/about/doctors`,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '光復路一段371號B1',
        'addressLocality': '新竹市',
        'addressRegion': '東區',
        'postalCode': '300',
        'addressCountry': 'TW',
      },
      'alumniOf': { 
        '@type': 'EducationalOrganization', 
        'name': '國立台灣大學醫學系' 
      },
      'medicalSpecialty': [
        'https://schema.org/Physiotherapy',  
        'https://schema.org/Pediatric'
      ],
      'knowsAbout': [
        'Physical Medicine and Rehabilitation',
        'Sports Medicine',
        'Prolotherapy',
        'PRP Injection'
      ],
      'sameAs': [
        'https://ma.mohw.gov.tw/Accessibility/DOCSearch/DOCBasicData?DOC_SEQ=2bJQOvvE5EX3U6eK7eSvhw%253D%253D',
        'https://www.pmr.org.tw/associator/associator-all.asp?w/',
        'https://www.toa1997.org.tw/orthopedist/?n=%E6%9E%97%E7%BE%BF%E8%BE%B0&h=&c=&a='
      ],
      'hasCredential': [
        {
          '@type': 'EducationalOccupationalCredential',
          'name': '醫事人員執業資格',
          'credentialCategory': '醫師證書',
          'url': 'https://ma.mohw.gov.tw/Accessibility/DOCSearch/DOCBasicData?DOC_SEQ=2bJQOvvE5EX3U6eK7eSvhw%253D%253D',
          'recognizedBy': {
            '@type': 'Organization',
            'name': '中華民國衛生福利部'
          }
        },
        {
          '@type': 'EducationalOccupationalCredential',
          'name': '復健科專科醫師資格',
          'credentialCategory': '復健科專科醫師證書',
          'url': 'https://www.pmr.org.tw/associator/associator-all.asp?w/',
          'recognizedBy': {
            '@type': 'Organization',
            'name': '台灣復健醫學會'
          }
        },
        {
          '@type': 'EducationalOccupationalCredential',
          'name': '骨質疏鬆症學會專科醫師資格',
          'credentialCategory': '骨質疏鬆症學會專科醫師證書',
          'url': 'https://www.toa1997.org.tw/orthopedist/?n=%E6%9E%97%E7%BE%BF%E8%BE%B0&h=&c=&a=',
          'recognizedBy': {
            '@type': 'Organization',
            'name': '中華民國骨質疏鬆症學會'
          }
        }
      ]
    },
    'hasMap': 'https://maps.google.com/',
    'areaServed': [
      { '@type': 'City', 'name': '新竹市' },
      { '@type': 'Place', 'name': '新竹科學園區' },
      {
        '@type': 'Place',
        'name': '關埔重劃區',
        'geo': {
            '@type': 'GeoCircle',
            'geoMidpoint': {
                '@type': 'GeoCoordinates',
                'latitude': '24.7833314',
                'longitude': '121.0170937'
            },
            'geoRadius': '5000'
        }
      },
      { '@type': 'City', 'name': '竹北市' },
      { '@type': 'AdministrativeArea', 'name': '新竹縣' }
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.6',
      'reviewCount': '706',
      'bestRating': '5',
      'worstRating': '1'
    },
    'potentialAction': {
      '@type': 'ReserveAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://reg.forcestar.com.tw/appointment/7/reserve',
        'inLanguage': 'zh-TW',
        'actionPlatform': [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
          'http://schema.org/IOSPlatform',
          'http://schema.org/AndroidPlatform'
        ]
      },
      'result': {
        '@type': 'Reservation',
        'name': '特約自費門診網路掛號'
      }
    }
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
  {
    "@type": "Question",
    "name": "新竹宸新復健科診所的「特約自費門診」與一般健保門診有何不同？",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "本診所的特約自費門診採「全預約制」，由林羿辰院長親自進行每次 25 分鐘的完整評估與看診。免除一般健保門診的長時間排隊候診，並提供更深度的超音波檢查、PRP增生療法、震波治療及個人化運動治療建議，專為需要高隱私與精緻醫療服務的新竹民眾設計。"
    }
  },
  {
    "@type": "Question",
    "name": "如何預約林羿辰醫師的自費復健門診？",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "您可以透過本網頁的線上預約掛號系統，完成 LINE 帳號綁定後，即可直接查看並選擇開放的專屬時段進行預約。因特約自費門診時段有限，建議提早預約。"
    }
  },
  {
    "@type": "Question",
    "name": "請問宸新復健科診所好停車嗎？有無障礙設施嗎？",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "有的，宸新復健科診所備有專屬平面停車位供看診民眾使用，解決您在新竹市區找車位的困擾。此外，診所全區設有完善的無障礙空間，無論是行動不便的長輩或使用輪椅的患者，都能輕鬆進出就診。"
    }
  }, {
    "@type": "Question",
    "name": "林羿辰醫師的治療有什麼特色？什麼是「運動教練醫師」？",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "林羿辰院長同時擁有復健專科與骨鬆專科雙執照，並考取美國 ACE-CPT 私人教練證照。治療特色是「醫學結合訓練」，除了使用高解析超音波導引進行 PRP 增生療法或震波治療外，更會指導正確發力模式，從根源預防運動傷害復發。"
    }
  }, {
    "@type": "Question",
    "name": "看診需要預約嗎？可以現場掛號嗎？",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "為了節省您的寶貴時間並享有高品質看診，強烈建議使用網路預約掛號我們的自費門診。一般門診雖接受現場掛號，但預約民眾享有優先看診權益。您可以透過官網預約按鈕或官方 LINE 完成掛號。"
    }
  }]
};

export default function SelfPayBookingPage() {
  const [activeTab, setActiveTab] = useState<'booking' | 'query'>('booking');
  const [lineUserId, setLineUserId] = useState<string>('');
  
  const [lineDisplayName, setLineDisplayName] = useState<string>('');
  const [linePictureUrl, setLinePictureUrl] = useState<string>('');
  
  const [cachedSchedule, setCachedSchedule] = useState<Record<string, SlotSettings>>({});
  const [allAppointments, setAllAppointments] = useState<any[]>([]); 
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [displaySlots, setDisplaySlots] = useState<string[]>([]);
  const [successfulBooking, setSuccessfulBooking] = useState<{ date: string; time: string } | null>(null);
  const [injuryCause, setInjuryCause] = useState('');
  const [imagingStatus, setImagingStatus] = useState('');
  const [imagingTypes, setImagingTypes] = useState<string[]>([]);
  const [otherImaging, setOtherImaging] = useState('');
  const [discomfortDuration, setDiscomfortDuration] = useState('');
  const [treatmentHistory, setTreatmentHistory] = useState<string[]>([]);
  
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', part: '', reason: '', treatment: ''
  });

  const [queryPhone, setQueryPhone] = useState('');
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // 1. 本機記憶載入：初始化時檢查是否有上次預約成功留下的姓名與電話
  useEffect(() => {
    const savedName = localStorage.getItem('saved_booking_name');
    const savedPhone = localStorage.getItem('saved_booking_phone');
    if (savedName || savedPhone) {
      setFormData(prev => ({
        ...prev,
        name: savedName || prev.name,
        phone: savedPhone || prev.phone
      }));
    }
  }, []);

  // 1. 雲端記憶載入：當成功取得 lineUserId 時，若本機沒有記憶，則向後端調閱歷史資料帶入
  useEffect(() => {
    if (lineUserId) {
      fetch(`/api/reserve?action=query&type=line&value=${lineUserId}`)
        .then(res => res.json())
        .then(data => {
          if (data.list && data.list.length > 0) {
            const sorted = data.list.sort((a: any, b: any) => b.date.localeCompare(a.date));
            const latest = sorted[0];
            setFormData(prev => ({
              ...prev,
              name: prev.name || latest.name || '',
              phone: prev.phone || latest.phone || ''
            }));
          }
        })
        .catch(err => console.error("無法載入歷史預約資料", err));
    }
  }, [lineUserId]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); 

    if (code) {
      const redirectUri = "https://dryichen.com.tw/booking/selfpay";
      
      fetch(`/api/auth/line?code=${code}&redirectUri=${encodeURIComponent(redirectUri)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            localStorage.setItem('saved_line_user_id', data.lineUserId);
            if (data.displayName) localStorage.setItem('saved_line_display_name', data.displayName);
            if (data.pictureUrl) localStorage.setItem('saved_line_picture_url', data.pictureUrl);
            
            setLineUserId(data.lineUserId);
            if (data.displayName) setLineDisplayName(data.displayName);
            if (data.pictureUrl) setLinePictureUrl(data.pictureUrl);
            
            window.history.replaceState({}, '', window.location.pathname);
          } else {
            alert(`❌ LINE 綁定通訊失敗！\n【錯誤診斷】：${data.line_error || data.error || '後端通訊異常'}\n\n請檢查後端 Channel Secret 是否填寫正確。`);
            window.history.replaceState({}, '', window.location.pathname);
          }
        })
        .catch(err => {
          alert('網路連線中斷，無法與內部驗證 API 取得聯絡。');
        });
    } else {
      const savedId = localStorage.getItem('saved_line_user_id');
      const savedName = localStorage.getItem('saved_line_display_name');
      const savedPic = localStorage.getItem('saved_line_picture_url');
      
      if (savedId) {
        setLineUserId(savedId);
        if (savedName) setLineDisplayName(savedName);
        if (savedPic) setLinePictureUrl(savedPic);
      }
    }

    fetch(`/api/doctor-settings`)
      .then(res => res.json())
      .then(settingsRes => {
        if (settingsRes && settingsRes.success) {
          const schedules = Object.entries(settingsRes.settings || {}).reduce<Record<string, SlotSettings>>((result, [date, slots]) => {
            result[date] = normalizeSlotSettings(slots);
            return result;
          }, {});
          setCachedSchedule(schedules);
        }
        const todayISO = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];
        return fetch(`/api/reserve?action=getAllAppointments&startDate=${todayISO}`);
      })
      .then(res => res ? res.json() : null)
      .then(aptRes => {
        if (aptRes && aptRes.success) {
          setAllAppointments(aptRes.list || []);
        }
      })
      .catch(err => console.error("非同步數據流載入異常", err));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const available = getAvailableSlots(selectedDate);
      const activeFiltered = available.filter(slot => !isSlotExpired(slot));
      setDisplaySlots(activeFiltered);
    }
  }, [selectedDate, cachedSchedule, allAppointments]);

  useEffect(() => {
    if (lineUserId && activeTab === 'query') {
      runQuery('line', lineUserId);
    }
  }, [lineUserId, activeTab]);

  const handleLineAuthRedirect = () => {
    const redirectUri = "https://dryichen.com.tw/booking/selfpay";
    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LINE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&state=selfPayVerify&scope=profile&bot_prompt=normal`;
  };

  const handleUnbindLine = () => {
    if (!confirm('確定要解除綁定此 LINE 帳號嗎？\n解除後將鎖定預約日曆，需重新綁定才能預約。')) return;
    
    localStorage.removeItem('saved_line_user_id');
    localStorage.removeItem('saved_line_display_name');
    localStorage.removeItem('saved_line_picture_url');
    setLineUserId('');
    setLineDisplayName('');
    setLinePictureUrl('');
    
    alert('已成功解除 LINE 帳號綁定。');
    window.location.reload();
  };

  // 修改：改為回傳所有排定的時段，不再剔除已被預約的時段
  const getAvailableSlots = (dateStr: string) => {
    return Object.keys(cachedSchedule[dateStr] || {}).sort(
      (a, b) => getSlotStartMinutes(a) - getSlotStartMinutes(b) || a.localeCompare(b)
    );
  };

  const isSlotExpiredForDate = (dateStr: string, slotText: string) => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const todayStr = new Date(now.getTime() - offset).toISOString().split('T')[0];
    
    if (dateStr !== todayStr) return false;

    const timePart = slotText.split(' ')[0]; 
    const ampm = slotText.split(' ')[1];     
    let [hours, minutes] = timePart.split(':').map(Number);
    
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;

    const slotTargetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
    const timeDifferenceInMs = slotTargetTime.getTime() - now.getTime();
    const oneHourInMs = 60 * 60 * 1000;

    return timeDifferenceInMs < oneHourInMs;
  };

  const isSlotExpired = (slotText: string) => isSlotExpiredForDate(selectedDate, slotText);

  const isSlotBooked = (dateStr: string, slot: string) =>
    allAppointments.some(a => a.date === dateStr && (a.time_slot === slot || a.time === slot));

  const isSlotReserved = (dateStr: string, slot: string) =>
    cachedSchedule[dateStr]?.[slot] === 'reserved';

  const getRemainingSlots = (dateStr: string) =>
    getAvailableSlots(dateStr).filter(slot => cachedSchedule[dateStr]?.[slot] === 'open' && !isSlotExpiredForDate(dateStr, slot) && !isSlotBooked(dateStr, slot));

  const getNextAvailableAppointment = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset() * 60000;
    const todayStr = new Date(today.getTime() - offset).toISOString().split('T')[0];

    return Object.keys(cachedSchedule)
      .filter(date => date >= todayStr)
      .sort()
      .map(date => ({ date, slot: getRemainingSlots(date)[0] }))
      .find(appointment => appointment.slot);
  };

  const formatDate = (dateStr: string, withWeekday = false) => {
    const date = new Date(`${dateStr}T00:00:00`);
    const base = `${date.getMonth() + 1}/${date.getDate()}`;
    return withWeekday ? `${base}（${['日', '一', '二', '三', '四', '五', '六'][date.getDay()]}）` : base;
  };

  const getCalendarTimes = (dateStr: string, slot: string) => {
    const [timePart, ampm] = slot.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    const start = new Date(`${dateStr}T00:00:00`);
    start.setHours(hours, minutes, 0, 0);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const asCalendarTime = (value: Date) => `${value.getFullYear()}${String(value.getMonth() + 1).padStart(2, '0')}${String(value.getDate()).padStart(2, '0')}T${String(value.getHours()).padStart(2, '0')}${String(value.getMinutes()).padStart(2, '0')}00`;
    return { start: asCalendarTime(start), end: asCalendarTime(end) };
  };

  const downloadCalendarFile = () => {
    if (!successfulBooking) return;
    const { start, end } = getCalendarTimes(successfulBooking.date, successfulBooking.time);
    const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Dr Yi Chen//Booking//ZH\r\nBEGIN:VEVENT\r\nUID:${Date.now()}@dryichen.com.tw\r\nDTSTAMP:${start}\r\nDTSTART:${start}\r\nDTEND:${end}\r\nSUMMARY:特約門診預約\r\nLOCATION:新竹市東區光復路二段71號1樓\r\nDESCRIPTION:特約門診預約，請提早抵達診所。\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = '特約門診預約.ics';
    link.click();
    URL.revokeObjectURL(url);
  };

  const openGoogleCalendar = () => {
    if (!successfulBooking) return;
    const { start, end } = getCalendarTimes(successfulBooking.date, successfulBooking.time);
    const params = new URLSearchParams({
      action: 'TEMPLATE', text: '特約門診預約', dates: `${start}/${end}`,
      details: '特約門診預約，請提早抵達診所。', location: '新竹市東區光復路二段71號1樓'
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank', 'noopener,noreferrer');
  };

  const goToBookingQuery = () => {
    setSuccessfulBooking(null);
    setActiveTab('query');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDateClick = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedTime('');
  };

  const resetFormState = () => {
    setFormData({ name: '', phone: '', email: '', part: '', reason: '', treatment: '' });
    setSelectedDate('');
    setSelectedTime('');
    setDisplaySlots([]);
    setInjuryCause('');
    setImagingStatus('');
    setImagingTypes([]);
    setOtherImaging('');
    setDiscomfortDuration('');
    setTreatmentHistory([]);
    setQueryPhone('');
    setQueryResults([]);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lineUserId) {
      alert('⚠️ 系統安全管制：請先完成 LINE 帳號連結！'); return;
    }
    if (!formData.name || !formData.phone || formData.phone.length < 9) {
      alert('請正確填寫姓名與手機號碼！'); return;
    }
    if (!selectedDate || !selectedTime) {
      alert('請選擇預約日期與時間時段！'); return;
    }
    if (isSlotExpired(selectedTime)) {
      alert('⚠️ 抱歉，該自費時段已截止掛號！'); return;
    }

    setIsSubmitLoading(true);

    const imagingDescription = imagingStatus === '有'
      ? [
          ...imagingTypes.filter(type => type !== '其他'),
          imagingTypes.includes('其他') && (otherImaging ? `其他：${otherImaging}` : '其他')
        ].filter(Boolean).join('、') || '有（未說明檢查類型）'
      : imagingStatus;

    const reservationData = {
      date: selectedDate, timeSlot: selectedTime,
      name: formData.name, phone: formData.phone,
      email: formData.email, part: formData.part,
      reason: [discomfortDuration && `不適時間：${discomfortDuration}`, injuryCause && `受傷原因：${injuryCause}`, formData.reason].filter(Boolean).join('\n'),
      treatment: [
        imagingDescription && `檢查：${imagingDescription}`,
        treatmentHistory.length > 0 && `其他治療：${treatmentHistory.join('、')}`,
        formData.treatment
      ].filter(Boolean).join('\n'),
      lineUserId: lineUserId, 
      lineDisplayName: lineDisplayName || localStorage.getItem('saved_line_display_name') || 'LINE連線成員',
      service: '自費門診特約' 
    };

    try {
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      });
      const res = await response.json();
      if (res.success) {
        setSuccessfulBooking({ date: selectedDate, time: selectedTime });
        setAllAppointments(prev => [...prev, { date: selectedDate, time_slot: selectedTime }]);
        
        // 1. 預約成功後儲存姓名電話，供下次預約時自動填寫
        localStorage.setItem('saved_booking_name', formData.name);
        localStorage.setItem('saved_booking_phone', formData.phone);
        
        // 2. 清除本次預約的部位、原因等選項，但保留姓名電話
        setFormData(prev => ({ ...prev, part: '', reason: '', treatment: '' }));
        setInjuryCause('');
        setImagingStatus('');
        setImagingTypes([]);
        setOtherImaging('');
        setDiscomfortDuration('');
        setTreatmentHistory([]);
        setSelectedDate('');
        setSelectedTime('');
        setDisplaySlots([]);
        
        // 成功頁面關閉後才回到預約查詢，讓使用者能先加入提醒與行事曆。
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("預約未成功：" + (res.error || "伺服器連線異常"));
      }
    } catch (err) {
      alert("網路連線逾時，請重新送出一次。");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const runQuery = async (type: 'phone' | 'line', value: string) => {
    if (type === 'phone' && !value) { alert('請輸入手機號碼！'); return; }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/reserve?action=query&type=${type}&value=${value}`);
      const resData = await response.json();
      
      // 3. 過濾掉已過期的預約紀錄（日期小於今日則自動移除）
      const now = new Date();
      const offset = now.getTimezoneOffset() * 60000;
      const todayStr = new Date(now.getTime() - offset).toISOString().split('T')[0];
      
      const filteredResults = (resData.list || []).filter((item: any) => item.date >= todayStr);
      setQueryResults(filteredResults);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (id: string, label: string) => {
    if (!confirm(`確定要取消並釋出於 ${label} 的特約看診名額嗎？`)) return;
    try {
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "cancelAppointment", id: id })
      });
      const json = await response.json();
      if (json.success) {
        alert("預約已成功取消並釋出名額。");
      } else {
        alert("取消失敗：" + (json.error || "未知錯誤"));
      }
      resetFormState();
      window.location.reload();
    } catch (err) {
      alert("連線失敗，請洽診所人員。");
    }
  };

  const renderCalendar = () => {
    const windowToday = new Date();
    const offset = windowToday.getTimezoneOffset() * 60000;
    const todayStr = (new Date(windowToday.getTime() - offset)).toISOString().split('T')[0];

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 sm:p-3"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateObj = new Date(year, month, i);
      const dateStr = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * 60000).toISOString().split('T')[0];
      
      const isPast = dateStr < todayStr;
      const availableSlots = cachedSchedule[dateStr] || {};
      const hasSlots = Object.keys(availableSlots).length > 0;
      const remainingCount = getRemainingSlots(dateStr).length;
      const isFull = !isPast && hasSlots && remainingCount === 0;
      const isDisabled = isPast || !hasSlots;
      const isSelected = selectedDate === dateStr;

      days.push(
        <button
          key={i}
          type="button"
          disabled={isDisabled}
          onClick={() => handleDateClick(dateStr)}
          className={`mx-auto flex min-h-10 w-11 flex-col items-center justify-center font-bold transition-all select-none
            text-sm rounded-lg sm:min-h-12 sm:w-12 sm:text-base md:text-lg sm:rounded-full
            ${isSelected ? 'bg-cyan-600 text-white shadow-md scale-105 sm:scale-110' : 
              isFull ? 'text-rose-500 bg-rose-50 border border-rose-200 hover:border-rose-400' :
              isDisabled ? 'text-slate-300 opacity-20 cursor-not-allowed bg-transparent border-none' : 
              'text-slate-700 hover:bg-slate-200 hover:text-cyan-600 bg-white shadow-sm border border-slate-200'
            }
          `}
        >
          <span>{i}</span>
          {isFull && <span className="text-[9px] leading-none font-black">額滿</span>}
        </button>
      );
    }
    return days;
  };

  const nextAvailableAppointment = getNextAvailableAppointment();

  return (
    <>
      {/* 注入強化版 Schema 至頁面，供搜尋引擎建立預約制、自費、新竹地點及 FAQ 的複合摘要 */}
      <JsonLd data={[medicalClinicSchema, faqSchema, videoSchema]} />
      <ScrollAnimation />

      <style dangerouslySetInnerHTML={{__html: `
        body, html, main, #__next, .flex-grow, div[class*="min-h-screen"], .bg-slate-50 { background-color: #f8fafc !important; color: #1e293b !important; }
        nav, header, [class*="nav"], [class*="Navbar"], [class*="header"], nav div, header div, nav section, header section { background-color: #e2e8f0 !important; background-image: none !important; border-bottom: none !important; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05) !important; }
        nav *, header *, [class*="Navbar"] *, [class*="header"] * { color: #1e293b !important; }
        nav a:hover, header a:hover, nav button:hover, header button:hover { color: #0891b2 !important; }
        nav ul, header ul, nav div[class*="dropdown"], header div[class*="dropdown"], [class*="dropdown-menu"], [class*="menu"] { background-color: #ffffff !important; border-radius: 1.25rem !important; border: 1px solid #e2e8f0 !important; }
        nav ul *, header ul *, [class*="dropdown"] *, [class*="dropdown-menu"] *, [class*="menu"] * { background-color: #ffffff !important; color: #0f172a !important; fill: #0f172a !important; }
        nav ul a:hover, header ul a:hover, [class*="dropdown"] a:hover, [class*="dropdown-menu"] a:hover, nav ul a:hover *, header ul a:hover *, [class*="dropdown"] a:hover *, [class*="dropdown-menu"] a:hover * { background-color: #f1f5f9 !important; color: #0f172a !important; }
        nav a[href*="booking"], nav a[href*="reserve"], header a[href*="booking"], .bg-pink-500, .text-pink-500, [class*="pink"], button[class*="pink"], a[class*="pink"] { background: #e0f2fe !important; background-color: #e0f2fe !important; background-image: none !important; border: 1px solid #bae6fd !important; box-shadow: 0 4px 14px 0 rgba(186, 230, 253, 0.5) !important; }
        nav a[href*="booking"] *, header a[href*="booking"] *, .bg-pink-500 *, [class*="pink"] * { color: #0369a1 !important; }
        nav a[href*="booking"]:hover, header a[href*="booking"]:hover, .bg-pink-500:hover, [class*="pink"]:hover { background: #bae6fd !important; background-color: #bae6fd !important; }
      `}} />

<div id="booking-top" className={`flex-grow ${activeTab === 'booking' ? 'pb-0' : 'pb-16 min-h-screen'} px-3 sm:px-4 bg-slate-50 text-slate-800 relative z-10 block`}>
        <div className="max-w-6xl mx-auto space-y-5">
          
<div className="flex justify-center p-1.5 bg-white rounded-2xl border border-slate-200 max-w-lg mx-auto shadow-sm">
  <button type="button" onClick={() => { setActiveTab('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`flex-1 py-3.5 sm:py-4 text-center text-base sm:text-lg font-black rounded-xl transition-all duration-200 ${activeTab === 'booking' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-700'}`}>特約掛號預約</button>
  <button type="button" onClick={() => { setActiveTab('query'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`flex-1 py-3.5 sm:py-4 text-center text-base sm:text-lg font-black rounded-xl transition-all duration-200 ${activeTab === 'query' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-700'}`}>查詢 / 取消預約</button>
</div>

          <div className="bg-white border border-slate-200 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl flex flex-col md:flex-row">
            
            {/* 左側醫師資訊欄：在查詢預約頁面且為手機版時，整欄隱藏 (hidden md:flex) */}
            <div className={`md:w-2/5 bg-slate-100/60 p-6 sm:p-10 flex flex-col items-center border-b md:border-b-0 md:border-r border-slate-200 ${activeTab === 'query' ? 'hidden md:flex' : 'flex'}`}>
              <div className="w-full max-w-[220px] sm:max-w-[300px] rounded-2xl border-4 border-white shadow-xl overflow-hidden mb-5 sm:mb-8 bg-white aspect-[4/5] relative">
                <Link href="/about/doctors" className="block h-full w-full cursor-pointer">
                  <Image 
                    src="/images/main/a.webp"
                    alt="新竹復健科推薦-林羿辰醫師-台大雙專科院長" 
                    fill
                    priority
                    loading="eager"
                    fetchPriority="high"
                    className="object-cover object-top group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </Link>
              </div>
              <div className="text-center w-full">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">林羿辰 醫師</h1>
                <p className="text-cyan-600 text-base sm:text-lg font-black tracking-widest mb-4 sm:mb-6">特約門診預約資訊</p>

                <div className="text-left bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-2.5 text-sm sm:text-base text-slate-600 leading-relaxed shadow-sm">
                  <p className="flex items-start gap-1.5"><span className="text-cyan-600 font-bold">✦</span> 採全預約制，免除久候且更完整的評估治療</p>
                  <p className="flex items-start gap-1.5"><span className="text-cyan-600 font-bold">✦</span> 請務必提前十分鐘報到，每次25分鐘。</p>
                  <p className="flex items-start gap-1.5"><span className="text-cyan-600 font-bold">✦</span> 健保身份：單次 1000 元</p>
                  <p className="flex items-start gap-1.5"><span className="text-cyan-600 font-bold">✦</span> 非健保身份：單次 1500 元</p>
                </div>
              </div>
            </div>

            {/* 右側主要內容欄：當左側隱藏時，手機版自動撐滿滿版 (w-full md:w-3/5) */}
            <div className={`p-5 sm:p-8 md:p-14 text-sm sm:text-base md:text-lg ${activeTab === 'query' ? 'w-full md:w-3/5' : 'md:w-3/5'}`}>
              
              {activeTab === 'booking' && (
                <div className="space-y-6 sm:space-y-8">
                  
                  {lineUserId ? (
                    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
                      
                      {/* 🚀 已優化處：當成功連線綁定後，原圖卡的解除綁定按鈕在此無縫保留，方便病患管理 */}
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-4 rounded-xl shadow-sm mb-4">
                        <div className="flex items-center gap-2">
                          {linePictureUrl ? (
                            <img src={linePictureUrl} alt={lineDisplayName} className="w-8 h-8 rounded-full border border-slate-100 object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">👤</div>
                          )}
                          <span className="text-sm font-black text-emerald-700">
                            已登入帳號：{lineDisplayName || "已連線成員"}
                          </span>
                          <FaCheckCircle className="text-emerald-500 shrink-0" />
                        </div>
                        <button 
                          type="button" 
                          onClick={handleUnbindLine} 
                          className="text-xs font-bold text-rose-500 hover:text-rose-600 underline whitespace-nowrap"
                        >
                          解除綁定
                        </button>
                      </div>

                      {nextAvailableAppointment && (
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <p className="text-xs font-black tracking-widest text-cyan-700 mb-1">最快可預約</p>
                            <p className="font-black text-slate-900 text-lg sm:text-xl">
                              {formatDate(nextAvailableAppointment.date, true)} <span className="text-cyan-700">{nextAvailableAppointment.slot}</span>
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              handleDateClick(nextAvailableAppointment.date);
                              setCurrentMonth(new Date(`${nextAvailableAppointment.date}T00:00:00`));
                            }}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-black px-5 py-3 rounded-xl shadow-sm transition whitespace-nowrap"
                          >
                            立即預約
                          </button>
                        </div>
                      )}

                      <div className="bg-slate-50 border border-slate-200 p-4 sm:p-6 rounded-2xl">
                        <h2 className="text-base sm:text-lg font-black text-slate-800 mb-4 sm:mb-5 flex items-center gap-2">
                          <span className="w-5 h-5 sm:w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 border border-cyan-200 flex items-center justify-center text-[11px] sm:text-xs font-black">1</span>
                          選擇預約掛號日期
                        </h2>
                        
                        <div className="flex items-center justify-between mb-4 sm:mb-6 px-1">
                          <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="p-1.5 text-slate-500 hover:text-cyan-600 transition">
                            <FaChevronLeft size={16} />
                          </button>
                          <div className="font-black tracking-wider sm:tracking-widest text-lg sm:text-xl text-slate-900">
                            {currentMonth.getFullYear()} 年 {currentMonth.getMonth() + 1} 月
                          </div>
                          <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="p-1.5 text-slate-500 hover:text-cyan-600 transition">
                            <FaChevronRight size={16} />
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-y-2 sm:gap-y-3 text-center">
                          {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                            <div key={d} className="text-xs sm:text-sm font-black text-slate-400 pb-2">{d}</div>
                          ))}
                          {renderCalendar()}
                        </div>
                      </div>

                      {selectedDate && (
                        <div className="space-y-4 animate-fadeIn">
                          <h2 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
                            <span className="w-5 h-5 sm:w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 border border-cyan-200 flex items-center justify-center text-[11px] sm:text-xs font-black">2</span>
                            {formatDate(selectedDate)}{' '}
                            {getRemainingSlots(selectedDate).length === 1
                              ? <span className="text-rose-500">🔥 剩最後 1 位</span>
                              : <span className="text-cyan-700">（剩 {getRemainingSlots(selectedDate).length} 位）</span>}
                          </h2>
                          {displaySlots.length > 0 ? (
                            <div className="space-y-5 sm:space-y-6">
                              {groupSlotsByTime(displaySlots).map((slotGroup, groupIndex) => (
                                <div key={groupIndex} className="grid grid-cols-3 gap-2 sm:gap-4">
                                  {/* 保留時段也會顯示給病患，但不可自行預約。 */}
                                  {slotGroup.map(slot => {
                                    const isBooked = isSlotBooked(selectedDate, slot) || isSlotReserved(selectedDate, slot);
                                    return (
                                      <button
                                        key={slot}
                                        type="button"
                                        disabled={isBooked}
                                        onClick={() => setSelectedTime(slot)}
                                        className={`border font-black rounded-xl transition-all select-none py-2.5 text-sm sm:py-4 sm:text-base
                                          ${isBooked ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60' :
                                            selectedTime === slot ? 'bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-500 text-white shadow-md font-black scale-[1.02]' :
                                            'border-slate-200 bg-white text-slate-700 hover:border-cyan-500 hover:bg-slate-50'
                                          }`}
                                      >
                                        <span className="block">{isBooked ? '●' : '○'} {slot}</span>
                                        <span className={`text-xs font-bold ${isBooked ? 'opacity-80' : 'text-cyan-600'}`}>
                                          {isBooked ? '已預約' : '可預約'}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center text-rose-500 font-black py-4 sm:py-5 bg-rose-50 border border-rose-100 rounded-xl text-xs sm:text-sm md:text-base">⚠️ 抱歉，本日期之特約時段已全數預約額滿。</div>
                          )}
                        </div>
                      )}

                      {selectedDate && selectedTime && (
                        <form onSubmit={(e) => { 
                          handleBookingSubmit(e); 
                          // 使用 setTimeout 確保在 React 狀態更新與重新渲染後，才執行置頂動作
                          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100); 
                        }} className="space-y-5 sm:space-y-6 pt-5 sm:pt-6 border-t border-slate-200 border-dashed animate-fadeIn">
                          <h2 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
                            <span className="w-5 h-5 sm:w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 border border-cyan-200 flex items-center justify-center text-[11px] sm:text-xs font-black">3</span>
                            就診基本問卷
                          </h2>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs sm:text-sm font-black text-slate-500 mb-1.5">您的姓名 <span className="text-rose-500">*</span></label>
                              <div className="relative">
                                <FaUser className="absolute left-4 top-4 sm:top-4.5 text-slate-400 text-xs sm:text-sm" />
                                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="繁體中文真實大名" className="w-full p-3.5 sm:p-4 pl-10 sm:pl-12 border border-slate-300 bg-white rounded-xl outline-none focus:border-cyan-500 transition text-sm sm:text-base font-bold text-slate-800 placeholder-slate-400" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm font-black text-slate-500 mb-1.5">手機號碼 <span className="text-rose-500">*</span></label>
                              <div className="relative">
                                <FaPhoneAlt className="absolute left-4 top-4 sm:top-4.5 text-slate-400 text-xs sm:text-sm" />
                                <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="例如：0912345678" className="w-full p-3.5 sm:p-4 pl-10 sm:pl-12 border border-slate-300 bg-white rounded-xl outline-none focus:border-cyan-500 transition text-sm sm:text-base font-bold text-slate-800 placeholder-slate-400" />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-black text-slate-500 mb-1.5">電子郵件 (選填)</label>
                            <div className="relative">
                              <FaEnvelope className="absolute left-4 top-4 sm:top-4.5 text-slate-400 text-xs sm:text-sm" />
                              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="yourname@gmail.com" className="w-full p-3.5 sm:p-4 pl-10 sm:pl-12 border border-slate-300 bg-white rounded-xl outline-none focus:border-cyan-500 transition text-sm sm:text-base font-bold text-slate-800 placeholder-slate-400" />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs sm:text-sm font-black text-slate-500 mb-2">哪裡不適？</label>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {['肩膀', '膝蓋', '腳踝', '腰', '頸部', '手肘', '其他'].map(option => (
                                  <button
                                    key={option}
                                    type="button"
                                    aria-pressed={formData.part === option}
                                    onClick={() => setFormData({ ...formData, part: option === '其他' ? '' : option })}
                                    className={`rounded-full border px-3 py-2 text-xs sm:text-sm font-black transition ${formData.part === option ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-400 hover:text-cyan-700'}`}
                                  >
                                    ○ {option}
                                  </button>
                                ))}
                              </div>
                              <div className="relative">
                                <FaMapMarkerAlt className="absolute left-4 top-4 sm:top-4.5 text-slate-400 text-xs sm:text-sm" />
                                <input type="text" value={formData.part} onChange={e => setFormData({...formData, part: e.target.value})} placeholder="可補充更詳細的部位，例如：右側膝蓋半月板..." className="w-full p-3.5 sm:p-4 pl-10 sm:pl-12 border border-slate-300 bg-white rounded-xl outline-none focus:border-cyan-500 transition text-sm sm:text-base font-bold text-slate-800 placeholder-slate-400" />
                              </div>
                              <div className="mt-3">
                                <label className="block text-xs sm:text-sm font-black text-slate-500 mb-1.5">不適時間</label>
                                <input type="text" value={discomfortDuration} onChange={e => setDiscomfortDuration(e.target.value)} placeholder="請直接輸入，例如：3 天、2 週、半年" className="w-full p-3.5 sm:p-4 border border-slate-300 bg-white rounded-xl outline-none focus:border-cyan-500 transition text-sm sm:text-base font-bold text-slate-800 placeholder-slate-400" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm font-black text-slate-500 mb-2">受傷原因</label>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {['運動', '跌倒', '工作', '慢性疼痛', '不知道', '其他'].map(option => (
                                  <button
                                    key={option}
                                    type="button"
                                    aria-pressed={injuryCause === option}
                                    onClick={() => setInjuryCause(option)}
                                    className={`rounded-full border px-3 py-2 text-xs sm:text-sm font-black transition ${injuryCause === option ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-400 hover:text-cyan-700'}`}
                                  >
                                    ○ {option}
                                  </button>
                                ))}
                              </div>
                              <div className="relative">
                                <FaFileAlt className="absolute left-4 top-4 sm:top-5 text-slate-400 text-xs sm:text-sm" />
                                <textarea rows={3} value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} placeholder="請描述疼痛情況、不適過程或受傷經過..." className="w-full p-3.5 sm:p-4 pl-10 sm:pl-12 border border-slate-300 bg-white rounded-xl outline-none focus:border-cyan-500 transition text-sm sm:text-base font-bold text-slate-800 resize-none placeholder-slate-400 leading-relaxed text-justify" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs sm:text-sm font-black text-slate-500 mb-2">是否有做過任何檢查？</label>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {['有', '沒有'].map(option => (
                                  <button
                                    key={option}
                                    type="button"
                                    aria-pressed={imagingStatus === option}
                                    onClick={() => {
                                      setImagingStatus(option);
                                      if (option === '沒有') {
                                        setImagingTypes([]);
                                        setOtherImaging('');
                                      }
                                    }}
                                    className={`rounded-full border px-3 py-2 text-xs sm:text-sm font-black transition ${imagingStatus === option ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-400 hover:text-cyan-700'}`}
                                  >
                                    ○ {option}
                                  </button>
                                ))}
                              </div>
                              {imagingStatus === '有' && (
                                <div className="rounded-xl border border-cyan-100 bg-cyan-50/60 p-3 mb-4 animate-fadeIn">
                                  <p className="text-xs font-black text-cyan-800 mb-2">請勾選已做過的檢查</p>
                                  <div className="flex flex-wrap gap-2">
                                    {['MRI', 'X光', '超音波', '其他'].map(option => {
                                      const isSelected = imagingTypes.includes(option);
                                      return (
                                        <button
                                          key={option}
                                          type="button"
                                          aria-pressed={isSelected}
                                          onClick={() => setImagingTypes(current => isSelected ? current.filter(item => item !== option) : [...current, option])}
                                          className={`rounded-full border px-3 py-2 text-xs sm:text-sm font-black transition ${isSelected ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-400 hover:text-cyan-700'}`}
                                        >
                                          {isSelected ? '●' : '○'} {option}
                                        </button>
                                      );
                                    })}
                                  </div>
                                  {imagingTypes.includes('其他') && (
                                    <input type="text" value={otherImaging} onChange={e => setOtherImaging(e.target.value)} placeholder="請輸入其他檢查項目" className="mt-3 w-full p-3 border border-slate-300 bg-white rounded-xl outline-none focus:border-cyan-500 transition text-sm font-bold text-slate-800 placeholder-slate-400" />
                                  )}
                                </div>
                              )}
                              <label className="block text-xs sm:text-sm font-black text-slate-500 mb-2">是否做過其他治療？</label>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {['健保復健', '增生注射', '徒手運動治療', 'PRP', '震波', '其他'].map(option => {
                                  const isSelected = treatmentHistory.includes(option);
                                  return (
                                    <button
                                      key={option}
                                      type="button"
                                      aria-pressed={isSelected}
                                      onClick={() => setTreatmentHistory(current => isSelected ? current.filter(item => item !== option) : [...current, option])}
                                      className={`rounded-full border px-3 py-2 text-xs sm:text-sm font-black transition ${isSelected ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-400 hover:text-cyan-700'}`}
                                    >
                                      {isSelected ? '●' : '○'} {option}
                                    </button>
                                  );
                                })}
                              </div>
                              <div className="relative">
                                <FaHistory className="absolute left-4 top-4 sm:top-4.5 text-slate-400 text-xs sm:text-sm" />
                                <input type="text" value={formData.treatment} onChange={e => setFormData({...formData, treatment: e.target.value})} placeholder="可補充其他檢查或治療..." className="w-full p-3.5 sm:p-4 pl-10 sm:pl-12 border border-slate-300 bg-white rounded-xl outline-none focus:border-cyan-500 transition text-sm sm:text-base font-bold text-slate-800 placeholder-slate-400" />
                              </div>
                            </div>
                          </div>

                          <button type="submit" disabled={isSubmitLoading} className="w-full py-4 sm:py-5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-black text-base md:text-lg tracking-widest shadow-lg transition-all disabled:bg-slate-300 text-white">
                            {isSubmitLoading ? "努力預約中..." : "確認送出特約門診掛號資訊"}
                          </button>
                        </form>
                      )}

                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-slate-300 rounded-3xl bg-slate-50/60 min-h-[350px] animate-fadeIn">
                      <h3 className="font-black text-slate-800 text-base sm:text-lg mb-2">特約門診預約</h3>
                      <div className="text-sm sm:text-base text-slate-500 max-w-md leading-loose space-y-2 mb-6">
                        <p className="flex items-start gap-1.5"><span className="text-cyan-600 font-bold">✦</span> 請先於下方登錄LINE帳號開始掛號。</p>
                        <p className="flex items-start gap-1.5"><span className="text-cyan-600 font-bold">✦</span> 選擇可點擊之日期，查看開放時段。</p>
                        <p className="flex items-start gap-1.5"><span className="text-cyan-600 font-bold">✦</span> 客滿或無排診之日期將反灰無法點選。</p>
  
                      </div>

                      <div className="w-full max-w-md space-y-3">

                          {/* 🚀 已優化處：步驟 2 開放成標準 LINE 正統經典深綠（bg-[#06C755]），並附加 Icon 陰影，確保白色 Icon 100% 顯眼不吃字 */}
                        <button 
                          type="button" 
                          onClick={handleLineAuthRedirect} 
                          className="flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05a647] text-white text-sm sm:text-base font-black py-3.5 px-5 rounded-xl transition shadow-md w-full"
                        >
                          <FaLine className="text-white text-lg sm:text-xl shrink-0 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
                          <span>Line帳號綁定開始預約</span>
                        </button>

                        <div className="mt-5 border-t border-slate-200 pt-5 text-left">
                          <p className="text-sm font-black text-slate-800 mb-3 flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 text-xs">◎</span>
                            看診流程
                          </p>
                          <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs sm:text-sm font-bold text-slate-600">
                            {[
                              '選日期及填資料',
                              '預約完成',
                              '提前 10 分鐘報到繳費',
                              '超音波及動作評估',
                              '醫師診療'
                            ].map((step, index) => (
                              <li key={step} className="flex items-center gap-2">
                                <span className="text-cyan-600">{index + 1}</span>
                                <span>{step}</span>
                                {index < 4 && <span className="text-slate-300">→</span>}
                              </li>
                            ))}
                          </ol>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              )}

              {activeTab === 'query' && (
<div className="space-y-5 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">掛號記錄查詢</h3>
                  
                  <div className="p-4 sm:p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                    {lineUserId ? (
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm sm:text-base font-bold text-slate-700 flex items-center gap-2">
                            {linePictureUrl && <img src={linePictureUrl} alt="" className="w-6 h-6 rounded-full inline" />}
                            已綁定Line帳號 [ {lineDisplayName || 'LINE用戶'} ] 
                          </span>
                          <button type="button" onClick={handleUnbindLine} className="text-xs text-rose-500 hover:text-rose-600 underline font-bold px-2 whitespace-nowrap">
                            解除綁定
                          </button>
                        </div>
                        <div>
                          <a 
                            href="https://line.me/R/ti/p/@584yxibc" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-bold rounded-lg transition shadow"
                          >
                            <FaLine className="text-white text-lg sm:text-xl shrink-0 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]" />
                            <span>加入官方 LINE 看診提醒通知</span>
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm sm:text-base font-black text-slate-600 mb-2.5">請輸入掛號填寫的手機號碼進行查詢：</label>
                        <div className="flex gap-2 sm:gap-3">
                          <input type="tel" value={queryPhone} onChange={e => setQueryPhone(e.target.value)} placeholder="例如：0912345678" className="flex-1 p-3 sm:p-4 border border-slate-300 bg-white rounded-xl outline-none focus:border-cyan-500 text-sm sm:text-base text-slate-800 font-bold placeholder-slate-400" />
                          <button onClick={() => runQuery('phone', queryPhone)} className="bg-slate-800 hover:bg-slate-700 text-white font-black px-4 sm:px-6 rounded-xl text-sm sm:text-base transition flex items-center gap-1.5 whitespace-nowrap"><FaSearch/> 搜尋</button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-xs sm:text-sm font-black text-slate-400 uppercase tracking-widest">您的特約預約列表</h4>
                    {isLoading ? (
                      <div className="text-center text-slate-500 py-6 font-bold text-sm">正在連線努力查詢預約資訊查詢...</div>
                    ) : queryResults.length > 0 ? (
                      <div className="space-y-3">
                        {queryResults.map((item) => (
                          <div key={item.id} className="bg-white border border-slate-200 p-4 sm:p-6 rounded-xl flex justify-between items-center hover:border-slate-400 transition shadow-sm gap-2">
                            <div>
                              <div className="text-xs sm:text-sm text-slate-400 font-bold mb-1">就診姓名：{item.name}</div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                <span className="text-slate-900 font-black text-base sm:text-xl">{item.date}</span>
                                <span className="text-amber-600 font-black text-base sm:text-xl">{item.time || item.time_slot}</span>
                              </div>
                            </div>
                            <button onClick={() => handleCancelBooking(item.id, `${item.date} ${item.time || item.time_slot}`)} className="bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs sm:text-base font-bold px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-rose-200 transition flex items-center gap-1 shrink-0"><FaTrashAlt size={12} className="sm:size-[14px]"/> 取消釋出</button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-slate-400 py-10 sm:py-12 border border-dashed border-slate-300 rounded-xl text-sm sm:text-base font-bold bg-slate-50">目前無未來的特約掛號紀錄。</div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {activeTab === 'booking' && (
        <div className="px-3 sm:px-4 pb-16">
        <section className="max-w-6xl mx-auto mt-5 space-y-5">
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">停車資訊</h2>
              <p className="mt-1 text-sm font-bold text-slate-600">觀看專屬停車場位置與進場方式。</p>
            </div>
            <a
              href="https://youtube.com/shorts/hFh6xaYpP1k?si=o8uG-BiGaqu-gOXn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 font-black text-white shadow-sm transition hover:bg-amber-600 whitespace-nowrap"
            >
              🚗 專屬停車場
            </a>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">常見問題</h2>
            <div className="divide-y divide-slate-200">
              {[
                ['需要帶健保卡嗎？', '健保身分需要攜帶健保卡。'],
                ['可以刷卡嗎？', '目前不提供刷卡服務。'],
                ['可以停車嗎？', '可以，請點選上方「專屬停車場」觀看停車影片。'],
                ['第一次要多久？', '首次看診時間依超音波、動作評估及醫師診療需求而定，請預留充足時間。'],
                ['遲到怎麼辦？', '因後續仍有已預約病患，遲到可能使您的看診時間被壓縮，建議提前 10 分鐘抵達。']
              ].map(([question, answer]) => (
                <details key={question} className="group py-3">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-black text-slate-800">
                    {question}
                    <span className="text-cyan-600 transition group-open:rotate-45">＋</span>
                  </summary>
                  <p className="pt-3 pr-6 text-sm leading-relaxed font-medium text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        </div>
      )}

      {successfulBooking && (
        <div onClick={goToBookingQuery} className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/55 backdrop-blur-sm px-3 py-6 sm:p-8">
          <div className="min-h-full flex items-center justify-center">
            <section onClick={event => event.stopPropagation()} className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl animate-fadeIn">
              <div className="bg-gradient-to-r from-emerald-500 to-cyan-600 px-6 py-8 text-center text-white sm:px-10">
                <FaCheckCircle className="mx-auto mb-3 text-5xl" />
                <h2 className="text-2xl sm:text-3xl font-black">已預約成功</h2>
                <p className="mt-2 text-sm font-bold text-white/90">特約門診預約已為您保留</p>
              </div>

              <div className="p-5 sm:p-7 space-y-5">
                <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 border border-slate-200 p-4 text-center">
                  <div className="border-r border-slate-200">
                    <p className="text-xs font-black tracking-wider text-slate-400">日期</p>
                    <p className="mt-1 font-black text-slate-900">{formatDate(successfulBooking.date, true)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black tracking-wider text-slate-400">時間</p>
                    <p className="mt-1 font-black text-cyan-700">{successfulBooking.time}</p>
                  </div>
                </div>

                <a
                  href="https://line.me/R/ti/p/@584yxibc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#06C755] px-4 py-4 font-black text-white shadow-sm transition hover:bg-[#05a647]"
                >
                  <FaLine className="text-xl" />
                  加入 LINE 提醒
                </a>

                <div>
                  <p className="mb-2 text-center text-xs font-black tracking-wider text-slate-400">加入行事曆</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={openGoogleCalendar} className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-black text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700">Google Calendar</button>
                    <button type="button" onClick={downloadCalendarFile} className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-black text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700">Apple Calendar</button>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=24.7833314%2C121.0170937"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-4 py-3.5 font-black text-white transition hover:bg-slate-700"
                >
                  <FaMapMarkerAlt />
                  導航到診所
                </a>

                <button
                  type="button"
                  onClick={goToBookingQuery}
                  className="w-full rounded-xl border-2 border-cyan-600 bg-white py-3.5 text-sm font-black text-cyan-700 shadow-sm transition hover:bg-cyan-50"
                >
                  返回預約查詢
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
