import { supabase, handleSupabaseError, handleSuccess } from '@/lib/supabase';
import { Patient } from '@/types';

export const patientService = {
  // Get all patients
  async getAllPatients(limit = 50, offset = 0) {
    try {
      const { data, error, count } = await supabase
        .from('patients')
        .select('*', { count: 'exact' })
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

      if (error) return handleSupabaseError(error);
      return { error: false, data, count };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get patient by ID
  async getPatientById(patientId: string) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('id', patientId)
        .single();

      if (error) return handleSupabaseError(error);
      return handleSuccess(data);
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get patient by user ID
  async getPatientByUserId(userId: string) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) return handleSupabaseError(error);
      return handleSuccess(data);
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Create patient
  async createPatient(patientData: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .insert(patientData)
        .select()
        .single();

      if (error) return handleSupabaseError(error);
      return handleSuccess(data, 'Patient created successfully');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Update patient
  async updatePatient(patientId: string, updates: Partial<Patient>) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .update(updates)
        .eq('id', patientId)
        .select()
        .single();

      if (error) return handleSupabaseError(error);
      return handleSuccess(data, 'Patient updated successfully');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Delete patient
  async deletePatient(patientId: string) {
    try {
      const { error } = await supabase
        .from('patients')
        .delete()
        .eq('id', patientId);

      if (error) return handleSupabaseError(error);
      return handleSuccess(null, 'Patient deleted successfully');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Search patients
  async searchPatients(query: string) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*, users:user_id(full_name, email)')
        .ilike('users.full_name', `%${query}%`);

      if (error) return handleSupabaseError(error);
      return handleSuccess(data);
    } catch (error) {
      return handleSupabaseError(error);
    }
  },
};
