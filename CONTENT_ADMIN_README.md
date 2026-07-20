# 醫療內容後台：本機基本版

這個版本與正式網站文章資料完全分開。它已包含登入、議題評分、收藏／忽略、草稿生成、版本、手機預覽、發布前檢查與核准狀態；**不包含正式發布功能**。本機預設使用 JSON，Vercel 可切換至 Neon PostgreSQL。

## 第一次啟動

1. 複製 `.env.example` 為 `.env.local`。
2. 將 `CONTENT_ADMIN_PASSWORD` 改成自己的測試密碼。
3. 將 `CONTENT_ADMIN_SESSION_SECRET` 改成至少 32 字元的隨機字串。
4. 執行 `npm install`，再執行 `npm run dev`。
5. 開啟 `http://localhost:3000/admin/login`。

本機操作資料會自動建立在 `.local-data/content-admin.json`。此資料夾已加入 `.gitignore`，不會上傳 GitHub。若要恢復初始示範資料，可在關閉開發伺服器後刪除 `.local-data`，下次開啟後台會自動重建。

## 目前刻意保留的限制

- 「生成文章」使用固定、安全的示範範本，尚未呼叫 OpenAI 或 Gemini。
- 趨勢議題使用三筆示範資料，沒有宣稱或偽造搜尋量。
- 參考資料是資料庫入口示範，正式發布前必須換成與文章主題直接相關的研究並人工複核。
- 本機 JSON 不適合 Vercel；部署時設定 `CONTENT_ADMIN_STORAGE=postgres`，並由 Neon 提供 `DATABASE_URL` 或 `POSTGRES_URL`。系統第一次讀取後台時會以 `CREATE TABLE IF NOT EXISTS` 初始化資料表與示範議題；SQL migration 仍保留供稽核與手動部署。
- 核准只改變文章狀態，不會寫入 `src/data/articles.ts`，也不會部署網站。

## 上線前下一階段

接入具來源紀錄的議題搜尋服務、加入 AI 生成服務與用量限制、完成三層重複偵測、建立排程冪等測試，最後才設計從 `approved` 到正式文章資料的人工發布動作。
