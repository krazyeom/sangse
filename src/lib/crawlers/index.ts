import { CrawlResult } from '../types';
import { crawlGeneric } from './helper';
import { crawlChoigoTicket } from './choigoticket';
import { crawlWooticket } from './wooticket';

import { crawlUticket } from './uticket';

// TODO: citypay, 드림상품권, 베스트상품권, 행복상품권 등 커스텀 파싱이 필요한 곳 추가

export async function crawlAll(): Promise<CrawlResult[]> {
  const results: CrawlResult[] = [];
  
  const sites = [
    { name: '최고상품권', fn: crawlChoigoTicket },
    { name: '명인상품권', fn: () => crawlGeneric('명인상품권', 'http://mingren.co.kr/') },
    { name: '마이페이', fn: () => crawlGeneric('마이페이', 'http://my-pay.co.kr/') },
    { name: '엑스이상품권', fn: () => crawlGeneric('엑스이상품권', 'http://xegift.co.kr/') },
    { name: '풍연상품권', fn: () => crawlGeneric('풍연상품권', 'http://www.py-ticket.com/') },
    { name: '하이티켓', fn: () => crawlGeneric('하이티켓', 'http://hiticket99.com/') },
    { name: '우천상품권', fn: crawlWooticket },
    { name: '의리상품권', fn: crawlUticket },
  ];

  for (const site of sites) {
    try {
      console.log(`Crawling ${site.name}...`);
      const res = await site.fn();
      if (res && res.prices.length > 0) {
        results.push(res);
      } else {
        console.warn(`[Warning] No prices parsed for ${site.name}`);
      }
    } catch (e) {
      console.error(`Error crawling ${site.name}:`, e);
    }
  }

  return results;
}
