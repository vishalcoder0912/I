# 🎨 Frontend - Organization Guide

**How to organize code in the Frontend directory**

---

## 📁 Frontend Directory Structure

```
Frontend/
├── public/                          # Static assets
│   └── robots.txt
├── src/
│   ├── components/                  # React Components (50+)
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── accordion.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ... (30+ more)
│   │   ├── crud/                   # Generic CRUD components
│   │   │   ├── DataTable.tsx
│   │   │   └── DeleteDialog.tsx
│   │   ├── DashboardLayout.tsx     # Main wrapper
│   │   ├── NavLink.tsx             # Navigation
│   │   ├── ProtectedRoute.tsx      # Auth guard
│   │   ├── StatsCard.tsx           # Stats display
│   │   └── StatusBadge.tsx         # Status indicator
│   │
│   ├── pages/                       # Page Components (10+)
│   │   ├── admin/                  # Admin pages
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── UserManagement.tsx
│   │   │   ├── ReportGeneration.tsx
│   │   │   └── SystemSettings.tsx
│   │   │
│   │   ├── patient/                # Patient pages
│   │   │   ├── PatientDashboard.tsx
│   │   │   ├── MyAppointments.tsx
│   │   │   ├── MedicalRecords.tsx
│   │   │   ├── LabResults.tsx
│   │   │   └── Billing.tsx
│   │   │
│   │   ├── doctor/                 # Doctor pages
│   │   │   ├── DoctorDashboard.tsx
│   │   │   ├── MySchedule.tsx
│   │   │   ├── PatientList.tsx
│   │   │   └── LabOrders.tsx
│   │   │
│   │   ├── bloodbank/              # Blood Bank pages
│   │   │   ├── InventoryTracker.tsx
│   │   │   └── DonationRecords.tsx
│   │   │
│   │   ├── laboratory/             # Lab pages
│   │   │   ├── TestOrders.tsx
│   │   │   └── ResultEntry.tsx
│   │   │
│   │   ├── pharmacy/               # Pharmacy pages
│   │   │   └── Prescriptions.tsx
│   │   │
│   │   ├── nurse/                  # Nurse pages
│   │   ├── reception/              # Reception pages
│   │   ├── billing/                # Billing pages
│   │   │
│   │   ├── Index.tsx               # Home/Dashboard
│   │   ├── Login.tsx               # Authentication
│   │   ├── Profile.tsx             # User profile
│   │   ├── Notifications.tsx       # Notifications
│   │   └── NotFound.tsx            # 404 page
│   │
│   ├── services/                    # API Services (9)
│   │   ├── authService.ts          # Auth API calls
│   │   ├── patientService.ts       # Patient API
│   │   ├── doctorService.ts        # Doctor API
│   │   ├── appointmentService.ts   # Appointment API
│   │   ├── medicalRecordService.ts # Medical record API
│   │   ├── labTestService.ts       # Lab test API
│   │   ├── billingService.ts       # Billing API
│   │   ├── bloodBankService.ts     # Blood bank API
│   │   ├── bedService.ts           # Bed management API
│   │   └── index.ts                # Export all services
│   │
│   ├── contexts/                    # React Contexts (1)
│   │   └── AuthContext.tsx         # Authentication state
│   │
│   ├── hooks/                       # Custom Hooks (3)
│   │   ├── use-mobile.tsx          # Mobile detection
│   │   ├── use-toast.ts            # Toast notifications
│   │   └── useLocalStorage.ts      # Local storage hook
│   │
│   ├── lib/                         # Utilities (5)
│   │   ├── supabase.ts             # Supabase client
│   │   ├── utils.ts                # General utilities
│   │   ├── exportUtils.ts          # Export utilities
│   │   ├── mockData.ts             # Mock data
│   │   └── bloodBankData.ts        # Blood bank data
│   │
│   ├── types/                       # TypeScript Types (3)
│   │   ├── index.ts                # Main types
│   │   ├── attendance.ts           # Attendance types
│   │   ├── bloodBank.ts            # Blood bank types
│   │   └── database.ts             # Database types
│   │
│   ├── test/                        # Frontend Tests
│   │   ├── example.test.ts
│   │   └── setup.ts
│   │
│   ├── assets/                      # Images, Icons
│   │   └── (images, svg files)
│   │
│   ├── database/                    # Test Database
│   │   └── schema.sql
│   │
│   ├── App.tsx                      # Root component
│   ├── App.css                      # Root styles
│   ├── index.css                    # Global styles
│   ├── main.tsx                     # Entry point
│   ├── vite-env.d.ts               # Vite types
│   │
├── .env.local                       # Environment variables ✅
├── .gitignore                       # Git ignore
├── index.html                       # HTML entry
├── package.json                     # Dependencies
├── package-lock.json                # Lock file
├── vite.config.ts                   # Vite config
├── tailwind.config.ts               # Tailwind config
├── tsconfig.json                    # TypeScript config
├── tsconfig.app.json                # App TypeScript config
├── tsconfig.node.json               # Node TypeScript config
├── eslint.config.js                 # ESLint config
├── postcss.config.js                # PostCSS config
├── components.json                  # Component config
├── README.md                         # Frontend docs
├── FRONTEND_GUIDE.md                # Frontend guide
├── PROJECT_GUIDE.md                 # Project guide
├── BACKEND_SETUP.md                 # Backend setup info
└── node_modules/                    # Dependencies (git ignored)
```

---

## 🎯 Frontend Code Organization Rules

### ✅ Components Directory
```
PUT HERE:
✅ React functional components
✅ Reusable UI components
✅ Layout components
✅ Wrapper components

ORGANIZE BY:
✅ Type (ui/, crud/, etc)
✅ Feature (if specific feature)
✅ Shared utilities in root
```

### ✅ Pages Directory
```
PUT HERE:
✅ Route/Page components
✅ Full page layouts
✅ Role-based pages

ORGANIZE BY:
✅ User role (patient/, doctor/, admin/)
✅ Feature area (billing/, bloodbank/)
✅ Functions (Login.tsx, Profile.tsx)
```

### ✅ Services Directory
```
PUT HERE:
✅ API call functions
✅ Service interfaces
✅ Data fetching logic

DO NOT PUT:
❌ UI logic
❌ Component rendering
❌ Styling
```

### ✅ Hooks Directory
```
PUT HERE:
✅ Custom React hooks
✅ Stateful logic
✅ Reusable logic

EXAMPLES:
✅ use-mobile.tsx
✅ use-toast.ts
✅ useLocalStorage.ts
```

### ✅ Contexts Directory
```
PUT HERE:
✅ React Context providers
✅ Global state management
✅ Authentication context

KEEP SIMPLE:
✅ Only 1-2 files usually
✅ Use for global state only
```

### ✅ Types Directory
```
PUT HERE:
✅ TypeScript interfaces
✅ Type definitions
✅ Enums

ORGANIZE BY:
✅ Domain (patient.ts, doctor.ts)
✅ Or feature (attendance.ts)
```

### ✅ Lib Directory
```
PUT HERE:
✅ Utility functions
✅ Helper functions
✅ Configuration
✅ Client initialization

EXAMPLES:
✅ supabase.ts - Client setup
✅ utils.ts - General utilities
✅ exportUtils.ts - Export helpers
```

---

## 📝 File Naming Conventions

```
File Type          Naming Convention      Example
─────────────────────────────────────────────────────────
Components         PascalCase.tsx         DashboardLayout.tsx
Pages              PascalCase.tsx         PatientDashboard.tsx
Services           camelCase.ts           authService.ts
Hooks              camelCase.ts           use-mobile.tsx
Utilities          camelCase.ts           utils.ts
Types              camelCase.ts           database.ts
Styles             PascalCase.css         Component.css
Tests              filename.test.ts       utils.test.ts
```

---

## 🔄 Common Development Tasks

### Add New Page
1. Create file: `Frontend/src/pages/RoleName/PageName.tsx`
2. Import layout: `DashboardLayout`
3. Add route in: `App.tsx`
4. Example:
   ```typescript
   // Frontend/src/pages/patient/NewPatientPage.tsx
   import { DashboardLayout } from '@/components/DashboardLayout';
   
   export default function NewPatientPage() {
     return (
       <DashboardLayout>
         <div className="p-6">
           <h1>New Patient Page</h1>
         </div>
       </DashboardLayout>
     );
   }
   ```

### Add New Component
1. Create file: `Frontend/src/components/NewComponent.tsx`
2. Export from: `Frontend/src/components/index.ts` (if shared)
3. Use in pages/other components
4. Example:
   ```typescript
   // Frontend/src/components/WelcomeCard.tsx
   import { Card } from '@/components/ui/card';
   
   export function WelcomeCard({ name }) {
     return (
       <Card className="p-6">
         <h2>Welcome, {name}!</h2>
       </Card>
     );
   }
   ```

### Add New Service
1. Create file: `Frontend/src/services/newFeatureService.ts`
2. Implement functions (Create, Read, Update, Delete)
3. Export from: `Frontend/src/services/index.ts`
4. Example:
   ```typescript
   // Frontend/src/services/notificationService.ts
   import { supabase } from '@/lib/supabase';
   
   export const notificationService = {
     async getNotifications() {
       const { data, error } = await supabase
         .from('notifications')
         .select('*');
       return { data, error };
     }
   };
   ```

### Add New Hook
1. Create file: `Frontend/src/hooks/useName.tsx`
2. Implement return value
3. Export from: `Frontend/src/hooks/index.ts`
4. Example:
   ```typescript
   // Frontend/src/hooks/useAuth.ts
   import { useContext } from 'react';
   import { AuthContext } from '@/contexts/AuthContext';
   
   export function useAuth() {
     return useContext(AuthContext);
   }
   ```

---

## ✅ Best Practices

### Component Organization
- ✅ Keep components focused (single responsibility)
- ✅ Extract reusable parts to components/
- ✅ Use TypeScript for type safety
- ✅ Import from @/paths (configured alias)

### Service Organization
- ✅ One service per feature/entity
- ✅ All API calls in services
- ✅ Never call API directly in components
- ✅ Return { data, error } objects

### Styling
- ✅ Use Tailwind CSS classes
- ✅ Keep CSS minimal
- ✅ Use CSS modules for complex styles
- ✅ Co-locate styles with components

### Testing
- ✅ Put tests in `test/` directory
- ✅ Name test files: `filename.test.ts`
- ✅ Test components and utilities
- ✅ Use Vitest for testing

---

## 🚀 Frontend Development Workflow

```
1. Create Component/Page
   ├─ Define types
   ├─ Create component
   └─ Add styling (Tailwind)

2. Add Functionality
   ├─ Create service if needed
   ├─ Call service from component
   └─ Handle loading/error states

3. Test
   ├─ Manual testing
   ├─ Browser console check
   └─ No TypeScript errors

4. Integrate
   ├─ Add to App.tsx routes
   ├─ Test navigation
   └─ Test with real Supabase
```

---

## 📦 Import Paths (Configured Aliases)

```typescript
// Don't do this:
import { Component } from '../../../components/Component';

// Do this instead:
import { Component } from '@/components/Component';

// Available aliases:
@/components   →  src/components/
@/pages        →  src/pages/
@/services     →  src/services/
@/contexts     →  src/contexts/
@/hooks        →  src/hooks/
@/lib          →  src/lib/
@/types        →  src/types/
@/utils        →  src/utils/
```

---

## ✨ Quality Checklist

- [x] Frontend code in `Frontend/src/`
- [x] Services organized by feature
- [x] Components organized by type
- [x] Pages organized by role
- [x] Types properly defined
- [x] No TypeScript errors
- [x] Proper imports/exports
- [x] Follows naming conventions
- [x] Uses Tailwind CSS
- [x] Ready for deployment

---

**Status:** ✅ Organized  
**Last Updated:** February 14, 2026  

🎉 Frontend is properly organized!
