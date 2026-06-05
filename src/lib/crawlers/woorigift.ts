import axios from 'axios';
import * as cheerio from 'cheerio';
import { CrawlResult, PriceInfo } from '../types';

export async function crawlWoorigift(): Promise<CrawlResult> {
  const url = 'http://www.woorigiftcard.com/';
  const prices: PriceInfo[] = [];

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $('table tr').each((_, tr) => {
      const tds = $(tr).find('td');
      if (tds.length >= 3) {
        const productName = $(tds[0]).text().replace(/\s+/g, '');
        if (!productName) return;

        let type: PriceInfo['giftCardType'] | null = null;
        if (productName.includes('신세계')) type = 'shinsegae';
        else if (productName.includes('현대')) type = 'hyundai';
        else if (productName.includes('롯데')) type = 'lotte';

        if (type && productName.includes('10만')) {
          const buyText = $(tds[2]).text().replace(/\s+/g, '');
          // e.g. "96.450원[3.55%]" or "96,450원(3.55%)"
          const match = buyText.match(/([\d,\.]+)[원]?.*?[\[\(]([\d\.]+)\s*%/);
          if (match) {
            const priceStr = match[1].replace(/[^\d]/g, ''); // Remove . and ,
            const buyPrice = parseInt(priceStr, 10);
            const buyRate = parseFloat(match[2]);

            if (buyPrice > 10000 && buyPrice <= 100000) {
              if (!prices.find(p => p.giftCardType === type)) {
                prices.push({
                  giftCardType: type,
                  denomination: 100000,
                  buyPrice,
                  buyRate
                });
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error crawling woorigiftcard:', error);
  }

  return {
    siteName: '행복상품권',
    siteUrl: url,
    timestamp: new Date(),
    prices
  };
}
