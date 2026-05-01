"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMember = exports.addMember = exports.deleteProject = exports.updateProject = exports.getProject = exports.createProject = exports.listProjects = void 0;
const models_1 = require("../models");
const listProjects = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            const projects = await models_1.Project.findAll({ include: [{ model: models_1.Task, as: 'tasks' }, { model: models_1.User, as: 'members' }] });
            return res.json(projects);
        }
        // members: return projects where user is a member
        const memberships = await models_1.ProjectMember.findAll({ where: { userId: req.user.id } });
        const ids = memberships.map(m => m.projectId);
        const projects = await models_1.Project.findAll({ where: { id: ids }, include: [{ model: models_1.Task, as: 'tasks' }] });
        return res.json(projects);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.listProjects = listProjects;
const createProject = async (req, res) => {
    try {
        const { name, description, deadline, status } = req.body;
        if (deadline && new Date(deadline) <= new Date())
            return res.status(400).json({ message: 'Deadline must be a future date' });
        const project = await models_1.Project.create({ name, description, deadline, status, createdBy: req.user.id });
        return res.status(201).json(project);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.createProject = createProject;
const getProject = async (req, res) => {
    try {
        const project = await models_1.Project.findByPk(req.params.id, { include: [{ model: models_1.User, as: 'members' }, { model: models_1.Task, as: 'tasks' }] });
        if (!project)
            return res.status(404).json({ message: 'Not found' });
        return res.json(project);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getProject = getProject;
const updateProject = async (req, res) => {
    try {
        const project = await models_1.Project.findByPk(req.params.id);
        if (!project)
            return res.status(404).json({ message: 'Not found' });
        await project.update(req.body);
        return res.json(project);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    try {
        const project = await models_1.Project.findByPk(req.params.id);
        if (!project)
            return res.status(404).json({ message: 'Not found' });
        await project.destroy();
        return res.json({ message: 'Deleted' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.deleteProject = deleteProject;
const addMember = async (req, res) => {
    try {
        const { userId } = req.body;
        // ensure project exists
        const project = await models_1.Project.findByPk(req.params.id);
        if (!project)
            return res.status(404).json({ message: 'Project not found' });
        // ensure user exists
        const user = await models_1.User.findByPk(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        // prevent duplicates
        const exists = await models_1.ProjectMember.findOne({ where: { projectId: req.params.id, userId } });
        if (exists)
            return res.status(400).json({ message: 'User already a member' });
        const pm = await models_1.ProjectMember.create({ projectId: req.params.id, userId });
        return res.status(201).json(pm);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.addMember = addMember;
const removeMember = async (req, res) => {
    try {
        const { userId } = req.params;
        const removed = await models_1.ProjectMember.destroy({ where: { projectId: req.params.id, userId } });
        return res.json({ removed: !!removed });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.removeMember = removeMember;
