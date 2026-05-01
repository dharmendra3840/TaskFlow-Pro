"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const uuid_1 = require("uuid");
class ProjectMember extends sequelize_1.Model {
}
ProjectMember.init({
    id: { type: sequelize_1.DataTypes.UUID, defaultValue: () => (0, uuid_1.v4)(), primaryKey: true },
    projectId: { type: sequelize_1.DataTypes.UUID, allowNull: false },
    userId: { type: sequelize_1.DataTypes.UUID, allowNull: false },
}, { sequelize: database_1.sequelize, tableName: 'project_members', indexes: [{ unique: true, fields: ['projectId', 'userId'] }] });
exports.default = ProjectMember;
