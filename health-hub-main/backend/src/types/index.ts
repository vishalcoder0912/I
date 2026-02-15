// Database Types for Health Hub Backend

export interface User {
    id: string;
    email: string;
    full_name: string;
    role: 'admin' | 'doctor' | 'nurse' | 'patient' | 'lab_technician' | 'pharmacist' | 'receptionist';
    phone: string;
    avatar_url?: string;
    department_id?: string;
    created_at: string;
    updated_at: string;
}

export interface Patient {
    id: string;
    user_id: string;
    date_of_birth: string;
    gender: 'male' | 'female' | 'other';
    blood_type: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    emergency_contact: string;
    emergency_phone: string;
    medical_history?: string;
    allergies?: string;
    created_at: string;
    updated_at: string;
}

export interface Doctor {
    id: string;
    user_id: string;
    specialization: string;
    license_number: string;
    department_id: string;
    qualifications: string;
    experience_years: number;
    consultation_fee: number;
    availability: string;
    created_at: string;
    updated_at: string;
}

export interface Appointment {
    id: string;
    patient_id: string;
    doctor_id: string;
    appointment_date: string;
    appointment_time: string;
    status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
    reason_for_visit: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface MedicalRecord {
    id: string;
    patient_id: string;
    doctor_id: string;
    appointment_id: string;
    diagnosis: string;
    symptoms: string;
    treatment: string;
    prescription?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface LabTest {
    id: string;
    patient_id: string;
    doctor_id: string;
    test_name: string;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    test_date: string;
    result_date?: string;
    result?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface Medication {
    id: string;
    patient_id: string;
    doctor_id: string;
    medication_name: string;
    dosage: string;
    frequency: string;
    start_date: string;
    end_date?: string;
    instructions?: string;
    created_at: string;
    updated_at: string;
}

export interface Bed {
    id: string;
    bed_number: string;
    floor: number;
    ward: string;
    status: 'available' | 'occupied' | 'maintenance';
    patient_id?: string;
    created_at: string;
    updated_at: string;
}

export interface Department {
    id: string;
    name: string;
    description: string;
    head_id?: string;
    created_at: string;
    updated_at: string;
}

export interface BedAllocation {
    id: string;
    bed_id: string;
    patient_id: string;
    admission_date: string;
    discharge_date?: string;
    status: 'active' | 'discharged' | 'transferred';
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface Bill {
    id: string;
    patient_id: string;
    total_amount: number;
    paid_amount: number;
    status: 'pending' | 'partial' | 'paid';
    bill_date: string;
    due_date: string;
    items?: BillItem[];
    created_at: string;
    updated_at: string;
}

export interface BillItem {
    id: string;
    bill_id: string;
    description: string;
    amount: number;
    quantity: number;
    created_at: string;
}

export interface Notification {
    id: string;
    user_id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    read: boolean;
    created_at: string;
}

export interface BloodBank {
    id: string;
    blood_type: string;
    quantity: number;
    expiry_date: string;
    donor_id?: string;
    status: 'available' | 'reserved' | 'expired';
    created_at: string;
    updated_at: string;
}

export interface Attendance {
    id: string;
    user_id: string;
    date: string;
    check_in_time: string;
    check_out_time?: string;
    status: 'present' | 'absent' | 'late' | 'leave';
    notes?: string;
    created_at: string;
    updated_at: string;
}

