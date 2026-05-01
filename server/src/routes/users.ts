import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { roleCheck } from '../middleware/roleCheck';
import { listUsers } from '../controllers/userController';

const router = Router();

router.get('/', authMiddleware, roleCheck('admin'), listUsers);

export default router;