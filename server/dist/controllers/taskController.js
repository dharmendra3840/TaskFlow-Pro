"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.listTasks = void 0;
const models_1 = require("../models");
const listTasks = async (req, res) => {
    try {
        const { projectId, status, priority, assignedTo } = req.query;
        const where = {};
        if (projectId)
            where.projectId = projectId;
        if (status)
            where.status = status;
        if (priority)
            where.priority = priority;
        if (assignedTo)
            where.assignedTo = assignedTo;
        // members can only see tasks for projects they belong to
        if (req.user.role === 'member' && projectId) {
            const pm = await models_1.ProjectMember.findOne({ where: { projectId, userId: req.user.id } });
            if (!pm)
                return res.status(403).json({ message: 'Forbidden' });
        }
        const tasks = await models_1.Task.findAll({ where });
        return res.json(tasks);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.listTasks = listTasks;
const createTask = async (req, res) => {
    try {
        const { projectId, assignedTo, dueDate } = req.body;
        const project = await models_1.Project.findByPk(projectId);
        if (!project)
            return res.status(400).json({ message: 'Project does not exist' });
        if (dueDate && new Date(dueDate) <= new Date())
            return res.status(400).json({ message: 'dueDate must be in the future' });
        if (assignedTo) {
            const membership = await models_1.ProjectMember.findOne({ where: { projectId, userId: assignedTo } });
            if (!membership)
                return res.status(400).json({ message: 'Assigned user is not a member of the project' });
        }
        const payload = { ...req.body, createdBy: req.user.id };
        const task = await models_1.Task.create(payload);
        return res.status(201).json(task);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    try {
        const task = await models_1.Task.findByPk(req.params.id);
        if (!task)
            return res.status(404).json({ message: 'Not found' });
        // members can only update status
        if (req.user.role === 'member') {
            await task.update({ status: req.body.status });
            return res.json(task);
        }
        await task.update(req.body);
        return res.json(task);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const task = await models_1.Task.findByPk(req.params.id);
        if (!task)
            return res.status(404).json({ message: 'Not found' });
        await task.destroy();
        return res.json({ message: 'Deleted' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.deleteTask = deleteTask;
