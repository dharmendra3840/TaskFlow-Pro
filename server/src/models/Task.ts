import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

interface TaskAttributes {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate?: Date | null;
  projectId: string;
  assignedTo?: string | null;
  createdBy: string;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'description' | 'dueDate' | 'assignedTo'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: string;
  public title!: string;
  public description?: string;
  public status!: 'todo' | 'in_progress' | 'review' | 'done';
  public priority!: 'low' | 'medium' | 'high' | 'critical';
  public dueDate?: Date | null;
  public projectId!: string;
  public assignedTo?: string | null;
  public createdBy!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: { type: DataTypes.UUID, defaultValue: () => uuidv4(), primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('todo', 'in_progress', 'review', 'done'), defaultValue: 'todo' },
    priority: { type: DataTypes.ENUM('low', 'medium', 'high', 'critical'), allowNull: false },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    projectId: { type: DataTypes.UUID, allowNull: false },
    assignedTo: { type: DataTypes.UUID, allowNull: true },
    createdBy: { type: DataTypes.UUID, allowNull: false },
  },
  { sequelize, tableName: 'tasks' }
);

export default Task;
