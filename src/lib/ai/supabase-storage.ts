import { createClient } from '@/lib/supabase/client';
import { ChatMessage } from './providers/types';

export async function saveStylistSession(sessionId: string, messages: ChatMessage[], userId?: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your_supabase')) {
    // Supabase credentials not yet configured by user, skip silently
    return;
  }

  try {
    const supabase = createClient();
    await supabase.from('ai_stylist_sessions').upsert({
      id: sessionId,
      user_id: userId || null,
      preferences: { messageCount: messages.length },
      recommendations: messages,
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('[Supabase Storage] Failed to persist session:', err);
  }
}

