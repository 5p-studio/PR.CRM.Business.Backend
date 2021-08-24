import { DataTypes } from 'sequelize';

const WorkEntity = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  orderId: {
    type: DataTypes.INTEGER,
    field: 'order_id',
  },
  name: {
    type: DataTypes.STRING,
  },
  isLocked: {
    type: DataTypes.BOOLEAN,
    field: 'is_locked',
  },
  idProcess: {
    type: DataTypes.INTEGER,
    field: 'id_process',
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

export default WorkEntity;
