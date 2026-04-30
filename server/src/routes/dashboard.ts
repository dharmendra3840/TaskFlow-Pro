import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { roleCheck } from '../middleware/roleCheck';
import { adminStats, memberStats } from '../controllers/dashboardController';

const router = Router();

router.get('/admin', authMiddleware, roleCheck('admin'), adminStats);
router.get('/member', authMiddleware, memberStats);

export default router;
