import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const reservationCode = `ROH-${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json({
      success: true,
      reservationCode,
      message: 'Your RoH Sound flagship pre-order is confirmed.',
      details: {
        colorway: body.colorway || 'midnight',
        quantity: body.quantity || 1,
        engraving: body.engraving || 'Standard Edition',
        estimatedDelivery: 'Ships in 2-3 business days',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }
}
