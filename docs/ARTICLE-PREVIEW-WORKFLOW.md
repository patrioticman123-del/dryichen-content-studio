# AI 初稿與 Claude 正式文章

在議題卡按「選擇這題 · AI 初稿／Claude 提示詞」，保留兩種流程：

1. 用免費 Gemini 試寫並看文章版型。完成的初稿儲存在工作台；重新查看不再次呼叫 AI。
2. 輸入想修改或保留的方向，一鍵複製議題、文章範本、修改意見與可選的初稿，交給 Claude 上網查證並正式撰寫。
3. 把 Claude 回傳的文章物件貼回，按預覽。支援靜態 JS/TS 文章物件、程式碼框、JSON；不執行 JSX、函式或動態插值。

本功能不會寫入 D 槽、不會提交 Git，也不會发布衛教文章。原本的發布機制沒有更動。

## 免費模型與部署

- 2026-09-11 核對 Google 文件，預設 `gemini-3.8-flash`。模型有 Free tier，不代表使用付費專案金鑰也免費；必須使用尚未啟用付費的 AI Studio 專案。
- Vercel 設定 `GEMINI_API_KEY`，或沿用 `GOOGLE_API_KEY`，金鑰只能存在伺服器環境變數。
- 生成採一般文字 API，不使用不在本模型免費方案內的 Google Search grounding。所有初稿標示待查證。Google 免費服務可能用輸入改善產品，不輸入病患個資。
- 無付費備援、無自動重試。每日台灣時間最多 10 次請求（包含失敗）；同時只跑一篇；同題重按沿用處理中任務或已完成快取。
- Vercel 須啟用 Fluid compute，路由 `maxDuration=300`，上游等待上限 240 秒。未啟用 Fluid 的 Hobby 舊專案最多 60 秒，可能需要在專案設定切換。
- `CONTENT_ADMIN_STORAGE=postgres` 時，第一次使用建立獨立 `content_free_preview_state` 資料表；本機使用 `.local-data/free-preview-drafts.json`。不更動舊文章資料。

## 預覽安全與儲存

- 先以靜態文字解析器讀文章，不用 `eval` 或 `Function`。
- HTML 清理後放入 sandbox iframe，沒有腳本權限、同源權限與主頁導覽權限。僅允許安全引用在新視窗開啟。
- Claude 貼回的程式碼和修改意見只暫存在本機瀏覽器，不會上傳到 Gemini，也不會跨裝置同步。免費初稿則儲存在工作台。
- 來源項目數只代表偵測到幾個引用項目，不代表文獻已核對。正式文章仍須醫療專業審閱。

## 驗證

執行 `npm run test:content-preview`、`npm run typecheck`、`npm run build`。
測試使用模擬 API，不消耗真實額度。

官方資料：[Gemini 費率](https://ai.google.dev/gemini-api/docs/pricing)、[最新模型](https://ai.google.dev/gemini-api/docs/latest-model)、[Vercel 執行時間](https://vercel.com/docs/functions/configuring-functions/duration)。
