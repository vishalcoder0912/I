# HealthHub - Complete Project Architecture & Guide

## 📋 Project Overview

HealthHub is a comprehensive Hospital Management System built with:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Node.js with Supabase (PostgreSQL)
- **Database**: PostgreSQL on Supabase with Row Level Security

This document explains the entire project structure, setup, and how to use it.

---

## 📁 Project Structure

```
health-hub-main/
├── frontend/                          # React frontend application
│   ├── src/
│   │   ├── components/               # React components
│   │   │   ├── DashboardLayout.tsx   # Main layout
│   │   │   ├── ProtectedRoute.tsx    # Auth protection
│   │   │   ├── StatsCard.tsx         # Stats display
│   │   │   ├── crud/                 # CRUD components
│   │   │   │   ├── DataTable.tsx
│   │   │   │   └── DeleteDialog.tsx
│   │   │   └── ui/                   # shadcn/ui components
│   │   ├── pages/                    # Page components
│   │   │   ├── Index.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── admin/
│   │   │   ├── doctor/
│   │   │   ├── patient/
│   │   │   ├── pharmacist/
│   │   │   ├── nurse/
│   │   │   ├── laboratory/
│   │   │   ├── reception/
│   │   │   ├── billing/
│   │   │   └── bloodbank/
│   │   ├── contexts/                 # React Context
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/                    # Custom hooks
│   │   │   ├── use-toast.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   └── use-mobile.tsx
│   │   ├── lib/                      # Frontend libraries
│   │   │   ├── supabase.ts           # Supabase client
│   │   │   ├── utils.ts
│   │   │   ├── mockData.ts
│   │   │   ├── exportUtils.ts
│   │   │   └── bloodBankData.ts
│   │   ├── types/                    # TypeScript types
│   │   │   ├── database.ts           # Database interfaces
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/                           # Backend services & configuration
│   ├── src/
│   │   ├── services/                 # Business logic services
│   │   │   ├── authService.ts        # Authentication
│   │   │   ├── patientService.ts     # Patient management
│   │   │   ├── doctorService.ts      # Doctor management
│   │   │   ├── appointmentService.ts # Appointments
│   │   │   ├── medicalRecordService.ts
│   │   │   ├── labTestService.ts     # Lab tests
│   │   │   ├── billingService.ts     # Billing
│   │   │   ├── bloodBankService.ts   # Blood bank
│   │   │   ├── bedService.ts         # Bed management
│   │   │   └── index.ts              # Export all services
│   │   ├── types/                    # TypeScript types (shared)
│   │   │   └── index.ts              # Database interfaces
│   │   ├── lib/                      # Backend utilities
│   │   │   └── supabase.ts           # Supabase client config
│   │   ├── middlewares/              # Express middlewares
│   │   ├── utils/                    # Utility functions
│   │   └── database/                 # Database files
│   │       └── schema.sql            # Database schema
│   ├── config/                       # Configuration files
│   ├── .env.example                  # Environment template
│   └── README.md                     # Backend setup guide
│
└── PROJECT_STRUCTURE.md              # This file
```

---

## 🎯 Key Features by Module

### 1. **Authentication Module**
- User registration (sign up)
- User login (sign in)
- Password reset
- Password update
- Profile management
- Role-based access control (7 roles)

**Roles**:
- Admin
- Doctor
- Nurse
- Patient
- Lab Technician
- Pharmacist
- Receptionist

### 2. **Patient Management**
- Create/Read/Update/Delete patients
- View medical history
- Allergies tracking
- Emergency contacts
- Blood type management
- Search functionality

### 3. **Doctor Management**
- Doctor profiles with credentials
- Specialty tracking
- Department assignment
- Consultation fees
- Experience tracking
- Availability management

### 4. **Appointment Management**
- Schedule appointments
- Appointment status tracking
- Doctor-patient matching
- Appointment history
- Cancellation support

### 5. **Medical Records**
- Diagnosis records
- Symptoms tracking
- Treatment documentation
- Prescriptions
- Doctor notes
- Linked to appointments

### 6. **Lab Tests**
- Test ordering
- Status tracking (pending, in-progress, completed, cancelled)
- Result management
- Test date tracking
- Notes and observations

### 7. **Billing & Payments**
- Invoice generation
- Bill item tracking
- Payment status (pending, partial, paid)
- Bill history
- Amount calculations

### 8. **Blood Bank Management**
- Blood unit tracking
- Blood type inventory
- Expiry date management
- Donor information
- Reservation system
- Inventory summary

### 9. **Bed Management**
- Bed availability tracking
- Patient allocation
- Discharge management
- Multi-floor support
- Ward organization
- Allocation history

### 10. **Attendance & Notifications**
- Staff attendance tracking
- Check-in/out times
- Leave management
- Real-time notifications
- User notifications

---

## 🗄️ Database Schema

### Core Tables

```typescript
// Users Table
interface User {
  id: UUID
  email: string (unique)
  full_name: string
  role: 'admin' | 'doctor' | 'nurse' | 'patient' | 'lab_technician' | 'pharmacist' | 'receptionist'
  phone: string
  avatar_url?: string
  department_id?: UUID
  created_at: timestamp
  updated_at: timestamp
}

// Patients Table
interface Patient {
  id: UUID
  user_id: UUID (FK to Users)
  date_of_birth: date
  gender: 'male' | 'female' | 'other'
  blood_type: string
  address: string
  city: string
  state: string
  zip_code: string
  emergency_contact: string
  emergency_phone: string
  medical_history?: string
  allergies?: string
  created_at: timestamp
  updated_at: timestamp
}

// Doctors Table
interface Doctor {
  id: UUID
  user_id: UUID (FK to Users)
  specialization: string
  license_number: string (unique)
  department_id: UUID (FK to Departments)
  qualifications: string
  experience_years: number
  consultation_fee: number
  availability: string
  created_at: timestamp
  updated_at: timestamp
}

// Appointments Table
interface Appointment {
  id: UUID
  patient_id: UUID (FK to Patients)
  doctor_id: UUID (FK to Doctors)
  appointment_date: date
  appointment_time: time
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
  reason_for_visit: string
  notes?: string
  created_at: timestamp
  updated_at: timestamp
}

// Medical Records Table
interface MedicalRecord {
  id: UUID
  patient_id: UUID (FK to Patients)
  doctor_id: UUID (FK to Doctors)
  appointment_id: UUID (FK to Appointments)
  diagnosis: string
  symptoms: string
  treatment: string
  prescription?: string
  notes?: string
  created_at: timestamp
  updated_at: timestamp
}

// Lab Tests Table
interface LabTest {
  id: UUID
  patient_id: UUID (FK to Patients)
  doctor_id: UUID (FK to Doctors)
  test_name: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  test_date: date
  result_date?: date
  result?: string
  notes?: string
  created_at: timestamp
  updated_at: timestamp
}

// Medications Table
interface Medication {
  id: UUID
  patient_id: UUID (FK to Patients)
  doctor_id: UUID (FK to Doctors)
  medication_name: string
  dosage: string
  frequency: string
  start_date: date
  end_date?: date
  instructions?: string
  created_at: timestamp
  updated_at: timestamp
}

// Beds Table
interface Bed {
  id: UUID
  bed_number: string (unique)
  floor: number
  ward: string
  status: 'available' | 'occupied' | 'maintenance'
  patient_id?: UUID (FK to Patients)
  created_at: timestamp
  updated_at: timestamp
}

// Departments Table
interface Department {
  id: UUID
  name: string (unique)
  description: string
  head_id?: UUID (FK to Users)
  created_at: timestamp
  updated_at: timestamp
}

// Bed Allocations Table
interface BedAllocation {
  id: UUID
  bed_id: UUID (FK to Beds)
  patient_id: UUID (FK to Patients)
  admission_date: date
  discharge_date?: date
  status: 'active' | 'discharged' | 'transferred'
  notes?: string
  created_at: timestamp
  updated_at: timestamp
}

// Bills Table
interface Bill {
  id: UUID
  patient_id: UUID (FK to Patients)
  total_amount: number
  paid_amount: number
  status: 'pending' | 'partial' | 'paid'
  bill_date: date
  due_date: date
  created_at: timestamp
  updated_at: timestamp
}

// Bill Items Table
interface BillItem {
  id: UUID
  bill_id: UUID (FK to Bills)
  description: string
  amount: number
  quantity: number
  created_at: timestamp
}

// Blood Bank Table
interface BloodBank {
  id: UUID
  blood_type: string
  quantity: number
  expiry_date: date
  donor_id?: UUID (FK to Patients)
  status: 'available' | 'reserved' | 'expired'
  created_at: timestamp
  updated_at: timestamp
}

// Attendance Table
interface Attendance {
  id: UUID
  user_id: UUID (FK to Users)
  date: date
  check_in_time: time
  check_out_time?: time
  status: 'present' | 'absent' | 'late' | 'leave'
  notes?: string
  created_at: timestamp
  updated_at: timestamp
  UNIQUE(user_id, date)
}

// Notifications Table
interface Notification {
  id: UUID
  user_id: UUID (FK to Users)
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  read: boolean
  created_at: timestamp
}
```

---

## ⚙️ Backend Services API

### Authentication Service

```typescript
import { authService } from '@/services';

// Sign up new user
await authService.signUp({
  email: 'user@example.com',
  password: 'password123',
  full_name: 'John Doe',
  phone: '1234567890',
  role: 'patient'
});

// Sign in user
await authService.signIn({
  email: 'user@example.com',
  password: 'password123'
});

// Get current user
await authService.getCurrentUser();

// Update profile
await authService.updateProfile(userId, {
  full_name: 'Jane Doe',
  phone: '9876543210'
});

// Sign out
await authService.signOut();

// Reset password
await authService.resetPassword('user@example.com');

// Update password
await authService.updatePassword('newPassword123');
```

### Patient Service

```typescript
import { patientService } from '@/services';

// Get all patients (with pagination)
await patientService.getAllPatients(50, 0);

// Get patient by ID
await patientService.getPatientById('patient-id');

// Get patient by user ID
await patientService.getPatientByUserId('user-id');

// Create patient
await patientService.createPatient({
  user_id: 'user-id',
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
await patientService.updatePatient('patient-id', {
  blood_type: 'AB+'
});

// Search patients
await patientService.searchPatients('John');

// Delete patient
await patientService.deletePatient('patient-id');
```

### Appointment Service

```typescript
import { appointmentService } from '@/services';

// Get all appointments
await appointmentService.getAllAppointments(50, 0);

// Get patient appointments
await appointmentService.getPatientAppointments('patient-id');

// Get doctor appointments
await appointmentService.getDoctorAppointments('doctor-id');

// Create appointment
await appointmentService.createAppointment({
  patient_id: 'patient-id',
  doctor_id: 'doctor-id',
  appointment_date: '2026-02-20',
  appointment_time: '10:00',
  status: 'scheduled',
  reason_for_visit: 'General Checkup'
});

// Update appointment
await appointmentService.updateAppointment('appointment-id', {
  status: 'completed'
});

// Cancel appointment
await appointmentService.cancelAppointment('appointment-id');

// Delete appointment
await appointmentService.deleteAppointment('appointment-id');
```

### Doctor Service

```typescript
import { doctorService } from '@/services';

// Get all doctors
await doctorService.getAllDoctors(50, 0);

// Get doctor by ID
await doctorService.getDoctorById('doctor-id');

// Get doctors by department
await doctorService.getDoctorsByDepartment('department-id');

// Get doctors by specialization
await doctorService.getDoctorsBySpecialization('Cardiology');

// Create doctor
await doctorService.createDoctor({
  user_id: 'user-id',
  specialization: 'Cardiology',
  license_number: 'LIC123456',
  department_id: 'dept-id',
  qualifications: 'MD, Board Certified',
  experience_years: 10,
  consultation_fee: 100
});

// Update doctor
await doctorService.updateDoctor('doctor-id', {
  consultation_fee: 150
});

// Delete doctor
await doctorService.deleteDoctor('doctor-id');
```

### Medical Record Service

```typescript
import { medicalRecordService } from '@/services';

// Get all medical records
await medicalRecordService.getAllMedicalRecords(50, 0);

// Get patient medical records
await medicalRecordService.getPatientMedicalRecords('patient-id');

// Create medical record
await medicalRecordService.createMedicalRecord({
  patient_id: 'patient-id',
  doctor_id: 'doctor-id',
  appointment_id: 'appointment-id',
  diagnosis: 'Flu',
  symptoms: 'Fever, Cough',
  treatment: 'Rest and fluids'
});

// Update medical record
await medicalRecordService.updateMedicalRecord('record-id', {
  treatment: 'Antibiotics prescribed'
});

// Delete medical record
await medicalRecordService.deleteMedicalRecord('record-id');
```

### Lab Test Service

```typescript
import { labTestService } from '@/services';

// Get all lab tests
await labTestService.getAllLabTests(50, 0);

// Get patient lab tests
await labTestService.getPatientLabTests('patient-id');

// Create lab test
await labTestService.createLabTest({
  patient_id: 'patient-id',
  doctor_id: 'doctor-id',
  test_name: 'Blood Test - CBC',
  status: 'pending',
  test_date: '2026-02-15'
});

// Update with results
await labTestService.updateLabTest('test-id', {
  status: 'completed',
  result_date: '2026-02-16',
  result: 'All values normal'
});

// Get tests by status
await labTestService.getLabTestsByStatus('completed');

// Delete lab test
await labTestService.deleteLabTest('test-id');
```

### Billing Service

```typescript
import { billingService } from '@/services';

// Get all bills
await billingService.getAllBills(50, 0);

// Get patient bills
await billingService.getPatientBills('patient-id');

// Create bill
await billingService.createBill({
  patient_id: 'patient-id',
  total_amount: 500,
  paid_amount: 0,
  status: 'pending',
  bill_date: '2026-02-14',
  due_date: '2026-02-28'
});

// Add bill item
await billingService.addBillItem({
  bill_id: 'bill-id',
  description: 'Consultation Fee',
  amount: 100,
  quantity: 1
});

// Update bill
await billingService.updateBill('bill-id', {
  paid_amount: 500,
  status: 'paid'
});

// Get bills by status
await billingService.getBillsByStatus('pending');

// Delete bill
await billingService.deleteBill('bill-id');
```

### Blood Bank Service

```typescript
import { bloodBankService } from '@/services';

// Get all blood units
await bloodBankService.getAllBloodUnits(50, 0);

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
await bloodBankService.reserveBloodUnit('unit-id');

// Update blood unit
await bloodBankService.updateBloodUnit('unit-id', {
  quantity: 9
});

// Delete blood unit
await bloodBankService.deleteBloodUnit('unit-id');
```

### Bed Service

```typescript
import { bedService } from '@/services';

// Get all beds
await bedService.getAllBeds(50, 0);

// Get available beds
await bedService.getAvailableBeds();

// Create bed
await bedService.createBed({
  bed_number: 'A-101',
  floor: 1,
  ward: 'General Ward',
  status: 'available'
});

// Allocate bed to patient
await bedService.allocateBed({
  bed_id: 'bed-id',
  patient_id: 'patient-id',
  admission_date: '2026-02-14',
  status: 'active'
});

// Discharge from bed
await bedService.dischargeBed('allocation-id');

// Get patient bed allocations
await bedService.getPatientBedAllocations('patient-id');

// Update bed
await bedService.updateBed('bed-id', {
  status: 'maintenance'
});

// Delete bed
await bedService.deleteBed('bed-id');
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- Bun or npm
- Supabase account
- Git

### Step 1: Clone & Install

```bash
# Clone repository
git clone <repository-url>
cd health-hub-main

# Install dependencies using bun
bun install
```

### Step 2: Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Get your **Project URL** and **Anonymous Key**
3. Create `.env.local` in root:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Step 3: Create Database Schema

1. Go to Supabase Dashboard → SQL Editor
2. Paste contents of `backend/src/database/schema.sql`
3. Execute the SQL

### Step 4: Run the Application

```bash
# Start development server
bun run dev

# Server runs at http://localhost:8080
```

### Step 5: Test API Services (Optional)

Create a test file `src/test-backend.ts`:

```typescript
import { authService, patientService, appointmentService } from '@/services';

// Test authentication
const signUpResult = await authService.signUp({
  email: 'test@example.com',
  password: 'Test123!',
  full_name: 'Test User',
  phone: '1234567890',
  role: 'patient'
});

console.log('Sign up result:', signUpResult);
```

---

## 🔐 Security Features

### Row Level Security (RLS)
- Enabled on critical tables: users, patients, doctors, appointments, medical_records, bills, notifications
- Policies prevent unauthorized access

### Environment Variables
- Never commit `.env.local` to version control
- Use `.env.example` as template
- Keep sensitive keys private

### Best Practices
1. Always validate input data
2. Use TypeScript for type safety
3. Implement RLS policies for production
4. Use Service Role key only in backend
5. Implement rate limiting
6. Enable HTTPS in production

---

## 📊 Error Handling

All services return consistent response format:

```typescript
{
  error: boolean,
  data?: any,
  message?: string,
  code?: string,
  count?: number
}
```

Example usage:

```typescript
const result = await patientService.getPatientById('patient-id');

if (result.error) {
  console.error('Error:', result.message);
} else {
  console.log('Patient:', result.data);
}
```

---

## 🧪 Testing

```bash
# Run tests
bun run test

# Watch mode
bun run test:watch
```

---

## 📝 API Response Examples

### Success Response
```json
{
  "error": false,
  "data": {
    "id": "uuid",
    "full_name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User created successfully"
}
```

### Error Response
```json
{
  "error": true,
  "message": "User with this email already exists",
  "code": "DUPLICATE_EMAIL"
}
```

### Paginated Response
```json
{
  "error": false,
  "data": [...],
  "count": 100,
  "message": "Success"
}
```

---

## 🛠️ Development Tools

- **Frontend**: Vite, React, TypeScript
- **Backend**: Supabase SDK, Node.js
- **Database**: PostgreSQL (Supabase)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **State**: React Context + TanStack Query
- **Form**: React Hook Form + Zod
- **Testing**: Vitest, React Testing Library

---

## 📚 Useful Resources

- [Supabase Docs](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

---

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Support

For issues and questions:
1. Check existing documentation
2. Review error messages carefully
3. Check Supabase dashboard for database issues
4. Review browser console for frontend errors

---

**Last Updated**: February 14, 2026
**Version**: 1.0.0
