"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
class Task extends sequelize_1.Model {
}
Task.init({
    id: { type: sequelize_1.DataTypes.UUID, defaultValue: () => (0, uuid_1.v4)(), primaryKey: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT },
    status: { type: sequelize_1.DataTypes.ENUM('todo', 'in_progress', 'review', 'done'), defaultValue: 'todo' },
    priority: { type: sequelize_1.DataTypes.ENUM('low', 'medium', 'high', 'critical'), allowNull: false },
    dueDate: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    projectId: { type: sequelize_1.DataTypes.UUID, allowNull: false },
    assignedTo: { type: sequelize_1.DataTypes.UUID, allowNull: true },
    createdBy: { type: sequelize_1.DataTypes.UUID, allowNull: false },
}, { sequelize: database_1.sequelize, tableName: 'tasks' });
exports.default = Task;
