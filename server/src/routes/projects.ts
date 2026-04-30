import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { roleCheck } from '../middleware/roleCheck';
import { listProjects, createProject, getProject, updateProject, deleteProject, addMember, removeMember } from '../controllers/projectController';
import projectValidator from '../validators/projectValidator';
import handleValidation from '../middleware/handleValidation';

const router = Router();

router.get('/', authMiddleware, listProjects);
router.post('/', authMiddleware, roleCheck('admin'), projectValidator, handleValidation, createProject);
router.get('/:id', authMiddleware, getProject);
router.put('/:id', authMiddleware, roleCheck('admin'), projectValidator, handleValidation, updateProject);
router.delete('/:id', authMiddleware, roleCheck('admin'), deleteProject);
router.post('/:id/members', authMiddleware, roleCheck('admin'), addMember);
router.delete('/:id/members/:userId', authMiddleware, roleCheck('admin'), removeMember);

export default router;
