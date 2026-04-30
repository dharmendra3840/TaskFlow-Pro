import { body } from 'express-validator';

export const registerValidator = [
  body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 chars'),
  body('role').isIn(['admin', 'member']).withMessage('Invalid role'),
];

export const loginValidator = [body('email').isEmail(), body('password').exists()];
