import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'shinsegae';
    const days = parseInt(searchParams.get('days') || '30', 10);

    const stmt = db.prepare(`
      SELECT * FROM price_history 
      WHERE gift_card_type = ? 
      ORDER BY date ASC
      LIMIT ?
    `);
    
    const history = stmt.all(type, days);

    return NextResponse.json({
      success: true,
      history
    });
  } catch (error) {
    console.error('Failed to fetch history API:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
