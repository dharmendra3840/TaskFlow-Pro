import { Response } from 'express';
import { User } from '../models';

export const listUsers = async (req: any, res: Response) => {
  try {
    const where: any = {};
    if (req.query.role) where.role = req.query.role;

    const users = await User.findAll({
      where,
      attributes: ['id', 'name', 'email', 'role'],
      order: [['name', 'ASC']],
    });

    return res.json(users);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};