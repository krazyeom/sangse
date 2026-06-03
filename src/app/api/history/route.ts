import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'shinsegae';
    const days = parseInt(searchParams.get('days') || '30', 10);

    const { data: history, error } = await db.from('price_history')
      .select('*')
      .eq('gift_card_type', type)
      .order('date', { ascending: true })
      .limit(days);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      history: history || []
    });
  } catch (error) {
    console.error('Failed to fetch history API:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
