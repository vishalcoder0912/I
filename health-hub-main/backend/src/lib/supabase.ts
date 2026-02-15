import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or Anon Key is missing. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your environment variables'
  );
}

// Client for public/user operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client for admin/service operations (use with caution)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);

// Helper function to handle errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase Error:', error);
  return {
    error: true,
    message: error?.message || 'An error occurred',
    code: error?.code,
  };
};

// Helper function for successful responses
export const handleSuccess = (data: any, message = 'Success') => {
  return {
    error: false,
    data,
    message,
  };
};
