# HealthHub - Hospital Management System

A comprehensive, modern Hospital Management System built with React, TypeScript, and Supabase. Features patient management, appointment scheduling, medical records, billing, blood bank inventory, and more.

## 🌟 Highlights

- **React 18** frontend with TypeScript
- **Supabase** backend with PostgreSQL
- **Role-based access control** (7 roles)
- **Real-time database** with Row Level Security
- **Tailwind CSS** styling
- **shadcn/ui** component library
- **30+ pages** covering all hospital operations
- **Type-safe** with full TypeScript support
- **Responsive design** for all devices

---

## 📋 Quick Navigation

- **[PROJECT_GUIDE.md](./PROJECT_GUIDE.md)** - Complete project architecture & database schema
- **[FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md)** - Frontend setup & component usage
- **[backend/README.md](./backend/README.md)** - Backend services documentation

---

## 🚀 Getting Started in 5 Minutes

### 1. Clone Repository
```bash
git clone <repository-url>
cd health-hub-main
```

### 2. Install Dependencies
```bash
bun install
```

### 3. Setup Supabase

**Create Project:**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy credentials

**Create `.env.local`:**
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Run Database Schema:**
1. Supabase Dashboard → SQL Editor
2. Paste `backend/src/database/schema.sql`
3. Execute

### 4. Start Development Server
```bash
bun run dev
```

Open http://localhost:8080

---

## 📁 Folder Structure

```
health-hub-main/
├── src/                           # Frontend React application
│   ├── components/                # React components
│   ├── pages/                     # Page routes
│   ├── contexts/                  # Auth context
│   ├── hooks/                     # Custom hooks
│   ├── lib/                       # Utilities & Supabase
│   ├── types/                    # TypeScript types
│   └── App.tsx                    # Root component
│
├── backend/                       # Backend services
│   └── src/
│       ├── services/              # Business logic
│       ├── types/                 # Shared types
│       └── database/              # Schema
│
├── PROJECT_GUIDE.md               # Full documentation
├── FRONTEND_GUIDE.md              # Frontend guide
└── package.json                   # Dependencies
```

---

## 💼 Core Features

### 1. Authentication & Users
- User registration with 7 roles
- Login/logout
- Password reset
- Profile management
- Session management

### 2. Patient Management
- Create/view patient records
- Track allergies & medical history
- Emergency contacts
- Blood type management
- Search functionality

### 3. Doctor Management
- Doctor profiles with credentials
- Specialty & department assignment
- Experience tracking
- Consultation fees
- Availability management

### 4. Appointments
- Schedule appointments
- View appointment history
- Cancel appointments
- Doctor-patient matching
- Appointment status tracking

### 5. Medical Records
- Diagnosis documentation
- Symptoms tracking
- Treatment records
- Prescriptions
- Doctor notes

### 6. Lab Tests
- Order tests
- Track test status
- Enter results
- Generate reports
- Test history

### 7. Billing
- Generate invoices
- Track payments
- Bill items
- Payment status
- Financial reports

### 8. Blood Bank
- Track blood inventory
- Blood type organization
- Expiry date management
- Reservation system
- Inventory reports

### 9. Bed Management
- Manage hospital beds
- Patient allocation
- Discharge management
- Ward organization
- Bed history

### 10. Administrative
- User management
- Staff management
- Department management
- System settings
- Reports & analytics

---

## 👥 User Roles

1. **Admin** - Full system access
2. **Doctor** - Patient care & medical records
3. **Nurse** - Patient care management
4. **Patient** - Access personal records
5. **Lab Technician** - Manage lab tests
6. **Pharmacist** - Manage medications
7. **Receptionist** - Scheduling & check-in

---

## 🗄️ Database Tables (15+)

All with relationships, indexes, and RLS policies.

---

## 🧪 Development Commands

```bash
# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run tests
bun run test

# Lint code
bun run lint
```

---

## 📚 Documentation

- **[PROJECT_GUIDE.md](./PROJECT_GUIDE.md)** - Architecture, database schema, complete API
- **[FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md)** - Frontend setup, components, examples
- **[backend/README.md](./backend/README.md)** - Backend services with API docs

---

## 📦 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL), JavaScript/TypeScript
- **Tools**: Bun, Vitest, ESLint

---

## 🚀 Production Deployment

```bash
# Build for production
bun run build

# Deploy to Vercel
vercel
```

---

## 📄 License

MIT License - Free to use

---

## 🆘 Need Help?

Start with [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) for complete documentation.

**Happy healthcare management! 🏥**
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
