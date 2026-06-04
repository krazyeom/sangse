import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: prices, error } = await db.from('prices').select('*');

    if (error) throw error;

    if (!prices || prices.length === 0) {
      return NextResponse.json({ success: true, data: {} });
    }

    const types = ['shinsegae', 'lotte', 'hyundai'];
    const bestPrices: Record<string, any> = {};

    for (const type of types) {
      const typePrices = prices.filter(p => p.gift_card_type === type);
      if (typePrices.length > 0) {
        // Sort descending by buy_price
        typePrices.sort((a, b) => b.buy_price - a.buy_price);
        const best = typePrices[0];
        bestPrices[type] = {
          siteName: best.site_name,
          buyPrice: best.buy_price,
          buyRate: best.buy_rate,
          siteUrl: best.site_url
        };
      } else {
        bestPrices[type] = null;
      }
    }

    return NextResponse.json({
      success: true,
      data: bestPrices
    });
  } catch (error) {
    console.error('Failed to fetch best-all API:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
