import { calculateTopicScore } from './scoring';
import type { ContentTopic, TopicSourceSignal } from './types';

type TopicProfile = {
  key: string;
  category: string;
  probe: string;
  terms: string[];
  contextTerms?: string[];
  excludeTerms?: string[];
  titles: string[];
  summary: string;
  rationale: string;
  keywords: string[];
  patientRelevance: number;
  clinicalFit: number;
  currentEventTitle?: 'injury' | 'athlete-health';
};

type NewsSignal = { title: string; url: string; publishedAt?: string };
type LiteratureSignal = { title: string; url: string };
type TrendSignal = { title: string; traffic: string; url: string; publishedAt?: string; relatedNews: NewsSignal[] };
type AdSignal = { pageName: string; text: string; url: string };

const TOPIC_PROFILES: TopicProfile[] = [
  { key: 'knee-osteoarthritis', category: '膝關節', probe: '膝蓋退化 怎麼辦', terms: ['膝蓋退化', '退化性關節炎', '膝關節炎', 'osteoarthritis', 'knee pain'], titles: ['膝蓋退化一定要打針嗎？從運動、復健到注射怎麼選', '膝蓋走路痛、上下樓更痛，是退化性關節炎嗎？', '膝關節退化還能運動嗎？哪些動作適合、哪些要調整'], summary: '整理膝關節退化常見症狀、運動與復健原則，以及需要影像檢查或進一步治療的時機。', rationale: '膝痛與退化是骨科復健科長期高需求問題，具明確的症狀與治療搜尋意圖。', keywords: ['膝蓋退化怎麼辦', '膝關節炎運動', '上下樓膝蓋痛'], patientRelevance: 97, clinicalFit: 98 },
  { key: 'prp', category: '再生治療', probe: 'PRP 注射 效果 多久', terms: ['PRP', 'platelet-rich plasma', 'platelet rich plasma', '增生療法'], titles: ['PRP 注射後多久有效？恢復時間與常見反應一次看懂', 'PRP 適合哪些肌腱與關節問題？治療前先看這些重點', 'PRP 打一次就夠嗎？療程次數、復健與追蹤怎麼安排'], summary: '以患者最在意的療效時間、適應症、注射後活動與復健安排為核心，說明實證限制與就醫判斷。', rationale: 'PRP 是診所核心治療，也是病患常比較價格、效果與恢復期的高意圖關鍵字。', keywords: ['PRP注射效果多久', 'PRP注射後注意事項', 'PRP適合什麼人'], patientRelevance: 94, clinicalFit: 99 },
  { key: 'frozen-shoulder', category: '肩部疼痛', probe: '五十肩 晚上痛 睡姿', terms: ['五十肩', '冰凍肩', 'frozen shoulder', 'adhesive capsulitis'], titles: ['五十肩晚上特別痛怎麼睡？枕頭支撐與就醫時機', '肩膀抬不起來就是五十肩嗎？三種常見原因比較', '五十肩可以自己拉筋嗎？做錯更痛的動作有哪些'], summary: '回應肩膀夜痛、活動受限與居家運動疑問，並區分五十肩和其他肩部疾病。', rationale: '具高度生活化的問句搜尋，容易帶來需要評估與復健的精準讀者。', keywords: ['五十肩晚上痛睡不著', '五十肩睡覺姿勢', '肩膀抬不起來'], patientRelevance: 98, clinicalFit: 98 },
  { key: 'rotator-cuff', category: '肩部疼痛', probe: '旋轉肌撕裂 一定要開刀嗎', terms: ['旋轉肌', '肩袖', 'rotator cuff'], titles: ['旋轉肌撕裂一定要開刀嗎？復健、注射與手術怎麼判斷', '肩膀痛到手舉不高：旋轉肌受傷有哪些警訊？', '旋轉肌受傷多久會好？不同程度的恢復與復健時間'], summary: '說明旋轉肌受傷常見症狀、超音波評估、保守治療與需要轉介手術的情況。', rationale: '病患常以「手舉不高」或「是否要開刀」搜尋，決策需求明確。', keywords: ['旋轉肌撕裂一定要開刀嗎', '肩膀痛手舉不高', '旋轉肌復健多久'], patientRelevance: 96, clinicalFit: 98 },
  { key: 'low-back-pain', category: '脊椎下背', probe: '下背痛 怎麼辦', terms: ['下背痛', '腰痛', '閃到腰', 'low back pain'], excludeTerms: ['結石', '腎臟', '泌尿', '輸尿管', '胰臟', '腹腔', '癌', '腫瘤'], titles: ['突然閃到腰怎麼辦？前 48 小時處理與危險警訊', '下背痛要休息還是運動？何時應該照 X 光或 MRI', '腰痛一直不好是椎間盤嗎？常見原因與就醫科別'], summary: '提供急慢性下背痛的安全活動原則、危險警訊與檢查時機，避免過度臥床或自行診斷。', rationale: '腰痛是極高頻症狀搜尋，也最需要可靠的分流與安全衛教。', keywords: ['閃到腰怎麼辦', '下背痛多久會好', '腰痛何時照MRI'], patientRelevance: 99, clinicalFit: 98 },
  { key: 'sciatica', category: '脊椎下背', probe: '坐骨神經痛 腳麻', terms: ['坐骨神經痛', '腳麻', 'sciatica', 'radiculopathy'], excludeTerms: ['股票', '股市', '台積電', '概念股', '本益比', '漲停', '跌停', '投資'], titles: ['屁股痛一路麻到腳，是坐骨神經痛嗎？', '坐骨神經痛可以拉筋嗎？哪些情況不適合自己做', '腳麻是腰椎壓迫嗎？需要立刻就醫的神經警訊'], summary: '區分神經根症狀與一般肌肉疼痛，整理居家活動、檢查與緊急就醫判斷。', rationale: '「腳麻、電到、一路痛」是病患常用搜尋語句，具高度門診轉換可能。', keywords: ['坐骨神經痛腳麻', '坐骨神經痛拉筋', '腳麻看哪一科'], patientRelevance: 98, clinicalFit: 97 },
  { key: 'neck-pain', category: '頸肩疼痛', probe: '肩頸痠痛 手麻', terms: ['肩頸痠痛', '頸椎', '落枕', 'neck pain', 'cervical'], titles: ['肩頸痠痛又手麻，是姿勢問題還是頸椎壓迫？', '早上起床落枕怎麼辦？可以按摩或硬轉脖子嗎', '低頭族脖子痛：螢幕高度、運動與就醫時機'], summary: '從常見姿勢負荷到神經症狀，提供安全自我照護、工作調整與就醫警訊。', rationale: '手機與久坐族群搜尋穩定，問句具體且符合復健科常見主訴。', keywords: ['肩頸痠痛手麻', '落枕怎麼辦', '低頭族脖子痛'], patientRelevance: 98, clinicalFit: 98 },
  { key: 'plantar-fasciitis', category: '足踝疼痛', probe: '足底筋膜炎 早上下床痛', terms: ['足底筋膜炎', '腳底痛', 'plantar fasciitis', 'plantar heel pain'], titles: ['早上下床第一步腳跟痛，是足底筋膜炎嗎？', '足底筋膜炎可以跑步嗎？鞋子、伸展與負荷調整', '足底筋膜炎一直不好：震波、復健與注射怎麼選'], summary: '說明典型腳跟痛表現、日常負荷調整、復健與進階治療選項。', rationale: '症狀明確、患者搜尋語句集中，適合回答治療比較與恢復期問題。', keywords: ['足底筋膜炎早上下床痛', '足底筋膜炎可以跑步嗎', '足底筋膜炎震波'], patientRelevance: 97, clinicalFit: 99 },
  { key: 'ankle-sprain', category: '運動傷害', probe: '腳踝扭傷 腫 多久會好', terms: ['腳踝扭傷', '踝關節扭傷', 'ankle sprain'], titles: ['腳踝扭傷腫起來怎麼辦？何時需要照 X 光', '腳踝扭傷多久能運動？分階段復健與回場測試', '扭傷後不痛就好了嗎？反覆翻船可能是踝關節不穩'], summary: '整理扭傷急性處理、骨折警訊、負重時機與避免反覆受傷的復健原則。', rationale: '運動族群與一般民眾都常搜尋，具有急性處理和回場決策需求。', keywords: ['腳踝扭傷腫怎麼辦', '腳踝扭傷多久會好', '扭傷何時照X光'], patientRelevance: 98, clinicalFit: 98 },
  { key: 'tennis-elbow', category: '手肘疼痛', probe: '網球肘 一直不好', terms: ['網球肘', '肱骨外上髁', 'tennis elbow', 'lateral epicondyl'], titles: ['網球肘一直不好，是不是休息不夠？', '網球肘護具要戴哪裡？工作與運動怎麼調整', '網球肘打針還是做震波？常見治療比較'], summary: '回應反覆手肘外側疼痛、護具、復健、震波與注射等常見決策問題。', rationale: '工作與球拍運動族群搜尋需求明確，容易形成長尾關鍵字。', keywords: ['網球肘一直不好', '網球肘護具位置', '網球肘震波治療'], patientRelevance: 94, clinicalFit: 99 },
  { key: 'carpal-tunnel', category: '神經疼痛', probe: '手麻 腕隧道症候群', terms: ['腕隧道', '手麻', 'carpal tunnel'], excludeTerms: ['中風', '心肌', '胸痛', '腦血管'], titles: ['半夜手麻醒來，是腕隧道症候群嗎？', '手麻看哪一科？腕隧道、頸椎與周邊神經怎麼分', '腕隧道症候群一定要開刀嗎？護具、注射與手術時機'], summary: '依麻木位置與時間區分常見原因，介紹神經檢查和各階段治療選項。', rationale: '「手麻」搜尋量大且原因多，適合用清楚分流提高內容實用性。', keywords: ['半夜手麻', '腕隧道症候群看哪一科', '手麻是頸椎嗎'], patientRelevance: 98, clinicalFit: 97 },
  { key: 'dequervain-trigger', category: '手腕手指', probe: '媽媽手 板機指 怎麼辦', terms: ['媽媽手', '板機指', 'de quervain', 'trigger finger'], titles: ['大拇指手腕痛是媽媽手嗎？抱小孩怎麼減少負擔', '手指卡住彈一下，是板機指嗎？', '媽媽手與板機指可以只靠休息好嗎？治療選項比較'], summary: '說明常見手腕與手指肌腱問題、生活調整、護具及需要治療的時機。', rationale: '照顧者與手部工作族群常以生活化症狀搜尋，患者關聯性高。', keywords: ['媽媽手大拇指痛', '板機指手指卡住', '媽媽手護具'], patientRelevance: 95, clinicalFit: 97 },
  { key: 'osteoporosis', category: '骨骼健康', probe: '骨質疏鬆 檢查 年齡', terms: ['骨質疏鬆', '骨密度', 'osteoporosis', 'bone density'], titles: ['骨質疏鬆沒有症狀，什麼年齡該做骨密度檢查？', '骨密度 T 值怎麼看？骨量不足和骨質疏鬆差在哪', '補鈣就能預防骨質疏鬆嗎？運動與維生素 D 重點'], summary: '整理骨密度檢查族群、報告判讀、骨折風險與可執行的骨骼保健。', rationale: '高齡、停經與骨折族群有明確篩檢需求，適合建立長期搜尋流量。', keywords: ['骨質疏鬆檢查年齡', '骨密度T值怎麼看', '骨質疏鬆運動'], patientRelevance: 96, clinicalFit: 96 },
  { key: 'sarcopenia', category: '高齡復健', probe: '肌少症 自我檢測 運動', terms: ['肌少症', '肌力', 'sarcopenia'], titles: ['走路變慢、容易跌倒，是肌少症警訊嗎？', '肌少症怎麼自我檢測？小腿圍、握力與起立測試', '長輩肌肉流失怎麼練？阻力運動與蛋白質安排'], summary: '聚焦高齡肌力下降、簡易篩檢、跌倒預防與安全訓練。', rationale: '高齡健康與跌倒預防需求持續成長，兼具衛教與復健服務關聯。', keywords: ['肌少症自我檢測', '長輩肌力訓練', '肌少症小腿圍'], patientRelevance: 95, clinicalFit: 96 },
  { key: 'shockwave', category: '治療比較', probe: '震波治療 有效嗎', terms: ['震波治療', '體外震波', 'shockwave', 'ESWT'], titles: ['震波治療有效嗎？適合哪些肌腱疼痛、多久做一次', '震波治療會很痛嗎？療程前後注意事項', '震波、雷射與復健差在哪？慢性肌腱痛怎麼選'], summary: '說明震波常見適應症、療程反應、禁忌與其他保守治療的差異。', rationale: '治療名稱與效果比較具有高轉換搜尋意圖，也符合診所服務。', keywords: ['震波治療有效嗎', '震波治療多久一次', '震波治療副作用'], patientRelevance: 92, clinicalFit: 99 },
  { key: 'running-injury', category: '運動醫學', probe: '跑步 膝蓋痛 怎麼辦', terms: ['跑步', '跑者', 'running injury', 'runner', '髂脛束'], titles: ['跑步膝蓋外側痛，是髂脛束症候群嗎？', '跑完膝蓋痛還能繼續跑嗎？如何調整里程與強度', '準備路跑最怕受傷：新手常見三種疼痛與預防方式'], summary: '從訓練量、跑姿與肌力說明常見跑步傷害，提供回跑判斷。', rationale: '賽季與路跑活動會帶動短期搜尋，且讀者具高度運動參與需求。', keywords: ['跑步膝蓋外側痛', '跑完膝蓋痛', '路跑訓練受傷'], patientRelevance: 95, clinicalFit: 98 },
  { key: 'badminton-pickleball', category: '運動醫學', probe: '羽球 運動傷害 肩膀', terms: ['羽球', '匹克球', 'pickleball', 'badminton'], titles: ['打羽球肩膀痛，是旋轉肌受傷嗎？', '匹克球很安全嗎？手肘、膝蓋與腳踝常見傷害', '球拍運動後手肘痛：休息幾天才能再打？'], summary: '結合熱門球拍運動，整理肩、肘、膝踝常見傷害與回場標準。', rationale: '熱門運動事件與參與人口能創造時事型搜尋，同時符合運動醫學專業。', keywords: ['羽球肩膀痛', '匹克球運動傷害', '打球手肘痛'], patientRelevance: 91, clinicalFit: 97 },
  { key: 'acl-meniscus', category: '膝關節', probe: '十字韌帶 半月板 受傷 症狀', terms: ['十字韌帶', 'ACL', '半月板', 'meniscus'], titles: ['膝蓋扭到啪一聲，是十字韌帶斷裂嗎？', '半月板受傷一定要開刀嗎？卡住、腫脹與治療判斷', 'ACL 手術後多久能跑跳？復健里程碑怎麼看'], summary: '解釋急性膝傷警訊、理學與影像檢查，以及保守或手術後復健決策。', rationale: '球類運動傷害常伴隨急迫搜尋，文章可提供高價值的早期判斷。', keywords: ['膝蓋扭到啪一聲', '半月板受傷症狀', 'ACL術後多久能運動'], patientRelevance: 95, clinicalFit: 98 },
  { key: 'hip-pain', category: '髖部疼痛', probe: '髖關節痛 走路 痛', terms: ['髖關節痛', '髖部疼痛', 'hip pain', 'greater trochanter'], titles: ['走路時髖關節痛，是退化還是肌腱發炎？', '側睡壓到髖部會痛：大轉子疼痛症候群是什麼', '屁股深處痛就是梨狀肌嗎？髖、腰與神經怎麼分'], summary: '用疼痛位置和誘發動作區分髖關節、肌腱、腰椎與神經相關問題。', rationale: '髖部疼痛容易被誤認為腰痛或坐骨神經痛，具差異化衛教價值。', keywords: ['走路髖關節痛', '側睡髖部痛', '屁股深處痛'], patientRelevance: 92, clinicalFit: 96 },
  { key: 'child-growth', category: '兒童成長', probe: '小孩 長不高 骨齡', terms: ['兒童長高', '長不高', '骨齡', '生長板', '生長遲緩'], titles: ['孩子長不高要看骨齡嗎？什麼情況需要評估', '跳繩真的能長高嗎？運動、睡眠與營養怎麼安排', '孩子突然長很快是性早熟嗎？家長要注意哪些變化'], summary: '協助家長理解生長曲線、骨齡、生活習慣與需要進一步評估的警訊。', rationale: '家長搜尋需求穩定，且常以問題句尋找可執行建議與檢查資訊。', keywords: ['小孩長不高骨齡', '跳繩會長高嗎', '兒童生長遲緩'], patientRelevance: 97, clinicalFit: 93 },
  { key: 'scoliosis', category: '兒童與脊椎', probe: '脊椎側彎 小孩 怎麼辦', terms: ['脊椎側彎', 'scoliosis'], titles: ['孩子肩膀一高一低，是脊椎側彎嗎？', '脊椎側彎幾度要治療？觀察、運動與背架怎麼選', '小孩脊椎側彎可以重訓嗎？安全運動原則'], summary: '說明居家觀察、Cobb 角度、追蹤頻率與不同治療階段。', rationale: '家長對外觀變化與治療門檻焦慮高，精準解答能建立可信度。', keywords: ['小孩脊椎側彎怎麼辦', '脊椎側彎幾度要背架', '脊椎側彎可以重訓嗎'], patientRelevance: 94, clinicalFit: 96 },
  { key: 'weather-pain', category: '生活疼痛', probe: '天氣變化 關節痛', terms: ['天氣痛', '低氣壓', '寒流', 'weather pain'], titles: ['天氣一變關節就痛，真的是低氣壓造成的嗎？', '寒流肩頸腰痠痛：保暖、活動與就醫警訊', '下雨天舊傷會痛有科學根據嗎？'], summary: '從氣壓、溫度與活動量解釋天氣相關疼痛，提供安全應對方法。', rationale: '可隨天氣新聞快速上升，適合結合近期時事但仍維持醫療實用性。', keywords: ['天氣變化關節痛', '低氣壓舊傷痛', '寒流肩頸痠痛'], patientRelevance: 91, clinicalFit: 89 },
  { key: 'ergonomics', category: '職場復健', probe: '久坐 腰痛 肩頸痛', terms: ['久坐', '辦公室', '人體工學', 'ergonomic', '上班族'], titles: ['久坐腰痛怎麼調整？椅子高度與每小時活動方法', '上班族肩頸痠痛：螢幕不是越高越好', '站立辦公真的比較健康嗎？久坐與久站如何交替'], summary: '提供上班族可直接執行的工作站調整、活動休息與症狀警訊。', rationale: '新竹科技工作族群高度相關，具有在地搜尋和分享潛力。', keywords: ['久坐腰痛怎麼辦', '辦公室肩頸痠痛', '站立辦公腰痛'], patientRelevance: 97, clinicalFit: 96 },
  { key: 'exercise-recovery', category: '運動恢復', probe: '運動後 肌肉痠痛 幾天', terms: ['運動後痠痛', '肌肉痠痛', 'DOMS', 'recovery'], titles: ['運動後痠痛幾天算正常？受傷與延遲性痠痛怎麼分', '重訓後可以按摩或泡熱水嗎？恢復方法一次看', '痠痛還能繼續運動嗎？用三個指標判斷'], summary: '區分正常訓練反應和拉傷警訊，整理恢復、休息與重返訓練原則。', rationale: '健身族群常在運動後立即搜尋，適合搶占具時效的症狀問句。', keywords: ['運動後肌肉痠痛幾天', '痠痛可以繼續運動嗎', 'DOMS肌肉痠痛'], patientRelevance: 96, clinicalFit: 94 },
  { key: 'achilles', category: '足踝疼痛', probe: '阿基里斯腱痛 跑步', terms: ['阿基里斯腱', '跟腱', 'achilles'], titles: ['跑步後腳跟上方痛，是阿基里斯腱炎嗎？', '阿基里斯腱痛可以繼續跑嗎？負荷調整與復健', '突然像被踢到小腿：阿基里斯腱斷裂有哪些警訊'], summary: '說明跟腱過度使用和急性斷裂的差異，提供負荷管理與就醫時機。', rationale: '跑者與球類運動者常見，症狀型關鍵字具有清楚搜尋意圖。', keywords: ['阿基里斯腱痛跑步', '跟腱炎復健', '阿基里斯腱斷裂症狀'], patientRelevance: 93, clinicalFit: 97 },
  { key: 'gout', category: '關節急症', probe: '痛風 腳突然腫痛', terms: ['痛風', '尿酸', 'gout'], titles: ['半夜腳趾突然腫痛，是痛風嗎？', '痛風發作可以按摩或熱敷嗎？急性期注意事項', '尿酸正常也會痛風嗎？檢驗時機與常見迷思'], summary: '整理痛風急性症狀、就醫判斷與容易誤用的自我處理方式。', rationale: '急性關節腫痛常造成即時搜尋，適合提供安全分流並避免延誤感染性關節炎。', keywords: ['腳趾突然腫痛', '痛風可以熱敷嗎', '尿酸正常會痛風嗎'], patientRelevance: 95, clinicalFit: 88 },
  { key: 'glp1-muscle', category: '減重與肌力', probe: '瘦瘦針 肌肉流失 運動', terms: ['瘦瘦針', '猛健樂', '週纖達', 'GLP-1', 'semaglutide', 'tirzepatide'], titles: ['使用瘦瘦針會掉肌肉嗎？蛋白質與阻力訓練怎麼安排', '減重期間如何保住肌肉？肌力、速度與體重一起看', '瘦得快卻沒力氣：何時要注意肌肉流失'], summary: '以復健與運動醫學角度說明減重期間肌肉保存、訓練和需要評估的警訊。', rationale: '減重藥物持續受到關注，結合肌肉健康能創造差異化且與診所服務相關的內容。', keywords: ['瘦瘦針肌肉流失', '減重阻力訓練', '猛健樂蛋白質'], patientRelevance: 94, clinicalFit: 89 },
  { key: 'sports-star-injury', category: '時事運動醫學', probe: '知名球星 受傷 復健', terms: ['受傷', '傷退', '傷勢', '報銷', 'ACL', '十字韌帶', '阿基里斯腱'], contextTerms: ['球星', '球員', '選手', '投手', 'NBA', 'MLB', '中職'], titles: ['球星受傷後多久能回場？從最新體育新聞看復健里程碑', '知名選手帶傷出賽安全嗎？運動醫學如何評估風險', '球員宣布傷退後發生什麼事？檢查、治療與重返賽場'], summary: '從近期知名運動員受傷事件切入，說明傷勢判讀、復健階段與安全回場標準。', rationale: '知名球星傷勢會快速帶動搜尋與社群討論，結合正確運動醫學解讀可兼顧時效與臨床價值。', keywords: ['球星受傷復健', '運動員多久能復出', '運動傷害回場評估'], patientRelevance: 92, clinicalFit: 98, currentEventTitle: 'injury' },
  { key: 'athlete-chronic-condition', category: '時事運動健康', probe: '第一型糖尿病 運動員 冠軍', terms: ['第一型糖尿病', '1型糖尿病', 'type 1 diabetes', 'T1D', '慢性病'], contextTerms: ['球員', '選手', '運動員', '冠軍', '奪冠', '金牌', 'champion', 'athlete'], titles: ['第一型糖尿病也能成為冠軍選手？運動、血糖與低血糖風險', '慢性病運動員如何備戰？從近期奪冠新聞談健康管理', '運動員有第一型糖尿病：訓練與比賽要注意什麼'], summary: '結合近期運動員故事，說明慢性病患者參與運動時的監測、補給與醫療團隊合作。', rationale: '正向的運動員時事能引發高度分享，同時回應慢性病患者「能否安全運動」的真實需求。', keywords: ['第一型糖尿病運動', '糖尿病運動員', '運動低血糖預防'], patientRelevance: 89, clinicalFit: 83, currentEventTitle: 'athlete-health' },
];

const NEWS_QUERIES = [
  '(骨科 OR 復健科 OR 關節 OR 肌腱 OR 腰痛 OR 肩痛) when:7d',
  '(運動傷害 OR 跑步受傷 OR 羽球受傷 OR 籃球受傷) when:7d',
  '(PRP OR 震波治療 OR 骨質疏鬆 OR 肌少症) when:7d',
  '(兒童長高 OR 骨齡 OR 性早熟 OR 脊椎側彎) when:7d',
  '(球星 OR 球員 OR 選手) (受傷 OR 傷退 OR 手術 OR 復健 OR 復出) when:7d',
  '(NBA OR MLB OR 中華職棒 OR 羽球 OR 網球 OR 籃球 OR 棒球 OR 足球) (受傷 OR 傷勢 OR 冠軍 OR 復出) when:7d',
  '(第一型糖尿病 OR type 1 diabetes) (運動員 OR 球員 OR 選手 OR 冠軍) when:30d',
];

const META_AD_QUERIES = ['關節痛 復健', '運動傷害', '疼痛治療', '減重 肌肉'];

function hash(value: string): number {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function decodeXml(value: string): string {
  return value
    .replace(/^<!\[CDATA\[|\]\]>$/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
}

function canonicalStoryKey(title: string): string {
  return title
    .replace(/\s*[|｜-]\s*[^|｜-]+$/, '')
    .replace(/[^\p{L}\p{N}]/gu, '')
    .slice(0, 32);
}

async function fetchText(url: string, timeoutMs = 7000): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'DryiChenContentStudio/1.0 (medical topic research)' },
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

function decodeEmbeddedJson(value: string): string {
  try {
    return JSON.parse(`"${value}"`) as string;
  } catch {
    return decodeXml(value);
  }
}

async function fetchNewsSignals(profiles: TopicProfile[]): Promise<NewsSignal[]> {
  const profileQueries = profiles.map((profile) => {
    const subject = profile.terms.slice(0, 5).join(' OR ');
    const context = profile.contextTerms?.slice(0, 5).join(' OR ');
    return `(${subject})${context ? ` (${context})` : ''} when:14d`;
  });
  const queries = [...NEWS_QUERIES, ...profileQueries];
  const results = await Promise.allSettled(queries.map(async (query) => {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=zh-TW&gl=TW&ceid=TW:zh-Hant`;
    const xml = await fetchText(url);
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 40).map((match) => {
      const item = match[1];
      const title = decodeXml(item.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
      const link = decodeXml(item.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || '');
      const pubDate = decodeXml(item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] || '');
      return { title, url: link, publishedAt: pubDate ? new Date(pubDate).toISOString() : undefined };
    }).filter((item) => item.title && item.url);
  }));
  const unique = new Map<string, NewsSignal>();
  for (const result of results) {
    if (result.status !== 'fulfilled') continue;
    for (const item of result.value) {
      const storyKey = canonicalStoryKey(item.title);
      if (!unique.has(storyKey)) unique.set(storyKey, item);
    }
  }
  return [...unique.values()];
}

async function fetchTrendSignals(): Promise<TrendSignal[]> {
  const xml = await fetchText('https://trends.google.com/trending/rss?geo=TW');
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((match) => {
    const item = match[1];
    const title = decodeXml(item.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
    const traffic = decodeXml(item.match(/<ht:approx_traffic>([\s\S]*?)<\/ht:approx_traffic>/i)?.[1] || '');
    const pubDate = decodeXml(item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] || '');
    const relatedNews = [...item.matchAll(/<ht:news_item>([\s\S]*?)<\/ht:news_item>/gi)].map((newsMatch) => {
      const newsItem = newsMatch[1];
      return {
        title: decodeXml(newsItem.match(/<ht:news_item_title>([\s\S]*?)<\/ht:news_item_title>/i)?.[1] || ''),
        url: decodeXml(newsItem.match(/<ht:news_item_url>([\s\S]*?)<\/ht:news_item_url>/i)?.[1] || ''),
        publishedAt: pubDate ? new Date(pubDate).toISOString() : undefined,
      };
    }).filter((news) => news.title && news.url);
    return {
      title,
      traffic,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : undefined,
      url: `https://trends.google.com/trends/explore?date=now%207-d&geo=TW&q=${encodeURIComponent(title)}`,
      relatedNews,
    };
  }).filter((item) => item.title);
}

async function fetchMetaAdSignals(): Promise<AdSignal[]> {
  const results = await Promise.allSettled(META_AD_QUERIES.map(async (query) => {
    const url = `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=TW&q=${encodeURIComponent(query)}&search_type=keyword_unordered`;
    const html = await fetchText(url, 10000);
    const ads: AdSignal[] = [];
    const pattern = /"page_name":"((?:\\.|[^"\\])*)"[\s\S]{0,3000}?"body":\{"text":"((?:\\.|[^"\\])*)"\}/g;
    for (const match of html.matchAll(pattern)) {
      const pageName = decodeEmbeddedJson(match[1]);
      const text = decodeEmbeddedJson(match[2]).replace(/\s+/g, ' ').trim();
      if (pageName && text) ads.push({ pageName, text, url });
    }
    return ads;
  }));
  const unique = new Map<string, AdSignal>();
  for (const result of results) {
    if (result.status !== 'fulfilled') continue;
    for (const ad of result.value) {
      const key = `${ad.pageName}-${ad.text.slice(0, 100)}`;
      if (!unique.has(key)) unique.set(key, ad);
    }
  }
  return [...unique.values()].slice(0, 120);
}

async function fetchSuggestions(profile: TopicProfile): Promise<{ profileKey: string; suggestions: string[] }> {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=zh-TW&q=${encodeURIComponent(profile.probe)}`;
  const parsed = JSON.parse(await fetchText(url)) as unknown;
  const suggestions = Array.isArray(parsed) && Array.isArray(parsed[1])
    ? parsed[1].filter((item): item is string => typeof item === 'string').slice(0, 8)
    : [];
  return { profileKey: profile.key, suggestions };
}

async function fetchLiteratureSignals(): Promise<LiteratureSignal[]> {
  const term = '((musculoskeletal[Title/Abstract]) OR orthopedic[Title/Abstract] OR rehabilitation[Title/Abstract] OR sports medicine[Title/Abstract] OR physical therapy[Title/Abstract]) AND ("last 90 days"[PDat])';
  const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=100&sort=pub+date&tool=dryichen_content_studio&term=${encodeURIComponent(term)}`;
  const search = JSON.parse(await fetchText(searchUrl)) as { esearchresult?: { idlist?: string[] } };
  const ids = search.esearchresult?.idlist || [];
  if (!ids.length) return [];
  const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&tool=dryichen_content_studio&id=${ids.join(',')}`;
  const summary = JSON.parse(await fetchText(summaryUrl)) as { result?: Record<string, { title?: string }> };
  return ids.map((id) => ({
    title: summary.result?.[id]?.title || '',
    url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
  })).filter((item) => item.title);
}

function matchesProfile(text: string, profile: TopicProfile): boolean {
  const normalized = text.toLocaleLowerCase('zh-TW');
  if (profile.excludeTerms?.some((term) => normalized.includes(term.toLocaleLowerCase('zh-TW')))) return false;
  const hasTopicTerm = profile.terms.some((term) => normalized.includes(term.toLocaleLowerCase('zh-TW')));
  const hasRequiredContext = !profile.contextTerms
    || profile.contextTerms.some((term) => normalized.includes(term.toLocaleLowerCase('zh-TW')));
  return hasTopicTerm && hasRequiredContext;
}

function currentEventTitle(profile: TopicProfile, newsMatches: NewsSignal[]): string | undefined {
  if (!profile.currentEventTitle || !newsMatches.length) return undefined;
  const headline = newsMatches[0].title.replace(/\s*[|｜-]\s*[^|｜-]+$/, '').trim();
  const shortened = headline.length > 30 ? `${headline.slice(0, 30)}…` : headline;
  return profile.currentEventTitle === 'injury'
    ? `「${shortened}」：從球星傷勢看復健與安全回場`
    : `「${shortened}」：慢性病運動員如何訓練與比賽`;
}

function chooseTitle(profile: TopicProfile, runDate: string, recentTitles: string[]): string {
  const month = Number(runDate.slice(5, 7));
  const seasonalTitles = profile.titles.filter((title) => !title.includes('寒流') || [11, 12, 1, 2].includes(month));
  const availableTitles = seasonalTitles.length ? seasonalTitles : profile.titles;
  const start = hash(`${runDate}-${profile.key}`) % availableTitles.length;
  for (let offset = 0; offset < availableTitles.length; offset += 1) {
    const title = availableTitles[(start + offset) % availableTitles.length];
    if (!recentTitles.includes(title)) return title;
  }
  return availableTitles[start];
}

export async function discoverDailyTopics(input: {
  runDate: string;
  recentTopicIds?: string[];
  recentTitles?: string[];
  excludedTopicIds?: string[];
  count?: number;
  variationSeed?: string;
}): Promise<ContentTopic[]> {
  const recentIds = input.recentTopicIds || [];
  const excludedIds = input.excludedTopicIds || [];
  const recentTitles = input.recentTitles || [];
  const selectionSeed = `${input.runDate}-${input.variationSeed || 'daily'}`;
  const freshProfiles = TOPIC_PROFILES.filter((profile) =>
    ![...recentIds, ...excludedIds].some((id) => id.endsWith(`-${profile.key}`)),
  );
  const pool = freshProfiles.length >= 12 ? freshProfiles : TOPIC_PROFILES;
  const suggestionProfiles = [...pool]
    .sort((left, right) => hash(`${selectionSeed}-${left.key}`) - hash(`${selectionSeed}-${right.key}`))
    .slice(0, 14);

  const [newsResult, literatureResult, trendResult, adResult, ...suggestionResults] = await Promise.allSettled([
    fetchNewsSignals(suggestionProfiles),
    fetchLiteratureSignals(),
    fetchTrendSignals(),
    fetchMetaAdSignals(),
    ...suggestionProfiles.map(fetchSuggestions),
  ]);
  const news = newsResult.status === 'fulfilled' ? newsResult.value : [];
  const literature = literatureResult.status === 'fulfilled' ? literatureResult.value : [];
  const trends = trendResult.status === 'fulfilled' ? trendResult.value : [];
  const ads = adResult.status === 'fulfilled' ? adResult.value : [];
  const suggestionsByProfile = new Map<string, string[]>();
  for (const result of suggestionResults) {
    if (result.status === 'fulfilled') suggestionsByProfile.set(result.value.profileKey, result.value.suggestions);
  }
  const externalSignalCount = news.length + literature.length + trends.length + ads.length
    + [...suggestionsByProfile.values()].reduce((total, suggestions) => total + suggestions.length, 0);
  if (!externalSignalCount) throw new Error('No current search, news, or literature signals were available.');

  const now = new Date().toISOString();
  const candidates = TOPIC_PROFILES.map((profile) => {
    const trendMatches = trends.filter((item) => matchesProfile(item.title, profile)).slice(0, 2);
    const trendNews = trends.flatMap((item) => item.relatedNews).filter((item) => matchesProfile(item.title, profile));
    const newsMatches = [...news, ...trendNews]
      .filter((item) => matchesProfile(item.title, profile))
      .filter((item, index, items) => items.findIndex((candidate) => candidate.title === item.title) === index)
      .slice(0, 5);
    const literatureMatches = literature.filter((item) => matchesProfile(item.title, profile)).slice(0, 2);
    const adMatches = ads.filter((item) => matchesProfile(`${item.pageName} ${item.text}`, profile)).slice(0, 2);
    const suggestions = suggestionsByProfile.get(profile.key) || [];
    const evidenceTypes = Number(newsMatches.length > 0) + Number(literatureMatches.length > 0)
      + Number(suggestions.length > 0) + Number(trendMatches.length > 0) + Number(adMatches.length > 0);
    const recentNews = newsMatches.some((item) => item.publishedAt && Date.now() - new Date(item.publishedAt).getTime() < 48 * 60 * 60 * 1000);
    const timeliness = Math.min(98, 55 + newsMatches.length * 6 + literatureMatches.length * 4
      + trendMatches.length * 12 + adMatches.length * 3 + (recentNews ? 7 : 0) + (suggestions.length ? 4 : 0));
    const searchIntent = Math.min(98, 70 + Math.min(suggestions.length, 5) * 4
      + trendMatches.length * 9 + (newsMatches.length ? 4 : 0) + (adMatches.length ? 3 : 0));
    const differentiation = Math.min(95, 72 + evidenceTypes * 7 + (recentIds.some((id) => id.endsWith(`-${profile.key}`)) ? -18 : 5));
    const evidenceText = [...suggestions, ...trendMatches.map((item) => item.title),
      ...newsMatches.map((item) => item.title), ...literatureMatches.map((item) => item.title),
      ...adMatches.map((item) => item.text)].join(' ');
    let title = chooseTitle(profile, `${input.runDate}-${input.variationSeed || ''}`, recentTitles);
    title = currentEventTitle(profile, newsMatches) || title;
    if (profile.key === 'child-growth') {
      if (/性早熟/.test(evidenceText)) title = profile.titles[2];
      else if (/骨齡|長不高|身高停滯|長高變慢|生長遲緩/.test(evidenceText)) title = profile.titles[0];
    }
    const sources: TopicSourceSignal[] = [];

    if (suggestions.length) {
      sources.push({
        label: 'Google 搜尋建議（台灣繁中）',
        sourceType: 'search-trend',
        note: `病患實際搜尋語句包含：${suggestions.slice(0, 4).join('、')}`,
        url: `https://www.google.com/search?q=${encodeURIComponent(profile.probe)}`,
      });
    }
    for (const item of trendMatches.slice(0, 1)) {
      sources.push({
        label: `Google Trends 台灣即時上升：${item.title}`,
        sourceType: 'search-trend',
        note: `Trending Now 顯示約 ${item.traffic || '未標示'} 次搜尋；此為相對熱度訊號，不等於固定搜尋量。`,
        url: item.url,
      });
    }
    for (const item of newsMatches.slice(0, 3)) {
      sources.push({ label: `近期新聞：${item.title}`, sourceType: 'news', note: `Google News 與 Google Trends 相關報導交叉搜尋訊號${item.publishedAt ? `，發布於 ${item.publishedAt.slice(0, 10)}` : ''}。`, url: item.url });
    }
    for (const item of literatureMatches.slice(0, 2)) {
      sources.push({ label: `近 90 日 PubMed：${item.title}`, sourceType: 'medical-literature', note: '近期收錄的醫學研究；撰稿時仍須核對研究設計與結論。', url: item.url });
    }
    for (const item of adMatches) {
      sources.push({
        label: `Meta 台灣現正投放廣告：${item.pageName}`,
        sourceType: 'advertising',
        note: `公開廣告文案訊號：${item.text.slice(0, 140)}${item.text.length > 140 ? '…' : ''}。廣告只代表市場正在推廣，不代表療效或醫學證據。`,
        url: item.url,
      });
    }
    sources.push({
      label: 'Threads 即時話題人工查核',
      sourceType: 'social',
      note: '開啟 Threads 搜尋查看近期貼文量、發文時間與互動；匿名頁面不提供可靠熱門度數字，因此不虛構計入分數。',
      url: `https://www.threads.com/search?q=${encodeURIComponent(profile.probe)}&serp_type=default`,
    });
    if (!trendMatches.length) {
      sources.push({
        label: 'Google Trends 台灣近 7 日比較',
        sourceType: 'search-trend',
        note: '此題未必進入 Trending Now 即時榜；可由此檢查近 7 日搜尋興趣走勢與相關查詢。',
        url: `https://trends.google.com/trends/explore?date=now%207-d&geo=TW&q=${encodeURIComponent(profile.probe)}`,
      });
    }
    if (!adMatches.length) {
      sources.push({
        label: 'Meta 台灣廣告資料庫查核',
        sourceType: 'advertising',
        note: '本輪未解析到直接相符的現正投放廣告；保留公開搜尋入口供人工比較市場文案，不列入自動分數。',
        url: `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=TW&q=${encodeURIComponent(profile.probe)}&search_type=keyword_unordered`,
      });
    }
    if (!sources.some((source) => !['social', 'advertising'].includes(source.sourceType))) {
      sources.push({ label: '診間高頻問題資料庫', sourceType: 'clinic-observation', note: profile.rationale });
    }

    return {
      topic: {
        id: `topic-${input.runDate}-${profile.key}`,
        title,
        category: profile.category,
        summary: profile.summary,
        rationale: `${profile.rationale} 本次依 ${evidenceTypes || 1} 類可量化訊號交叉評估（Google Trends、搜尋問句、近期新聞、醫學文獻、Meta 廣告）；Threads 與未命中的查核入口不灌入分數。`,
        longTailKeywords: [...new Set([...suggestions.slice(0, 3), ...profile.keywords])].slice(0, 6),
        score: calculateTopicScore({
          timeliness,
          patientRelevance: profile.patientRelevance,
          clinicalFit: profile.clinicalFit,
          searchIntent,
          differentiation,
        }),
        sources,
        status: 'new' as const,
        runDate: input.runDate,
        discoveredAt: now,
        updatedAt: now,
      },
      evidenceTypes,
      evidenceCount: newsMatches.length + literatureMatches.length + trendMatches.length
        + adMatches.length + Math.min(suggestions.length, 5),
      currentEvent: Boolean(profile.currentEventTitle && newsMatches.length >= 2),
      recentlyUsed: recentIds.some((id) => id.endsWith(`-${profile.key}`)),
    };
  });

  const ranked = candidates.sort((left, right) => {
    if (left.recentlyUsed !== right.recentlyUsed) return Number(left.recentlyUsed) - Number(right.recentlyUsed);
    if (left.currentEvent !== right.currentEvent) return Number(right.currentEvent) - Number(left.currentEvent);
    if (right.evidenceTypes !== left.evidenceTypes) return right.evidenceTypes - left.evidenceTypes;
    if (right.topic.score.total !== left.topic.score.total) return right.topic.score.total - left.topic.score.total;
    return right.evidenceCount - left.evidenceCount;
  });
  const eligible = ranked.filter((item) => !excludedIds.some((id) => id === item.topic.id));
  return eligible.slice(0, Math.min(5, Math.max(1, input.count || 5))).map((item) => item.topic);
}

export function taipeiDate(date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(date);
}
