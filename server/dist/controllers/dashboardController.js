"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberStats = exports.adminStats = void 0;
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
const adminStats = async (req, res) => {
    try {
        const totalProjects = await models_1.Project.count();
        const totalTasks = await models_1.Task.count();
        const completedTasks = await models_1.Task.count({ where: { status: 'done' } });
        const overdue = await models_1.Task.count({ where: { dueDate: { [sequelize_1.Op.lt]: new Date() }, status: { [sequelize_1.Op.ne]: 'done' } } });
        return res.json({ totalProjects, totalTasks, completedTasks, overdue });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.adminStats = adminStats;
const memberStats = async (req, res) => {
    try {
        const myTasks = await models_1.Task.count({ where: { assignedTo: req.user.id } });
        const completed = await models_1.Task.count({ where: { assignedTo: req.user.id, status: 'done' } });
        const overdue = await models_1.Task.count({ where: { assignedTo: req.user.id, dueDate: { [sequelize_1.Op.lt]: new Date() }, status: { [sequelize_1.Op.ne]: 'done' } } });
        const dueToday = await models_1.Task.count({ where: { assignedTo: req.user.id, dueDate: { [sequelize_1.Op.eq]: new Date() } } });
        return res.json({ myTasks, completed, overdue, dueToday });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.memberStats = memberStats;
