# 🔐 Supabase Setup & Connection Guide - HealthHub

Complete step-by-step instructions to connect HealthHub with Supabase database.

---

## ✅ Current Status

**Your Credentials Are Already Set Up:**

```env
Project URL: https://oujiqjdofeilzrglukoa.supabase.co
SUPABASE_URL=https://oujiqjdofeilzrglukoa.supabase.co
SUPABASE_ANON_KEY=seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91amlxamRvZmVpbHpyZ2x1a29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNTY1NzIsImV4cCI6MjA4NjYzMjU3Mn0.liTeMZNHYhqUiRZxmnQ40C2WjFiOAxbxtMrVEvQxnso
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91amlxamRvZmVpbHpyZ2x1a29hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA1NjU3MiwiZXhwIjoyMDg2NjMyNTcyfQ.HsaLaQ2wr6fYfFJh5-2QoMEd-4QkGEV1Q5yVxVlcMoY
```

---

## 📋 Step 1: Login to Supabase Dashboard

1. Go to [https://supabase.com](https://supabase.com)
2. Click **Sign In**
3. Enter your credentials (the project is already created for you)
4. Select your **HealthHub Project**

---

## 🗄️ Step 2: Create Database Schema

### Option A: Using Supabase SQL Editor (Recommended)

1. **In Supabase Dashboard:**
   - Go to **SQL Editor** (left sidebar)
   - Click **+ New Query** button
   - Copy and paste the entire schema from `backend/src/database/schema.sql`

2. **Execute the SQL:**
   - Click **Run** button (or press `Ctrl+Enter`)
   - Wait for execution to complete ✅

### Complete Schema to Execute:

```sql
-- HealthHub Database Schema for Supabase

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'patient',
  phone VARCHAR(20),
  avatar_url TEXT,
  department_id UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients Table
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20) NOT NULL,
  blood_type VARCHAR(10),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  zip_code VARCHAR(10),
  emergency_contact VARCHAR(255),
  emergency_phone VARCHAR(20),
  medical_history TEXT,
  allergies TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments Table
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  head_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  specialization VARCHAR(255) NOT NULL,
  license_number VARCHAR(100) UNIQUE NOT NULL,
  department_id UUID NOT NULL REFERENCES departments(id),
  qualifications TEXT,
  experience_years INTEGER,
  consultation_fee DECIMAL(10, 2),
  availability TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES doctors(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled',
  reason_for_visit TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medical Records Table
CREATE TABLE IF NOT EXISTS medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES doctors(id),
  appointment_id UUID REFERENCES appointments(id),
  diagnosis TEXT NOT NULL,
  symptoms TEXT NOT NULL,
  treatment TEXT NOT NULL,
  prescription TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lab Tests Table
CREATE TABLE IF NOT EXISTS lab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES doctors(id),
  test_name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  test_date DATE NOT NULL,
  result_date DATE,
  result TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Billing Table
CREATE TABLE IF NOT EXISTS billing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id),
  doctor_id UUID REFERENCES doctors(id),
  appointment_id UUID REFERENCES appointments(id),
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_date DATE,
  due_date DATE,
  invoice_number VARCHAR(50) UNIQUE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blood Bank Inventory Table
CREATE TABLE IF NOT EXISTS blood_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blood_type VARCHAR(10) NOT NULL,
  quantity_ml INTEGER NOT NULL,
  donation_date DATE,
  expiry_date DATE,
  status VARCHAR(50) DEFAULT 'available',
  donor_name VARCHAR(255),
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Beds Table
CREATE TABLE IF NOT EXISTS beds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bed_number VARCHAR(50) NOT NULL UNIQUE,
  room_number VARCHAR(50),
  status VARCHAR(50) DEFAULT 'available',
  patient_id UUID REFERENCES patients(id),
  ward_type VARCHAR(100),
  assigned_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);
CREATE INDEX IF NOT EXISTS idx_doctors_user_id ON doctors(user_id);
CREATE INDEX IF NOT EXISTS idx_doctors_dept_id ON doctors(department_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_patient_id ON medical_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_doctor_id ON medical_records(doctor_id);
CREATE INDEX IF NOT EXISTS idx_lab_tests_patient_id ON lab_tests(patient_id);
CREATE INDEX IF NOT EXISTS idx_billing_patient_id ON billing(patient_id);
CREATE INDEX IF NOT EXISTS idx_beds_patient_id ON beds(patient_id);
```

✅ If you see success messages, your tables are created!

---

## 🔑 Step 3: Configure Authentication

### Enable Email/Password Authentication:

1. **In Supabase Dashboard:**
   - Go to **Authentication** (left sidebar)
   - Click **Providers**
   - Make sure **Email** is **enabled** (toggle ON)

2. **Configure Email Settings:**
   - Go to **Authentication** → **Email Templates**
   - You can customize confirmation emails if needed
   - Default templates are fine for testing

3. **Set Redirect URLs:**
   - Go to **Authentication** → **URL Configuration**
   - Add your application URLs:
     ```
     http://localhost:8080
     http://localhost:8080/
     http://localhost:8080/login
     http://192.168.1.5:8080
     ```

---

## 🔐 Step 4: Row Level Security (RLS) Setup

### Enable RLS on All Tables:

1. **In Supabase Dashboard:**
   - Go to **Database** → **Tables**
   - For each table, click the table name

2. **For each table:**
   - Click **RLS** button (top right)
   - Click **Enable RLS**

3. **Tables to enable RLS:**
   - users
   - patients
   - doctors
   - appointments
   - medical_records
   - lab_tests
   - billing
   - blood_inventory
   - beds
   - departments

### Create RLS Policies (SQL):

```sql
-- Allow users to read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Allow authenticated users to read patients
CREATE POLICY "Authenticated users can read patients" ON patients
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow patients to read own appointments
CREATE POLICY "Patients can read own appointments" ON appointments
  FOR SELECT USING (patient_id IN (
    SELECT id FROM patients WHERE user_id = auth.uid()
  ));

-- Allow doctors to read their appointments
CREATE POLICY "Doctors can read own appointments" ON appointments
  FOR SELECT USING (doctor_id IN (
    SELECT id FROM doctors WHERE user_id = auth.uid()
  ));
```

---

## 🌐 Step 5: Verify Environment Configuration

### Backend (.env):
```env
SUPABASE_URL=https://oujiqjdofeilzrglukoa.supabase.co
SUPABASE_ANON_KEY=seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NODE_ENV=development
```

**Location:** `backend/.env` ✅ Already configured

### Frontend (.env.local):
```env
VITE_SUPABASE_URL=https://oujiqjdofeilzrglukoa.supabase.co
VITE_SUPABASE_ANON_KEY=seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_URL=http://localhost:8080/api
```

**Location:** `Frontend/.env.local` ✅ Already configured

---

## 🧪 Step 6: Test the Connection

### Test from Frontend Console:

1. **Open Application:**
   - Go to http://localhost:8080/

2. **Open Browser DevTools:**
   - Press `F12` → Console tab

3. **Test Supabase Connection:**
   ```javascript
   import { supabase } from './lib/supabase';
   
   // Test connection
   supabase.from('users').select('*').then(res => console.log(res));
   ```

4. **Check for responses:**
   - Should return data array (even if empty)
   - No CORS or authentication errors

### Test Authentication:

1. Go to Login page (`/login`)
2. Try registering a new account:
   - Email: `test@example.com`
   - Password: `Test123!@#`
3. Check Supabase Dashboard → **Authentication** → **Users**
   - Your user should appear in the list

---

## 📊 Step 7: Verify Database Tables

### In Supabase Dashboard:

1. Go to **Table Editor** (left sidebar)
2. You should see all tables:
   - ✅ users
   - ✅ patients
   - ✅ doctors
   - ✅ appointments
   - ✅ medical_records
   - ✅ lab_tests
   - ✅ billing
   - ✅ blood_inventory
   - ✅ beds
   - ✅ departments

If all tables are visible, your database is ready! 🎉

---

## 🚀 Step 8: Start the Application

### Terminal 1 (Frontend):
```bash
cd Frontend
npm run dev
```
- Access at: http://localhost:8080/

### The application is now connected to Supabase!

---

## 🔍 Troubleshooting

### Issue: "CORS Error"
**Solution:**
- Check `.env.local` has correct `VITE_SUPABASE_URL`
- Verify Supabase project settings

### Issue: "Missing tables"
**Solution:**
- Run SQL schema again in Supabase SQL Editor
- Check for execution errors

### Issue: "Authentication fails"
**Solution:**
- Verify Email provider is enabled in Supabase
- Check Redirect URLs configured correctly
- Clear browser cookies and retry

### Issue: "Cannot connect to database"
**Solution:**
- Verify SUPABASE_URL is correct
- Check SUPABASE_ANON_KEY is valid
- Check internet connection

---

## 📚 Quick Reference

| Component | URL |
|-----------|-----|
| Frontend | http://localhost:8080/ |
| Supabase Dashboard | https://app.supabase.com |
| Project URL | https://oujiqjdofeilzrglukoa.supabase.co |

---

## ✨ All Set!

Your HealthHub application is now fully connected to Supabase with:
- ✅ Database schema created
- ✅ Authentication configured
- ✅ Row Level Security enabled
- ✅ Environment variables set
- ✅ Application running

**Start building!** 🏥💻
