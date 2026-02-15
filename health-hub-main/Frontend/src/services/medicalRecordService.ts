import { supabase, handleSupabaseError } from '@/lib/supabase';
import { MedicalRecord } from '@/types/database';

export const medicalRecordService = {
  // Get all medical records
  async getAllMedicalRecords(limit = 50, offset = 0) {
    try {
      const { data, error, count } = await supabase
        .from('medical_records')
        .select('*', { count: 'exact' })
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

      if (error) return handleSupabaseError(error);
      return { error: false, data, count };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get medical records for patient
  async getPatientMedicalRecords(patientId: string) {
    try {
      const { data, error } = await supabase
        .from('medical_records')
        .select('*')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false });

      if (error) return handleSupabaseError(error);
      return { error: false, data };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get medical record by ID
  async getMedicalRecordById(recordId: string) {
    try {
      const { data, error } = await supabase
        .from('medical_records')
        .select('*')
        .eq('id', recordId)
        .single();

      if (error) return handleSupabaseError(error);
      return { error: false, data };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Create medical record
  async createMedicalRecord(
    recordData: Omit<MedicalRecord, 'id' | 'created_at' | 'updated_at'>
  ) {
    try {
      const { data, error } = await supabase
        .from('medical_records')
        .insert(recordData)
        .select()
        .single();

      if (error) return handleSupabaseError(error);
      return { error: false, data, message: 'Medical record created successfully' };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Update medical record
  async updateMedicalRecord(recordId: string, updates: Partial<MedicalRecord>) {
    try {
      const { data, error } = await supabase
        .from('medical_records')
        .update(updates)
        .eq('id', recordId)
        .select()
        .single();

      if (error) return handleSupabaseError(error);
      return { error: false, data, message: 'Medical record updated successfully' };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Delete medical record
  async deleteMedicalRecord(recordId: string) {
    try {
      const { error } = await supabase
        .from('medical_records')
        .delete()
        .eq('id', recordId);

      if (error) return handleSupabaseError(error);
      return { error: false, message: 'Medical record deleted successfully' };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },
};
