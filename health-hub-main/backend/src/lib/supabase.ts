import { createClient } from '@supabase/supabase-js';

// Public environment variables (safe for browser)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Server-only environment variable
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate public config
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

/*
|--------------------------------------------------------------------------
| Public Client (Frontend Safe)
|--------------------------------------------------------------------------
*/
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/*
|--------------------------------------------------------------------------
| Admin Client (Server Only)
|--------------------------------------------------------------------------
| Automatically becomes undefined in browser
*/
export const supabaseAdmin =
  typeof window === 'undefined' && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth:{persistSession:false}
      })
    : null;

/*
|--------------------------------------------------------------------------
| Standardized Helpers
|--------------------------------------------------------------------------
*/
export const handleSupabaseError = (error: unknown) => {
  const err = error as {message?:string;code?:string};

  console.error('Supabase Error:', err);

  return {
    error:true,
    message:err?.message ?? 'An error occurred',
    code:err?.code ?? null,
  };
};

export const handleSuccess = <T>(data: T, message = 'Success') => {
  return {
    error:false,
    data,
    message,
  };
};
