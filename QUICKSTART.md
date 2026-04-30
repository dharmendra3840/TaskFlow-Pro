# TaskFlow Pro Setup & Run Guide

## 🚀 Quick Start

### Step 1: Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your PostgreSQL database credentials
npm run dev
```

**Backend runs on**: `http://localhost:5000`

### Step 2: Frontend Setup (in new terminal)

```bash
cd client
npm install
npm run dev
```

**Frontend runs on**: `http://localhost:3000`

---

## 📝 Environment Files

### Server `.env`
```
DATABASE_URL=postgresql://user:password@localhost:5432/taskflow
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5000
NODE_ENV=development
```

### Client `.env`
```
VITE_API_URL=http://localhost:5000/api
```

---

## 💾 Database Setup

1. Create PostgreSQL database:
```sql
CREATE DATABASE taskflow;
```

2. Sequelize will auto-sync on server start with `sequelize.sync({ alter: true })`

---

## 🧪 Testing the App

1. Go to `http://localhost:3000`
2. Click "Register" to create a new account
3. Choose role (Admin for full features)
4. Login and start creating projects/tasks

### Test Admin Account:
- Email: `admin@example.com`
- Password: `admin123456`

### Test Member Account:
- Email: `member@example.com`
- Password: `member1234`

---

## 📁 Key File Structure

### Backend
- `src/models/` - Sequelize database models
- `src/controllers/` - Business logic for routes
- `src/routes/` - API endpoint definitions
- `src/middleware/` - Auth & validation middleware

### Frontend
- `src/pages/` - Route pages (Login, Dashboard, Projects, etc.)
- `src/components/` - Reusable UI components
- `src/services/` - API client services
- `src/context/` - Auth context for state management

---

## 🔑 Key Features

✅ Role-based access (Admin/Member)
✅ JWT authentication with 7-day expiry
✅ Project & task management
✅ Kanban board visualization
✅ Team member management
✅ Dashboard with charts (Recharts)
✅ Input validation on frontend & backend
✅ Responsive Tailwind CSS design
✅ Error handling & loading states
✅ Protected routes (redirect to login if not authenticated)

---

## 🌍 Deployment

### Vercel (Frontend)
```bash
npm run build
# Push to GitHub and connect to Vercel
# Set root directory: client
# Add environment variable: VITE_API_URL=https://your-api.railway.app/api
```

### Railway (Backend)
```bash
# Set environment variables on Railway
# Deploy from /server directory
```

---

## 🆘 Troubleshooting

**Port already in use?**
```bash
# Change port in .env (server) or vite.config.ts (client)
```

**Database connection error?**
```bash
# Check DATABASE_URL in .env matches your PostgreSQL setup
# Ensure PostgreSQL service is running
```

**CORS errors?**
```bash
# Verify VITE_API_URL matches backend URL
# Check CORS is enabled in server (it is by default)
```

---

## 📚 API Documentation

See `README.md` in root for complete API endpoint documentation.

---

## 🎉 You're Ready!

Follow the Quick Start section above to launch the application.
