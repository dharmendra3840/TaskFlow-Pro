import { body } from 'express-validator';

export const taskValidator = [
  body('title').isLength({ min: 3, max: 300 }).withMessage('Title length invalid'),
  body('priority').isIn(['low', 'medium', 'high', 'critical']).withMessage('Invalid priority'),
  body('projectId').notEmpty().withMessage('projectId required'),
];
