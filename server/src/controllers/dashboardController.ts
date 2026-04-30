import { Request, Response } from 'express';
import { Project, Task, ProjectMember } from '../models';
import { sequelize } from '../config/database';

export const adminStats = async (req: any, res: Response) => {
  try {
    const totalProjects = await Project.count();
    const totalTasks = await Task.count();
    const completedTasks = await Task.count({ where: { status: 'done' } });
    const overdue = await Task.count({ where: { dueDate: { [sequelize.Op.lt]: new Date() }, status: { [sequelize.Op.ne]: 'done' } } });
    return res.json({ totalProjects, totalTasks, completedTasks, overdue });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const memberStats = async (req: any, res: Response) => {
  try {
    const myTasks = await Task.count({ where: { assignedTo: req.user.id } });
    const completed = await Task.count({ where: { assignedTo: req.user.id, status: 'done' } });
    const overdue = await Task.count({ where: { assignedTo: req.user.id, dueDate: { [sequelize.Op.lt]: new Date() }, status: { [sequelize.Op.ne]: 'done' } } });
    const dueToday = await Task.count({ where: { assignedTo: req.user.id, dueDate: { [sequelize.Op.eq]: new Date() } } });
    return res.json({ myTasks, completed, overdue, dueToday });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
