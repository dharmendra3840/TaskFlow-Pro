import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';
import userRoutes from './routes/users';
import dashboardRoutes from './routes/dashboard';
import { sequelize } from './config/database';
import bcrypt from 'bcrypt';
import { User } from './models';
import './models';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

const port = process.env.PORT || 5000;

const demoUsers = [
  { name: 'Admin', email: 'admin@test.com', role: 'admin' as const },
  { name: 'Admin', email: 'admin@example.com', role: 'admin' as const },
  { name: 'Member 1', email: 'member1@test.com', role: 'member' as const },
];

const seedDemoUsers = async () => {
  const passwordHash = await bcrypt.hash('TaskFlow123!', 10);

  for (const demoUser of demoUsers) {
    const existing = await User.findOne({ where: { email: demoUser.email } });
    if (existing) {
      await existing.update({
        name: demoUser.name,
        role: demoUser.role,
        password: passwordHash,
      });
      continue;
    }

    await User.create({
      name: demoUser.name,
      email: demoUser.email,
      password: passwordHash,
      role: demoUser.role,
    });
  }
};

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await seedDemoUsers();
    app.listen(port, () => console.log(`Server started on ${port}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
