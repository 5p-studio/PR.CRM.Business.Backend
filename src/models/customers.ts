import { Model, ModelScopeOptions, ModelValidateOptions, Op, Sequelize, ValidationErrorItem } from 'sequelize';
import CustomerEntity from '@entities/customers';
import CustomerInterface from '@interfaces/customers';
import Employee from './employees';
import Group from './groups';
class CustomerModel extends Model<CustomerInterface> implements CustomerInterface {
  public id: number;
  public idEmployee: number;
  public firstName: string;
  public lastName: string;
  public phoneNumber: string;
  public email: string;
  public facebook: string;
  public status: string;
  public group: number;
  public isLocked: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly UPDATABLE_PARAMETERS = ['firstName', 'lastName', 'phoneNumber', 'email', 'facebook', 'status', 'group', 'isLocked'];
  static readonly CREATABLE_PARAMETERS = ['idEmployee', 'firstName', 'lastName', 'phoneNumber', 'email', 'facebook', 'status', 'group'];
  // static readonly STATUS_TYPE_ENUM = { NEW: 'Mới', PROCESSING: 'Đang xử lý', TRADED: 'Đã giao dịch', OLD: 'Cũ' };
  static readonly validation:ModelValidateOptions = {
    async uniqueEmail () {
      if (this.email) {
        const existedRecord = await CustomerModel.findOne({
          attributes: ['id'], where: { email: this.email },
        });
        if (existedRecord && existedRecord.id !== this.id) {
          throw new ValidationErrorItem('Email đã được sử dụng', 'uniqueEmail', 'email', this.value);
        }
      }
    },
    async uniquePhone () {
      if (this.phoneNumber) {
        const existedRecord = await CustomerModel.findOne({
          attributes: ['id'], where: { phoneNumber: this.phoneNumber },
        });
        if (existedRecord && existedRecord.id !== this.id) {
          throw new ValidationErrorItem('Số điện thoại đã được sử dụng', 'uniquePhone', 'phoneNumber', this.value);
        }
      }
    },
  }

  static readonly scopes: ModelScopeOptions = {
    filterStatus (keyword) {
      const whereFilter = keyword
        ? { status: keyword }
        : {};
      return { where: whereFilter };
    },

    filterEmployeeName (keyword) {
      const whereFilter = {
        model: Employee,
        as: 'employee',
        attributes: ['id', 'firstName', 'lastName'],
        where: {
          [Op.or]: [
            { firstName: { [Op.like]: `%${keyword || ''}%` } },
            { lastName: { [Op.like]: `%${keyword || ''}%` } },
          ],
        },
      };
      return { include: whereFilter };
    },

    filterGroup (keyword) {
      const whereFilter = {
        model: Group,
        attributes: ['id', 'name'],
        required: true,
        where: {
          name: { [Op.like]: `%${keyword || ''}%` },
        },
      };
      return { include: whereFilter };
    },

    includeEmployee () {
      const includeEmployee = {
        model: Employee,
        as: 'employee',
        attributes: ['id', 'firstName', 'lastName'],
        required: true,
      };
      return { include: includeEmployee };
    },

    includeGroup () {
      const includeGroup = {
        model: Group,
        attributes: ['id', 'name'],
        required: true,
      };
      return { include: includeGroup };
    },
  }

  public static initialize (sequelize: Sequelize) {
    this.init(CustomerEntity, {
      validate: CustomerModel.validation,
      scopes: CustomerModel.scopes,
      indexes: [
        { unique: true, fields: ['email'] },
        { unique: true, fields: ['phoneNumber'] },
      ],
      tableName: 'customers',
      sequelize,
    });
  }

  public static associate () {
    this.belongsTo(Employee, { as: 'employee', foreignKey: 'idEmployee' });

    Group.hasMany(this, { foreignKey: 'group' });
    this.belongsTo(Group, { foreignKey: 'group' });
  }

  public static addScopes () {
    const scopes: ModelScopeOptions = { };
    Object.keys(scopes).forEach((scopeName) => {
      this.addScope(scopeName, (scopes as any)[scopeName], { override: true });
    });
  }
}

export default CustomerModel;
