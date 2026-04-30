import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { roleCheck } from '../middleware/roleCheck';
import { listTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { taskValidator } from '../validators/taskValidator';
import handleValidation from '../middleware/handleValidation';

const router = Router();

router.get('/', authMiddleware, listTasks);
router.post('/', authMiddleware, roleCheck('admin'), taskValidator, handleValidation, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, roleCheck('admin'), deleteTask);

export default router;
