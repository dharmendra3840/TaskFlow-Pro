import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

interface ProjectAttributes {
  id: string;
  name: string;
  description?: string;
  deadline?: Date | null;
  status: 'active' | 'completed' | 'on-hold';
  createdBy: string;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' | 'description' | 'deadline'> {}

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: string;
  public name!: string;
  public description?: string;
  public deadline?: Date | null;
  public status!: 'active' | 'completed' | 'on-hold';
  public createdBy!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: { type: DataTypes.UUID, defaultValue: () => uuidv4(), primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    deadline: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.ENUM('active', 'completed', 'on-hold'), defaultValue: 'active' },
    createdBy: { type: DataTypes.UUID, allowNull: false },
  },
  { sequelize, tableName: 'projects' }
);

export default Project;
