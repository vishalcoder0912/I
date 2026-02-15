import { supabase, handleSupabaseError, handleSuccess } from '@/lib/supabase';
import { LabTest } from '@/types';

export const labTestService = {
  // Get all lab tests
  async getAllLabTests(limit = 50, offset = 0) {
    try {
      const { data, error, count } = await supabase
        .from('lab_tests')
        .select('*', { count: 'exact' })
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

      if (error) return handleSupabaseError(error);
      return { error: false, data, count };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get lab tests for patient
  async getPatientLabTests(patientId: string) {
    try {
      const { data, error } = await supabase
        .from('lab_tests')
        .select('*')
        .eq('patient_id', patientId)
        .order('test_date', { ascending: false });

      if (error) return handleSupabaseError(error);
      return handleSuccess(data);
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get lab test by ID
  async getLabTestById(testId: string) {
    try {
      const { data, error } = await supabase
        .from('lab_tests')
        .select('*')
        .eq('id', testId)
        .single();

      if (error) return handleSupabaseError(error);
      return handleSuccess(data);
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Create lab test
  async createLabTest(testData: Omit<LabTest, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('lab_tests')
        .insert(testData)
        .select()
        .single();

      if (error) return handleSupabaseError(error);
      return handleSuccess(data, 'Lab test created successfully');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Update lab test
  async updateLabTest(testId: string, updates: Partial<LabTest>) {
    try {
      const { data, error } = await supabase
        .from('lab_tests')
        .update(updates)
        .eq('id', testId)
        .select()
        .single();

      if (error) return handleSupabaseError(error);
      return handleSuccess(data, 'Lab test updated successfully');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get lab tests by status
  async getLabTestsByStatus(status: LabTest['status']) {
    try {
      const { data, error } = await supabase
        .from('lab_tests')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) return handleSupabaseError(error);
      return handleSuccess(data);
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Delete lab test
  async deleteLabTest(testId: string) {
    try {
      const { error } = await supabase
        .from('lab_tests')
        .delete()
        .eq('id', testId);

      if (error) return handleSupabaseError(error);
      return handleSuccess(null, 'Lab test deleted successfully');
    } catch (error) {
      return handleSupabaseError(error);
    }
  },
};
