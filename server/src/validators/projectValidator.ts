import { body } from 'express-validator';

export const projectValidator = [
  body('name').isLength({ min: 3, max: 200 }).withMessage('Name must be 3-200 chars'),
];

export default projectValidator;
