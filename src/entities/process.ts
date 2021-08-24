import { DataTypes } from 'sequelize';

const ProcessEntity = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  isLocked: {
    type: DataTypes.BOOLEAN,
    field: 'is_locked',
  },
  idDepartment: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_department',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: DataTypes.NOW,
  },
};

export default ProcessEntity;
