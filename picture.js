const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const TARGET_DIR = './public/images'; 
const MAX_WIDTH = 1200; 
const QUALITY = 85;

// 定義要排除的檔名清單（不含副檔名）
const EXCLUDED_FILENAMES = ['apple-touch-icon', 'favicon', 'og-default'];

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(webp|jpg|jpeg|png)$/i.test(file)) {
      // 取得不含副檔名的純檔名
      const fileNameWithoutExt = path.parse(file).name;

      // 檢查是否在排除名單中
      if (EXCLUDED_FILENAMES.includes(fileNameWithoutExt)) {
        console.log(`跳過排除的檔案: ${file}`);
        continue;
      }

      await processAndConvert(fullPath);
    }
  }
}

async function processAndConvert(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const isWebP = ext === '.webp';
    
    // 讀取檔案至記憶體 (避免鎖定)
    const inputBuffer = fs.readFileSync(filePath);
    const image = sharp(inputBuffer);
    const metadata = await image.metadata();

    const needsResize = metadata.width > MAX_WIDTH;
    const needsConversion = !isWebP; // 如果不是 webp 就需要轉換

    // 只有在「需要縮圖」或「需要轉檔」時才執行處理
    if (needsResize || needsConversion) {
      let actionLog = '';
      if (needsConversion && needsResize) actionLog = `轉檔 WebP + 縮圖 (${metadata.width}px -> ${MAX_WIDTH}px)`;
      else if (needsConversion) actionLog = `轉檔 WebP`;
      else actionLog = `縮圖 (${metadata.width}px -> ${MAX_WIDTH}px)`;

      console.log(`處理中: ${path.basename(filePath)} -> [${actionLog}]`);
      
      // 處理圖片：統一轉為 WebP 加上縮圖設定
      const outputBuffer = await image
        .resize({ width: MAX_WIDTH, withoutEnlargement: true }) // 超過才縮，沒超過不動
        .webp({ quality: QUALITY })
        .toBuffer();

      // 計算新的檔案路徑 (如果是 jpg/png，副檔名要改成 .webp)
      const dir = path.dirname(filePath);
      const name = path.parse(filePath).name;
      const newFilePath = path.join(dir, `${name}.webp`);

      // 寫入新檔案
      fs.writeFileSync(newFilePath, outputBuffer);

      // 如果是轉檔 (原檔名不同)，刪除舊的 jpg/png
      if (needsConversion) {
        fs.unlinkSync(filePath);
        console.log(`✅ 轉換並取代: ${path.basename(filePath)} -> ${path.basename(newFilePath)}`);
      } else {
        console.log(`✅ 已成功覆蓋: ${path.basename(filePath)}`);
      }

    } else {
      console.log(`跳過: ${path.basename(filePath)} (格式正確且尺寸已達標)`);
    }
  } catch (err) {
    console.error(`❌ 處理 ${path.basename(filePath)} 時出錯:`, err.message);
  }
}

console.log('🚀 重新啟動優化任務 (JPG/PNG 轉 WebP + 縮圖)...');
processDirectory(TARGET_DIR).then(() => {
  console.log('✨ 任務完成！');
});