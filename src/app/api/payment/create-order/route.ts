import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = 'INR' } = body;

    // In a real app, instantiate Razorpay and create order
    // const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_SECRET })
    // const order = await razorpay.orders.create({ amount: amount * 100, currency })

    // Mock response for development without keys
    const mockOrder = {
      id: `order_mock_${Math.random().toString(36).substring(7)}`,
      amount: amount * 100,
      currency,
    };

    return NextResponse.json({
      success: true,
      order: mockOrder,
      key: process.env.RAZORPAY_KEY_ID || 'mock_key_123'
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}
