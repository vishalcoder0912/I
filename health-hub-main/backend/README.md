# HealthHub Backend Services

Backend services layer for HealthHub Hospital Management System, using Supabase (PostgreSQL) with Row Level Security.

## 📁 Backend Structure

```
backend/
├── src/
│   ├── lib/
│   │   └── supabase.ts              # Supabase client configuration
│   ├── types/
│   │   └── index.ts                 # TypeScript database interfaces
│   ├── services/
│   │   ├── authService.ts           # Authentication & authorization
│   │   ├── patientService.ts        # Patient CRUD operations
│   │   ├── doctorService.ts         # Doctor CRUD operations
│   │   ├── appointmentService.ts    # Appointment management
│   │   ├── medicalRecordService.ts  # Medical records
│   │   ├── labTestService.ts        # Lab test management
│   │   ├── billingService.ts        # Billing & payments
│   │   ├── bloodBankService.ts      # Blood bank inventory
│   │   ├── bedService.ts            # Bed allocation
│   │   └── index.ts                 # Service exports
│   ├── middlewares/                 # (Reserved for future)
│   ├── utils/                       # (Reserved for future)
│   └── database/
│       └── schema.sql               # PostgreSQL database schema
├── config/                          # Configuration files
├── .env.example                     # Environment variables template
└── README.md                        # This file
```

## 🚀 Quick Start

### 1. Environment Setup

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp backend/.env.example backend/.env
```

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-// CREATE
patientService.createPatient(patientData)

// READ
patientService.getAllPatients()
patientService.getPatientById(id)
patientService.getPatientByUserId(userId)

// UPDATE
patientService.updatePatient(id, updates)

// DELETE
patientService.deletePatient(id)key
NODE_ENV=development
```

### 2. Database Setup

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy credentials

#### Run Schema
1. Go to Supabase Dashboard → SQL Editor
2. Copy entire `backend/src/database/schema.sql`
3. Paste and execute

This will create:
- 15+ tables with relationships
- Indexes for performance
- Row Level Security setup

### 3. Configure Authentication (Supabase)

In Supabase Dashboard:
1. **Authentication** → **Providers** → Enable "Email"
2. **Authentication** → **Email Templates** → Configure
3. **Authentication** → **URL Configuration** → Set redirect URLs

---

## 📚 Services Documentation

### Auth Service
Handles user authentication, registration, and profile management.

**Methods**:
- `signUp(data)` - Register new user
- `signIn(data)` - Login user
- `getCurrentUser()` - Get authenticated user
- `signOut()` - Logout user
- `resetPassword(email)` - Send password reset
- `updatePassword(newPassword)` - Update password
- `updateProfile(userId, updates)` - Update user profile

**Example**:
```typescript
import { authService } from '@/services';

const result = await authService.signUp({
  email: 'user@example.com',
  password: 'SecurePass123!',
  full_name: 'John Doe',
  phone: '1234567890',
  role: 'patient'
});
```

---

### Patient Service
Manages patient records and health information.

**Methods**:
- `getAllPatients(limit, offset)` - Get paginated patients
- `getPatientById(id)` - Get patient by ID
- `getPatientByUserId(userId)` - Get patient via user
- `createPatient(data)` - Create new patient
- `updatePatient(id, updates)` - Update patient
- `deletePatient(id)` - Delete patient
- `searchPatients(query)` - Search patients by name

**Example**:
```typescript
import { patientService } from '@/services';

const result = await patientService.createPatient({
  user_id: 'user-uuid',
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
```

---

### Doctor Service
Manages doctor profiles and specializations.

**Methods**:
- `getAllDoctors(limit, offset)` - Get paginated doctors
- `getDoctorById(id)` - Get doctor by ID
- `getDoctorByUserId(userId)` - Get doctor via user
- `getDoctorsByDepartment(deptId)` - Filter by department
- `getDoctorsBySpecialization(spec)` - Filter by specialty
- `createDoctor(data)` - Create new doctor
- `updateDoctor(id, updates)` - Update doctor
- `deleteDoctor(id)` - Delete doctor

**Example**:
```typescript
import { doctorService } from '@/services';

const result = await doctorService.createDoctor({
  user_id: 'user-uuid',
  specialization: 'Cardiology',
  license_number: 'MD123456',
  department_id: 'dept-uuid',
  qualifications: 'MD, Board Certified',
  experience_years: 15,
  consultation_fee: 150
});
```

---

### Appointment Service
Handles appointment scheduling and management.

**Methods**:
- `getAllAppointments(limit, offset)` - Get all appointments
- `getPatientAppointments(patientId)` - Get patient's appointments
- `getDoctorAppointments(doctorId)` - Get doctor's appointments
- `getAppointmentById(id)` - Get single appointment
- `createAppointment(data)` - Schedule appointment
- `updateAppointment(id, updates)` - Update appointment
- `cancelAppointment(id)` - Cancel appointment
- `deleteAppointment(id)` - Delete appointment

**Example**:
```typescript
import { appointmentService } from '@/services';

const result = await appointmentService.createAppointment({
  patient_id: 'patient-uuid',
  doctor_id: 'doctor-uuid',
  appointment_date: '2026-02-20',
  appointment_time: '14:30',
  status: 'scheduled',
  reason_for_visit: 'General Checkup'
});
```

---

### Medical Record Service
Stores and manages medical records.

**Methods**:
- `getAllMedicalRecords(limit, offset)` - Get all records
- `getPatientMedicalRecords(patientId)` - Get patient's records
- `getMedicalRecordById(id)` - Get single record
- `createMedicalRecord(data)` - Create record
- `updateMedicalRecord(id, updates)` - Update record
- `deleteMedicalRecord(id)` - Delete record

**Example**:
```typescript
import { medicalRecordService } from '@/services';

const result = await medicalRecordService.createMedicalRecord({
  patient_id: 'patient-uuid',
  doctor_id: 'doctor-uuid',
  appointment_id: 'appointment-uuid',
  diagnosis: 'Hypertension',
  symptoms: 'High BP readings',
  treatment: 'Prescribed medication'
});
```

---

### Lab Test Service
Manages lab test orders and results.

**Methods**:
- `getAllLabTests(limit, offset)` - Get all tests
- `getPatientLabTests(patientId)` - Get patient's tests
- `getLabTestById(id)` - Get single test
- `createLabTest(data)` - Order new test
- `updateLabTest(id, updates)` - Update test (add results)
- `getLabTestsByStatus(status)` - Filter by status
- `deleteLabTest(id)` - Delete test

**Example**:
```typescript
import { labTestService } from '@/services';

// Create test
const result = await labTestService.createLabTest({
  patient_id: 'patient-uuid',
  doctor_id: 'doctor-uuid',
  test_name: 'Blood Test - CBC',
  status: 'pending',
  test_date: '2026-02-15'
});

// Add results
await labTestService.updateLabTest('test-uuid', {
  status: 'completed',
  result_date: '2026-02-16',
  result: 'All values normal'
});
```

---

### Billing Service
Handles invoicing and payment tracking.

**Methods**:
- `getAllBills(limit, offset)` - Get all bills
- `getPatientBills(patientId)` - Get patient's bills
- `getBillById(id)` - Get bill with items
- `createBill(data)` - Create new bill
- `updateBill(id, updates)` - Update bill
- `addBillItem(data)` - Add item to bill
- `getBillsByStatus(status)` - Filter by status
- `deleteBill(id)` - Delete bill

**Example**:
```typescript
import { billingService } from '@/services';

// Create bill
const bill = await billingService.createBill({
  patient_id: 'patient-uuid',
  total_amount: 5000,
  paid_amount: 0,
  status: 'pending',
  bill_date: '2026-02-14',
  due_date: '2026-02-28'
});

// Add items
await billingService.addBillItem({
  bill_id: bill.data.id,
  description: 'Consultation Fee',
  amount: 500,
  quantity: 1
});

// Update payment
await billingService.updateBill(bill.data.id, {
  paid_amount: 5000,
  status: 'paid'
});
```

---

### Blood Bank Service
Manages blood inventory.

**Methods**:
- `getAllBloodUnits(limit, offset)` - Get all units
- `getBloodByType(type)` - Get units by blood type
- `getBloodInventorySummary()` - Get inventory counts
- `addBloodUnit(data)` - Add new unit
- `updateBloodUnit(id, updates)` - Update unit
- `reserveBloodUnit(id)` - Reserve unit
- `getBloodUnitById(id)` - Get unit detail
- `deleteBloodUnit(id)` - Delete unit

**Example**:
```typescript
import { bloodBankService } from '@/services';

// Get inventory
const inventory = await bloodBankService.getBloodInventorySummary();
console.log(inventory.data); // { 'O+': 15, 'A+': 10, 'B+': 8 }

// Add units
await bloodBankService.addBloodUnit({
  blood_type: 'O+',
  quantity: 10,
  expiry_date: '2026-05-14',
  status: 'available'
});

// Reserve
await bloodBankService.reserveBloodUnit('unit-uuid');
```

---

### Bed Service
Manages hospital bed allocation.

**Methods**:
- `getAllBeds(limit, offset)` - Get all beds
- `getAvailableBeds()` - Get vacant beds
- `getBedById(id)` - Get bed details
- `createBed(data)` - Add new bed
- `updateBed(id, updates)` - Update bed
- `allocateBed(data)` - Assign patient to bed
- `dischargeBed(allocationId)` - Remove patient
- `getPatientBedAllocations(patientId)` - Get patient's history
- `deleteBed(id)` - Delete bed

**Example**:
```typescript
import { bedService } from '@/services';

// Create bed
await bedService.createBed({
  bed_number: 'A-101',
  floor: 1,
  ward: 'General',
  status: 'available'
});

// Get available
const available = await bedService.getAvailableBeds();

// Allocate to patient
await bedService.allocateBed({
  bed_id: 'bed-uuid',
  patient_id: 'patient-uuid',
  admission_date: '2026-02-14',
  status: 'active'
});

// Discharge
await bedService.dischargeBed('allocation-uuid');
```

---

## 🔄 Response Format

All services return consistent format:

```typescript
{
  error: boolean;
  data?: any;
  message?: string;
  code?: string;          // Error code if applicable
  count?: number;         // Total count for paginated responses
}
```

### Success Example
```json
{
  "error": false,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  },
  "message": "Patient created successfully"
}
```

### Error Example
```json
{
  "error": true,
  "message": "Patient with user_id already exists",
  "code": "DUPLICATE_USER"
}
```

### Paginated Example
```json
{
  "error": false,
  "data": [...],
  "count": 150,
  "message": "Success"
}
```

---

## 🗄️ Database Tables

| Table | Records | Purpose |
|-------|---------|---------|
| users | All users | Authentication & profiles |
| patients | Patient data | Patient information |
| doctors | Doctor profiles | Doctor credentials |
| appointments | Scheduled visits | Appointment scheduling |
| medical_records | Patient history | Medical documentation |
| lab_tests | Test orders | Lab test management |
| medications | Patient drugs | Medication records |
| beds | Hospital beds | Bed inventory |
| bed_allocations | Patient admissions | Hospital stays |
| bills | Invoices | Billing records |
| bill_items | Invoice lines | Billing details |
| blood_bank | Blood units | Blood inventory |
| departments | Hospital depts | Department info |
| attendance | Staff records | Attendance tracking |
| notifications | User alerts | User notifications |

---

## 🔒 Security Features

### Row Level Security (RLS)
- Enabled on: users, patients, doctors, appointments, medical_records, bills, notifications
- Policies prevent unauthorized data access

### Best Practices
1. **Never hardcode credentials** - Use environment variables
2. **Service Role is for backend only** - Keep it private
3. **Anonymous Key is for frontend** - Limited access
4. **Validate all inputs** - Use TypeScript types
5. **Handle errors gracefully** - Never expose sensitive info

### Environment Variables
```bash
SUPABASE_URL               # Public - where database is
SUPABASE_ANON_KEY         # Semi-public - for frontend
SUPABASE_SERVICE_ROLE_KEY # PRIVATE - backend only
```

---

## 🧪 Testing Services

```typescript
// Example test file
import { authService, patientService } from '@/services';

// Test sign up
const signUpResult = await authService.signUp({
  email: 'test@example.com',
  password: 'Test@123',
  full_name: 'Test User',
  phone: '1234567890',
  role: 'patient'
});

console.log('Sign up:', signUpResult);

// Test create patient
const patientResult = await patientService.createPatient({
  user_id: signUpResult.data.id,
  date_of_birth: '1990-01-01',
  gender: 'male',
  blood_type: 'O+',
  address: '123 Test St',
  city: 'Test City',
  state: 'TS',
  zip_code: '12345',
  emergency_contact: 'Test Contact',
  emergency_phone: '9876543210'
});

console.log('Patient created:', patientResult);
```

---

## 📋 Database Indexes

Optimized queries with indexes on:
- `users.email` - Auth lookups
- `users.role` - Role-based filtering
- `appointments.appointment_date` - Scheduling
- `lab_tests.status` - Status filtering
- `bills.status` - Payment tracking
- `blood_bank.blood_type` - Blood searches
- And 13+ more...

---

## 💡 Tips & Tricks

### Pagination
```typescript
// Get 20 items from page 2 (offset = 20)
const result = await patientService.getAllPatients(20, 20);
console.log(`Total: ${result.count}, Got: ${result.data.length}`);
```

### Filtering
```typescript
// Get specific doctor
const doctor = await doctorService.getDoctorsByDepartment('cardiology-dept-id');

// By specialization
const specialists = await doctorService.getDoctorsBySpecialization('Cardiology');
```

### Error Handling
```typescript
const result = await patientService.getPatientById('invalid-id');

if (result.error) {
  console.error(`Error: ${result.message} (${result.code})`);
} else {
  console.log('Patient:', result.data);
}
```

---

## 🚫 Common Issues

### Issue: "Supabase URL or Key missing"
**Solution**: Check `.env` file and ensure variables are set correctly

### Issue: "User already exists"
**Solution**: This email is registered. Use forgot password or try different email

### Issue: "Foreign key constraint failed"
**Solution**: Related records don't exist. Create parent records first

### Issue: "RLS policy violation"
**Solution**: User doesn't have permission. Check RLS policies in Supabase

---

## 📞 Getting Help

1. Check error message - usually explains the problem
2. Review service documentation above
3. Check Supabase logs in Dashboard
4. Verify database schema matches expectations
5. Ensure environment variables correct

---

## 📈 Performance Tips

1. Use pagination for large datasets
2. Indexes are automatically used for common queries
3. Limit joins to necessary relations
4. Cache frequently accessed data
5. Use batch operations where possible

---

## 🔄 Database Relationships

```
users
├── patients (1 → 1)
├── doctors (1 → 1)
├── departments (1 → many)
└── attendance (1 → many)

patients
├── appointments (1 → many)
├── medical_records (1 → many)
├── lab_tests (1 → many)
├── medications (1 → many)
├── bills (1 → many)
└── beds (1 → many via bed_allocations)

doctors
├── appointments (1 → many)
├── medical_records (1 → many)
└── lab_tests (1 → many)

departments
└── doctors (1 → many)
```

---

## 📝 Version History

- **v1.0.0** (Feb 14, 2026) - Initial release with all core services

---

**Happy coding! 🚀**
