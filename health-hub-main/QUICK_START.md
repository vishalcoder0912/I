# 🚀 HealthHub - Quick Start Developer Guide

**Fast setup instructions to get HealthHub running in minutes**

---

## ⚡ 60-Second Setup

### 1. Clone & Install
```bash
# Navigate to project
cd "c:\Users\VISHAL\OneDrive\Documents\Downloads\health-hub-main (1)\health-hub-main"

# Install dependencies
cd Frontend
npm install
```

### 2. Configure Environment
```
Frontend/.env.local is already configured with Supabase keys ✅
backend/.env is already configured ✅
```

### 3. Start Frontend
```bash
cd Frontend
npm run dev
```

### 4. Open in Browser
```
http://localhost:8080/
```

✅ **Done! Application is running**

---

## 📁 Project Structure

```
health-hub-main/
├── Frontend/                    # React application
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Routes/pages
│   │   ├── services/           # API services
│   │   ├── contexts/           # Auth context
│   │   ├── lib/                # Utilities & Supabase client
│   │   └── types/              # TypeScript types
│   ├── .env.local              # Frontend config ✅
│   └── package.json
│
├── backend/                     # Backend services library
│   ├── src/
│   │   ├── services/           # Auth, Patient, Doctor, etc
│   │   ├── lib/                # Supabase client
│   │   ├── types/              # Interfaces
│   │   └── database/           # Schema
│   ├── .env                    # Backend config ✅
│   └── config/
│
├── SUPABASE_SETUP_GUIDE.md     # 📖 Setup instructions
├── MASTER_FEATURES.md          # 📖 All features & APIs
└── QUICK_START.md              # 📖 This file
```

---

## 🔧 Available Commands

### Frontend Development
```bash
cd Frontend

# Start dev server
npm run dev                # Runs on http://localhost:8080/

# Build for production
npm run build              # Creates optimized build

# Run linting
npm run lint              # Check code quality

# Type checking
npm run type-check        # TypeScript validation
```

### Testing
```bash
cd Frontend

# Run tests
npm run test              # Vitest

# Test with coverage
npm run test:cov          # Coverage report
```

---

## 🎯 Common Tasks

### Add New Page

1. Create file in `Frontend/src/pages/NewPage.tsx`
```typescript
import { DashboardLayout } from '@/components/DashboardLayout';

export default function NewPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1>New Page</h1>
      </div>
    </DashboardLayout>
  );
}
```

2. Add route in `Frontend/src/App.tsx`
```typescript
import NewPage from '@/pages/NewPage';

// In routes array
{ path: '/new-page', element: <NewPage /> }
```

### Add New Service

1. Create file in `Frontend/src/services/newService.ts`
```typescript
import { supabase } from '@/lib/supabase';

export const newService = {
  async getAll() {
    const { data, error } = await supabase
      .from('table_name')
      .select('*');
    return { data, error };
  },
};
```

2. Export from `Frontend/src/services/index.ts`
```typescript
export * from './newService';
```

### Use Service in Component

```typescript
import { newService } from '@/services';

export default function Component() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await newService.getAll();
      setItems(data || []);
    };
    fetchData();
  }, []);

  return <div>{/* display items */}</div>;
}
```

---

## 🔑 Environment Variables

### Frontend (.env.local)
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://oujiqjdofeilzrglukoa.supabase.co
VITE_SUPABASE_ANON_KEY=seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# API Configuration
VITE_API_URL=http://localhost:8080/api

# App Configuration
VITE_APP_NAME=HealthHub
VITE_APP_VERSION=1.0.0
```

### Backend (.env)
```env
# Supabase Configuration
SUPABASE_URL=https://oujiqjdofeilzrglukoa.supabase.co
SUPABASE_ANON_KEY=seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# API Configuration
API_PORT=3000
API_HOST=localhost

# Environment
NODE_ENV=development

# App Configuration
APP_NAME=HealthHub
FRONTEND_URL=http://localhost:5173
```

---

## 🧪 Testing Features

### Test Authentication
1. Go to http://localhost:8080/login
2. Click "Sign Up"
3. Enter email and password
4. Check Supabase Dashboard → Authentication

### Test Patient Dashboard
1. Login as patient
2. View appointments, medical records
3. Check profile information

### Test Doctor Dashboard
1. Login as doctor
2. View schedule
3. Access patient information

### Test API Services
1. Open browser console (F12)
2. Run:
```javascript
import { patientService } from '@/services';
const result = await patientService.getAllPatients();
console.log(result);
```

---

## 🐛 Troubleshooting

### Issue: "npm: command not found"
**Solution:** Install Node.js from [nodejs.org](https://nodejs.org)

### Issue: "Port 8080 already in use"
**Solution:** 
```bash
# Use different port
npm run dev -- --port 3001
```

### Issue: "Cannot connect to Supabase"
**Solution:**
1. Verify `.env.local` has correct credentials
2. Check internet connection
3. Verify VITE_SUPABASE_URL format

### Issue: "CORS error"
**Solution:** Check Supabase URL in `.env.local` matches project URL

### Issue: "Authentication fails"
**Solution:**
1. Clear browser cookies
2. Check email provider enabled in Supabase
3. Verify redirect URLs in Supabase

---

## 📊 Database Tables

Quick reference of all tables:

| Table | Purpose | Columns |
|-------|---------|---------|
| users | User accounts | 9 |
| patients | Patient info | 15 |
| doctors | Doctor profiles | 12 |
| appointments | Appointments | 9 |
| medical_records | Medical history | 10 |
| lab_tests | Lab tests | 10 |
| billing | Invoices | 11 |
| blood_inventory | Blood stock | 11 |
| beds | Hospital beds | 10 |
| departments | Departments | 5 |

View all in Supabase Dashboard → Table Editor

---

## 👥 Test Users

Create these test users for development:

### Patient
- Email: `patient@example.com`
- Password: `Test123!@#`
- Role: patient

### Doctor
- Email: `doctor@example.com`
- Password: `Test123!@#`
- Role: doctor

### Admin
- Email: `admin@example.com`
- Password: `Test123!@#`
- Role: admin

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) | Complete Supabase setup |
| [MASTER_FEATURES.md](./MASTER_FEATURES.md) | All features & APIs |
| [Frontend/README.md](./Frontend/README.md) | Frontend documentation |
| [backend/README.md](./backend/README.md) | Backend documentation |

---

## 🎨 UI Components

All shadcn/ui components available:

```typescript
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table } from '@/components/ui/table';
import { Dialog } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
// ... 30+ more components available
```

---

## 🚀 Deploy to Production

### Frontend (Vercel)
```bash
cd Frontend
npm run build
npm install -g vercel
vercel --prod
```

### Add Supabase to Production
1. Go to Supabase Dashboard
2. Get production project URL
3. Update `.env` variables

---

## 💡 Pro Tips

1. **Use TypeScript** - Type safety prevents bugs
2. **Use AuthContext** - For user authentication state
3. **Use Services** - For all API calls
4. **Use Components** - Create reusable components
5. **Check Supabase Console** - Monitor database queries
6. **Enable RLS** - For security

---

## 🤝 Need Help?

1. Check **SUPABASE_SETUP_GUIDE.md**
2. Check **MASTER_FEATURES.md**
3. Review code comments
4. Check Supabase documentation

---

**Status:** ✅ Ready to develop  
**Last Updated:** February 14, 2026

Happy coding! 🎉
