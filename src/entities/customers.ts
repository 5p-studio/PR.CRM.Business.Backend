import { DataTypes } from 'sequelize';

const CustomerEntity = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  idEmployee: {
    type: DataTypes.INTEGER,
    field: 'id_employee',
  },
  firstName: {
    type: DataTypes.STRING,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phoneNumber: {
    type: DataTypes.STRING,
    field: 'phone_number',
    validate: {
      is: {
        args: /^(0|\+84)[0-9]{9}$/i,
        msg: 'Số điện thoại không đúng định dạng',
      },
      notEmpty: {
        msg: 'Số điện thoại không được để trống',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        msg: 'Email chưa đúng định dạng',
      },
      notEmpty: {
        msg: 'Email không được để trống',
      },
    },
  },
  facebook: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  group: {
    type: DataTypes.INTEGER,
  },
  isLocked: {
    type: DataTypes.BOOLEAN,
    field: 'is_locked',
    defaultValue: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
  },
};

export default CustomerEntity;
