# HealthHub Frontend

Modern React-based frontend for HealthHub Hospital Management System with Vite, TypeScript, and Tailwind CSS.

## 📁 Frontend Structure

```
src/
├── components/                      # Reusable React components
│   ├── DashboardLayout.tsx         # Main layout wrapper
│   ├── NavLink.tsx                 # Navigation links
│   ├── ProtectedRoute.tsx          # Auth-protected routes
│   ├── StatsCard.tsx               # Statistics display
│   ├── StatusBadge.tsx             # Status indicators
│   ├── crud/                       # CRUD operations
│   │   ├── DataTable.tsx           # Reusable data table
│   │   └── DeleteDialog.tsx        # Delete confirmation
│   └── ui/                         # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── checkbox.tsx
│       ├── badge.tsx
│       ├── toast.tsx
│       └── 50+ more...
│
├── pages/                          # Page components
│   ├── Index.tsx                   # Home page
│   ├── Login.tsx                   # Login page
│   ├── NotFound.tsx                # 404 page
│   ├── Notifications.tsx           # Notifications
│   ├── Profile.tsx                 # User profile
│   ├── admin/                      # Admin pages
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminReports.tsx
│   │   ├── AdminSettings.tsx
│   │   ├── UserManagement.tsx
│   │   ├── StaffManagement.tsx
│   │   ├── PatientManagement.tsx
│   │   ├── DepartmentManagement.tsx
│   │   └── BedManagement.tsx
│   ├── doctor/                     # Doctor pages
│   ├── patient/                    # Patient pages
│   ├── nurse/                      # Nurse pages
│   ├── reception/                  # Reception pages
│   ├── laboratory/                 # Lab pages
│   ├── pharmacy/                   # Pharmacy pages
│   ├── billing/                    # Billing pages
│   └── bloodbank/                  # Blood bank pages
│
├── contexts/                       # React Context
│   └── AuthContext.tsx             # Authentication state
│
├── hooks/                          # Custom React hooks
│   ├── useLocalStorage.ts          # Local storage hook
│   ├── use-toast.ts                # Toast notifications
│   └── use-mobile.tsx              # Mobile detection
│
├── lib/                            # Utility libraries
│   ├── supabase.ts                 # Supabase client
│   ├── utils.ts                    # General utilities
│   ├── mockData.ts                 # Mock data for dev
│   ├── exportUtils.ts              # Export utilities
│   └── bloodBankData.ts            # Blood bank data
│
├── types/                          # TypeScript types
│   ├── database.ts                 # Database interfaces
│   └── index.ts                    # Type exports
│
├── assets/                         # Static assets
├── App.tsx                         # Root component
├── App.css                         # Global styles
├── main.tsx                        # Entry point
├── index.css                       # Global CSS
└── vite-env.d.ts                   # Vite types
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Bun package manager (or npm)

### Installation

```bash
# Install dependencies
bun install

# Start development server
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

### Environment Setup

Create `.env.local`:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=HealthHub
VITE_APP_VERSION=1.0.0
```

---

## 🎨 Key Features

### 1. Authentication
- **Login** - Email/password authentication
- **Registration** - Role-based user signup
- **Protected Routes** - ProtectedRoute component
- **Profile Management** - User profile updates
- **Session Management** - Persistent authentication

### 2. Role-Based UI
Different interfaces for different user roles:
- **Admin** - System administration
- **Doctor** - Patient appointments & records
- **Nurse** - Patient care management
- **Patient** - Medical records viewing
- **Receptionist** - Appointment scheduling
- **Lab Tech** - Test management
- **Pharmacist** - Medication management

### 3. Components
- Data tables with sorting & filtering
- Modal dialogs for forms
- Toast notifications
- Status badges
- Stats cards
- Charts with Recharts

### 4. State Management
- React Context for auth
- TanStack Query for server state
- Local storage for persistence
- React Hook Form for forms

---

## 🔑 Key Pages

### Admin Pages
- **Dashboard** - System overview
- **Reports** - Analytics dashboard
- **Settings** - System configuration
- **User Management** - CRUD users
- **Staff Management** - Staff profiles
- **Patient Management** - All patients
- **Department Management** - Departments
- **Bed Management** - Hospital beds

### Doctor Pages
- Appointment schedules
- Patient medical records
- Lab test results
- Prescription management

### Patient Pages
- Medical history
- Upcoming appointments
- Lab test results
- Bills & invoices
- Lab appointments

### Nurse Pages
- Patient care tasks
- Vitals recording
- Medication tracking

### Reception Pages
- Appointment scheduling
- Check-in management
- Emergency contacts

### Lab Pages
- Test orders
- Result entry
- Test reports

### Pharmacy Pages
- Medication inventory
- Prescription fulfillment
- Stock management

### Billing Pages
- Invoice generation
- Payment tracking
- Financial reports

---

## 📦 Technologies

### Frontend Framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling

### Component Library
- **shadcn/ui** - High-quality components
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icons
- **Recharts** - Charts & graphs

### State Management
- **React Context** - Auth state
- **TanStack Query (React Query)** - Server state
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Utilities
- **React Router** - Routing
- **Date-fns** - Date manipulation
- **Sonner** - Toast notifications
- **Axios** - HTTP client (optional)
- **clsx** - Conditional CSS
- **Tailwind Merge** - CSS merging

---

## 💡 How to Use

### Authentication Context
```typescript
import { useAuth } from './contexts/AuthContext';

export function App() {
  const { user, isLoading, signOut } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.full_name}</p>
          <button onClick={signOut}>Logout</button>
        </>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

### Protected Route
```typescript
import { ProtectedRoute } from './components/ProtectedRoute';

<Route element={<ProtectedRoute allowedRoles={['admin', 'doctor']} />}>
  <Route path="/admin" element={<AdminDashboard />} />
</Route>
```

### Using Services
```typescript
import { patientService } from '@/services';
import { useEffect, useState } from 'react';

export function PatientList() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const result = await patientService.getAllPatients();
      if (result.error) {
        setError(result.message);
      } else {
        setPatients(result.data);
      }
    };

    fetchPatients();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {patients.map(patient => (
        <li key={patient.id}>{patient.user?.full_name}</li>
      ))}
    </ul>
  );
}
```

### Forms with React Hook Form
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values) {
    const result = await authService.signIn(values);
    if (!result.error) {
      // Redirect or update state
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* More fields... */}
      </form>
    </Form>
  );
}
```

### Data Tables
```typescript
import { DataTable } from '@/components/crud/DataTable';

const columns = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'full_name',
  },
  {
    id: 'email',
    header: 'Email',
    accessorKey: 'email',
  },
];

export function PatientsTable({ data }) {
  return <DataTable columns={columns} data={data} />;
}
```

---

## 🎨 Styling

### Tailwind CSS
All components use Tailwind CSS. Configuration in `tailwind.config.ts`.

### Dark Mode
Theme support with `next-themes`:
```typescript
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

### Custom CSS
Global styles in `index.css` and `App.css`.

---

## 📱 Responsive Design

- Mobile-first approach
- Tailwind breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Mobile detection hook: `use-mobile.tsx`
- Sidebar drawer for mobile

---

## 🧪 Testing

```bash
# Run tests
bun run test

# Watch mode
bun run test:watch

# Coverage
bun run test --coverage
```

Test configuration in `vitest.config.ts`.

---

## 📦 Build & Deployment

### Development Build
```bash
bun run build:dev
```

### Production Build
```bash
bun run build
```

Build output: `dist/` directory

### Preview
```bash
bun run preview
```

### Deploy to Vercel
```bash
vercel
```

---

## 🔒 Security

### XSS Prevention
- React sanitizes by default
- DOMPurify for user content (if needed)

### CSRF Protection
- Supabase handles automatically

### Data Validation
- Zod schema validation
- TypeScript type checking

### Environment Variables
- Never expose sensitive keys in code
- Use `.env.local` for secrets
- Never commit `.env.local`

---

## 🐛 Debugging

### Browser DevTools
- React Developer Tools extension
- Redux DevTools for state
- Network tab for API calls

### Console Logging
```typescript
console.log('Patient:', result);
console.error('Error:', error);
console.table(data);
```

### Breakpoints
```typescript
debugger;
```

---

## 📊 Performance

### Code Splitting
- Vite automatic code splitting
- Dynamic imports for routes

### Lazy Loading
```typescript
import { lazy, Suspense } from 'react';

const Admin = lazy(() => import('./pages/admin'));

<Suspense fallback={<div>Loading...</div>}>
  <Admin />
</Suspense>
```

### Memoization
```typescript
import { memo } from 'react';

const Card = memo(function Card({ data }) {
  return <div>{data.name}</div>;
});
```

---

## 🐳 Docker Support (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build
EXPOSE 3000
CMD ["bun", "run", "preview"]
```

---

## 📝 Best Practices

1. **Component Organization**
   - One component per file
   - Reusable components in `components/`
   - Page-specific components co-located

2. **Type Safety**
   - Always use TypeScript
   - Define interfaces for API responses
   - Avoid `any` type

3. **State Management**
   - Use Context for global state
   - Use hooks for local state
   - TanStack Query for server state

4. **Error Handling**
   - Always handle API errors
   - Show user-friendly messages
   - Log errors for debugging

5. **Performance**
   - Lazy load heavy components
   - Memoize expensive computations
   - Optimize images and assets

---

## 🔄 Common Patterns

### API Call Hook
```typescript
import { useEffect, useState } from 'react';

function usePatients() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await patientService.getAllPatients();
        if (result.error) setError(result.message);
        else setData(result.data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { data, error, loading };
}
```

### Form Submission
```typescript
async function handleSubmit(formData) {
  try {
    const result = await patientService.createPatient(formData);
    if (result.error) {
      toast.error(result.message);
    } else {
      toast.success('Patient created');
      navigate('/patients');
    }
  } catch (err) {
    toast.error('Unexpected error');
  }
}
```

### Conditional Rendering
```typescript
{user?.role === 'admin' && <AdminPanel />}
{!isLoading && <Content />}
{error ? <Error message={error} /> : <Data />}
```

---

## 📞 Support

- Check component documentation
- Review example implementations
- Check Supabase dashboard
- Review browser console errors
- Check network tab for API issues

---

## 📈 Version

- **v1.0.0** (Feb 14, 2026) - Initial release

---

**Happy developing! 🎉**
