import User from './User';
import Project from './Project';
import ProjectMember from './ProjectMember';
import Task from './Task';

// Associations
User.hasMany(Task, { foreignKey: 'assignedTo', as: 'assignedTasks' });
User.hasMany(Project, { foreignKey: 'createdBy', as: 'createdProjects' });
Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks' });
Project.belongsToMany(User, { through: ProjectMember, foreignKey: 'projectId', otherKey: 'userId', as: 'members' });
Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
Task.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' });

export { User, Project, ProjectMember, Task };
