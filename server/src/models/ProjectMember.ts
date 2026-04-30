import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

interface PMAttributes {
  id: string;
  projectId: string;
  userId: string;
}

interface PMCreationAttributes extends Optional<PMAttributes, 'id'> {}

class ProjectMember extends Model<PMAttributes, PMCreationAttributes> implements PMAttributes {
  public id!: string;
  public projectId!: string;
  public userId!: string;
}

ProjectMember.init(
  {
    id: { type: DataTypes.UUID, defaultValue: () => uuidv4(), primaryKey: true },
    projectId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
  },
  { sequelize, tableName: 'project_members', indexes: [{ unique: true, fields: ['projectId', 'userId'] }] }
);

export default ProjectMember;
