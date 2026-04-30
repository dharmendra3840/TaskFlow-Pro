import { Request, Response } from 'express';
import { Task, Project, ProjectMember } from '../models';
import { Op } from 'sequelize';

export const listTasks = async (req: any, res: Response) => {
  try {
    const { projectId, status, priority, assignedTo } = req.query;
    const where: any = {};
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assignedTo) where.assignedTo = assignedTo;
    // members can only see tasks for projects they belong to
    if (req.user.role === 'member' && projectId) {
      const pm = await ProjectMember.findOne({ where: { projectId, userId: req.user.id } });
      if (!pm) return res.status(403).json({ message: 'Forbidden' });
    }
    const tasks = await Task.findAll({ where });
    return res.json(tasks);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req: any, res: Response) => {
  try {
    const { projectId, assignedTo, dueDate } = req.body;
    const project = await Project.findByPk(projectId);
    if (!project) return res.status(400).json({ message: 'Project does not exist' });
    if (dueDate && new Date(dueDate) <= new Date()) return res.status(400).json({ message: 'dueDate must be in the future' });
    if (assignedTo) {
      const membership = await ProjectMember.findOne({ where: { projectId, userId: assignedTo } });
      if (!membership) return res.status(400).json({ message: 'Assigned user is not a member of the project' });
    }
    const payload = { ...req.body, createdBy: req.user.id };
    const task = await Task.create(payload);
    return res.status(201).json(task);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req: any, res: Response) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Not found' });
    // members can only update status
    if (req.user.role === 'member') {
      await task.update({ status: req.body.status });
      return res.json(task);
    }
    await task.update(req.body);
    return res.json(task);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req: any, res: Response) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Not found' });
    await task.destroy();
    return res.json({ message: 'Deleted' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
