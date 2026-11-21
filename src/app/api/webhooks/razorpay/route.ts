import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret || !signature) {
      return NextResponse.json({ error: 'Missing secret or signature' }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // TODO: Initialize Supabase admin client here
    // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

    switch (event.event) {
      case 'payment.captured':
        const paymentData = event.payload.payment.entity;
        console.log(`Payment captured: ${paymentData.id} for order ${paymentData.order_id}`);
        // TODO: Update booking status to 'confirmed' and payment status to 'captured' in Supabase
        break;

      case 'payment.failed':
        const failedData = event.payload.payment.entity;
        console.log(`Payment failed: ${failedData.id}`);
        // TODO: Update payment status to 'failed' in Supabase
        break;

      case 'refund.processed':
        const refundData = event.payload.refund.entity;
        console.log(`Refund processed: ${refundData.id}`);
        // TODO: Update security deposit status to 'refunded' in Supabase
        break;

      default:
        console.log(`Unhandled event type: ${event.event}`);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
