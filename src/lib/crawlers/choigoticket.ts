import { CrawlResult, PriceInfo } from '../types';
import { fetchHtml, parsePriceText } from './helper';

export async function crawlChoigoTicket(): Promise<CrawlResult | null> {
  const url = 'https://www.choigoticket.com';
  const $ = await fetchHtml(url);
  if (!$) return null;

  const prices: PriceInfo[] = [];

  $('tr').each((_, el) => {
    const text = $(el).text().trim();
    if (text.includes('10만') && !text.includes('증정') && !text.includes('제화')) {
      let type: PriceInfo['giftCardType'] | null = null;
      if (text.includes('신세계')) type = 'shinsegae';
      else if (text.includes('현대')) type = 'hyundai';
      else if (text.includes('롯데')) type = 'lotte';

      if (type) {
        // 최고상품권은 보통 td 안의 _amt1 속성이나 텍스트를 사용
        const input = $(el).find('input.qty');
        let buyPrice = 0;
        let buyRate = 0;

        if (input.length > 0) {
           const amt1 = input.attr('_amt1');
           if (amt1) {
              buyPrice = parseInt(amt1);
              buyRate = Math.round(((100000 - buyPrice) / 100000) * 100 * 100) / 100;
           }
        }

        // fallback to text parse
        if (buyPrice === 0) {
           $(el).find('td').each((_, td) => {
               const parsed = parsePriceText($(td).text());
               if (parsed && parsed.price > 10000) {
                   buyPrice = parsed.price;
                   buyRate = parsed.rate;
               }
           });
        }

        if (buyPrice > 0) {
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
  });

  return {
    siteName: '최고상품권',
    siteUrl: url,
    timestamp: new Date(),
    prices,
  };
}
