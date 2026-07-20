'use client';

import React, { useState } from 'react';

// =====================================================================
// 新版數據庫與計算邏輯 (維持不變)
// =====================================================================

const growthData = {
  male: {
    height: {
      "3rd": [
        { age: 0, v: 46.3 }, { age: 0.5, v: 63.6 }, { age: 1, v: 71.3 }, { age: 1.5, v: 77.2 },
        { age: 2, v: 82.1 }, { age: 2.5, v: 85.5 }, { age: 3, v: 89.1 }, { age: 3.5, v: 92.4 },
        { age: 4, v: 95.4 }, { age: 4.5, v: 98.4 }, { age: 5, v: 101.2 }, { age: 5.5, v: 103.9 },
        { age: 6, v: 106.5 }, { age: 6.5, v: 109.2 }, { age: 7, v: 111.8 }, { age: 7.5, v: 114.5 },
        { age: 8, v: 117.0 }, { age: 8.5, v: 119.5 }, { age: 9, v: 121.8 }, { age: 9.5, v: 124.0 },
        { age: 10, v: 126.0 }, { age: 10.5, v: 128.0 }, { age: 11, v: 130.5 }, { age: 11.5, v: 133.0 },
        { age: 12, v: 135.6 }, { age: 12.5, v: 138.2 }, { age: 13, v: 141.9 }, { age: 13.5, v: 145.5 },
        { age: 14, v: 149.3 }, { age: 14.5, v: 153.0 }, { age: 15, v: 155.5 }, { age: 15.5, v: 158.0 },
        { age: 16, v: 159.3 }, { age: 16.5, v: 160.5 }, { age: 17, v: 160.9 }, { age: 17.5, v: 161.0 },
        { age: 18, v: 161.5 }, { age: 18.5, v: 162.0 }
      ],
      "15th": [
        { age: 0, v: 47.9 }, { age: 0.5, v: 65.4 }, { age: 1, v: 73.3 }, { age: 1.5, v: 79.5 },
        { age: 2, v: 84.6 }, { age: 2.5, v: 88.4 }, { age: 3, v: 92.2 }, { age: 3.5, v: 95.7 },
        { age: 4, v: 99.0 }, { age: 4.5, v: 102.1 }, { age: 5, v: 105.2 }, { age: 5.5, v: 107.9 },
        { age: 6, v: 110.5 }, { age: 6.5, v: 113.2 }, { age: 7, v: 115.8 }, { age: 7.5, v: 118.5 },
        { age: 8, v: 121.3 }, { age: 8.5, v: 124.0 }, { age: 9, v: 126.0 }, { age: 9.5, v: 128.0 },
        { age: 10, v: 130.5 }, { age: 10.5, v: 133.0 }, { age: 11, v: 135.6 }, { age: 11.5, v: 138.1 },
        { age: 12, v: 141.1 }, { age: 12.5, v: 144.0 }, { age: 13, v: 148.5 }, { age: 13.5, v: 153.0 },
        { age: 14, v: 156.3 }, { age: 14.5, v: 159.6 }, { age: 15, v: 161.3 }, { age: 15.5, v: 163.0 },
        { age: 16, v: 164.0 }, { age: 16.5, v: 165.0 }, { age: 17, v: 165.5 }, { age: 17.5, v: 166.0 },
        { age: 18, v: 166.0 }, { age: 18.5, v: 166.0 }
      ],
      "50th": [
        { age: 0, v: 49.9 }, { age: 0.5, v: 67.6 }, { age: 1, v: 75.7 }, { age: 1.5, v: 82.3 },
        { age: 2, v: 87.8 }, { age: 2.5, v: 91.9 }, { age: 3, v: 96.1 }, { age: 3.5, v: 99.9 },
        { age: 4, v: 103.5 }, { age: 4.5, v: 106.7 }, { age: 5, v: 110.0 }, { age: 5.5, v: 112.8 },
        { age: 6, v: 115.6 }, { age: 6.5, v: 118.4 }, { age: 7, v: 121.2 }, { age: 7.5, v: 124.0 },
        { age: 8, v: 126.8 }, { age: 8.5, v: 129.5 }, { age: 9, v: 131.8 }, { age: 9.5, v: 134.0 },
        { age: 10, v: 136.5 }, { age: 10.5, v: 139.0 }, { age: 11, v: 142.0 }, { age: 11.5, v: 145.0 },
        { age: 12, v: 148.8 }, { age: 12.5, v: 152.5 }, { age: 13, v: 156.9 }, { age: 13.5, v: 161.2 },
        { age: 14, v: 163.7 }, { age: 14.5, v: 166.2 }, { age: 15, v: 167.6 }, { age: 15.5, v: 169.0 },
        { age: 16, v: 170.0 }, { age: 16.5, v: 171.0 }, { age: 17, v: 171.5 }, { age: 17.5, v: 172.0 },
        { age: 18, v: 172.0 }, { age: 18.5, v: 172.0 }
      ],
      "85th": [
        { age: 0, v: 51.8 }, { age: 0.5, v: 69.8 }, { age: 1, v: 78.2 }, { age: 1.5, v: 85.1 },
        { age: 2, v: 91.0 }, { age: 2.5, v: 95.5 }, { age: 3, v: 99.9 }, { age: 3.5, v: 104.0 },
        { age: 4, v: 107.7 }, { age: 4.5, v: 111.2 }, { age: 5, v: 114.8 }, { age: 5.5, v: 117.7 },
        { age: 6, v: 120.6 }, { age: 6.5, v: 123.6 }, { age: 7, v: 126.5 }, { age: 7.5, v: 129.4 },
        { age: 8, v: 132.2 }, { age: 8.5, v: 135.0 }, { age: 9, v: 137.5 }, { age: 9.5, v: 140.0 },
        { age: 10, v: 142.8 }, { age: 10.5, v: 145.5 }, { age: 11, v: 149.4 }, { age: 11.5, v: 153.2 },
        { age: 12, v: 157.1 }, { age: 12.5, v: 161.0 }, { age: 13, v: 164.9 }, { age: 13.5, v: 168.7 },
        { age: 14, v: 170.8 }, { age: 14.5, v: 172.8 }, { age: 15, v: 173.9 }, { age: 15.5, v: 175.0 },
        { age: 16, v: 175.8 }, { age: 16.5, v: 176.5 }, { age: 17, v: 176.8 }, { age: 17.5, v: 177.0 },
        { age: 18, v: 177.3 }, { age: 18.5, v: 177.5 }
      ],
      "97th": [
        { age: 0, v: 53.4 }, { age: 0.5, v: 71.6 }, { age: 1, v: 80.2 }, { age: 1.5, v: 87.3 },
        { age: 2, v: 93.6 }, { age: 2.5, v: 98.3 }, { age: 3, v: 103.1 }, { age: 3.5, v: 107.3 },
        { age: 4, v: 111.2 }, { age: 4.5, v: 115.0 }, { age: 5, v: 118.7 }, { age: 5.5, v: 121.8 },
        { age: 6, v: 124.9 }, { age: 6.5, v: 128.1 }, { age: 7, v: 131.2 }, { age: 7.5, v: 134.3 },
        { age: 8, v: 137.2 }, { age: 8.5, v: 140.0 }, { age: 9, v: 142.5 }, { age: 9.5, v: 145.0 },
        { age: 10, v: 148.3 }, { age: 10.5, v: 151.5 }, { age: 11, v: 156.1 }, { age: 11.5, v: 160.7 },
        { age: 12, v: 164.4 }, { age: 12.5, v: 168.0 }, { age: 13, v: 171.0 }, { age: 13.5, v: 174.0 },
        { age: 14, v: 176.0 }, { age: 14.5, v: 178.0 }, { age: 15, v: 179.0 }, { age: 15.5, v: 180.0 },
        { age: 16, v: 180.5 }, { age: 16.5, v: 181.0 }, { age: 17, v: 181.5 }, { age: 17.5, v: 182.0 },
        { age: 18, v: 182.0 }, { age: 18.5, v: 182.0 }
      ]
    }
  },
  female: {
    height: {
      "3rd": [
        { age: 0, v: 45.6 }, { age: 0.5, v: 61.5 }, { age: 1, v: 69.2 }, { age: 1.5, v: 75.2 },
        { age: 2, v: 80.3 }, { age: 2.5, v: 84 }, { age: 3, v: 87.9 }, { age: 3.5, v: 91.4 },
        { age: 4, v: 94.6 }, { age: 4.5, v: 97.6 }, { age: 5, v: 100.5 }, { age: 5.5, v: 103 },
        { age: 6, v: 105.5 }, { age: 6.5, v: 108.1 }, { age: 7, v: 110.6 }, { age: 7.5, v: 113.1 },
        { age: 8, v: 115.7 }, { age: 8.5, v: 118.3 }, { age: 9, v: 120.7 }, { age: 9.5, v: 123 },
        { age: 10, v: 125.8 }, { age: 10.5, v: 128.5 }, { age: 11, v: 131.8 }, { age: 11.5, v: 135 },
        { age: 12, v: 137.9 }, { age: 12.5, v: 140.8 }, { age: 13, v: 143.2 }, { age: 13.5, v: 145.5 },
        { age: 14, v: 146.8 }, { age: 14.5, v: 148 }, { age: 15, v: 148.5 }, { age: 15.5, v: 149 },
        { age: 16, v: 149.5 }, { age: 16.5, v: 150 }, { age: 17, v: 150 }, { age: 17.5, v: 150 },
        { age: 18, v: 150 }, { age: 18.5, v: 150 }
      ],
      "15th": [
        { age: 0, v: 47.2 }, { age: 0.5, v: 63.4 }, { age: 1, v: 71.3 }, { age: 1.5, v: 77.7 },
        { age: 2, v: 83.1 }, { age: 2.5, v: 87 }, { age: 3, v: 91.1 }, { age: 3.5, v: 94.8 },
        { age: 4, v: 98.3 }, { age: 4.5, v: 101.5 }, { age: 5, v: 104.5 }, { age: 5.5, v: 107.1 },
        { age: 6, v: 109.7 }, { age: 6.5, v: 112.3 }, { age: 7, v: 114.9 }, { age: 7.5, v: 117.5 },
        { age: 8, v: 120.3 }, { age: 8.5, v: 123 }, { age: 9, v: 125.5 }, { age: 9.5, v: 128 },
        { age: 10, v: 131 }, { age: 10.5, v: 134 }, { age: 11, v: 137.5 }, { age: 11.5, v: 141 },
        { age: 12, v: 143.8 }, { age: 12.5, v: 146.5 }, { age: 13, v: 148.5 }, { age: 13.5, v: 150.5 },
        { age: 14, v: 151.3 }, { age: 14.5, v: 152 }, { age: 15, v: 152.5 }, { age: 15.5, v: 153 },
        { age: 16, v: 153.5 }, { age: 16.5, v: 154 }, { age: 17, v: 154 }, { age: 17.5, v: 154 },
        { age: 18, v: 154 }, { age: 18.5, v: 154 }
      ],
      "50th": [
        { age: 0, v: 49.1 }, { age: 0.5, v: 65.7 }, { age: 1, v: 74 }, { age: 1.5, v: 80.7 },
        { age: 2, v: 86.4 }, { age: 2.5, v: 90.7 }, { age: 3, v: 95.1 }, { age: 3.5, v: 99 },
        { age: 4, v: 102.7 }, { age: 4.5, v: 106.2 }, { age: 5, v: 109.4 }, { age: 5.5, v: 112.1 },
        { age: 6, v: 114.8 }, { age: 6.5, v: 117.6 }, { age: 7, v: 120.3 }, { age: 7.5, v: 123 },
        { age: 8, v: 125.8 }, { age: 8.5, v: 128.5 }, { age: 9, v: 131.3 }, { age: 9.5, v: 134 },
        { age: 10, v: 137.5 }, { age: 10.5, v: 141 }, { age: 11, v: 144.5 }, { age: 11.5, v: 148 },
        { age: 12, v: 150.5 }, { age: 12.5, v: 153 }, { age: 13, v: 154.5 }, { age: 13.5, v: 156 },
        { age: 14, v: 156.8 }, { age: 14.5, v: 157.5 }, { age: 15, v: 157.9 }, { age: 15.5, v: 158.3 },
        { age: 16, v: 158.7 }, { age: 16.5, v: 159 }, { age: 17, v: 159.3 }, { age: 17.5, v: 159.5 },
        { age: 18, v: 159.5 }, { age: 18.5, v: 159.5 }
      ],
      "85th": [
        { age: 0, v: 51.1 }, { age: 0.5, v: 68.1 }, { age: 1, v: 76.7 }, { age: 1.5, v: 83.7 },
        { age: 2, v: 89.8 }, { age: 2.5, v: 94.3 }, { age: 3, v: 99 }, { age: 3.5, v: 103.3 },
        { age: 4, v: 107.2 }, { age: 4.5, v: 110.9 }, { age: 5, v: 114.4 }, { age: 5.5, v: 117.1 },
        { age: 6, v: 119.9 }, { age: 6.5, v: 122.6 }, { age: 7, v: 125.4 }, { age: 7.5, v: 128.1 },
        { age: 8, v: 131.3 }, { age: 8.5, v: 134.5 }, { age: 9, v: 137.8 }, { age: 9.5, v: 141 },
        { age: 10, v: 144.8 }, { age: 10.5, v: 148.5 }, { age: 11, v: 151.8 }, { age: 11.5, v: 155 },
        { age: 12, v: 157 }, { age: 12.5, v: 159 }, { age: 13, v: 160.3 }, { age: 13.5, v: 161.5 },
        { age: 14, v: 162.3 }, { age: 14.5, v: 163 }, { age: 15, v: 163.5 }, { age: 15.5, v: 164 },
        { age: 16, v: 164.2 }, { age: 16.5, v: 164.4 }, { age: 17, v: 164.7 }, { age: 17.5, v: 165 },
        { age: 18, v: 165 }, { age: 18.5, v: 165 }
      ],
      "97th": [
        { age: 0, v: 52.7 }, { age: 0.5, v: 70 }, { age: 1, v: 78.9 }, { age: 1.5, v: 86.2 },
        { age: 2, v: 92.5 }, { age: 2.5, v: 97.3 }, { age: 3, v: 102.2 }, { age: 3.5, v: 106.7 },
        { age: 4, v: 110.8 }, { age: 4.5, v: 114.7 }, { age: 5, v: 118.4 }, { age: 5.5, v: 121.3 },
        { age: 6, v: 124.2 }, { age: 6.5, v: 127.2 }, { age: 7, v: 130.1 }, { age: 7.5, v: 133 },
        { age: 8, v: 136.5 }, { age: 8.5, v: 140 }, { age: 9, v: 143.5 }, { age: 9.5, v: 147 },
        { age: 10, v: 150.8 }, { age: 10.5, v: 154.5 }, { age: 11, v: 157.3 }, { age: 11.5, v: 160 },
        { age: 12, v: 161.8 }, { age: 12.5, v: 163.5 }, { age: 13, v: 164.8 }, { age: 13.5, v: 166 },
        { age: 14, v: 167 }, { age: 14.5, v: 167.9 }, { age: 15, v: 168.2 }, { age: 15.5, v: 168.5 },
        { age: 16, v: 168.8 }, { age: 16.5, v: 169 }, { age: 17, v: 169 }, { age: 17.5, v: 169 },
        { age: 18, v: 169 }, { age: 18.5, v: 169 }
      ]
    }
  }
};

// ... (計算輔助函式維持不變)
const linearInterpolation = (x: number, x0: number, y0: number, x1: number, y1: number) => {
  if (x1 === x0) return y0;
  return y0 + (x - x0) * (y1 - y0) / (x1 - x0);
};

const getValueFromCurve = (age: number, curveData: { age: number, v: number }[]) => {
  if (age <= curveData[0].age) return curveData[0].v;
  for (let i = 0; i < curveData.length - 1; i++) {
    if (age >= curveData[i].age && age <= curveData[i + 1].age) {
      return linearInterpolation(age, curveData[i].age, curveData[i].v, curveData[i + 1].age, curveData[i + 1].v);
    }
  }
  return curveData[curveData.length - 1].v;
};

const findHeightPercentile = (gender: 'male' | 'female', boneAge: number, currentHeight: number, data: any) => {
  const percentiles = [3, 15, 50, 85, 97];
  const percentileKeys = ["3rd", "15th", "50th", "85th", "97th"];
  const heightsAtBoneAge = percentileKeys.map(key => getValueFromCurve(boneAge, data[gender].height[key]));
  
  if (currentHeight <= heightsAtBoneAge[0]) return 3;
  if (currentHeight >= heightsAtBoneAge[4]) return 97;
  
  for (let i = 0; i < heightsAtBoneAge.length - 1; i++) {
    if (currentHeight >= heightsAtBoneAge[i] && currentHeight <= heightsAtBoneAge[i+1]) {
      return linearInterpolation(currentHeight, heightsAtBoneAge[i], percentiles[i], heightsAtBoneAge[i+1], percentiles[i+1]);
    }
  }
  return 50;
};

const predictAdultHeight = (gender: 'male' | 'female', percentile: number, data: any) => {
  const percentiles = [3, 15, 50, 85, 97];
  const percentileKeys = ["3rd", "15th", "50th", "85th", "97th"];
  const heightsAt18 = percentileKeys.map(key => getValueFromCurve(18, data[gender].height[key]));
  
  if (percentile <= percentiles[0]) return heightsAt18[0];
  if (percentile >= percentiles[4]) return heightsAt18[4];
  
  for (let i = 0; i < percentiles.length - 1; i++) {
    if (percentile >= percentiles[i] && percentile <= percentiles[i+1]) {
      return linearInterpolation(percentile, percentiles[i], heightsAt18[i], percentiles[i+1], heightsAt18[i+1]);
    }
  }
  return heightsAt18[2];
};

type Gender = 'boy' | 'girl';

export default function BoneAgeCalculator() {
  const [gender, setGender] = useState<Gender>('boy');
  const [height, setHeight] = useState<string>('');
  const [boneAge, setBoneAge] = useState<string>('');
  const [fatherHeight, setFatherHeight] = useState<string>('');
  const [motherHeight, setMotherHeight] = useState<string>('');

  const [result, setResult] = useState<{
    targetHeight: number;
    targetMin: number;
    targetMax: number;
    predictedHeight: number;
    currentPercentile: number;
  } | null>(null);

  const calculate = () => {
    const h = parseFloat(height);
    const ba = parseFloat(boneAge);
    const fh = parseFloat(fatherHeight);
    const mh = parseFloat(motherHeight);

    if (!h || !ba || !fh || !mh) {
      alert('請填寫完整資訊以進行計算');
      return;
    }
    
    if (ba > 18) {
      alert('骨齡不可超過 18 歲');
      return;
    }

    // 1. 計算遺傳身高
    let targetH = 0;
    if (gender === 'boy') {
      targetH = (fh + mh + 13) / 2;
    } else {
      targetH = (fh + mh - 13) / 2;
    }

    // 2. 預測身高
    const dataGender = gender === 'boy' ? 'male' : 'female';
    const p = findHeightPercentile(dataGender, ba, h, growthData);
    const predH = predictAdultHeight(dataGender, p, growthData);

    const min = targetH - 7.5;
    const max = targetH + 7.5;

    setResult({
      targetHeight: parseFloat(targetH.toFixed(1)),
      targetMin: parseFloat(min.toFixed(1)),
      targetMax: parseFloat(max.toFixed(1)),
      predictedHeight: parseFloat(predH.toFixed(1)),
      currentPercentile: Math.round(p),
    });
  };

  // 遺傳身高 SVG 圖表繪製函式 (維持不變)
  const renderGeneticChart = () => {
    if (!result) return null;
    const width = 300;
    const height = 80;
    const barHeight = 16;
    const barY = 35;
    const chartMin = result.targetHeight - 12.5;
    const chartMax = result.targetHeight + 12.5;
    const range = chartMax - chartMin;
    const getX = (val: number) => {
      const clampedVal = Math.max(chartMin, Math.min(chartMax, val));
      return ((clampedVal - chartMin) / range) * width;
    };
    const xTarget = getX(result.targetHeight);
    const xMin = getX(result.targetMin);
    const xMax = getX(result.targetMax);
    const xPred = getX(result.predictedHeight);

    return (
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible" aria-label="遺傳身高與預測身高比較圖表" role="img">
        <defs>
          <linearGradient id="geneticGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="25%" stopColor="#eab308" />
            <stop offset="35%" stopColor="#22c55e" />
            <stop offset="65%" stopColor="#22c55e" />
            <stop offset="75%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <rect x="0" y={barY} width={width} height={barHeight} rx={barHeight/2} fill="url(#geneticGradient)" opacity="0.8" />
        <line x1={xMin} y1={barY-5} x2={xMin} y2={barY+barHeight+5} stroke="white" strokeWidth="1.5" />
        <text x={xMin} y={barY+barHeight+15} fontSize="10" fill="#94a3b8" textAnchor="middle">下限 {result.targetMin}</text>
        <line x1={xMax} y1={barY-5} x2={xMax} y2={barY+barHeight+5} stroke="white" strokeWidth="1.5" />
        <text x={xMax} y={barY+barHeight+15} fontSize="10" fill="#94a3b8" textAnchor="middle">上限 {result.targetMax}</text>
        <line x1={xTarget} y1={barY} x2={xTarget} y2={barY+barHeight} stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
        <text x={xTarget} y={barY-8} fontSize="10" fill="#22d3ee" textAnchor="middle" fontWeight="bold">中位數 {result.targetHeight}</text>
        <g transform={`translate(${xPred}, ${barY + barHeight/2})`}>
           <circle r="8" fill="#f59e0b" opacity="0.4"><animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" /></circle>
           <circle r="6" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.5" />
           <g transform="translate(0, -26)">
              <rect x="-30" y="-18" width="60" height="20" rx="6" fill="#f59e0b" />
              <text x="0" y="-4" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">預測 {result.predictedHeight}</text>
              <path d="M-5,2 L5,2 L0,7 Z" fill="#f59e0b" />
           </g>
        </g>
      </svg>
    );
  };

  // === SEO 修改：JSON-LD 結構化資料 (定義此為一個軟體應用程式) ===
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "骨齡與遺傳身高預測計算機",
    "applicationCategory": "MedicalApplication", // 醫療應用
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "TWD"
    },
    "featureList": "依據骨齡預測成年身高, 計算父母遺傳身高區間, 台灣兒童生長常模比對",
    "author": {
        "@type": "Physician",
        "name": "林羿辰醫師"
    },
    "description": "輸入骨齡、目前身高與父母身高，即可透過台灣兒童常模數據，精準計算遺傳身高區間與成年身高預測值。"
  };
  // ========================================================

  return (
    // SEO 修改：使用 section 作為主要容器
    <section aria-label="骨齡計算工具" className="max-w-5xl mx-auto p-6 md:p-10 bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 my-10 font-sans text-slate-100">
      
      {/* SEO 修改：注入 JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      {/* 標題區 */}
      <div className="mb-10 border-l-8 border-[#22d3ee] pl-6 flex justify-between items-end">
        <div>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            骨齡與遺傳身高預測
          </h1>
          <p className="text-slate-400 text-lg">
            採用台灣最新兒童生長常模，透過骨齡大數據精準推算成年身高
          </p>
        </div>
        <div className="hidden md:block text-slate-500 text-xs text-right opacity-60">
            Based on Chen W & Chang MH<br/>Pediatr Neonatol 2010
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* 左側：輸入面板 */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* 性別切換 */}
          <div className="bg-slate-700 p-2 rounded-2xl flex relative border border-slate-600" role="group" aria-label="性別選擇">
            <button
              onClick={() => setGender('boy')}
              className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                gender === 'boy'
                  ? 'bg-[#0ea5e9]/20 text-[#38bdf8] border-2 border-[#0ea5e9]/50 shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-600 border-2 border-transparent'
              }`}
              aria-pressed={gender === 'boy'}
            >
              <span className="text-2xl" role="img" aria-label="男孩">👦</span> 男孩
            </button>
            <button
              onClick={() => setGender('girl')}
              className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                gender === 'girl'
                  ? 'bg-[#ec4899]/20 text-[#f472b6] border-2 border-[#ec4899]/50 shadow-md scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-600 border-2 border-transparent'
              }`}
              aria-pressed={gender === 'girl'}
            >
              <span className="text-2xl" role="img" aria-label="女孩">👧</span> 女孩
            </button>
          </div>

          <div className="space-y-5">
            <h3 className="text-[#22d3ee] font-bold border-b border-slate-700 pb-2 mb-4">
              Step 1. 骨齡數據
            </h3>
            
            <div className="grid grid-cols-2 gap-5">
              <div className="group">
                {/* SEO 修改：加入 htmlFor 綁定 id */}
                <label htmlFor="current-height" className="block text-sm font-bold text-slate-300 mb-2 group-focus-within:text-[#22d3ee] transition-colors">目前身高 (cm)</label>
                <input
                  id="current-height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="如: 145"
                  className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 focus:bg-slate-600 focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent outline-none transition-all font-bold text-white text-lg"
                />
              </div>
              <div className="group">
                <label htmlFor="bone-age" className="block text-sm font-bold text-slate-300 mb-2 group-focus-within:text-[#22d3ee] transition-colors">
                    骨齡 (歲)
                    <span className="text-xs font-normal text-slate-500 ml-1">醫師判讀</span>
                </label>
                <input
                  id="bone-age"
                  type="number"
                  step="0.5"
                  value={boneAge}
                  onChange={(e) => setBoneAge(e.target.value)}
                  placeholder="如: 11.5"
                  className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 focus:bg-slate-600 focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent outline-none transition-all font-bold text-white text-lg"
                />
              </div>
            </div>

            <h3 className="text-[#22d3ee] font-bold border-b border-slate-700 pb-2 pt-4 mb-4">
              Step 2. 父母身高
            </h3>

            <div className="grid grid-cols-2 gap-5">
              <div className="group">
                <label htmlFor="father-height" className="block text-sm font-bold text-slate-300 mb-2 group-focus-within:text-[#22d3ee] transition-colors">父親身高 (cm)</label>
                <input
                  id="father-height"
                  type="number"
                  value={fatherHeight}
                  onChange={(e) => setFatherHeight(e.target.value)}
                  placeholder="如: 175"
                  className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 focus:bg-slate-600 focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent outline-none transition-all font-bold text-white text-lg"
                />
              </div>
              <div className="group">
                <label htmlFor="mother-height" className="block text-sm font-bold text-slate-300 mb-2 group-focus-within:text-[#22d3ee] transition-colors">母親身高 (cm)</label>
                <input
                  id="mother-height"
                  type="number"
                  value={motherHeight}
                  onChange={(e) => setMotherHeight(e.target.value)}
                  placeholder="如: 160"
                  className="w-full p-4 rounded-xl bg-slate-700 border border-slate-600 focus:bg-slate-600 focus:ring-2 focus:ring-[#22d3ee] focus:border-transparent outline-none transition-all font-bold text-white text-lg"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full py-4 mt-4 bg-gradient-to-r from-[#0891b2] to-[#22d3ee] hover:from-[#0e7490] hover:to-[#0891b2] text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/30 transform active:scale-[0.98] transition-all text-xl flex items-center justify-center gap-2"
          >
            <span role="img" aria-label="火箭">🚀</span> 開始分析預測
          </button>
        </div>

        {/* 右側：結果顯示區 */}
        {/* SEO 修改：使用 aria-live 讓螢幕閱讀器知道這裡內容會動態改變 */}
        <div className="lg:col-span-7" aria-live="polite">
          <div className="h-full bg-slate-800/50 rounded-3xl p-6 md:p-8 border border-slate-700 relative overflow-hidden flex flex-col justify-center">
            
            {!result ? (
              <div className="text-center text-slate-400 py-12 flex flex-col items-center">
                <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-600">
                  <span className="text-4xl opacity-50">🦴</span>
                </div>
                <h3 className="text-xl font-bold text-slate-300 mb-2">等待數據輸入</h3>
                <p className="max-w-xs mx-auto text-sm opacity-70">
                    系統將比對台灣常模資料庫，根據骨齡落點推算成年身高。
                </p>
              </div>
            ) : (
              <div className="space-y-8 animate-fadeIn z-10 relative">
                
                {/* 1. 主要數字卡片 */}
                <div className="bg-slate-700 rounded-2xl p-6 shadow-lg border-l-4 border-[#22d3ee] flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <p className="text-slate-300 font-bold mb-1">骨齡法預測成年身高</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black text-[#22d3ee] tracking-tighter">
                        {result.predictedHeight}
                      </span>
                      <span className="text-2xl font-bold text-slate-400">cm</span>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-xl p-4 text-center min-w-[140px] border border-slate-600">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">目前生長落點</p>
                    <div className="text-2xl font-bold text-white">PR {result.currentPercentile}</div>
                    <p className="text-[10px] text-slate-500">依骨齡 {boneAge} 歲常模</p>
                  </div>
                </div>

                {/* 2. 視覺化遺傳區間圖表 */}
                <div className="bg-slate-700 rounded-2xl p-6 shadow-sm border border-slate-600">
                  <div className="flex justify-between items-end mb-4">
                    <h4 className="font-bold text-slate-200">遺傳身高 vs 骨齡預測</h4>
                  </div>
                  
                  <div className="mt-2">
                      {renderGeneticChart()}
                  </div>
                  
                  <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium px-2">
                    <span>偏低 (黃/紅區)</span>
                    <span>偏高 (黃/紅區)</span>
                  </div>
                </div>

                {/* 3. 醫師評估 */}
                {/* SEO 修改：使用 article 包覆評論區塊，增加權重 */}
                <article className="bg-[#fffbeb] border-2 border-[#fbbf24] rounded-2xl p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)]">
                  <h4 className="text-[#b45309] font-bold text-lg mb-3 flex items-center">
                    <span className="bg-[#f59e0b] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2 shadow-sm">!</span>
                    醫師初步評估
                  </h4>
                  <div className="text-[#78350f] leading-relaxed font-medium space-y-2">
                    <p>根據父母身高計算，孩子的<strong>遺傳目標身高</strong>約為 <strong>{result.targetHeight} cm</strong>。</p>
                    
                    {result.predictedHeight < result.targetMin ? (
                      <p className="font-bold text-red-700 bg-red-100 p-3 rounded-xl border border-red-200">
                        ⚠️ <strong>生長落後警訊：</strong> 目前依骨齡推算的預測身高 ({result.predictedHeight} cm) 明顯低於遺傳潛力。這可能與營養吸收、生長激素不足或性早熟導致骨齡超前有關，建議務必回診評估。
                      </p>
                    ) : result.predictedHeight > result.targetMax ? (
                      <p className="font-bold text-green-800 bg-green-100 p-3 rounded-xl border border-green-200">
                        🎉 <strong>發育表現優異：</strong> 預測身高 ({result.predictedHeight} cm) 超越了遺傳預期！這顯示後天的營養、睡眠與運動發揮了極佳的效果，請繼續保持。
                      </p>
                    ) : (
                      <p className="font-bold text-[#0e7490] bg-cyan-100 p-3 rounded-xl border border-cyan-200">
                        ✅ <strong>發育狀況正常：</strong> 預測身高 ({result.predictedHeight} cm) 符合遺傳潛力範圍，表示生長軌道穩定。請持續定期追蹤骨齡，確保不脫軌。
                      </p>
                    )}
                  </div>
                </article>

                <p className="text-center text-xs text-slate-500">
                  * 預測結果基於統計學常模，實際身高仍受後天環境、青春期啟動時間等因素影響。
                </p>

              </div>
            )}
            
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-900/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-10 -left-10 w-32 h-32 bg-blue-900/20 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}