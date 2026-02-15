import { supabase, handleSupabaseError, handleSuccess } from '@/lib/supabase';
import { User } from '@/types';

export interface SignUpRequest {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  role: User['role'];
}

export interface SignInRequest {
  email: string;
  password: string;
}

export const authService = {
  // Sign up a new user
  async signUp(data: SignUpRequest) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) return handleSupabaseError(authError);

      // Create user profile
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: data.email,
            full_name: data.full_name,
            phone: data.phone,
            role: data.role,
          });

        if (profileError) return handleSupabaseError(profileError);
      }

      return handleSuccess(authData.user, 'User created successfully. Please check your email to confirm.');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Sign in user
  async signIn(data: SignInRequest) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) return handleSupabaseError(authError);

      // Get user profile
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError) return handleSupabaseError(userError);

      return handleSuccess({ auth: authData, user: userData }, 'Signed in successfully');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) return handleSupabaseError(sessionError);
      if (!sessionData.session) {
        return { error: true, data: null, message: 'Not authenticated' };
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', sessionData.session.user.id)
        .single();

      if (userError) return handleSupabaseError(userError);

      return handleSuccess(userData);
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Sign out user
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return handleSupabaseError(error);
      return handleSuccess(null, 'Signed out successfully');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Reset password
  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) return handleSupabaseError(error);
      return handleSuccess(null, 'Check your email for password reset link');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Update password
  async updatePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) return handleSupabaseError(error);
      return handleSuccess(null, 'Password updated successfully');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Update user profile
  async updateProfile(userId: string, updates: Partial<User>) {
    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId);

      if (error) return handleSupabaseError(error);
      return handleSuccess(null, 'Profile updated successfully');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },
};
