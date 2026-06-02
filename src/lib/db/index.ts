import Database from 'better-sqlite3';
import path from 'path';

// DB 경로 설정 (루트 디렉토리)
const dbPath = path.resolve(process.cwd(), 'deptgift.db');
const db = new Database(dbPath);

// 스키마 초기화
db.exec(`
  CREATE TABLE IF NOT EXISTS prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    site_name TEXT NOT NULL,
    site_url TEXT NOT NULL,
    gift_card_type TEXT NOT NULL,
    denomination INTEGER NOT NULL,
    buy_price INTEGER NOT NULL,
    buy_rate REAL NOT NULL,
    crawled_at DATETIME NOT NULL
  );

  CREATE TABLE IF NOT EXISTS price_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    gift_card_type TEXT NOT NULL,
    best_site_name TEXT NOT NULL,
    best_buy_price INTEGER NOT NULL,
    best_buy_rate REAL NOT NULL
  );
`);

export default db;
