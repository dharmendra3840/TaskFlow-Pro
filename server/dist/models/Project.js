"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
class Project extends sequelize_1.Model {
}
Project.init({
    id: { type: sequelize_1.DataTypes.UUID, defaultValue: () => (0, uuid_1.v4)(), primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT },
    deadline: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    status: { type: sequelize_1.DataTypes.ENUM('active', 'completed', 'on-hold'), defaultValue: 'active' },
    createdBy: { type: sequelize_1.DataTypes.UUID, allowNull: false },
}, { sequelize: database_1.sequelize, tableName: 'projects' });
exports.default = Project;
