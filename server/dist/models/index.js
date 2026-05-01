"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.ProjectMember = exports.Project = exports.User = void 0;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Project_1 = __importDefault(require("./Project"));
exports.Project = Project_1.default;
const ProjectMember_1 = __importDefault(require("./ProjectMember"));
exports.ProjectMember = ProjectMember_1.default;
const Task_1 = __importDefault(require("./Task"));
exports.Task = Task_1.default;
// Associations
User_1.default.hasMany(Task_1.default, { foreignKey: 'assignedTo', as: 'assignedTasks' });
User_1.default.hasMany(Project_1.default, { foreignKey: 'createdBy', as: 'createdProjects' });
Project_1.default.hasMany(Task_1.default, { foreignKey: 'projectId', as: 'tasks' });
Project_1.default.belongsToMany(User_1.default, { through: ProjectMember_1.default, foreignKey: 'projectId', otherKey: 'userId', as: 'members' });
Task_1.default.belongsTo(Project_1.default, { foreignKey: 'projectId', as: 'project' });
Task_1.default.belongsTo(User_1.default, { foreignKey: 'assignedTo', as: 'assignee' });
