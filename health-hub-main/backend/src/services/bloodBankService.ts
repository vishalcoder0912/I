import { supabase, handleSupabaseError, handleSuccess } from '@/lib/supabase';
import { BloodBank } from '@/types';

export const bloodBankService = {
    // Get all blood units
    async getAllBloodUnits(limit = 50, offset = 0) {
        try {
            const { data, error, count } = await supabase
                .from('blood_bank')
                .select('*', { count: 'exact' })
                .range(offset, offset + limit - 1)
                .order('created_at', { ascending: false });

            if (error) return handleSupabaseError(error);
            return { error: false, data, count };
        } catch (error) {
            return handleSupabaseError(error);
        }
    },

    // Get blood units by type
    async getBloodByType(bloodType: string) {
        try {
            const { data, error } = await supabase
                .from('blood_bank')
                .select('*')
                .eq('blood_type', bloodType)
                .eq('status', 'available')
                .order('expiry_date', { ascending: true });

            if (error) return handleSupabaseError(error);
            return handleSuccess(data);
        } catch (error) {
            return handleSupabaseError(error);
        }
    },

    // Get blood inventory summary
    async getBloodInventorySummary() {
        try {
            const { data, error } = await supabase
                .from('blood_bank')
                .select('blood_type, status')
                .eq('status', 'available');

            if (error) return handleSupabaseError(error);

            // Group by blood type
            const summary = (data as any[])?.reduce((acc: any, unit: any) => {
                if (!acc[unit.blood_type]) {
                    acc[unit.blood_type] = 0;
                }
                acc[unit.blood_type]++;
                return acc;
            }, {});

            return handleSuccess(summary);
        } catch (error) {
            return handleSupabaseError(error);
        }
    },

    // Add blood unit
    async addBloodUnit(unitData: Omit<BloodBank, 'id' | 'created_at' | 'updated_at'>) {
        try {
            const { data, error } = await supabase
                .from('blood_bank')
                .insert(unitData)
                .select()
                .single();

            if (error) return handleSupabaseError(error);
            return handleSuccess(data, 'Blood unit added successfully');
        } catch (error) {
            return handleSupabaseError(error);
        }
    },

    // Update blood unit
    async updateBloodUnit(unitId: string, updates: Partial<BloodBank>) {
        try {
            const { data, error } = await supabase
                .from('blood_bank')
                .update(updates)
                .eq('id', unitId)
                .select()
                .single();

            if (error) return handleSupabaseError(error);
            return handleSuccess(data, 'Blood unit updated successfully');
        } catch (error) {
            return handleSupabaseError(error);
        }
    },

    // Reserve blood unit
    async reserveBloodUnit(unitId: string) {
        try {
            const { data, error } = await supabase
                .from('blood_bank')
                .update({ status: 'reserved' })
                .eq('id', unitId)
                .select()
                .single();

            if (error) return handleSupabaseError(error);
            return handleSuccess(data, 'Blood unit reserved successfully');
        } catch (error) {
            return handleSupabaseError(error);
        }
    },

    // Get blood unit by ID
    async getBloodUnitById(unitId: string) {
        try {
            const { data, error } = await supabase
                .from('blood_bank')
                .select('*')
                .eq('id', unitId)
                .single();

            if (error) return handleSupabaseError(error);
            return handleSuccess(data);
        } catch (error) {
            return handleSupabaseError(error);
        }
    },

    // Delete blood unit
    async deleteBloodUnit(unitId: string) {
        try {
            const { error } = await supabase
                .from('blood_bank')
                .delete()
                .eq('id', unitId);

            if (error) return handleSupabaseError(error);
            return handleSuccess(null, 'Blood unit deleted successfully');
        } catch (error) {
            return handleSupabaseError(error);
        }
    },
};
