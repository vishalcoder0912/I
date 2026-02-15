# 📌 HealthHub - Quick Reference Card

**Keep this handy while developing!**

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:8080/ |
| Supabase Dashboard | https://app.supabase.com |
| Project ID | oujiqjdofeilzrglukoa |
| Database | PostgreSQL (Supabase) |

---

## 📁 Important Files

```
.env                    Backend configuration
Frontend/.env.local     Frontend configuration
backend/src/services/   Business logic
Frontend/src/pages/     Routes & pages
Frontend/src/components/ UI components
```

---

## 🚀 Essential Commands

```bash
# Start frontend
cd Frontend && npm run dev

# Build for production
npm run build

# Type check
npm run type-check

# Run linting
npm run lint
```

---

## 🔑 API Services

```typescript
import {
  authService,
  patientService,
  doctorService,
  appointmentService,
  medicalRecordService,
  labTestService,
  billingService,
  bloodBankService,
  bedService
} from '@/services';
```

---

## 📊 Database Tables

| Table | Columns | Purpose |
|-------|---------|---------|
| users | 9 | User accounts |
| patients | 15 | Patient info |
| doctors | 12 | Doctor profiles |
| appointments | 9 | Appointments |
| medical_records | 10 | Medical history |
| lab_tests | 10 | Lab tests |
| billing | 11 | Invoices |
| blood_inventory | 11 | Blood stock |
| beds | 10 | Hospital beds |
| departments | 5 | Departments |

---

## 👥 User Roles

```
patient, doctor, nurse, admin,
receptionist, pharmacist, lab_technician
```

---

## 🔐 Environment Variables

### Backend (.env)
```
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NODE_ENV
API_PORT
```

### Frontend (.env.local)
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_API_URL
VITE_APP_NAME
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| INDEX.md | Navigation guide |
| QUICK_START.md | Quick setup |
| SUPABASE_SETUP_GUIDE.md | Supabase guide |
| MASTER_FEATURES.md | API docs |
| VERIFICATION_CHECKLIST.md | Verify setup |
| COMPLETE_SETUP_SUMMARY.md | Overview |

---

## 🧪 Common Tasks

### View Data in Supabase
```sql
SELECT * FROM users;
SELECT * FROM patients;
SELECT * FROM appointments;
```

### Add Environment Variable
1. Edit `.env` or `.env.local`
2. Add: `NEW_VAR=value`
3. Restart server (`npm run dev`)

### Create New Page
1. Create `Frontend/src/pages/NewPage.tsx`
2. Add route in `App.tsx`
3. Import & use components

### Call API Service
```typescript
const { data, error } = 
  await patientService.getAllPatients();
```

---

## ✅ Verification

- [ ] Frontend running on 8080
- [ ] No console errors (F12)
- [ ] Can login/register
- [ ] Supabase connected
- [ ] Database accessible

---

## 🆘 Quick Troubleshooting

| Issue | Fix |
|-------|-----|
| Port in use | Use different port |
| CORS error | Check `.env.local` |
| Cannot login | Check email provider in Supabase |
| Module not found | Run `npm install` |

---

## 🚀 Deployment

```bash
# Build
npm run build

# Deploy to Vercel
vercel --prod

# Add env vars to Vercel dashboard
```

---

## 📞 Emergency Commands

```bash
# Clear node_modules
rm -r node_modules
npm install

# Kill port 8080
# Windows PowerShell:
Get-Process lsof | Where-Object {$_.Port -eq 8080} | Stop-Process -Force

# Check if port is in use
netstat -ano | findstr :8080
```

---

## 🔗 Useful Links

- [React Docs](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

---

## ⏱️ Time Estimates

| Task | Time |
|------|------|
| Start app | 2 min |
| Create page | 10 min |
| Add service | 15 min |
| Deploy | 20 min |
| Add feature | 30 min |

---

## 🎯 Next Steps

1. Read: [INDEX.md](./INDEX.md)
2. Setup: [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)
3. Develop: [QUICK_START.md](./QUICK_START.md)
4. Reference: [MASTER_FEATURES.md](./MASTER_FEATURES.md)

---

**Save this page as a bookmark! 📌**  
Last Updated: February 14, 2026
