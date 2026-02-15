import { supabase, handleSupabaseError, handleSuccess } from '@/lib/supabase';
import { Bill, BillItem } from '@/types';

export const billingService = {
    // Get all bills
    async getAllBills(limit = 50, offset = 0) {
        try {
            const { data, error, count } = await supabase
                .from('bills')
                .select('*', { count: 'exact' })
                .range(offset, offset + limit - 1)
                .order('bill_date', { ascending: false });

            if (error) return handleSupabaseError(error);
            return { error: false, data, count };
        } catch (error) {
            return handleSupabaseError(error);
        }
    },

    // Get bills for patient
    async getPatientBills(patientId: string) {
        try {
            const { data, error } = await supabase
                .from('bills')
                .select('*')
                .eq('patient_id', patientId)
                .order('bill_date', { ascending: false });

            if (error) return handleSupabaseError(error);
            return handleSuccess(data);
        } catch (error) {
            return handleSupabaseError(error);
        }
    },

    // Get bill by ID
    async getBillById(billId: string) {
        try {
            const { data: billData, error: billError } = await supabase
                .from('bills')
                .select('*')
                .eq('id', billId)
                .single();

            if (billError) return handleSupabaseError(billError);

            // Get bill items
            const { data: itemsData, error: itemsError } = await supabase
                .from('bill_items')
                .select('*')
                .eq('bill_id', billId);

            if (itemsError) return handleSupabaseError(itemsError);

            return handleSuccess({ ...billData, items: itemsData });
        } catch (error) {
            return handleSupabaseError(error);
        }
    },

    // Create bill
    async createBill(billData: Omit<Bill, 'id' | 'created_at' | 'updated_at' | 'items'>) {
        try {
            const { data, error } = await supabase
                .from('bills')
                .insert(billData)
                .select()
                .single();

            if (error) return handleSupabaseError(error);
            return handleSuccess(data, 'Bill created successfully');
        } catch (error) {
            return handleSupabaseError(error);
        }
    },

    // Update bill
    async updateBill(billId: string, updates: Partial<Bill>) {
        try {
            const { data, error } = await supabase
                .from('bills')
                .update(updates)
                .eq('id', billId)
                .select()
                .single();

            if (error) return handleSupabaseError(error);
            return handleSuccess(data, 'Bill updated successfully');
        } catch (error) {
            return handleSupabaseError(error);
        }
    },

    // Add bill item
    async addBillItem(itemData: Omit<BillItem, 'id' | 'created_at'>) {
        try {
            const { data, error } = await supabase
                .from('bill_items')
                .insert(itemData)
                .select()
                .single();

            if (error) return handleSupabaseError(error);
            return handleSuccess(data, 'Bill item added successfully');
        } catch (error) {
            return handleSupabaseError(error);
        }
    },

    // Get bills by status
    async getBillsByStatus(status: Bill['status']) {
        try {
            const { data, error } = await supabase
                .from('bills')
                .select('*')
                .eq('status', status)
                .order('bill_date', { ascending: false });

            if (error) return handleSupabaseError(error);
            return handleSuccess(data);
        } catch (error) {
            return handleSupabaseError(error);
        }
    },

    // Delete bill
    async deleteBill(billId: string) {
        try {
            const { error } = await supabase
                .from('bills')
                .delete()
                .eq('id', billId);

            if (error) return handleSupabaseError(error);
            return handleSuccess(null, 'Bill deleted successfully');
        } catch (error) {
            return handleSupabaseError(error);
        }
    },
};
