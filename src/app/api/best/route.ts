import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    let query = db.from('prices').select('*');
    if (type) {
      query = query.eq('gift_card_type', type);
    }
    const { data: prices, error } = await query.order('buy_price', { ascending: false });

    if (error) throw error;

    if (!prices || prices.length === 0) {
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
