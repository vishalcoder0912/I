# 🏗️ HealthHub - Project Structure

## Directory Organization

```
health-hub-main/
│
├── 📁 Frontend/                          # Frontend Application (React)
│   ├── public/                           # Static assets
│   ├── src/
│   │   ├── components/                   # React Components
│   │   │   ├── ui/                      # shadcn/ui Components
│   │   │   ├── crud/                    # CRUD Components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── ...other components
│   │   ├── pages/                        # Page Components
│   │   │   ├── admin/                   # Admin pages
│   │   │   ├── patient/                 # Patient pages
│   │   │   ├── doctor/                  # Doctor pages
│   │   │   ├── bloodbank/               # Blood Bank pages
│   │   │   ├── laboratory/              # Lab pages
│   │   │   ├── pharmacy/                # Pharmacy pages
│   │   │   ├── nurse/                   # Nurse pages
│   │   │   ├── reception/               # Reception pages
│   │   │   ├── billing/                 # Billing pages
│   │   │   ├── Index.tsx                # Home page
│   │   │   ├── Login.tsx                # Login page
│   │   │   └── Profile.tsx              # Profile page
│   │   ├── contexts/                     # React Contexts
│   │   │   └── AuthContext.tsx          # Authentication context
│   │   ├── hooks/                        # Custom React Hooks
│   │   │   ├── use-mobile.tsx
│   │   │   ├── use-toast.ts
│   │   │   └── useLocalStorage.ts
│   │   ├── lib/                          # Frontend Utilities
│   │   │   ├── supabase.ts              # Supabase client
│   │   │   ├── utils.ts                 # Utility functions
│   │   │   ├── exportUtils.ts           # Export utilities
│   │   │   ├── mockData.ts              # Mock data
│   │   │   └── bloodBankData.ts         # Blood bank data
│   │   ├── services/                     # Frontend Services (API calls)
│   │   │   ├── appointmentService.ts
│   │   │   ├── authService.ts
│   │   │   ├── bedService.ts
│   │   │   ├── billingService.ts
│   │   │   ├── bloodBankService.ts
│   │   │   ├── doctorService.ts
│   │   │   ├── labTestService.ts
│   │   │   ├── medicalRecordService.ts
│   │   │   ├── patientService.ts
│   │   │   └── index.ts
│   │   ├── types/                        # TypeScript Types
│   │   │   ├── index.ts                 # Main types
│   │   │   ├── attendance.ts
│   │   │   ├── bloodBank.ts
│   │   │   └── database.ts
│   │   ├── test/                         # Frontend Tests
│   │   │   ├── example.test.ts
│   │   │   └── setup.ts
│   │   ├── assets/                       # Images, icons, etc
│   │   ├── App.tsx                       # Root component
│   │   ├── App.css                       # Root styles
│   │   ├── index.css                     # Global styles
│   │   ├── main.tsx                      # Entry point
│   │   ├── vite-env.d.ts                # Vite types
│   │   └── database/                     # Frontend tests DB
│   ├── .env.local                        # Frontend env variables ✅
│   ├── .gitignore
│   ├── package.json                      # Frontend dependencies
│   ├── vite.config.ts                    # Vite config
│   ├── tailwind.config.ts                # Tailwind config
│   ├── tsconfig.json                     # TypeScript config
│   ├── eslint.config.js                  # ESLint config
│   ├── postcss.config.js                 # PostCSS config
│   ├── index.html                        # HTML entry
│   ├── components.json                   # Component config
│   ├── README.md                         # Frontend docs
│   ├── PROJECT_GUIDE.md
│   ├── FRONTEND_GUIDE.md
│   └── BACKEND_SETUP.md
│
├── 📁 backend/                           # Backend Services (Node.js)
│   ├── src/
│   │   ├── services/                     # Business Logic Services
│   │   │   ├── authService.ts           # Authentication logic
│   │   │   ├── patientService.ts        # Patient CRUD
│   │   │   ├── doctorService.ts         # Doctor CRUD
│   │   │   ├── appointmentService.ts    # Appointment CRUD
│   │   │   ├── medicalRecordService.ts  # Medical records CRUD
│   │   │   ├── labTestService.ts        # Lab tests CRUD
│   │   │   ├── billingService.ts        # Billing CRUD
│   │   │   ├── bloodBankService.ts      # Blood bank CRUD
│   │   │   ├── bedService.ts            # Bed management CRUD
│   │   │   └── index.ts                 # Service exports
│   │   ├── lib/                          # Backend Utilities
│   │   │   └── supabase.ts              # Supabase admin client
│   │   ├── types/                        # Shared TypeScript Types
│   │   │   └── index.ts                 # Database interfaces
│   │   ├── database/                     # Database Schema
│   │   │   └── schema.sql               # PostgreSQL schema
│   │   ├── middlewares/                  # Express middleware (future)
│   │   └── utils/                        # Backend utilities (future)
│   ├── config/                           # Configuration
│   │   └── supabase.ts                  # Supabase config
│   ├── .env                              # Backend env variables ✅
│   ├── .env.example                      # Env template
│   ├── tsconfig.json                     # TypeScript config
│   ├── README.md                         # Backend documentation
│   └── vitest.config.ts                  # Testing config (if exists)
│
├── 📄 Documentation Files
│   ├── INDEX.md                          # Documentation index
│   ├── QUICK_START.md                    # Quick start guide
│   ├── SUPABASE_SETUP_GUIDE.md           # Supabase setup
│   ├── MASTER_FEATURES.md                # Master features
│   ├── VERIFICATION_CHECKLIST.md         # Verification
│   ├── COMPLETE_SETUP_SUMMARY.md         # Setup summary
│   ├── QUICK_REFERENCE.md                # Quick reference
│   ├── DELIVERY_SUMMARY.md               # Delivery info
│   ├── DOCUMENTATION_INDEX.md            # Doc index
│   └── PROJECT_STRUCTURE.md              # This file
│
├── 📄 Configuration Files
│   ├── .gitignore                        # Git ignore
│   ├── vitest.config.ts                  # Root test config
│   └── package.json                      # Root dependencies (if any)
│
└── 📄 Root Directory
    └── (All docs & configs)
```

---

## 🎯 Code Organization Rules

### Frontend Code Goes To: `Frontend/src/`
```
✅ React components
✅ Page layouts
✅ UI components
✅ Custom hooks
✅ Frontend utilities
✅ Frontend services (API calls)
✅ Frontend types
✅ Frontend tests
✅ Styles & assets
```

### Backend Code Goes To: `backend/src/`
```
✅ Business logic services
✅ Database utilities
✅ Supabase admin client
✅ Database schema
✅ Shared types
✅ Backend middleware
✅ Backend utilities
```

### Root Directory For: (`/`)
```
✅ Documentation files (.md)
✅ Configuration files (.json, .ts)
✅ Environment files (.env, .env.example)
✅ Project guides
```

---

## 📁 File Organization by Type

### Frontend Components
```
Frontend/src/components/
├── ui/                     # shadcn/ui components (30+)
├── crud/                   # Generic CRUD components
├── DashboardLayout.tsx     # Main layout wrapper
├── ProtectedRoute.tsx      # Auth guard
├── StatsCard.tsx           # Stats display
└── StatusBadge.tsx         # Status indicator
```

### Frontend Pages
```
Frontend/src/pages/
├── admin/
│   ├── AdminDashboard.tsx
│   ├── UserManagement.tsx
│   ├── ReportGeneration.tsx
│   └── SystemSettings.tsx
├── patient/
│   ├── PatientDashboard.tsx
│   ├── MyAppointments.tsx
│   ├── MedicalRecords.tsx
│   ├── LabResults.tsx
│   └── Billing.tsx
├── doctor/
│   ├── DoctorDashboard.tsx
│   ├── MySchedule.tsx
│   ├── PatientList.tsx
│   └── LabOrders.tsx
├── bloodbank/
│   ├── InventoryTracker.tsx
│   └── DonationRecords.tsx
├── laboratory/
│   ├── TestOrders.tsx
│   └── ResultEntry.tsx
├── pharmacy/
│   └── Prescriptions.tsx
├── nurse/
├── reception/
├── billing/
├── Index.tsx               # Home page
├── Login.tsx               # Authentication
└── Profile.tsx             # User profile
```

### Backend Services
```
backend/src/services/
├── authService.ts          # User authentication
├── patientService.ts       # Patient CRUD
├── doctorService.ts        # Doctor CRUD
├── appointmentService.ts   # Appointment CRUD
├── medicalRecordService.ts # Medical records CRUD
├── labTestService.ts       # Lab tests CRUD
├── billingService.ts       # Billing CRUD
├── bloodBankService.ts     # Blood bank CRUD
├── bedService.ts           # Bed management CRUD
└── index.ts                # Service exports
```

---

## 🔄 Data Flow

```
User Interface (Frontend)
        ↓
React Components
        ↓
Frontend Services
        ↓
Backend Services (shared library)
        ↓
Supabase Client
        ↓
PostgreSQL Database
        ↓
Supabase Real-time
        ↓
Frontend Components (update)
```

---

## 📦 Package Organization

### Frontend (React App)
- **Location:** `Frontend/package.json`
- **Main Dependencies:** React, TypeScript, Vite, Tailwind, shadcn/ui
- **Dev Dependencies:** ESLint, Prettier, Vitest

### Backend (Services Library)
- **Location:** `backend/` (No package.json currently)
- **Exports:** All services via `src/services/index.ts`
- **Used By:** Frontend as library code

### Root Project
- **Monorepo:** Sometimes root package.json for shared scripts
- **Current:** Each has own package.json

---

## ✅ Organization Checklist

- [x] Frontend code in `Frontend/` directory
- [x] Backend code in `backend/` directory
- [x] Clear separation of concerns
- [x] Services organized by feature
- [x] Components organized by type
- [x] Pages organized by role/feature
- [x] Types separated from logic
- [x] Database schema in backend
- [x] Configuration files at root
- [x] Documentation at root

---

## 🚀 Development Structure

### When Adding New Feature:

1. **Create Backend Service** (if needed)
   ```
   backend/src/services/newFeatureService.ts
   ```

2. **Create Frontend Components**
   ```
   Frontend/src/components/NewComponent.tsx
   Frontend/src/pages/NewPage.tsx
   ```

3. **Create Frontend Service** (if API call needed)
   ```
   Frontend/src/services/newFeatureService.ts
   ```

4. **Add Types**
   ```
   Frontend/src/types/index.ts (or new file)
   backend/src/types/index.ts (for shared types)
   ```

5. **Update Exports**
   ```
   Frontend/src/services/index.ts
   backend/src/services/index.ts
   ```

---

## 📚 Important Files

### Frontend Configuration
- `Frontend/package.json` - Dependencies
- `Frontend/.env.local` - Environment variables ✅
- `Frontend/vite.config.ts` - Build config
- `Frontend/tsconfig.json` - TypeScript config
- `Frontend/README.md` - Frontend docs

### Backend Configuration
- `backend/.env` - Environment variables ✅
- `backend/README.md` - Backend docs
- `backend/tsconfig.json` - TypeScript config
- `backend/config/supabase.ts` - Supabase setup

### Project Files
- `INDEX.md` - Documentation index
- `QUICK_START.md` - Quick start guide
- `MASTER_FEATURES.md` - Feature documentation
- `SUPABASE_SETUP_GUIDE.md` - Database setup

---

## 🎯 Key Principles

### Separation of Concerns
- ✅ Frontend: UI, User interactions, Form validation
- ✅ Backend: Business logic, Database operations, Authentication
- ✅ Shared: Type definitions, Service interfaces

### Scalability
- Organized structure makes it easy to add features
- Clear file organization improves navigation
- Service pattern enables code reuse

### Maintainability
- Each feature has clear folder
- Related code grouped together
- Documentation co-located with code

### Security
- Sensitive configs in `.env` files
- No secrets in code
- Backend logic for critical operations

---

**Status:** ✅ Well Organized  
**Last Updated:** February 14, 2026  

🎉 Your codebase is properly organized!
