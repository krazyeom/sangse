import cron from 'node-cron';
import { crawlAll } from './crawlers';
import db from './db';

// 실시간 시세를 DB에 저장
async function updatePrices() {
  console.log('[Scheduler] Starting to crawl prices...');
  const results = await crawlAll();
  
  const insertStmt = db.prepare(`
    INSERT INTO prices (site_name, site_url, gift_card_type, denomination, buy_price, buy_rate, crawled_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const deleteStmt = db.prepare('DELETE FROM prices');
  
  // 트랜잭션으로 한 번에 교체
  const transaction = db.transaction(() => {
    deleteStmt.run(); // 과거 데이터 모두 삭제 (최신 데이터만 유지)
    for (const res of results) {
      for (const price of res.prices) {
        insertStmt.run(
          res.siteName,
          res.siteUrl,
          price.giftCardType,
          price.denomination,
          price.buyPrice,
          price.buyRate,
          res.timestamp.toISOString()
        );
      }
    }
  });

  try {
    transaction();
    console.log(`[Scheduler] Successfully updated prices from ${results.length} sites.`);
  } catch (e) {
    console.error('[Scheduler] Failed to update DB:', e);
  }
}

// 스케줄러 시작
export function startScheduler() {
  console.log('[Scheduler] Initializing cron jobs...');
  // 10분마다 실행
  cron.schedule('*/10 * * * *', () => {
    updatePrices();
  });

  // 서버 시작시 바로 1회 실행
  updatePrices();
}
