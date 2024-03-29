import { DataTypes } from 'sequelize';

const EmployeeEntity = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  firstName: {
    type: DataTypes.STRING,
    field: 'first_name',
  },
  lastName: {
    type: DataTypes.STRING,
    field: 'last_name',
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
  password: {
    type: DataTypes.STRING,
  },
  salaryPerHour: {
    type: DataTypes.FLOAT,
    field: 'salary_per_hour',
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
  facebook: {
    type: DataTypes.STRING,
  },
  linkedln: {
    type: DataTypes.STRING,
  },
  skype: {
    type: DataTypes.STRING,
  },
  signatureEmail: {
    type: DataTypes.STRING,
    field: 'signature_email',
  },
  avatar: {
    type: DataTypes.STRING,
  },
  isLocked: {
    type: DataTypes.BOOLEAN,
    field: 'is_locked',
    defaultValue: false,
  },
  idRole: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_role',
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

export default EmployeeEntity;
