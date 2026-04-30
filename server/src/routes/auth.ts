import { Router } from 'express';
import { register, login, me } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';
import { registerValidator, loginValidator } from '../validators/authValidator';
import handleValidation from '../middleware/handleValidation';

const router = Router();

router.post('/register', registerValidator, handleValidation, register);
router.post('/login', loginValidator, handleValidation, login);
router.get('/me', authMiddleware, me);

export default router;
