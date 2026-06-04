import Tesseract from 'tesseract.js';
import { CrawlResult, PriceInfo } from '../types';

function extractRate(line: string): number | null {
  const pctIndex = line.indexOf('%');
  if (pctIndex === -1) return null;

  const strBeforePct = line.substring(Math.max(0, pctIndex - 20), pctIndex);
  const match = strBeforePct.match(/([0-9]+)$/);
  if (!match) return null;
  
  const digits = match[1];
  
  for (let len = 3; len >= 2; len--) {
      for (let start = 0; start <= digits.length - (len * 2 + 1); start++) {
          const r1 = digits.substring(start, start + len);
          const r2 = digits.substring(start + len + 1, start + len + 1 + len);
          
          const num1 = parseInt(r1, 10);
          const num2 = parseInt(r2, 10);
          
          if (num1 >= 20 && num1 <= 500 && num2 >= 20 && num2 <= 500) {
              return len === 2 ? num1 / 10 : num1 / 100;
          }
      }
  }
  return null;
}

export async function crawlKnct(): Promise<CrawlResult> {
  const url = 'https://knct.shop/priceall/';
  const prices: PriceInfo[] = [];

  try {
    const worker = await Tesseract.createWorker('kor');
    await worker.setParameters({ tessedit_pageseg_mode: Tesseract.PSM.SINGLE_COLUMN });
    const { data: { text } } = await worker.recognize('http://knct.shop/price/price.jpg');
    
    const lines = text.split('\n');
    
    for (const line of lines) {
      const isHyundai = line.includes('현대');
      const isShinsegae = line.includes('신세계');
      const isLotte = line.includes('롯데');
      
      if (!isHyundai && !isShinsegae && !isLotte) continue;
      
      const type = isHyundai ? 'hyundai' : isShinsegae ? 'shinsegae' : 'lotte';
      
      const rate = extractRate(line);
      if (rate) {
          const buyPrice = 100000 - (100000 * (rate / 100));
          
          // Check if we already have this type (in case OCR duplicates lines)
          if (!prices.find(p => p.giftCardType === type)) {
              prices.push({
                  giftCardType: type,
                  denomination: 100000,
                  buyPrice,
                  buyRate: rate
              });
          }
      }
    }
    await worker.terminate();
  } catch (error) {
    console.error('Error in crawlKnct (OCR):', error);
  }

  return {
    siteName: '도전상품권',
    siteUrl: url,
    timestamp: new Date(),
    prices
  };
}
