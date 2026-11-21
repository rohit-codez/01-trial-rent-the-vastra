import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Admin client using service role key. 
// DANGER: NEVER USE THIS ON THE CLIENT SIDE.
// Only use for backend tasks, webhooks, or when bypassing Row Level Security is required.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}
