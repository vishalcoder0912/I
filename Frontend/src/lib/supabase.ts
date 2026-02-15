import { createClient } from '@supabase/supabase-js';

// Public environment variables (safe for browser)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Validate public config
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment variables');
}

/*
|--------------------------------------------------------------------------|
| Public Client (Frontend Safe)
|--------------------------------------------------------------------------|
*/
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/*
|--------------------------------------------------------------------------|
| Standardized Helpers
|--------------------------------------------------------------------------|
*/
export const handleSupabaseError = (error: unknown) => {
  const err = error as { message?: string; code?: string };

  console.error('Supabase Error:', err);

  return {
    error: true,
    message: err?.message ?? 'An error occurred',
    code: err?.code ?? null,
  };
};

export const handleSuccess = <T>(data: T, message = 'Success') => {
  return {
    error: false,
    data,
    message,
  };
};

/*
|--------------------------------------------------------------------------|
| Auth Helpers
|--------------------------------------------------------------------------|
*/
export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) return handleSupabaseError(error);
    return handleSuccess(data, 'Sign up successful');
  } catch (error) {
    return handleSupabaseError(error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return handleSupabaseError(error);
    return handleSuccess(data, 'Sign in successful');
  } catch (error) {
    return handleSupabaseError(error);
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return handleSupabaseError(error);
    return handleSuccess(null, 'Sign out successful');
  } catch (error) {
    return handleSupabaseError(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) return handleSupabaseError(error);
    return handleSuccess(data.user);
  } catch (error) {
    return handleSupabaseError(error);
  }
};