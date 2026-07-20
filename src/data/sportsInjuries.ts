// src/data/sportsInjuries.ts

import { newsList, getNewsById } from '@/data/news'

export const sportsInjuriesData = [



   {
    category: 'problem',
    title: '診間病患常見疑問',
    description: '統整病患在診間常見疑問，一次幫大家解惑',
    image: '/images/sportinjury/9.webp',
    injuries: [
                                    {
        slug: 'home-core-stretching-guide',
        title: '居家核心訓練全指南：棒式、橋式等，哪些腰痛病患適合做？',
        description: '深入解析居家常見核心運動（棒式、橋式、鳥狗式）與伸展動作（嬰兒式、眼鏡蛇式、貓牛式）的訓練肌群、建議時長與組數，並說明各類腰部疾患（椎間盤突出、脊椎狹窄、脊椎滑脫）的適應與禁忌，以實證為依據，提供安全有效的居家復健建議。',
        image: '/images/news/article/coreexercise1.webp',
      },
                              {
        slug: 'tissue-healing-time-analysis',
        title: '身體受傷多久會好？肌肉、肌腱、韌帶、骨頭修復全解析',
        description: '受傷後「要休息多久？」是復健科門診最常見的問題。身體各種組織的修復速度，取決於其血液循環能力與細胞代謝率。肌肉擁有豐富血流，通常數週內可修復；而肌腱與韌帶血流較差，常需要數月時間重建；關節軟骨更因缺乏血管，自我修復能力極低。本文將從醫學角度，帶您一次看懂五大類組織的修復時程，並破除「完全靜養」的傳統迷思。',
        image: '/images/news/article/tissue-healing-analysis.webp',
      },
                                    {
        slug: 'cold-vs-heat-therapy-guide',
        title: '冷敷與熱敷全攻略：發炎、痠痛、運動或注射後該怎麼敷？',
        description: '冷敷與熱敷最常被誤用。本篇由運動醫學與復健科臨床角度出發，深入剖析急性傷害、慢性疼痛及遲發性肌肉痠痛（DOMS）的溫度干預原則。更針對體外震波（ESWT）與 PRP 注射術後的黃金修復期，提供不可不知的冷熱敷禁忌與居家實作指南。',
        image: '/images/news/article/cold-vs-heat-therapy-guide.webp',
      },
                                    {
        slug: 'pediatric-lower-extremity-development',
        title: '掌握兒童腿型發育：從O型腿、X型腿到扁平足，何時需要就醫？',
        description: '從兒童骨科醫學角度深入剖析孩子從出生到學齡期的腿型與足弓演變軌跡。絕大多數的O型腿、X型腿與腳底貼地都屬於正常的生理性發育現象，不需穿矯正鞋。實證研究告訴你各年齡段的正常時程，並教你精準分辨真正需要醫療介入的發展警訊。',
        image: '/images/news/article/pediatric-legs-flat-feet.webp',
      },
                                          {
        slug: 'hallux-valgus-guide',
        title: '拇指外翻完全解析：成因、症狀、治療一次搞懂',
        description: '深度解析拇指外翻（拇趾外翻）的成因、分級與症狀。實證研究揭露矯正器能否真正讓角度回正、何時才需要考慮手術，以及日常生活如何減緩疼痛與惡化。',
        image: '/images/news/article/hallux-valgus-guide.webp',
      },
                  {
        slug: 'children-squatting-difficulty',
        title: '小朋友蹲不下去？學校健檢發現蹲踞困難，家長必讀完整解析',
        description: '學校健康檢查發現孩子蹲踞困難，家長先別緊張！本文完整解析蹲踞困難的常見原因——從跟腱過緊、扁平足、髖關節發育問題到股骨過度前傾，並說明何時需要就醫、如何配合治療，幫助家長正確認識、不過度焦慮。',
        image:  '/images/news/article/squatting-difficulty.webp',
      },
                  {
        slug: 'rehab-electrotherapy-guide',
        title: '復健科電療解析：吸盤跟貼片差在哪？家用電療能取代診所嗎？',
        description: '復健科的電療儀器其實分成好幾種，從常見的低頻貼片式電療（TENS、EMS），到診所常用的大吸盤中頻干擾波（IFC），原理與適用情境都不同。實證研究指出，吸盤電極的「吸附」本身並沒有比貼片電極多出額外的治療效果，差異主要在於方便性與適用部位。而市售家用電療機雖然外觀與貼片相似，但在輸出功率、波形種類與可調參數上，與診所治療用設備仍有明顯落差，因此無法完全取代專業復健治療。',
        image:  '/images/news/article/rehab-electrotherapy-guide.webp',
      },

                  {
        slug: 'medical-radiation-dose-analysis',
        title: 'X光輻射劑量全解:到底有多少輻射？跟坐飛機比誰更多？',
        description: '深度剖析四肢X光、胸部X光、脊椎X光、牙科X光與CT電腦斷層的實際輻射劑量。實證研究換算出這些檢查相當於自然背景輻射多少天，並比較長程飛機飛行的輻射量，幫助民眾以科學數據理性看待醫療輻射，減少不必要的檢查恐懼。',
        image:  '/images/news/article/medical-radiation-dose-analysis.webp',
      },
                  {
        slug: 'accessory-and-sesamoid-bones',
        title: '天生多塊骨頭？常見「副骨」與「種子骨」疼痛部位、診斷與根治策略',
        description: '人體骨骼發育過程中，部分人會額外長出「副骨」或「種子骨」。雖然多數終生無症狀，但反覆壓迫或過度使用常引發足弓內側、踝後、前腳掌或肩膀疼痛。本文從運動醫學與影像學角度，系統解析副舟狀骨、副三角骨、肩峰副骨等好發部位與核心治療策略。',
        image:  '/images/news/article/accessory-bones-pain-analysis.webp',
      },
                  {
        slug: 'lumbar-disc-traction-alternatives',
        title: '椎間盤突出可以自己拉腰嗎？吊單槓、倒立機 vs. 診所牽引',
        description: '腰椎椎間盤突出合併坐骨神經痛，除了到診所做牽引治療，很多人會想到公園吊單槓或買一台倒立機在家做「減壓」。這兩種方式真的能取代診所牽引嗎？效果差多少？本文根據隨機對照試驗與系統性回顧文獻，說明吊單槓可能造成的肩膀傷害，以及倒立機在血壓、眼壓上的潛在危險，幫助你做出安全的選擇。',
        image:  '/images/news/article/lumbardisc.webp',
      },
                      {
        slug: 'spinal-traction-guide',
        title: '拉腰、拉脖子全解析：要拉多久？牽引治療=全解析',
        description: '脊椎牽引（俗稱拉腰、拉脖子）是復健科治療下背痛、頸椎神經壓迫最常見的儀器之一，但多數民眾對「該拉多久」、「重量怎麼加」、「沒效能不能一直加重」始終一知半解。本文以實證研究與臨床常規為基礎，完整說明頸椎與腰椎牽引的療程長度、重量計算方式、頻率建議，以及多久該回診追蹤X光，幫助你安全有效地接受牽引治療。',
        image:  '/images/news/article/spinal-traction-guide.webp',
      },

                        {
        slug: 'bone-age-height-evaluation',
        title: '孩子發育黃金期：幾歲該照骨齡？附台灣各年級身高警戒值對照表',
        description: '從兒童內分泌與運動醫學角度深入剖析骨齡（骨骼年齡）的評估時機。一年長不到 4 公分、懷疑性早熟、或身高低於 PR3？本文提供台灣男女生各年級身高警戒值，帶您看懂骨齡超前與落後的臨床意義，把握生長板閉合前的黃金追趕期。',
        image:  '/images/news/article/bone-age-height-evaluation.webp',
      },

            {
        slug: 'orthopedics-vs-rehabilitation',
        title: '骨科 vs 復健科：完整比較指南｜哪個才是你的最佳選擇？',
        description: '骨科偏向外科手術，以X光評估硬組織；復健科以超音波評估軟組織，強調非手術的精準注射與功能重建。本文比較兩科強項、診所差異，教導民眾根據症狀正確選擇，少走冤枉路。',
        image:  '/images/news/article/orthopedics-vs-rehabilitation.webp',
      },
                  {
        slug: 'ultrasound-vs-xray-guide',
        title: '照X光還是超音波？復健科醫師教你秒懂差異與選擇時機？',
        description: '受傷後到底該照X光還是超音波？本文用最生活化的「蓋房子」比喻，帶你秒懂為什麼X光看不到韌帶，而超音波卻能將軟組織看個仔細。結合實證醫學，解析這兩種門診最常見檢查的優缺點，以及在扭傷、發炎或懷疑骨折時的最佳選擇策略。',
        image:  '/images/news/article/us-vs-xray-guide.webp',
      },

                  {
        slug: 'joint-crepitus-causes-and-treatments',
        title: '關節喀喀響是壞掉了嗎？運動醫學解析三大成因與就醫時機',
        description: '關節發出喀喀聲卻不痛？本文從運動醫學角度深度解析關節聲音（crepitus）的三大科學成因、各部位無痛性喀喀聲的差異，並整理出必須就醫的「紅旗警示」與日常保養策略。',
        image: '/images/news/article/joint-crepitus.webp',
      },
                        {
        slug: 'bone-spur-education',
        title: '照完X光聽到「長骨刺」！醫師告訴你骨刺的真相？',
        description: '許多人照完X光聽到「長骨刺」就非常緊張，以為馬上要壓到神經。本文以醫學觀點深入解析骨刺的成因、與椎間盤突出及脊椎滑脫的根本差異，並說明哪些情況才真正需要積極處理，幫助民眾正確認識脊椎退化問題。',
        image: '/images/news/article/bone-spur-education.webp',
      },
                              {
        slug: 'knee-pain-misdiagnosis-osteoarthritis',
        title: '照完X光只得到「退化」兩個字？膝蓋痛的成因全解析',
        description: '許多膝蓋痛患者常被貼上「退化」標籤並推銷高額注射。醫學實證顯示，X光退化與實際疼痛相關性薄弱。本文深入剖析半月板損傷、髕骨股骨疼痛症候群、鵝足滑囊炎等真正病因，教你如何看懂X光限制、破解常見三大迷思，並在診間提出關鍵五問以自保。',
        image: '/images/news/article/knee-pain-osteoarthritis-myth.webp',
      },
                        {
        slug: 'ice-heat-therapy-guide',
        title: '冰敷還是熱敷？運動醫學告訴你正確答案：腳扭傷、閃腰、落枕完整攻略',
        description: '腳扭傷要冰敷還是熱敷？閃到腰呢？運動完後又該怎麼辦？本文以運動醫學觀點，整合最新實證研究，詳細說明冰敷與熱敷的適應症、正確溫度、持續時間與頻率，讓你在家就能做出正確處置。',
        image: '/images/news/article/ice-heat-therapy.webp',
      },
                        {
        slug: 'joint-effusion-explained',
        title: '關節積水全解析：膝蓋腫起來裡面的水哪裡來？一定要抽嗎？',
        description: '膝蓋積水、關節腫脹讓人又痛又怕。本文以淺顯易懂的語言，解釋關節積液的來源、成分與功能，並依據最新實證醫學，說明什麼情況下需要抽水、什麼情況下不抽反而更好，以及放著不管對關節會有哪些長期影響。',
        image: '/images/news/article/joint-effusion-explained.webp',
      },

                  {
        slug: 'pain-medication-analysis',
        title: '疼痛就吃止痛藥？解析止痛藥與肌肉鬆弛劑的真相與風險',
        description: '深度剖析非類固醇消炎止痛藥（NSAIDs）、肌肉鬆弛劑、乙醯胺酚（普拿疼）的藥理機制與長期使用風險。實證研究揭露止痛藥只是「關掉警報」而非治療根源，並說明何時需要尋找疼痛的真正成因。',
        image: '/images/news/article/pain-medication-analysis.webp',
      },
                        {
        slug: 'pain-medication-combination-safety',
        title: '止痛藥解析：止痛藥、肌肉鬆弛劑、胃藥，為什麼醫師一起開？',
        description: '從臨床醫學與實證研究出發，深入剖析急性骨骼肌肉疼痛時，為何醫師會同時處方止痛藥（NSAIDs）、肌肉鬆弛劑與胃藥。一次看懂藥物協同作用原理、正確使用安全觀念，並全面破解「傷腎、肌肉變軟、普拿疼多吃沒關係」等三大常見用藥迷思。',
        image: '/images/news/article/pain-medication-combination.webp',
      },
            {
        slug: 'nsaid-hypersensitivity',
        title: 'NSAID（非類固醇消炎藥）過敏全解析：為什麼有人吃止痛藥會過敏？',
        description: '深度剖析NSAID過敏的發生比例、致病機轉、遺傳因素與交叉反應問題。實證研究揭露哪些NSAID最容易引發過敏，並提供過敏後的疼痛處理替代策略。',
        image: '/images/news/article/drug.webp',
      },
                  {
        slug: 'common-medication-myths-debunked',
        title: '讀懂手中的藥！破解台灣民眾最常見的七大用藥迷思',
        description: '「抗生素等於消炎藥？診所止痛藥都有類固醇？」本文從醫學實證出發，用白話文逐一剖析台灣民眾最常見的七大用藥誤解。深入探討抗生素、NSAIDs消炎止痛藥、類固醇與肌肉鬆弛劑的機制差異、潛在副作用與危險藥物交互作用，幫助你吃對藥、更安心。',
        image: '/images/news/article/medication-myths-debunked.webp',
      },
                     {
        slug: 'lumbar-disc-injection-analysis',
        title: '椎間盤突出免開刀？揭開「椎間盤內注射」的真!!',
        description: '深度剖析腰椎椎間盤突出接受PRP、羊膜、BMAC等椎間盤內注射的實際療效。實證研究揭露注射無法產生「撐開」神經壓迫的物理效果，傳統腰椎牽引與徒手治療仍是核心，而針對周邊韌帶與小面關節的輔助注射可能更具臨床價值。',
        image: '/images/news/article/lumbar-injection.webp',

      },
            {
        slug: 'cervical-disc-herniation-surgery-analysis',
        title: '頸椎椎間盤突出要開刀嗎？人工椎間盤置換全解析',
        description: '頸椎椎間盤突出常造成肩頸疼痛、手麻與無力。多數患者可透過復健獲得改善，但若出現神經進行性受損，則需考慮手術。本文以醫學觀點深入解析人工椎間盤置換術（CDA）與傳統融合手術（ACDF）的優缺點、術後後遺症及台灣自費價格，並探討保守治療與手術的選擇時機。',
        image: '/images/news/article/cervical-surgery.webp',

      },
               {
        slug: 'lumbar-disc-herniation-surgery',
        title: '腰椎椎間盤突出要開刀??  手術抉擇全解析',
        description: '腰椎椎間盤突出是造成坐骨神經痛與下背痛的主因之一。本文深入剖析傳統手術與脊椎微創手術（內視鏡/顯微鏡）的優缺點、術後沾黏等後遺症，以及台灣健保與自費價格大公開。實證醫學指出，若復健後症狀改善，人體具備吸收突出的自癒能力；但出現馬尾症候群等紅旗徵兆時，則應盡速評估手術。',
        image: '/images/news/article/lumbar-disc-herniation-surgery.webp',

      },

                     {
        slug: 'ganglion-cyst-recurrence-analysis',
        title: '腱鞘囊腫反覆復發怎麼辦？從成因到治療選項深度解析',
        description: '手腕長了圓圓軟軟的腫塊？從運動醫學與手外科角度深度剖析手腕腱鞘囊腫（Ganglion Cyst）反覆復發的根本原因。針頭抽液為何只是「清空水桶」？開放性手術與微創腕關節鏡手術誰的復發率低？完整比較五大治療選項，助你重拾手腕健康。',
        image: '/images/news/article/ganglion-cyst-recurrence-analysis.webp',

      },
            {
        slug: 'scoliosis-causes-treatment',
        title: '脊椎側彎完整指南：成因、角度變化與治療選項全解析',
        description: '脊椎側彎不只是外觀問題！深入解析特發性、先天性與退化性側彎的成因，Cobb角度是否能變回來，以及從觀察到手術的完整治療比較。',
        image: '/images/news/article/scoliosis-treatment.webp',
      },

                  {
        slug: 'spine-xray-report-dont-panic',
        title: '健檢報告異常別慌！教你看懂側彎與壓迫，真的需要擔心嗎？',
        description: '健檢報告寫著脊椎側彎或骨刺壓迫，你是不是嚇到睡不著？本文從骨科醫師的臨床角度，用白話文解釋報告怎麼看、為何重照常常「沒那麼嚴重」、哪些症狀才真的需要就醫，幫你從報告焦慮中解脫。',
        image: '/images/news/article/spine-report-anxiety.webp',
      },
                        {
        slug: 'posture-problems-explained',
        title: '富貴包、骨盆前傾、烏龜頸：你也有這些體態嗎？',
        description: '從醫學角度深入解析民眾最常見的體態困擾：富貴包（頸胸交界隆起）、骨盆前傾、烏龜頸與上交叉症候群。釐清成因、破除迷思，並提供有實證依據的矯正與治療策略。',
        image: '/images/news/article/posture-problems-explained.webp',
      },

      {
        slug: 'frozen-shoulder-and-diabetes',
        title: '五十肩與糖尿病的深度關聯：為什麼糖尿病患者更容易罹患五十肩？',
        description: '糖尿病患者五十肩風險高出5倍！深入解析AGEs糖化機制、血糖控制與五十肩的關係，以及完整治療選項比較。',
        image: '/images/news/article/frozen-shoulder-diabetes.webp',
      },
                  {
        slug: 'precocious-puberty-taiwan-depth-analysis',
        title: '台灣兒童性早熟全解析：定義、成因與家長的避雷指南',
        description: '深度剖析台灣兒童性早熟的醫學定義與在地成因。從骨齡超前、環境荷爾蒙干擾到飲食誤區，提供全方位的預防對策，幫助家長守護孩子的長高黃金期。',
        image: '/images/news/article/precocious-puberty.webp',
      },
                        {
        slug: 'children-height-guide',
        title: '兒童身高攻略全解析：遺傳、睡眠、飲食、運動，哪個最關鍵？',
        description: '深度解析影響兒童身高的各大因素——遺傳佔幾成？睡眠如何決定生長激素分泌？跳繩真的有效嗎？轉骨湯、益生菌、蛋白補充品又有哪些實證？本文以最新科學研究為基礎，帶你看懂長高攻略。',
        image: '/images/news/article/children-height-guide.webp',
      },
            {
        slug: 'statin-induced-myalgia-analysis',
        title: '吃降血脂藥全身痠痛？解析哪種血脂藥容易引發肌肉痛？',
        description: '深度剖析常見血脂藥（史他汀類藥物）引發肌肉痠痛的原因。實證醫學揭露親脂性與親水性血脂藥在肌肉副作用上的差異，並由林醫師提供臨床換藥與復健的科學改善策略。',
        image: '/images/news/article/statin-induced-myalgia1.webp',
      },
                  {
        slug: 'steroid-types-sports-medicine',
        title: '止痛的類固醇 vs. 增肌的類固醇：運動醫學完全解析，差別究竟在哪裡？',
        description: '許多人聽到「類固醇」就心生恐懼，但其實類固醇有兩大截然不同的種類：用於消炎止痛的「皮質類固醇」與用於增肌的「合成代謝類固醇」。本文以運動醫學觀點，用你看得懂的語言，深度解析兩者的機制、用途、風險，並澄清常見迷思。',
        image: '/images/news/article/steroid-types-sports-medicine.webp',
      },
                        {
        slug: 'orthopedic-rehab-medication-safety',
        title: '復健骨科常見五大類藥物長期使用會傷身嗎：止痛消炎藥、肌肉鬆弛劑，貼布等',
        description: '從實證醫學出發，深入剖析骨科與復健科最常開立的五大類藥物：肌肉鬆弛劑、乙醯胺酚、NSAIDs 消炎藥、外用藥膏與含藥貼布。本文將解密其作用機制、隱藏的長期副作用（如肝腎毒性、骨折癒合延遲）與安全使用期限，並釐清三大常見用藥誤區。',
        image: '/images/news/article/orthopedic-rehab-medication-safety.webp',
      },
                              {
        slug: 'mouth-pain-tmd-article',
        title: '嘴巴痛不一定是蛀牙！顳顎關節炎與牙痛的差別',
        description: '嘴巴痛只能看牙醫？從口顏面痛角度深入剖析蛀牙、顳顎關節炎（TMD）與咀嚼肌群緊繃的關鍵差異。臨床實證研究指出，TMD 是第二常見的顏面疼痛原因。本文帶您看懂四大關鍵症狀，並解析徒手治療、咬合板到口腔外科手術的階梯式全照護治療流程。',
        image: '/images/news/article/mouth-pain-tmd-analysis.webp',
      },
                                    {
        slug: 'frozen-shoulder-analysis',
        title: '五十肩全解析：成因是什麼？會自己好嗎？該如何治療？',
        description: '深度剖析五十肩（沾黏性肩關節囊炎）的真正成因、與年齡的關係、常見症狀，以及最多人誤解的問題——「放著不管會不會自己解凍？」實證研究顯示，五十肩的自然病程並不如傳說中那樣穩定痊癒，及早了解與介入才是關鍵。',
        image: '/images/news/article/frozen-shoulder-analysis.webp',
      },
                                    {
        slug: 'child-development-early-intervention',
        title: '兒童發展全解析：動作、語言發展里程碑，何時該上早療？',
        description: '深度解析兒童大動作、細動作與語言發展的正常里程碑，並說明各年齡層的發展警訊（red flags）。實證研究顯示早期發現、及早療育能顯著改善發展遲緩兒童的長期預後，本文以淺顯易懂的語言搭配圖表，幫助家長掌握黃金治療期。',
        image: '/images/news/article/child-development-early-intervention.webp',
      },
                                        {
        slug: 'manual-therapy-vs-massage-comparison',
        title: '物理治療師徒手治療：肌膜放鬆運動治療，跟坊間按摩差在哪？',
        description: '物理治療師的徒手治療（含肌膜放鬆）與坊間按摩，看似都是「用手處理痠痛」，本質卻大不相同。本文以實證研究為基礎，說明兩者在專業訓練、評估邏輯與治療目標上的差異，解析價格落差的原因，並提供效果比較與選擇建議。',
        image: '/images/news/article/manualtherapy.webp',
      },

    ]
  },

     {
    category: 'medical-updates',
    title: '最新醫療資訊',
    description: '林醫師持續更新精進醫療知識及技術，分享新的治療方式',
    image: '/images/sportinjury/10.webp',
    injuries: [
                              {
        slug: 'mounjaro-vs-wegovy-vs-rybelsus',
        title: '猛健樂 vs 週纖達 vs 瑞倍適：三大腸泌素藥物完整比較指南',
        description: '深度比較猛健樂（Mounjaro/Tirzepatide）、週纖達（Wegovy/Semaglutide）與瑞倍適（Rybelsus）的減重效果、副作用、使用方式與費用，結合SURMOUNT-5最新臨床實證，協助患者選擇最適合自己的減重方案。',
        image:  '/images/news/article/mounjaro-vs-wegovy-vs-rybelsus.webp',
      },
                        {
        slug: 'ge-logiq-totus-ultrasound',
        title: '診所正式引進 GE LOGIQ Totus——全球高階的肌肉骨骼超音波機',
        description: '診所正式引進旗艦等級 GE LOGIQ Totus 肌肉骨骼超音波。擁有超高解析度影像與多項智慧輔助功能，讓超音波導引注射更精準、更安全。',
        image:  '/images/news/article/gelotus/2.webp',
      },
                                    {
        slug: 'aapmr-2026-knee-oa-prp-guideline',
        title: '2026年PRP膝關節退化治療指引全解析：美國復健醫學會最新指引',
        description: '2026年美國復健醫學會（AAPM&R）發表膝關節退化PRP治療最新指引。本文以淺顯語言完整解析5項實證建議與11項最佳實務：包含輕中度退化療效、血小板總劑量需達100億顆、進階骨內注射技術，以及結合減重與肌力訓練的全人復健觀念。',
        image: '/images/news/article/aapmr-2026-knee-prp-guideline.webp',
      },
                              {
        slug: 'regenerative-injections-comparison-prp-plt-amniotic-bmc',
        title: 'PRP、PLT、羊膜、BMC 哪種好？再生注射療法2026完全指南',
        description: '深度對比復健科四大再生療法：PRP、PLT、羊膜注射與 BMC 骨髓濃縮液。解析為何年長者的 PRP 效果可能打折扣，以及如何根據自身細胞活性、病況嚴重程度與預算，選出最有效的修復方案。',
        image: '/images/news/article/regenerative-injections-comparison.webp',
      },
                                          {
        slug: 'prolotherapy-dextrose-prp',
        title: '增生療法全解析：高濃度葡萄糖 vs. PRP，哪個更適合你？',
        description: '用白話的方式解釋增生療法的原理，並深入比較高濃度葡萄糖（Dextrose Prolotherapy）與富血小板血漿（PRP）的機制、效果與適應症。實證研究帶你了解這兩種再生療法的差異，幫助你做出更明智的治療選擇。',
        image: '/images/news/article/prolotherapy-dextrose-prp1.webp',
      },
                                                {
        slug: 'prp-sports-medicine-athletes',
        title: 'PRP治療在運動醫學的應用：職業球星重返球場的秘密武器',
        description: '深入解析PRP（高濃度血小板）治療的作用機制，回顧Tiger Woods、Rafael Nadal、Kobe Bryant等知名球員的使用案例，並以系統性回顧與隨機對照試驗說明PRP在肌腱病變、韌帶損傷等運動醫學領域已累積充足的臨床實證。',
        image: '/images/news/article/prp-sports-medicine-athletes.webp',
      },
                                          {
        slug: 'prolotherapy-injection-interval',
        title: '增生療法注射間隔全解析：為什麼葡萄糖隔兩週、PRP要四週',
        description: '從運動醫學角度深度解析增生療法中高濃度葡萄糖建議兩週施打一次、PRP建議四週施打一次的科學根據，說明注射間隔太短或太長的影響，以及為何完成3到5次完整療程才能達到最佳療效。',
        image: '/images/news/article/prolotherapy-interval.webp',
      },
                                    {
        slug: 'ligament-ha-vs-prp',
        title: '韌帶玻尿酸全解析!與PRP怎麼選？',
        description: '韌帶玻尿酸與PRP是修復關節與軟組織的兩大利器，但作用機制大不相同。實證研究揭露，PRP透過生長因子促進組織再生，適合慢性病變；玻尿酸則能提供潤滑、抑制沾黏，對急性扭傷有奇效。本文將系統性剖析兩者的優缺點，幫助您找出最適合的治療方案。',
        image: '/images/news/article/ligament-ha-vs-prp.webp',
      },
                                                {
        slug: 'prp-why-fail',
        title: 'PRP打了沒效果？不是運氣問題，這六大關鍵因素才是原因',
        description: '許多人打了PRP卻效果不佳，總以為是運氣不好或治療本身無效。事實上，從血小板的品質、年齡、性別、注射準確度、到注射後的復健配合，每一個環節都直接影響最終結果。本文以醫學文獻為基礎，用你看得懂的語言，解析PRP療效不穩定背後真正的科學原因。',
        image: '/images/news/article/prp-why-fail.webp',
      },
                                          {
        slug: 'prp-injection-pain-duration-efficacy',
        title: '打完 PRP 反而更痛？復健科醫師揭密：四大核心問題與術後疼痛',
        description: '為什麼打完高濃度血小板血漿（PRP）後反而比之前更痛？復健科醫師從運動醫學與生理機制出發，系統性解析注射後的「無菌性發炎反應」，並針對門診最常見的四大疑問：PRP多久打一次？一定要打滿三針嗎？多久見效？效果能維持幾年？提供完整的實證醫學解答與行動建議。',
        image: '/images/news/article/prp-injection-pain-duration-efficacy.webp',
      },
                                                      {
        slug: 'prp-pre-post-care',
        title: 'PRP注射前後的注意事項，飲食還有可以運動嗎？',
        description: '完整解說PRP注射前後的注意事項，包含術前止痛藥與感冒的處理原則、術後冰敷vs熱敷的醫學依據、運動恢復時程、重訓返回準則，以及維他命C、膠原蛋白等術後飲食補充建議，幫助患者以正確觀念最大化PRP治療效果。',
        image: '/images/news/article/prp-pre-post-care.webp',
      },
                                                            {
        slug: 'prp-who-is-suitable',
        title: '哪些人適合打PRP？膝蓋退化、網球肘效果如何？',
        description: '深度解析PRP（高濃度血小板血漿）注射的適應症、禁忌症與實證療效。涵蓋退化性膝關節炎、肌腱韌帶損傷、網球肘、足底筋膜炎等常見狀況，以及不同年齡層的治療建議，幫助你做出最知情的醫療決策。',
        image: '/images/news/article/prp-who-is-suitable.webp',
      },
                                                                  {
        slug: 'prp-prolotherapy-injection-frequency',
        title: 'PRP與增生注射可以一直打嗎？打太多會傷身體嗎？破解迷思',
        description: '深度解析PRP（高濃度血小板血漿）與增生注射（Prolotherapy）的作用機轉與安全性，實證研究告訴你這類自體修復療法是否有次數限制，並與類固醇注射對照，破解「打針傷身體」的常見迷思。',
        image: '/images/news/article/prp-prolotherapy-frequency.webp',
      },

                                                {
        slug: 'prp-vs-hyaluronic-acid-injection',
        title: '自費針劑這麼多種，PRP、玻尿酸、葡萄糖，該如何挑選？如何挑選適合的醫生跟診所',
        description: '面對PRP、玻尿酸、羊膜增生療法等多元自費針劑，民眾往往感到困惑。本文從運動醫學實證出發，深入剖析各類增生療法的機制、合理費用區間與健保給付現況。並教你如何透過「超音波導引注射」與「客製化血小板濃度」兩大關鍵指標，看懂專業診所的品質差異，選對最適合自己的精準再生醫療療程。',
        image: '/images/news/article/prp-hyaluronic-acid-injection-guide.webp',
      },
                                    {
        slug: 'eswt-energy-and-pain-level',
        title: '震波治療能量開多大才有效？越痛越好嗎？從醫學看最佳疼痛指數',
        description: '體外震波治療能量要開多大才有效？是不是越痛越好？本文從運動醫學角度深度解析震波能量分級與治療機制，說明為何治療時疼痛指數需維持在VAS 4至6分，並破解震波治療後吃消炎藥與施打麻醉的常見迷思。',
        image: '/images/news/article/eswt-energy-level.webp',
      },

                                                      {
        slug: 'eswt-painkiller-anti-inflammatory-guide',
        title: '打完體外震波可以吃止痛消炎藥嗎？原則一次說清楚',
        description: '體外震波打完到底能不能吃止痛消炎藥？許多人以為「震波只是治療部位不一樣，用藥規則應該也不一樣」，但實證醫學告訴我們，無論是足底筋膜炎的修復型震波，還是打碎鈣化的破壞型震波，背後啟動的都是同一套發炎-修復機制，因此「避免吃消炎藥」這條原則幾乎是共通的。本文以醫學文獻為基礎，拆解震波治療的作用機轉、止痛藥的選擇邏輯，以及不同治療目的下的用藥差異。',
        image: '/images/news/article/eswt-nsaid-guide.webp',
      },
                                          {
        slug: 'pmos-obesity-mounjaro',
        title: '正名後的多內分泌代謝卵巢症候群：肥胖與猛健樂的角色',
        description: '2026年5月，醫學界宣布將沿用逾九十年的多囊性卵巢症候群（PCOS）正式更名為多內分泌代謝卵巢症候群（PMOS）。本文從運動醫學與內分泌角度，深入剖析肥胖、胰島素阻抗與賀爾蒙失調如何形成難解的惡性循環，並探討雙腸泌素新藥猛健樂（Mounjaro）如何精準打破此循環，帶來兼具體重管理與內分泌改善的全新曙光。',
        image: '/images/news/article/pmos-obesity-mounjaro.webp',
      },
                                                {
        slug: 'osteoporosis-medications-guide',
        title: '骨質疏鬆藥物全攻略：口服、注射怎麼選？治療選項全攻略',
        description: '骨質疏鬆不只是「老人病」——台灣每三位65歲以上女性就有一位曾發生骨折。本文以民眾能理解的語言，完整介紹雙磷酸鹽、保骼麗、骨穩、益穩挺等口服與注射藥物，並根據最新臨床指引，幫你釐清哪些人適合哪種治療。',
        image: '/images/news/article/osteoporosis-medications-guide.webp',
      },

    ]
  },


     {
    category: 'daycare',
    title: '日常生活醫學知識',
    description: '日常生活醫學小知識，讓生活更健康。',
    image: '/images/sportinjury/5.webp',
    injuries: [
          {
        slug: 'pillow-selection-guide',
        title: '枕頭選擇全解析：軟硬、高低、有凹洞嗎？醫學實證教你挑對枕頭',
        description: '從醫學角度深度解析枕頭軟硬、高度與形狀的選擇依據。實證研究揭露側躺與正躺各需哪種枕頭、中間凹洞設計是否真的有效，以及記憶棉、乳膠、羽絨等材質的差異，幫助你科學選出最適合自己的枕頭，告別晨起頸痛。',
        image: '/images/news/article/pillow-selection-guide.webp',
      },
                {
        slug: 'sleep-position-health-analysis',
        title: '正睡還是側睡？解析對脊椎、肩膀、骨盆與內臟器官的影響',
        description: '從醫學角度深度分析側睡與正睡（仰睡）的優缺點，涵蓋脊椎、肩膀旋轉肌群、骨盆、呼吸道及胃食道逆流等全面影響。實證研究揭露哪種睡姿更健康，並解析全球睡眠姿勢比例與個人化建議。',
        image: '/images/news/article/sleep-position-health-analysis.webp',
      },
                      {
        slug: 'fake-hip-width-analysis',
        title: '假跨寬完整解析：「大屁股」其實是肌肉失衡？如何改?',
        description: '深度剖析「假跨寬」的醫學成因——股骨前傾、骨盆前傾、臀中肌無力與闊筋膜張肌過緊。實證研究揭露為何瘦的人也有假跨寬，並提供科學矯正運動與預防策略，讓你從根本改善體態。',
        image: '/images/news/article/fake-hip-width-analysis.webp',
      },

                        {
        slug: 'diurnal-height-change',
        title: '📏 不用喝轉骨湯！每天早上起床，你都會自動「長高 1 公分」！',
        description: '為什麼下午量身高總是矮了一截？別緊張，這不是你變矮了！身為復健科醫師，今天要揭開脊椎「椎間盤」的吸水秘密，教你如何利用生理特性在體檢時量出最高身高。',
        image: '/images/news/article/202602/height.webp',
      },
                {
        slug: 'hula-hoop-horse-riding-weight-loss',
        title: '家居家搖呼拉圈或騎馬機，真的能有效瘦身嗎？運動醫學完整解析',
        description: '從運動醫學角度深度解析居家呼拉圈與騎馬機的減脂效果。實證研究揭露兩者的熱量消耗、核心肌群活化與體組成改變，並說明適用族群、禁忌症與正確使用方式。',
        image: '/images/news/article/hula-hoop-horse-riding-weight-loss.webp',
      },
                      {
        slug: 'children-kyphosis-guide',
        title: '小朋友為什麼會駝背？運動醫學完整解析：成因、治療與矯正運動',
        description: '深度解析兒童及青少年駝背（胸椎後凸）的成因，包含姿勢性駝背、許爾曼氏病與先天因素。提供實證支持的保守治療策略，以及家長可帶孩子練習的核心強化、伸展與矯正運動。',
        image: '/images/news/article/children-kyphosis-guide.webp',
      },
                      {
        slug: 'sleep-duration-guide',
        title: '睡眠時間全解析：為何年紀大睡不久？幾點睡最好？',
        description: '從新生兒到銀髮族，依據國際實證研究詳解各年齡層每天應睡幾小時。科學說明為何年紀越大越早醒、睡眠越少，以及最佳入睡時間的研究證據，幫助你打造符合自身生理時鐘的高品質睡眠。',
        image: '/images/news/article/sleep-duration-guide.webp',
      },
          {
        slug: 'why-cats-dont-get-stiff-neck',
        title: '家裡兩隻貓咪每天不是躺著就是躺著，為什麼不會落枕呢？',
        description: '診間每天都會看到很多落枕、閃到腰的病患。對人類來說，像貓咪那樣躺一小時，起來一定會脖子痛腰痛。但為什麼貓咪就不會呢？這其實跟牠們獨特的身體構造有關！',
        image: '/images/news/article/cat.webp',
      },

                  {
        slug: 'sunscreen-outdoor-sports-guide',
        title: '大太陽下如何保護自己？運動醫學教你正確防曬、認識防曬油原理與挑選指南',
        description: '從運動醫學觀點深度解析戶外大太陽下的防曬策略。實證研究揭露長期曝曬的疾病風險，包含皮膚癌、熱中暑、白內障，並詳細說明防曬油的物理與化學原理、SPF與PA的正確解讀、如何使用與挑選適合運動員的防曬產品。',
        image: '/images/news/article/sunscreen-outdoor-sports-guide.webp',
      },      
                  {
        slug: 'vertical-vibration-health-benefits',
        title: '垂直律動椅真的有效嗎？醫學解析：腸胃、心肺、骨骼好處',
        description: '全身垂直律動（WBVV）源自太空醫學，被證實能提升骨密度、改善微血管循環並促進腸胃蠕動。本文從復健與醫學觀點，深度剖析垂直律動對三大系統的益處，並揭露為何「水平或不規則震動」反而會產生剪力，對脊椎與關節造成不可逆的傷害。同時詳列適應症與絕對禁忌症。',
        image: '/images/news/article/wbvv-cover.webp',
      },
                        {
        slug: 'early-screen-time-analysis',
        title: '兒童早期接觸3C產品全解析：專注力、手眼協調，優缺點一次看懂',
        description: '深度剖析學齡前幼兒早期接觸手機、平板等3C產品的優點與風險。實證研究揭露螢幕時間如何影響專注力發展、語言能力與精細動作，同時說明互動式應用程式可能帶來的手眼協調訓練效果，並提供國際機構建議的科學使用策略。',
        image: '/images/news/article/early-screen-time-analysis.webp',
      },
                              {
        slug: 'rehab-ortho-topical-patches-guide',
        title: '診所貼布、藥膏全解析：成分、用法、懷孕與過敏者能用嗎？',
        description: '深度解析復健科、骨科常用的痠痛貼布與藥膏成分——非類固醇消炎止痛藥（NSAID）貼布、辣椒素、薄荷醇、樟腦、水楊酸甲酯與利多卡因。實證研究說明使用注意事項、皮膚過敏與光敏反應風險，以及懷孕期間能否使用、哪些部位應避免，提供民眾安全使用的完整指南。',
        image: '/images/news/article/topical-patches-guide.webp',
      },
                                    {
        slug: 'pregnancy-breastfeeding-pain-treatment',
        title: '懷孕、哺乳期間腰痠背痛怎麼辦？治療用藥全解析',
        description: '懷孕與哺乳期間，腰痛、肩頸痛、腕隧道症候群非常常見，但許多媽媽因為擔心藥物影響胎兒或寶寶而隱忍不治療。本文整理實證醫學文獻，說明哪些止痛藥、貼布藥膏在孕期與哺乳期相對安全，復健治療與類固醇、增生注射等介入性治療的適用時機與注意事項，幫助媽媽們安心就醫。',
        image: '/images/news/article/pregnancy-pain-treatment.webp',
      },
                                          {
        slug: 'rehab-ortho-medication-guide',
        title: '疼痛藥物用藥指南：其他藥物、中藥、食物、菸酒要注意什麼？',
        description: '完整解析復健科與骨科常開的消炎止痛藥、肌肉鬆弛劑與其他藥物的交互作用，包含中西藥合用間隔、飲食禁忌、抽菸喝酒對骨骼與肌腱癒合的影響，以及忘記吃藥怎麼辦，讓每位患者都能安全、有效地完成療程。',
        image: '/images/news/article/rehab-medication.webp',
      },



    ]
  },

          {
    category: 'nutrition',
    title: '營養補充知識',
    description: '長高長狀還有減肥飲食該如何選擇，營養品到底有沒有用?',
    image: '/images/sportinjury/7.webp',
    injuries: [
            {
        slug: 'weightlifting-nutrition-guide',
        title: '重訓飲食全解析：運動醫學觀點告訴你，蛋白質、澱粉、蔬菜怎麼吃才對？',
        description: '從運動醫學角度深入剖析重量訓練的飲食策略。實證研究揭露蛋白質每日建議攝取量、最佳補充時機、高品質食物來源，以及碳水化合物、蔬菜的正確搭配方式。營養補充品究竟有沒有用？科學證據一次說清楚。',
        image: '/images/news/article/weightlifting-nutrition-guide.webp',
      },
                  {
        slug: 'osteoporosis-calcium-guide',
        title: '骨鬆補鈣完全指南：運動醫學觀點解析劑量、鈣片種類與維他命D怎麼選',
        description: '從運動醫學角度深度解析骨質疏鬆補鈣策略。詳細比較碳酸鈣、檸檬酸鈣、海藻鈣的吸收率差異，說明每日鈣質建議劑量，以及維他命D3最佳補充方式，幫助民眾做出最正確的骨骼保健決定。',
        image: '/images/news/article/osteoporosis-calcium-guide.webp',
      },
                        {
        slug: 'joint-supplements-guide',
        title: '顧關節保健品全解析：UC-II、葡萄糖胺、鈣片、玻尿酸等誰有效?',
        description: '市售顧關節保健品種類繁多，本文以醫學觀點逐一解析 UC-II、葡萄糖胺、軟骨素、鈣片與口服玻尿酸的臨床證據。深入探討免疫調節機制、建議劑量、適用族群及常見迷思，幫助你科學選擇真正需要的成分，避免盲目花大錢。',
        image: '/images/news/article/joint-supplements-guide.webp',
      },
                        {
        slug: 'joint-supplement-truth',
        title: '診所施打軟骨素、維他命？揭開真相：實證效果到底如何？',
        description: '許多診所積極推薦患者自費注射軟骨素、維他命。但從運動醫學實證角度來看，這些補充品對關節退化與疼痛的效果究竟有多少？本文整理最新研究，並揭示部分產品為何「有效」的可能真相。',
        image: '/images/news/article/joint-supplement-truth.webp',
      },

                                    {
        slug: 'meat-nutrition-analysis',
        title: '吃對肉才能長肌肉！白肉與紅肉的醫學大解析：牛、豬、雞、魚怎麼挑？',
        description: '紅肉與白肉到底差在哪？牛肉、豬肉、雞肉、魚肉的營養成分有何不同？本文從復健與運動醫學觀點，針對兒童、健身族群、高齡者提供最科學的吃肉指南，教你遠離肌少症。',
        image: '/images/news/article/meat-nutrition-analysis.webp',
      },
                                          {
        slug: 'egg-nutrition-sports-medicine-myth',
        title: '一天能吃幾顆蛋？全蛋 vs 蛋白，會造成膽固醇過高嗎？',
        description: '雞蛋曾被視為膽固醇殺手，但最新運動醫學研究顯示，全蛋對肌肉合成的效果竟優於純蛋白。本文深入剖析亞洲族群吃蛋的保護效果、不同健康狀態的攝取建議，並破解生蛋較營養與膽固醇過高的常見迷思，教你如何吃出最高效益。',
        image: '/images/news/article/egg-nutrition-analysis.webp',
      },
                                                {
        slug: 'cooking-oil-comparison',
        title: '食用油全解析：動物油 vs 植物油，哪一種油最健康？',
        description: '深度剖析動物油與植物油的優缺點，完整比較各類植物油的脂肪酸組成。實證研究揭露飽和脂肪酸、單元不飽和脂肪酸、多元不飽和脂肪酸對心血管健康的影響，並提供科學選油策略。',
        image: '/images/news/article/cooking-oil-comparison.webp',
      },
                                                      {
        slug: 'beverage-sugar-coffee-health',
        title: '手搖飲與咖啡含糖量大解密：喝半糖就安全？當心慢性病',
        description: '從運動醫學與公共衛生角度深入剖析台灣人最愛的手搖飲與咖啡。一杯全糖珍奶的糖分如何瞬間讓你整天額度超標？台大最新實證研究揭開無糖飲品的糖分真相、不同種類咖啡的健康益處，並提供漸進式減糖的實用行動建議。',
        image: '/images/news/article/beverage-sugar-coffee-health.webp',
      },
                                                {
        slug: 'caffeine-safety-and-myths',
        title: '咖啡因全攻略：每天喝多少才安全？燈號與常見迷思一次看懂',
        description: '從運動醫學與臨床研究角度深入剖析咖啡因對人體的影響。每天喝多少咖啡或茶才算過量？台灣最新的現調飲料紅黃綠燈號該如何判斷？本文帶你釐清空腹喝咖啡、孕婦飲用限制以及茶葉咖啡因等常見誤區，並解析適量攝取對專注力、運動表現的實證好處。',
        image: '/images/news/article/caffeine-safety-guide.webp',
      },
                                                {
        slug: 'microwave-nutrients-myths-analysis',
        title: '微波爐會破壞營養嗎？醫學實證破解迷思',
        description: '「微波爐破壞食物營養」是流傳已久的迷思。本文從運動醫學與食品科學角度解析：決定營養保留的關鍵在於加熱溫度、時間與用水量。研究顯示，微波加熱在維生素C保留率上往往優於水煮，且適度蛋白質變性更有助於消化。帶您破解輻射與致癌迷思，掌握正確微波原則。',
        image: '/images/news/article/microwave-nutrients-science.webp',
      },
                                                      {
        slug: 'chicken-hormone-myth-analysis',
        title: '破解雞肉與雞皮謠言：藥物殘留與各部位營養大解析',
        description: '「雞皮和雞脖子打了生長激素」是真的嗎？本文從食品科學與運動營養角度，深入剖析現代肉雞快速生長的真相。為您釐清法規禁止生長激素的實務原因，並提供雞胸、雞腿、雞皮及雞脖子等部位的完整脂肪與熱量數據，帶您避開用藥殘留誤區，吃得安心又健康。',
        image: '/images/news/article/chicken-hormone-myth-analysis.webp',
      },
                              {
        slug: 'iv-drips-truth-unveiled',
        title: '揭開點滴的面紗：美白、減脂、保肝點滴成分？實證有效嗎？',
        description: '深度剖析坊間常見的美白點滴、減脂點滴與保肝點滴真實成分。從實證醫學角度揭露谷胱甘肽、左旋肉鹼與甘草酸的實際療效與潛在風險，破除單靠打針就能變白、變瘦的醫療行銷迷思。',
        image: '/images/news/article/iv-drips-cover.webp',
      },
      {
        slug: 'sugar-height-growth-analysis',
        title: '【家長必看】喝手搖飲、睡前吃水果會長不高？',
        description: '深度剖析精製糖如何透過胰島素拮抗、瘦素分泌與性早熟機制，干擾孩童生長激素分泌並導致生長板提早閉合。實證研究揭露手搖飲與甜點對最終身高的致命影響，並提供科學飲食策略。',
        image: '/images/news/article/sugar-height-growth-analysis.webp',
      },
            {
        slug: 'science-of-chinese-herbal-height-growth',
        title: '轉骨湯真的能長高？中藥成分、藥理學證據與臨床迷思全解析',
        description: '從現代藥理學與運動醫學角度，深入剖析台灣傳統轉骨湯。逐一拆解杜仲、淫羊藿、骨碎補等核心藥材的細胞與動物實驗證據，並揭開過早服用導致性早熟、生長板提早閉合的風險。結合中西醫觀點，提供家長最理性的青春期發育指引。',
        image: '/images/news/article/science-of-chinese-herbal-height-growth.webp',
      },
            {
        slug: 'growth-hormone-idiopathic-short-stature',
        title: '生長激素真能讓孩子長高？身高不足的療效、副作用與費用解析',
        description: '沒有生長激素缺乏的孩子，打了到底有沒有用？本文從運動與兒童醫學實證出發，深入解析「特發性矮小（ISS）」施打生長激素的真實效果。數據顯示最終成人身高平均可增益 3.5 至 7.5 公分，但個體差異極大。同步揭露台灣自費市場每公分高達 20 萬至 60 萬元的沉重成本，以及顱內壓升高、股骨頭滑脫等潛在副作用風險。',
        image: '/images/news/article/growth-hormone-treatment-analysis.webp',
      },
                  {
        slug: 'hydration-weight-loss-guide',
        title: '減重要喝多少水？飲料、咖啡、湯算嗎？純水比例要多少？',
        description: '減重期間水分攝取學問大！飯前喝水真的能幫助瘦身嗎？咖啡、茶、牛奶、湯品算不算補水？純水應佔每日水分的多少比例？本文以科學實證解答減重族最常見的水分迷思，並提供實用的每日補水策略。',
        image: '/images/news/article/hydration-weight-loss.webp',
      },
    ]
  },

{
    category: 'tennis',
    title: '網球常見運動傷害',
    description: '網球運動科學化解析與常見的傷害介紹。',
    image: '/images/sportinjury/1.webp', 
    injuries: [
            {
        slug: 'tennis-injury-analysis', 
        title: '網球運動傷害全解析：握拍方式、單反雙反，誰更容易受傷？',
        description: '深度剖析東方式、西方式、半西方式握拍與單手反拍、雙手反拍的運動傷害差異。實證研究揭露哪種打法更容易導致網球肘、手腕ECU肌腱病變與肩袖撕裂，並提供科學預防策略。',
        image: '/images/news/article/tennis-injury-analysis.webp',
      },
      {
        slug: 'tennis-serve-injuries', 
        title: '網球發球的運動傷害完整指南：從平擊到 Kick，每一種球路的傷害風險',
        description: '探討網球發球生物力學，解析平擊、側旋、上旋與 Kick 發球對肩、肘、腕、脊椎的傷害風險，並提供專業的運動傷害預防建議與各球種深度分析。',
        image: '/images/news/article/tennis-serve-injuries.webp',
      },
            {
        slug: 'tennis-stroke-biomechanics', 
        title: '網球抽球科學：速度與旋轉的生物力學，握拍、站位與傷害預防全攻略',
        description: '從運動醫學角度深度解析網球抽球機制：解析動力鏈如何決定球速、上旋球的物理原理，並比較東方式、半西方式與西方式握拍的力學差異。結合最新研究，告訴你如何提升擊球品質並預防網球肘與手腕傷害。',
        image: '/images/news/article/tennis-stroke-biomechanics.webp',
      },
    ]
  },

  {
    category: 'basketball',
    title: '籃球常見運動傷害',
    description: '籃球運動常見的急停、跳躍所導致的傷害解析。',
    image: '/images/sportinjury/2.webp',
    injuries: [
                  {
        slug: 'basketball-position-injuries',
        title: '籃球傷害地圖：從 1 號位到 5 號位，你的位置決定了受傷風險？',
        description: '從運動醫學與生物力學角度，深入分析籃球場上五個位置的傷害風險。為何得分後衛受傷率最高？中鋒最怕腰椎與足部應力性骨折？本文結合 NBA 實證研究與真實案例，解析各位置常見的 ACL 撕裂、跳躍膝與踝扭傷機制，並提供針對性的預防策略。',
        image: '/images/news/article/basketball-injury-analysis.webp',
      },
            {
        slug: 'nba-injury-analysis',
        title: 'NBA球員十字韌帶、半月板、跟腱撕裂後的數據真相',
        description: '深度剖析NBA球員最常見的三大毀滅性傷病：前十字韌帶(ACL)撕裂、半月板手術與跟腱(阿基里斯腱)撕裂。從運動醫學、生物力學與進階實證數據出發，揭露這三種傷病術後的重返賽場(RTP)機率、真實命中率(TS%)影響、球員效率值(PER)下降幅度，以及「代償效應」帶來的二次傷害風險。並以Kevin Durant、Klay Thompson等球星為例，提供最科學的傷病解答。',
        image: '/images/news/article/nba-injury-analysis.webp',
      },
      {
        slug: 'basketball-injury',
        title: '為什麼打籃球最傷膝蓋？常見膝關節運動傷害完整解析',
        description: '籃球是全球最受歡迎的運動之一，但它也是導致膝關節損傷最高的運動之一。深入解析為何籃球特別傷膝蓋、常見傷害類型、受傷機轉與完整預防策略。',
        image: '/images/news/article/basketball/kneeinjury.webp',
      },

    ]
  },

    {
    category: 'baseball',
    title: '棒球常見運動傷害',
    description: '棒球運動醫學角度解析，並分析常見運動傷害。',
    image: '/images/sportinjury/3.webp',
    injuries: [
                        {
        slug: 'baseball-pitcher-handedness-medical-analysis',
        title: '棒球左投右投全解析：運動醫學觀點的優缺點與傷害風險',
        description: '深度剖析棒球左投與右投在生理結構上的顯著差異。本文探討左右投不同的肩肘傷害風險，包含 UCL 損傷與 GIRD 問題，並提供戰術優勢分析與專業的傷害預防監測策略。',
        image: '/images/news/article/baseball-pitcher-handedness.webp',
      },
                              {
        slug: 'baseball-batting-injuries-left-vs-right',
        title: '左打 vs. 右打：棒球打擊傷害的生物力學差異與常見風險解析',
        description: '深度剖析棒球左打與右打者因旋轉方向差異所導致的鏡像傷害。解析鉤骨骨折、腹斜肌拉傷及腰椎傷害的發生機制，並為不同側打者提供科學化的風險管理與預防建議。',
        image: '/images/news/article/baseball-batting-injuries-left-vs-right.webp',
      },
                  {
        slug: 'baseball-necklace-analysis',
        title: '棒球員戴磁力項鍊與金項鍊，真的能提升表現嗎？',
        description: '深度剖析大聯盟與職棒球員配戴磁力、鈦金屬與純金項鍊的背後科學。醫學實證揭露磁力項鍊是否能改變血液循環，並從生物力學角度解析金項鍊的重量是否會拖累揮棒表現，為您解碼球場飾品的真相。',
        image: '/images/news/article/necklace-analysis.webp',
      },
            {
        slug: 'mlb-tommy-john-surgery-analysis',
        title: '解密 MLB 球員 Tommy John 手術後的真實回歸率與表現變化',
        description: '從大谷翔平到韋蘭德：醫學解密 MLB 球員 Tommy John 手術的回歸率與表現',
        image: '/images/news/article/tommyjohn-analysis.webp',
      },
      {
        slug: 'baseball-pitcher-velocity',
        title: '棒球投手如何投出更快的球？運動醫學的科學解析',
        description: '從運動醫學角度深度剖析棒球投手球速的決定因素。力量真的越大越好嗎？科學研究揭露投球速度的關鍵：動力鏈效率、肩關節活動度、髖部旋轉速率與神經肌肉協調，並提供有依據的訓練策略。',
        image: '/images/news/article/baseball-pitcher-velocity.webp',
      },
      {
        slug: 'baseball-hitting-biomechanics',
        title: '棒球打擊科學全解析：如何打得更遠？告訴你關鍵肌群與傷害預防',
        description: '從運動醫學與生物力學角度深度解析棒球打擊的核心機制：哪些肌群決定打擊距離、最佳擊球角度是幾度、如何提升初速，以及打者常見的運動傷害與預防策略。不只是「越強壯越好」，科學告訴你真正的答案。',
        image: '/images/news/article/baseball-hitting-biomechanics.webp',
      },
            {
        slug: 'baseball-pitching-biomechanics-injuries',
        title: '棒球各種球路及運動傷害全解析？',
        description: '從運動醫學實證出發，深度解析棒球投球各球路的生物力學特徵。為什麼指叉球傷手肘？四縫線速球的風險在哪？本文對比大聯盟投手案例，分析投球六階段的受傷關鍵，提供科學化的預防策略與常見誤區解析。',
        image: '/images/news/article/baseball-pitching-biomechanics-injuries.webp',
      },
    ]
  },

  
    {
    category: 'weight-training',
    title: '重訓常見運動傷害',
    description: '重訓如何有效學畫訓練，及常見運動傷害',
    image: '/images/sportinjury/4.webp',
    injuries: [
            {
        slug: 'home-core-stretching-guide',
        title: '居家核心訓練與伸展全指南：棒式、橋式、嬰兒式、眼鏡蛇式，哪些腰部病患適合做？',
        description: '深入解析居家常見核心運動（棒式、橋式、鳥狗式）與伸展動作（嬰兒式、眼鏡蛇式、貓牛式）的訓練肌群、建議時長與組數，並說明各類腰部疾患（椎間盤突出、脊椎狹窄、脊椎滑脫）的適應與禁忌，以實證為依據，提供安全有效的居家復健建議。',
        image: '/images/news/article/coreexercise1.webp',
      },
                  {
        slug: 'back-muscle-training-guide',
        title: '背肌訓練完全指南：哪個動作效果最好？如何預防上交叉症候群？',
        description: '從運動醫學角度深度解析背肌訓練：肌電圖研究揭露哪個動作活化效果最強、預防上交叉症候群必練的五條肌肉，以及背部與胸部訓練量的黃金比例。科學訓練，不再駝背。',
        image: '/images/news/article/back-muscle-training-guide.webp',
      },
      {
        slug: 'chest-muscle-training-guide',
        title: '胸肌訓練2026完全指南：最有效動作、策略全解析',
        description: '深度剖析槓鈴臥推、上斜啞鈴推舉、纜繩夾胸等胸肌訓練動作的科學依據，解析最佳訓練組數、組間休息時間與漸進超負荷策略。實證研究揭露每週幾次訓練最有效、2–3分鐘休息為何優於短休息，以及為什麼漸進增重才是練出大胸肌的核心關鍵。',
        image: '/images/news/article/chest-training-guide.webp',
      },
      {
        slug: 'strength-breakthrough-bench-press-deadlift',
        title: '科學突破最大重量：胸推與硬舉的進階訓練與專項策略',
        description: '想突破胸推與硬舉的 1RM 瓶頸？本文結合運動醫學與肌力科學，解析漸進超負荷、週期化訓練及弱點輔助動作。從神經肌肉適應到核心預壓技術，教你如何安全、有系統地提升絕對肌力，並避開常見的訓練誤區。',
        image: '/images/news/article/bench-press-deadlift-strength.webp',
      },
                  {
        slug: 'deadlift-injury-analysis',
        title: '硬舉傷害全解析：下面的地雷動作，你中了幾個？',
        description: '深入剖析硬舉（Deadlift）最容易導致下背部、腰薦椎及膕繩肌受傷的原因。貓背、髖部過高、槓鈴遠離身體——這些常見的技術失誤如何引發椎間盤突出或肌腱撕裂？本文提供實證研究建議，助你建立安全的後鏈訓練基礎。',
        image: '/images/news/article/deadlift-injury-analysis.webp',
      },

                  {
        slug: 'bench-press-shoulder-injury',
        title: '重訓傷害全解析：胸推、肩推的地雷動作，你中了幾個？',
        description: '從運動醫學角度深入剖析重訓胸推與肩推最容易受傷的原因。手太開、槓鈴降太低、肩膀前推——這些常見的技術錯誤，正在悄悄傷害你的旋轉肌、胸大肌腱、肩鎖關節，甚至關節唇。實證研究告訴你哪個動作最危險，以及如何正確訓練。',
        image: '/images/news/article/bench-press-injury-analysis.webp',
      },


            {
        slug: 'crossed-syndrome-analysis',
        title: '交叉症候群完整解析：訓練背肌反而讓背更緊？',
        description: '交叉症候群是現代人最常見的姿勢失衡問題，許多人深受背肌緊繃之苦，卻擔心「訓練背肌會讓肌肉更緊」。本文以運動醫學實證為基礎，解析上下交叉症候群的成因、為何緊繃的背肌其實需要訓練、哪些動作最有效，以及腹背肌力比例的科學建議。',
        image: '/images/news/article/crossed-syndrome.webp',
      },
    ]
  },


        {
    category: 'other',
    title: '其他常見運動職業傷害',
    description: '其他各種運動或是日常生活姿勢錯誤導致的傷害解析。',
    image: '/images/sportinjury/6.webp',
    injuries: [
                                          {
        slug: 'soccer-world-cup-injury-analysis',
        title: '世足賽開打！從醫學角度看足球常見運動傷害？哪些球員得過',
        description: '2026世界盃足球賽正在北美熱烈進行，從Neymar的十字韌帶傷勢到Mbappé的大腿後肌拉傷，球星接連傳出傷退消息。本文以實證醫學角度，深度解析足球運動中最常見的五大傷害——膝關節十字韌帶斷裂、大腿後肌拉傷、腳踝外側韌帶扭傷、鼠蹊部內收肌拉傷與頭部撞擊腦傷風險，並以知名球星案例說明致傷機轉與預防之道。',
        image:  '/images/news/article/soccer-injury-analysis.webp',
      },
                                    {
        slug: 'cervical-shoulder-pain-causes',
        title: '肩頸痠痛全解析：從肌肉問題到脊椎疾患，疼痛地圖讓你懂？',
        description: '全球盛行率高達 70% 的肩頸痠痛背後隱藏數十種病因。本文從運動醫學與解剖學視角，系統性拆解斜方肌、提肩胛肌、菱形肌的肌筋膜疼痛特徵，並深入辨別頸椎小面關節炎、椎間盤突出與胸廓出口症候群等結構性疾患，助你精準鑑別疼痛。',
        image:  '/images/news/article/cervical-shoulder-pain-analysis.webp',
      },

                                    {
        slug: 'low-back-pain-map',
        title: '醫生教你從下背「疼痛地圖」辨識疼痛原因',
        description: '同樣是下背痛，位置差一指，病因大不同！本文從運動醫學與解剖學角度出發，帶你解密脊椎中線、旁開、最外側的疼痛代表什麼結構出了問題。一文搞懂椎間盤突出、小面關節炎、薦髂關節障礙與腰方肌肌筋膜痛的典型症狀與關鍵鑑別線索。',
        image:  '/images/news/article/low-back-pain-anatomy-map.webp',
      },
                              {
        slug: 'hip-buttock-pain-location-mapping',
        title: '髖臀部疼痛地圖：痛在外側、後側還是鼠蹊？各代表什麼疾病？',
        description: '髖臀部疼痛是門診最常見卻也最易誤診的主訴。本文從運動醫學與臨床實證角度，系統性解析前側（FAI、盂唇撕裂）、外側（大轉子疼痛症候群）、後側（深臀部症候群、薦髂關節）與內側的常見成因，教你如何透過簡單動作自我居家初步鑑別。',
        image:  '/images/news/article/hip-buttock-pain-location-mapping.webp',
      },
                        {
        slug: 'shoulder-pain-mapping',
        title: '肩膀痛點全解析！從五個方位看懂肩膀「疼痛地圖」與自我鑑別',
        description: '肩膀痛好幾個月好不了？本文從運動醫學與解剖學視角，深入解析前側、外側、後側、內側及全周瀰漫性肩痛的根本原因。教您利用簡單三步驟在家進行自我評估，辨識夾擠症候群、旋轉肌撕裂、五十肩與頸椎壓迫的神經轉移痛，並破除三大常見診斷誤區。',
        image:  '/images/news/article/shoulder-pain-mapping-guide.webp',
      },
                              {
        slug: 'elbow-pain-map',
        title: '手肘疼痛地圖全解析：前後、內外側痛，各代表什麼病？',
        description: '以部位為核心，系統解析手肘前側、後側、內側、外側疼痛的常見原因與疾病。從二頭肌肌腱炎、鷹嘴突滑囊炎、高爾夫球肘、網球肘到尺神經壓迫，用民眾聽得懂的語言，搭配實證醫學，教你如何初步鑑別診斷手肘痛。',
        image:  '/images/news/article/elbow-pain-map.webp',
      },
                                    {
        slug: 'wrist-pain-anatomy-map',
        title: '手腕的疼痛地圖：四個常見痛點的醫學實證與鑑別診斷',
        description: '手腕痛貼藥布就好？從運動醫學與解剖位置出發，深入剖析手腕前、後、橈、尺側四大區域的最常見疾病。全面解析腕隧道症候群、狄奎凡氏肌腱炎（媽媽手）、舟狀骨骨折與三角纖維軟骨複合體（TFCC）損傷的典型症狀、實證物理檢查法與影像策略。',
        image:  '/images/news/article/wrist-pain-anatomy-map.webp',
      },
                                    {
        slug: 'knee-pain-anatomical-location',
        title: '膝蓋的疼痛地圖全解析：前後、內外側痛，各代表什麼疾病？',
        description: '膝蓋痛位置是精準診斷的第一步。本文從運動醫學與解剖學視角，拆解前側（跑步膝、跳躍膝）、內側（鵝掌滑囊炎、內側半月板）、外側（ 髂脛束症候群）及後側（貝克氏囊腫）的疼痛原因，並提供理學檢查自測與關鍵紅旗症狀。',
        image:  '/images/news/article/knee-pain-location-map.webp',
      },
                                          {
        slug: 'ankle-pain-map',
        title: '腳踝疼痛地圖全解析：前後側、內外側痛，各代表什麼疾病？',
        description: '用民眾看得懂的語言，從醫學角度解析腳踝四個方位的疼痛意義。前側可能是撞擊症候群，後側可能是阿基里斯肌腱病變，內側可能是跗管症候群，外側最常見是韌帶損傷——本文系統整理各部位常見疾病與簡單鑑別方式。',
        image:  '/images/news/article/ankle-pain-map.webp',
      },
                        {
        slug: 'foot-pain-map',
        title: '腳掌的疼痛地圖全解析：前後、內外側痛，各代表什麼疾病？',
        description: '用民眾看得懂的語言，以醫學觀點解析腳掌的疼痛地圖——前足痛、後跟痛、內側痛、外側痛，各部位常見疾病有哪些？如何簡單鑑別診斷？一文掌握足部疼痛的關鍵知識。',
        image:  '/images/news/article/foot-pain-map.webp',
      },

                  {
        slug: 'badminton-tennis-elbow',
        title: '打羽球為什麼會得網球肘？完整解析：動作、原因與改善策略',
        description: '從運動醫學角度深度分析羽球運動為何容易引發網球肘（外側上髁炎）。透過生物力學研究揭示反手拍、殺球等關鍵動作的傷害機制，並提供業餘球友實用的技術矯正與預防策略。',
        image: '/images/news/article/badminton-tennis-elbow.webp',

      },
            {
        slug: 'marathon-gait-injury-analysis',
        title: '馬拉松跑姿全解析：腳掌落地方式、步頻步幅，誰更容易受傷？',
        description: '深度剖析後腳跟著地、中足著地、前腳掌著地三大跑姿，以及過度跨步、步頻不足、軀幹前傾角度對運動傷害的影響。實證研究揭露哪種跑法更容易導致膝蓋疼痛、髂脛束症候群、足底筋膜炎與跟腱病變，並提供科學預防策略。',
        image: '/images/news/article/marasone.webp',

      },
                  {
        slug: 'slow-jogging-injury-analysis',
        title: '超慢跑的隱藏危機：你以為在保護身體，其實傷害正在累積',
        description: '超慢跑風靡台灣，但足底筋膜炎、阿基里斯腱炎、蹠骨痛等傷害屢見不鮮。本文以實證研究分析超慢跑的常見傷害、錯誤姿勢的危害，並說明為何一般健康成人應優先選擇慢跑或飛輪，而非長期停留在超慢跑。',
        image: '/images/news/article/ultrarun.webp',

      },
                        {
        slug: 'cycling-injury-analysis',
        title: '腳踏車全解析：公路車、城市車、摺疊車，有哪些傷害風險？',
        description: '從醫學與生物力學角度深度剖析公路車、城市車（通勤車）與摺疊車的姿勢差異與運動傷害風險。實證研究揭露各車型最容易導致的膝關節疼痛、下背痛、頸肩傷害與會陰神經壓迫，並提供科學預防策略。',
        image: '/images/news/article/cycling-injury-analysis.webp',

      },
                        {
        slug: 'sports-injury-longevity-analysis',
        title: '球類運動傷害與長壽效益全解析：哪種運動投報率最高？',
        description: '從運動醫學與大數據實證角度，深度解析籃球、足球、網球、羽毛球等常見運動的傷害率。哥本哈根與英國大型研究追蹤發現，具備社交互動的球拍類運動（如網球、羽毛球）不僅急性傷害率低，更能顯著延長壽命達 6 至 9.7 年。教你如何依年齡聰明選擇「高健康回報、低受傷風險」的黃金運動。',
        image: '/images/news/article/sports-injury-longevity-analysis.webp',

      },
            {
        slug: 'gender-differences-in-sports-injuries',
        title: '男女運動傷害大不同！從解剖結構分析運動風險',
        description: '從運動醫學與生物力學角度，深入剖析男女骨骼結構、Q角、關節韌帶鬆弛度及荷爾蒙對運動傷害的顯著影響。實證研究指出女性在垂直落地與急停轉向時，前十字韌帶（ACL）撕裂風險高出2至8倍，跑者膝盛行率更高出12倍；而男女肩關節的受傷模式亦截然不同。本文全面解析三大常見誤解，並提供客製化的核心預防訓練策略。',
        image: '/images/news/article/gender-differences-sports-injuries.webp',

      },
                        {
        slug: 'thumb-basal-joint-arthritis',
        title: '拇指根部劇痛拿不住東西？「拇指基底關節炎」全解析',
        description: '從運動醫學與解剖生物力學角度，深入剖析中高齡族群與手部重度使用者常見的拇指基底關節炎。探討其發病機制、臨床 Eaton 分級系統，並系統性比較第一線保守治療、超音波導引注射（類固醇、玻尿酸、PRP）到手術選項，協助患者全面掌握延緩退化的實用照護指南。',
        image: '/images/news/article/thumb-basal-joint-arthritis.webp',

      },
                  {
        slug: 'type-1-diabetes-elite-athletes',
        title: '場上的雙重對決：第一型糖尿病運動員的血糖管理與奇蹟',
        description: '從運動醫學與自體免疫角度，剖析第一型糖尿病（Type 1 Diabetes）運動員面臨的血糖挑戰。低血糖如何讓表現下滑 20%？高強度無氧運動與競賽壓力又如何引發高血糖？看網球球星茲維列夫（Alexander Zverev）奪得 2026 年法網冠軍與 MLB 火球男 Mason Miller 如何靠醫療科技克服疾病，打破不可能的運動醫學限界。',
        image: '/images/news/article/t1d-athletes-glucose-management1.webp',

      },
                        {
        slug: 'adolescent-apophysitis-growth-plate-injury',
        title: '青少年運動員隱形殺手：骨突炎（少棒肘、跳躍膝）治療全解析',
        description: '青少年運動後關節持續疼痛？這可能不是單純的生長痛，而是生長板發育尚未成熟所引發的骨突炎。，深入剖析少棒肘、奧斯古-謝拉特病（跳躍膝）與謝佛爾氏病（跟骨骨突炎）的成因、典型症狀，並探討低能量聚焦式體外震波（ESWT）在臨床實證上的安全與有效性，幫助孩子安全重返運動場。',
        image: '/images/news/article/adolescent-apophysitis-shockwave.webp',

      },
      {
        slug: 'pikmin-bloom-syndrome',
        title: '捕捉皮克敏的終點是復健科？當心成為「痛痛皮友」！',
        description: '玩皮克敏 Bloom 也要注意健康！解析常見的烏龜頸、媽媽手、網球肘、足底筋膜炎等手遊與走路症候群，由復健科醫師提供專業建議，讓你無痛種花。',
        image: '/images/news/article/pikmin.webp',

      },
      {
        slug: 'daily-activities-knee-injury',
        title: '上下樓、深蹲、做家事傷膝蓋？哪些動作風險最高！',
        description: '膝蓋退化不只是運動員的專利！本文從運動醫學實證出發，解析日常動作如上下樓梯、深蹲、蹲跪做家事的膝關節受力數據。研究顯示，下樓梯壓力高達體重 3.46 倍，而長期蹲跪做家事更會增加 7 倍退化風險。教你如何透過正確姿勢與體重管理，延長膝蓋使用壽命。',
        image: '/images/news/article/knee-injury-daily-activities.webp',

      },

                          {
        slug: 'vertical-jump-biomechanics',
        title: '跳得更高！影響垂直起跳高度的關鍵肌肉與科學訓練法',
        description: '從運動醫學與生物力學角度分析，垂直起跳高度取決於下肢關節的協同發力與「牽張縮短週期」效率。研究指出，膝關節伸肌（股四頭肌）與髖關節伸肌（臀大肌）在起跳過程中貢獻了最大的做功。然而，若要突破瓶頸、有效增加起跳高度，針對「臀大肌」與後側動力鏈進行大重量阻力與增強式訓練，投資報酬率最高。本文將深入剖析起跳的科學原理，並提供實證有效的訓練與預防跳躍膝策略。',
        image: '/images/news/article/vertical-jump-biomechanics.webp',

      },
                                {
        slug: 'sex-and-athletic-performance',
        title: '性行為影響運動表現？從奧運保險套談起，頻率建議與身心益處',
        description: '從奧運選手村大量發放保險套談起，深入探討性行為對運動表現的影響。實證研究揭露賽前性行為並不會削弱體能，並提供科學建議的適當頻率，同時說明規律性行為對心血管、免疫系統、睡眠及心理健康的多重益處。',
        image: '/images/news/article/sex-and-athletic-performance.webp',

      },


    ]
  },

                 {
    category: 'diary',
    title: '診間隨筆',
    description: '日常診間生活心得及趣事分享',
    image: '/images/sportinjury/8.webp',
    injuries: [

                              {
        slug: 'prp-overuse-reflection',
        title: '打了這麼多 PRP，真的都需要嗎？診間自費醫療的誠實告白 🩺',
        description: '最近門診遇到幾個病人，也拒絕了幾個慕名要求打 PRP 的病患。面對恐嚇式的醫療行銷，我想誠實地聊聊：不是每個問題都要用最貴的方法解決，該用什麼治療要看病情，而不是看價格。',
        image:  '/images/news/article/prp-overuse.webp',
      },
                        {
        slug: 'efficient-clinical-visit-guide',
        title: '醫病也醫心：一份讓彼此都輕鬆的「看診攻略」🩺✨',
        description: '門診總是等很久？宸新復健科醫師整理「看診攻略」，教你如何透過精準溝通、準備外院報告與釐清行政問題，提升醫療效率。醫病也醫心，讓我們一起找回高品質的醫療對話。',
        image:  '/images/news/article/hospital.webp',
      },
         {
        slug: 'dr-lin-appointment-guide',
        title: '🕒 林羿辰醫師看診攻略：掛號小撇步',
        description: '想要順利看診不撲空、減少等待時間嗎？林羿辰醫師診間專業攻略：掌握網路預約與現場加掛技巧，還有避開人潮的黃金時段建議，讓您就醫更輕鬆。',
        image:  '/images/news/article/0311.webp',
      },

                  {
        slug: 'doctorvsengineer',
        title: '從新竹實中到診所院長：跨越 20 年的科技與醫療圈觀察，🧬醫生 vs. 工程師💻',
        description: '深度解析醫學系與電機系的生存現狀：從矽谷千萬年薪工程師到醫院住院醫師的工時壓力，探討天賦牆、財富跑道及中年失業風險，為猶豫中的學子提供最真實的職場建議。',
        image:  '/images/news/article/doctorvsengineer1.webp',
      },
                              {
        slug: 'choosing-the-right-treatment',
        title: '今天，我大概讓五位病人「失望」了… 淺談精準把關的重要性',
        description: '年關將至，許多病患抱著最後一絲希望走進診間，甚至要求昂貴的 PRP 治療只想「快點好」。但醫療的本質不是選貴的就好，而是基於專業判斷的精準把關。',
        image:  '/images/news/article/newyear.webp',
      },

                        {
        slug: 'pikmin-bloom-elderly-rehab',
        title: '當皮克敏走進阿媽的生活：五千步的約定，與找回笑容的魔法 ✨',
        description: '面對肌少症與長年的腰膝疼痛，復健不只是單調的儀器治療。看陳新復健科醫師如何利用《Pikmin Bloom》遊戲，陪伴阿媽從沙發走向公園，找回生活的掌控感與色彩。',
        image:  '/images/news/article/pikmin-grandma.webp',
      },
                        {
        slug: 'weightloss-sleep-apnea-mounjaro',
        title: '那一夜，她終於能好好睡一覺：減重與呼吸中止症的意外驚喜 🌙',
        description: '肥胖不只是數字問題，更關乎全家人的生活品質。看林醫師如何透過專業減重評估，幫助病患改善三高與睡眠呼吸中止症，找回健康，也讓辛苦的太太重獲安穩睡眠。',
        image:  '/images/news/article/weightloss-sleep.webp',
      },

            {
        slug: 'steak-muscle-anatomy',
        title: '復健科醫師帶老婆吃牛排：菲力對應腰大肌，牛排部位人體肌肉完整解析',
        description: '從菲力到翼板，每塊牛排都藏著一堂解剖課。復健科醫師帶你用肌肉地圖讀懂牛排菜單。',
        image:  '/images/news/article/steak-muscle-anatomy.webp',
      },


    ]
  },
       
]