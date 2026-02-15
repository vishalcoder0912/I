import { supabase, handleSupabaseError } from '@/lib/supabase';
import { Bed, BedAllocation } from '@/types/database';

export const bedService = {
  // Get all beds
  async getAllBeds(limit = 50, offset = 0) {
    try {
      const { data, error, count } = await supabase
        .from('beds')
        .select('*', { count: 'exact' })
        .range(offset, offset + limit - 1)
        .order('bed_number', { ascending: true });

      if (error) return handleSupabaseError(error);
      return { error: false, data, count };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get available beds
  async getAvailableBeds() {
    try {
      const { data, error } = await supabase
        .from('beds')
        .select('*')
        .eq('status', 'available')
        .order('floor', { ascending: true });

      if (error) return handleSupabaseError(error);
      return { error: false, data };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get bed by ID
  async getBedById(bedId: string) {
    try {
      const { data, error } = await supabase
        .from('beds')
        .select('*')
        .eq('id', bedId)
        .single();

      if (error) return handleSupabaseError(error);
      return { error: false, data };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Create bed
  async createBed(bedData: Omit<Bed, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('beds')
        .insert(bedData)
        .select()
        .single();

      if (error) return handleSupabaseError(error);
      return { error: false, data, message: 'Bed created successfully' };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Update bed
  async updateBed(bedId: string, updates: Partial<Bed>) {
    try {
      const { data, error } = await supabase
        .from('beds')
        .update(updates)
        .eq('id', bedId)
        .select()
        .single();

      if (error) return handleSupabaseError(error);
      return { error: false, data, message: 'Bed updated successfully' };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Allocate bed to patient
  async allocateBed(allocationData: Omit<BedAllocation, 'id' | 'created_at' | 'updated_at'>) {
    try {
      // Create allocation
      const { data: allocationData_result, error: allocationError } = await supabase
        .from('bed_allocations')
        .insert(allocationData)
        .select()
        .single();

      if (allocationError) return handleSupabaseError(allocationError);

      // Update bed status
      const { error: bedError } = await supabase
        .from('beds')
        .update({
          status: 'occupied',
          patient_id: allocationData.patient_id,
        })
        .eq('id', allocationData.bed_id);

      if (bedError) return handleSupabaseError(bedError);

      return {
        error: false,
        data: allocationData_result,
        message: 'Bed allocated successfully',
      };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Discharge from bed
  async dischargeBed(allocationId: string) {
    try {
      // Get allocation details
      const { data: allocationData, error: getAllocationError } = await supabase
        .from('bed_allocations')
        .select('*')
        .eq('id', allocationId)
        .single();

      if (getAllocationError) return handleSupabaseError(getAllocationError);

      // Update allocation
      const { error: updateAllocationError } = await supabase
        .from('bed_allocations')
        .update({
          status: 'discharged',
          discharge_date: new Date().toISOString().split('T')[0],
        })
        .eq('id', allocationId);

      if (updateAllocationError) return handleSupabaseError(updateAllocationError);

      // Update bed status
      const { error: updateBedError } = await supabase
        .from('beds')
        .update({
          status: 'available',
          patient_id: null,
        })
        .eq('id', allocationData.bed_id);

      if (updateBedError) return handleSupabaseError(updateBedError);

      return { error: false, message: 'Patient discharged successfully' };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get bed allocations for patient
  async getPatientBedAllocations(patientId: string) {
    try {
      const { data, error } = await supabase
        .from('bed_allocations')
        .select('*, beds:bed_id(*)')
        .eq('patient_id', patientId)
        .order('admission_date', { ascending: false });

      if (error) return handleSupabaseError(error);
      return { error: false, data };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Delete bed
  async deleteBed(bedId: string) {
    try {
      const { error } = await supabase
        .from('beds')
        .delete()
        .eq('id', bedId);

      if (error) return handleSupabaseError(error);
      return { error: false, message: 'Bed deleted successfully' };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },
};
