import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    let query = 'SELECT * FROM prices';
    let params: any[] = [];

    if (type) {
      query += ' WHERE gift_card_type = ?';
      params.push(type);
    }
    
    // 가장 매입가가 높은(할인율이 낮은) 순으로 정렬
    query += ' ORDER BY buy_price DESC';

    const stmt = db.prepare(query);
    const prices = stmt.all(...params) as any[];

    if (prices.length === 0) {
      return NextResponse.json({ success: true, best: null, allPrices: [] });
    }

    const bestPrice = prices[0];

    return NextResponse.json({
      success: true,
      best: {
        siteName: bestPrice.site_name,
        buyPrice: bestPrice.buy_price,
        buyRate: bestPrice.buy_rate
      },
      allPrices: prices
    });
  } catch (error) {
    console.error('Failed to fetch best prices API:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
