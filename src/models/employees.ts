import { Model, ModelScopeOptions, ModelValidateOptions, Sequelize, ValidationErrorItem } from 'sequelize';
import EmployeeEntity from '@entities/employees';
import EmployeeInterface from '@interfaces/employees';
const bcrypt = require('bcrypt');

class EmployeeModel extends Model<EmployeeInterface> implements EmployeeInterface {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public salaryPerHour: number;
  public phoneNumber: string;
  public facebook: string;
  public linkedln: string;
  public skype: string;
  public signatureEmail: string;
  public avatar: string;
  public isLocked: boolean;
  public idRole: number;
  public idDepartment: number;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly UPDATABLE_PARAMETERS = ['firstName', 'lastName', 'email', 'password', 'salaryPerHour', 'phoneNumber', 'facebook', 'linkedln', 'skype', 'signatureEmail', 'avatar', 'isLocked', 'idRole', 'idDepartment'];
  static readonly CREATABLE_PARAMETERS = ['firstName', 'lastName', 'email', 'password', 'salaryPerHour', 'phoneNumber', 'facebook', 'linkedln', 'skype', 'signatureEmail', 'avatar', 'idRole', 'idDepartment'];

  static readonly validation: ModelValidateOptions = {
    async uniquePhoneNumber () {
      if (this.phoneNumber) {
        const existedRecord = await EmployeeModel.findOne({
          attributes: ['id'], where: { phoneNumber: this.phoneNumber },
        });

        if (existedRecord && existedRecord.id !== this.id) {
          throw new ValidationErrorItem('Số điện thoại đã được sử dụng', 'uniquePhoneNumber', 'phoneNumber', this.value);
        }
      }
    },

    async uniqueEmail () {
      if (this.email) {
        const existedRecord = await EmployeeModel.findOne({
          attributes: ['id'], where: { email: this.email },
        });

        if (existedRecord && existedRecord.id !== this.id) {
          throw new ValidationErrorItem('Email đã được sử dụng', 'uniqueEmail', 'email', this.value);
        }
      }
    },
  }

  public static initialize (sequelize: Sequelize) {
    this.init(EmployeeEntity, {
      tableName: 'employees',
      validate: EmployeeModel.validation,
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
        {
          unique: true,
          fields: ['phoneNumber'],
        },
      ],
      hooks: {
        beforeSave (record) {
          console.log(record.password);
          console.log(record.previous('password'));
          if (record.password && record.password !== record.previous('password')) {
            const salt = bcrypt.genSaltSync();
            record.password = bcrypt.hashSync(record.password, salt);
          }
        },
      },
      sequelize,
    });
  }

  public static associate () { }

  public static addScopes () {
    const scopes: ModelScopeOptions = { };
    Object.keys(scopes).forEach((scopeName) => {
      this.addScope(scopeName, (scopes as any)[scopeName], { override: true });
    });
  }
}

export default EmployeeModel;
