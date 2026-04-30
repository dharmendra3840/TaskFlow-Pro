import { Request, Response } from 'express';
import { Project, ProjectMember, User, Task } from '../models';

export const listProjects = async (req: any, res: Response) => {
  try {
    if (req.user.role === 'admin') {
      const projects = await Project.findAll({ include: [{ model: Task, as: 'tasks' }, { model: User, as: 'members' }] });
      return res.json(projects);
    }
    // members: return projects where user is a member
    const memberships = await ProjectMember.findAll({ where: { userId: req.user.id } });
    const ids = memberships.map(m => m.projectId);
    const projects = await Project.findAll({ where: { id: ids }, include: [{ model: Task, as: 'tasks' }] });
    return res.json(projects);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const createProject = async (req: any, res: Response) => {
  try {
    const { name, description, deadline, status } = req.body;
    if (deadline && new Date(deadline) <= new Date()) return res.status(400).json({ message: 'Deadline must be a future date' });
    const project = await Project.create({ name, description, deadline, status, createdBy: req.user.id });
    return res.status(201).json(project);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getProject = async (req: any, res: Response) => {
  try {
    const project = await Project.findByPk(req.params.id, { include: [{ model: User, as: 'members' }, { model: Task, as: 'tasks' }] });
    if (!project) return res.status(404).json({ message: 'Not found' });
    return res.json(project);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateProject = async (req: any, res: Response) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    await project.update(req.body);
    return res.json(project);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteProject = async (req: any, res: Response) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    await project.destroy();
    return res.json({ message: 'Deleted' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const addMember = async (req: any, res: Response) => {
  try {
    const { userId } = req.body;
    // ensure project exists
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    // ensure user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    // prevent duplicates
    const exists = await ProjectMember.findOne({ where: { projectId: req.params.id, userId } });
    if (exists) return res.status(400).json({ message: 'User already a member' });
    const pm = await ProjectMember.create({ projectId: req.params.id, userId });
    return res.status(201).json(pm);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const removeMember = async (req: any, res: Response) => {
  try {
    const { userId } = req.params;
    const removed = await ProjectMember.destroy({ where: { projectId: req.params.id, userId } });
    return res.json({ removed: !!removed });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
