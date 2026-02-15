import { supabase, handleSupabaseError } from '@/lib/supabase';
import { Appointment } from '@/types/database';

export const appointmentService = {
  // Get all appointments
  async getAllAppointments(limit = 50, offset = 0) {
    try {
      const { data, error, count } = await supabase
        .from('appointments')
        .select(
          '*, patient:patients(user_id), doctor:doctors(user_id)',
          { count: 'exact' }
        )
        .range(offset, offset + limit - 1)
        .order('appointment_date', { ascending: true });

      if (error) return handleSupabaseError(error);
      return { error: false, data, count };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get appointments for patient
  async getPatientAppointments(patientId: string) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*, doctor:doctors(*)')
        .eq('patient_id', patientId)
        .order('appointment_date', { ascending: false });

      if (error) return handleSupabaseError(error);
      return { error: false, data };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get appointments for doctor
  async getDoctorAppointments(doctorId: string) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*, patient:patients(*)')
        .eq('doctor_id', doctorId)
        .order('appointment_date', { ascending: true });

      if (error) return handleSupabaseError(error);
      return { error: false, data };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Get appointment by ID
  async getAppointmentById(appointmentId: string) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('id', appointmentId)
        .single();

      if (error) return handleSupabaseError(error);
      return { error: false, data };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Create appointment
  async createAppointment(appointmentData: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert(appointmentData)
        .select()
        .single();

      if (error) return handleSupabaseError(error);
      return { error: false, data, message: 'Appointment created successfully' };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Update appointment
  async updateAppointment(appointmentId: string, updates: Partial<Appointment>) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', appointmentId)
        .select()
        .single();

      if (error) return handleSupabaseError(error);
      return { error: false, data, message: 'Appointment updated successfully' };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Cancel appointment
  async cancelAppointment(appointmentId: string) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', appointmentId)
        .select()
        .single();

      if (error) return handleSupabaseError(error);
      return { error: false, data, message: 'Appointment cancelled successfully' };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },

  // Delete appointment
  async deleteAppointment(appointmentId: string) {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', appointmentId);

      if (error) return handleSupabaseError(error);
      return { error: false, message: 'Appointment deleted successfully' };
    } catch (error) {
      return handleSupabaseError(error);
    }
  },
};
