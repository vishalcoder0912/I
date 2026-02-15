# HealthHub Backend - Supabase Integration

This document outlines the backend setup for HealthHub using Supabase.

## Project Structure

```
src/
├── lib/
│   └── supabase.ts          # Supabase client configuration
├── services/                # API services
│   ├── authService.ts       # Authentication
│   ├── patientService.ts    # Patient management
│   ├── doctorService.ts     # Doctor management
│   ├── appointmentService.ts
│   ├── medicalRecordService.ts
│   ├── labTestService.ts
│   ├── billingService.ts
│   ├── bloodBankService.ts
│   ├── bedService.ts
│   └── index.ts
├── types/
│   └── database.ts          # TypeScript interfaces for all database tables
└── database/
    └── schema.sql           # Database schema
```

## Setup Instructions

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Copy your **Project URL** and **Anonymous Key**

### 2. Update Environment Variables

Update the `.env.local` file with your Supabase credentials:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Create Database Schema

1. Go to Supabase Dashboard
2. Open SQL Editor
3. Copy and paste the entire contents of `src/database/schema.sql`
4. Execute the SQL

### 4. Set Up Authentication

In Supabase:
1. Go to Authentication
2. Enable Email/Password provider
3. Configure email templates if needed
4. Set up redirect URLs

## Available Services

### Authentication Service

```typescript
import { authService } from '@/services';

// Sign up
await authService.signUp({
  email: 'user@example.com',
  password: 'password123',
  full_name: 'John Doe',
  phone: '1234567890',
  role: 'patient'
});

// Sign in
await authService.signIn({
  email: 'user@example.com',
  password: 'password123'
});

// Get current user
await authService.getCurrentUser();

// Sign out
await authService.signOut();

// Reset password
await authService.resetPassword('user@example.com');

// Update profile
await authService.updateProfile(userId, {
  full_name: 'Jane Doe'
});
```

### Patient Service

```typescript
import { patientService } from '@/services';

// Get all patients
await patientService.getAllPatients(50, 0);

// Get patient by ID
await patientService.getPatientById(patientId);

// Get patient by user ID
await patientService.getPatientByUserId(userId);

// Create patient
await patientService.createPatient({
  user_id: userId,
  date_of_birth: '1990-01-01',
  gender: 'male',
  blood_type: 'O+',
  address: '123 Main St',
  city: 'New York',
  state: 'NY',
  zip_code: '10001',
  emergency_contact: 'Jane Doe',
  emergency_phone: '9876543210'
});

// Update patient
await patientService.updatePatient(patientId, {
  blood_type: 'AB+'
});

// Delete patient
await patientService.deletePatient(patientId);

// Search patients
await patientService.searchPatients('John');
```

### Appointment Service

```typescript
import { appointmentService } from '@/services';

// Get all appointments
await appointmentService.getAllAppointments();

// Get patient appointments
await appointmentService.getPatientAppointments(patientId);

// Get doctor appointments
await appointmentService.getDoctorAppointments(doctorId);

// Create appointment
await appointmentService.createAppointment({
  patient_id: patientId,
  doctor_id: doctorId,
  appointment_date: '2026-02-20',
  appointment_time: '10:00',
  status: 'scheduled',
  reason_for_visit: 'Checkup'
});

// Update appointment
await appointmentService.updateAppointment(appointmentId, {
  status: 'completed'
});

// Cancel appointment
await appointmentService.cancelAppointment(appointmentId);
```

### Doctor Service

```typescript
import { doctorService } from '@/services';

// Get all doctors
await doctorService.getAllDoctors();

// Get doctor by ID
await doctorService.getDoctorById(doctorId);

// Get doctors by department
await doctorService.getDoctorsByDepartment(departmentId);

// Get doctors by specialization
await doctorService.getDoctorsBySpecialization('Cardiology');

// Create doctor
await doctorService.createDoctor({
  user_id: userId,
  specialization: 'Cardiology',
  license_number: 'LIC123456',
  department_id: departmentId,
  qualifications: 'MD, Board Certified',
  experience_years: 10,
  consultation_fee: 100
});
```

### Lab Test Service

```typescript
import { labTestService } from '@/services';

// Get all lab tests
await labTestService.getAllLabTests();

// Get patient lab tests
await labTestService.getPatientLabTests(patientId);

// Create lab test
await labTestService.createLabTest({
  patient_id: patientId,
  doctor_id: doctorId,
  test_name: 'Blood Test',
  status: 'pending',
  test_date: '2026-02-15'
});

// Update lab test with results
await labTestService.updateLabTest(testId, {
  status: 'completed',
  result_date: '2026-02-16',
  result: 'Normal'
});

// Get tests by status
await labTestService.getLabTestsByStatus('completed');
```

### Medical Record Service

```typescript
import { medicalRecordService } from '@/services';

// Create medical record
await medicalRecordService.createMedicalRecord({
  patient_id: patientId,
  doctor_id: doctorId,
  appointment_id: appointmentId,
  diagnosis: 'Flu',
  symptoms: 'Fever, Cough',
  treatment: 'Rest and fluids'
});

// Get patient medical records
await medicalRecordService.getPatientMedicalRecords(patientId);
```

### Billing Service

```typescript
import { billingService } from '@/services';

// Create bill
await billingService.createBill({
  patient_id: patientId,
  total_amount: 500,
  paid_amount: 0,
  status: 'pending',
  bill_date: '2026-02-14',
  due_date: '2026-02-28'
});

// Get patient bills
await billingService.getPatientBills(patientId);

// Add bill item
await billingService.addBillItem({
  bill_id: billId,
  description: 'Consultation Fee',
  amount: 100,
  quantity: 1
});

// Get bills by status
await billingService.getBillsByStatus('pending');
```

### Blood Bank Service

```typescript
import { bloodBankService } from '@/services';

// Get blood by type
await bloodBankService.getBloodByType('O+');

// Get inventory summary
await bloodBankService.getBloodInventorySummary();

// Add blood unit
await bloodBankService.addBloodUnit({
  blood_type: 'O+',
  quantity: 10,
  expiry_date: '2026-05-14',
  status: 'available'
});

// Reserve blood unit
await bloodBankService.reserveBloodUnit(unitId);
```

### Bed Service

```typescript
import { bedService } from '@/services';

// Get available beds
await bedService.getAvailableBeds();

// Allocate bed to patient
await bedService.allocateBed({
  bed_id: bedId,
  patient_id: patientId,
  admission_date: '2026-02-14',
  status: 'active'
});

// Discharge from bed
await bedService.dischargeBed(allocationId);

// Get patient bed allocations
await bedService.getPatientBedAllocations(patientId);
```

## Error Handling

All services return a consistent response format:

```typescript
{
  error: boolean,
  data?: any,
  message?: string,
  count?: number
}
```

Example:
```typescript
const result = await patientService.getPatientById(patientId);

if (result.error) {
  console.error(result.message);
} else {
  console.log(result.data);
}
```

## Database Types

All TypeScript interfaces are defined in `src/types/database.ts`:

```typescript
import { 
  User, 
  Patient, 
  Doctor, 
  Appointment,
  MedicalRecord,
  LabTest,
  Bill,
  Bed,
  BloodBank,
  Attendance
} from '@/types/database';
```

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **RLS Policies**: Set up Row Level Security policies in Supabase for production
3. **CORS**: Configure CORS in Supabase authentication settings
4. **API Keys**: Use Anonymous Key only for public data
5. **Service Role**: Use Service Role key only in backend/trusted environments

## Next Steps

1. Set up RLS (Row Level Security) policies for data access control
2. Implement authentication guards/middleware
3. Add input validation and sanitization
4. Set up real-time subscriptions for live updates
5. Create API routes if using a backend server
6. Set up email notifications
7. Implement audit logging
8. Add backup and disaster recovery procedures

## Support

For Supabase documentation, visit: https://supabase.com/docs
