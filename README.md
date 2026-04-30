# TaskFlow Pro — Team Task Manager

A professional full-stack team task management application with role-based access control (Admin/Member), built with React, Express, and PostgreSQL.

## ✨ Features

- **Role-Based Access Control**: Admin and Member roles with distinct permissions
- **Project Management**: Create, update, and manage projects with team members
- **Task Management**: Create tasks, assign to team members, track progress
- **Kanban Board**: Visual task management with drag-and-drop (To Do → In Progress → Review → Done)
- **Analytics Dashboard**: Real-time stats and charts using Recharts
- **JWT Authentication**: Secure token-based authentication
- **Responsive Design**: Mobile-friendly Tailwind CSS UI
- **Team Collaboration**: Add/remove team members from projects

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Sequelize ORM
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Security**: bcrypt hashing
- **API Client**: Axios with automatic JWT header injection

## 📂 Project Structure

```
taskflow-pro/
├── client/                  (React frontend)
│   ├── src/
│   │   ├── components/      (Reusable UI components)
│   │   ├── pages/           (Route pages)
│   │   ├── services/        (API services)
│   │   ├── context/         (Auth context)
│   │   └── App.tsx
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                  (Node.js backend)
│   ├── src/
│   │   ├── models/          (Sequelize models)
│   │   ├── controllers/     (Route handlers)
│   │   ├── routes/          (API endpoints)
│   │   ├── middleware/      (Auth, validation)
│   │   ├── validators/      (Input validation)
│   │   ├── config/          (Database config)
│   │   └── index.ts
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

## 🚀 Local Setup

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- npm or yarn

### Backend Setup

1. **Navigate to server directory**:
```bash
cd server
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create `.env` file**:
```bash
cp .env.example .env
```

4. **Update `.env` with your database credentials**:
```
DATABASE_URL=postgresql://user:password@localhost:5432/taskflow
JWT_SECRET=your_super_secret_jwt_key_here_change_in_prod
PORT=5000
NODE_ENV=development
```

5. **Start the development server**:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**:
```bash
cd client
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create `.env` file**:
```bash
cp .env.example .env
```

4. **Update `.env`**:
```
VITE_API_URL=http://localhost:5000/api
```

5. **Start the dev server**:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🔑 Test Credentials

After database initialization, create test users:

**Admin User**:
- Email: `admin@example.com`
- Password: `admin123456`
- Role: Admin

**Member User**:
- Email: `member@example.com`
- Password: `member1234`
- Role: Member

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `GET /api/projects` - List projects (admin: all, member: assigned)
- `POST /api/projects` - Create project (admin only)
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)
- `POST /api/projects/:id/members` - Add team member (admin only)
- `DELETE /api/projects/:id/members/:userId` - Remove member (admin only)

### Tasks
- `GET /api/tasks?projectId=&status=&priority=` - List tasks with filters
- `POST /api/tasks` - Create task (admin only)
- `PUT /api/tasks/:id` - Update task (admin: all fields, member: status only)
- `DELETE /api/tasks/:id` - Delete task (admin only)

### Dashboard
- `GET /api/dashboard/admin` - Admin dashboard stats
- `GET /api/dashboard/member` - Member personal stats

## 🎨 UI Components

- **Badge**: Status/priority badges
- **Button**: Reusable button with variants
- **Modal**: Dialog for forms and actions
- **StatCard**: Display key metrics
- **ProgressBar**: Visual progress indicator
- **TaskCard**: Task display with priority border
- **ProjectCard**: Project preview with progress
- **TaskForm**: Create/edit tasks
- **ProjectForm**: Create/edit projects
- **TaskList**: Tasks with filters
- **Kanban Board**: Project tasks by status

## 🔐 Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens expire in 7 days
- Role-based middleware protects admin endpoints
- Input validation on all forms and endpoints
- CORS enabled for frontend domain
- Environment variables for sensitive data

## 📊 Database Schema

**Users**: id, name, email, password, role, timestamps

**Projects**: id, name, description, deadline, status, createdBy, timestamps

**ProjectMembers**: id, projectId, userId (junction table)

**Tasks**: id, title, description, status, priority, dueDate, projectId, assignedTo, createdBy, timestamps

## 🌍 Deployment

### Backend (Railway)

1. Push code to GitHub
2. Create new project on Railway
3. Add PostgreSQL database service
4. Set environment variables:
   ```
   DATABASE_URL=<railway-postgres-url>
   JWT_SECRET=<strong-random-secret>
   NODE_ENV=production
   ```
5. Set start command: `npm run build && npm start`
6. Deploy from `/server` directory

### Frontend (Vercel)

1. Connect GitHub repo to Vercel
2. Set root directory: `client`
3. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```
4. Deploy

## 📝 Development Tips

- Backend uses Sequelize with PostgreSQL
- Frontend uses React Router v6 for navigation
- Auth context manages login state globally
- API service intercepts requests with JWT
- Components are modular and reusable

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🆘 Support

For issues or questions, please open a GitHub issue or contact the development team.
