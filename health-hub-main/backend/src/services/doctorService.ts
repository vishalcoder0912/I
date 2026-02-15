import { supabase, handleSupabaseError, handleSuccess } from '@/lib/supabase';
import { Doctor } from '@/types';

export const doctorService = {
  // Get all doctors
  async getAllDoctors(limit = 50, offset = 0) {
    try {
      const { data, error, count } = await supabase
        .from('doctors')
        .select('*, users:user_id(full_name, email, phone)', { count: 'exact' })
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

      if (error) return handleSupabaseError(error);
      return { error: false, data, count };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get doctor by ID
  async getDoctorById(doctorId: string) {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*, users:user_id(*)')
        .eq('id', doctorId)
        .single();

      if (error) return handleSupabaseError(error);
      return handleSuccess(data);
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get doctor by user ID
  async getDoctorByUserId(userId: string) {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) return handleSupabaseError(error);
      return handleSuccess(data);
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get doctors by department
  async getDoctorsByDepartment(departmentId: string) {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*, users:user_id(full_name, email, phone)')
        .eq('department_id', departmentId)
        .order('created_at', { ascending: false });

      if (error) return handleSupabaseError(error);
      return handleSuccess(data);
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get doctors by specialization
  async getDoctorsBySpecialization(specialization: string) {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*, users:user_id(full_name, email, phone)')
        .eq('specialization', specialization);

      if (error) return handleSupabaseError(error);
      return handleSuccess(data);
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Create doctor
  async createDoctor(doctorData: Omit<Doctor, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .insert(doctorData)
        .select()
        .single();

      if (error) return handleSupabaseError(error);
      return handleSuccess(data, 'Doctor created successfully');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Update doctor
  async updateDoctor(doctorId: string, updates: Partial<Doctor>) {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .update(updates)
        .eq('id', doctorId)
        .select()
        .single();

      if (error) return handleSupabaseError(error);
      return handleSuccess(data, 'Doctor updated successfully');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Delete doctor
  async deleteDoctor(doctorId: string) {
    try {
      const { error } = await supabase
        .from('doctors')
        .delete()
        .eq('id', doctorId);

      if (error) return handleSupabaseError(error);
      return handleSuccess(null, 'Doctor deleted successfully');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },
};
