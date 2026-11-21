import { NextRequest, NextResponse } from 'next/server';
import { generateStylistResponse, ChatMessage, ModelProvider } from '@/lib/ai/providers';
import { saveStylistSession } from '@/lib/ai/supabase-storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, provider = 'auto', sessionId = `session_${Date.now()}`, userId } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request. Messages array is required.' },
        { status: 400 }
      );
    }

    const stylistResponse = await generateStylistResponse(
      messages as ChatMessage[],
      provider as ModelProvider
    );

    // Save session asynchronously in Supabase
    saveStylistSession(sessionId, [
      ...messages,
      {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: stylistResponse.message,
        products: stylistResponse.products,
        timestamp: Date.now(),
      },
    ], userId);

    return NextResponse.json({
      success: true,
      data: stylistResponse,
      sessionId,
    });
  } catch (error: any) {
    console.error('Error in /api/ai-stylist/chat:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate stylist response' },
      { status: 500 }
    );
  }
}

