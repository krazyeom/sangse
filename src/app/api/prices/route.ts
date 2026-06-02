import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM prices ORDER BY gift_card_type, buy_price DESC');
    const prices = stmt.all();

    // 마지막 크롤링 시간 찾기
    let lastCrawledAt = null;
    if (prices.length > 0) {
      lastCrawledAt = (prices[0] as any).crawled_at;
    }

    return NextResponse.json({
      success: true,
      lastCrawledAt,
      prices
    });
  } catch (error) {
    console.error('Failed to fetch prices API:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
