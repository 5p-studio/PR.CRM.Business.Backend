import { Model, ModelScopeOptions, Op, Sequelize } from 'sequelize';
import EmployeeEntity from '@entities/employees';
import EmployeeInterface from '@interfaces/employees';

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

  static readonly scopes: ModelScopeOptions = {
    byKeyword (keyword) {
      const whereCondition = keyword
        ? {
            [Op.or]: [
              { name: { [Op.like]: `%${keyword || ''}%` } },
              { shortName: { [Op.like]: `%${keyword || ''}%` } },
            ],
          }
        : {};
      return { where: whereCondition };
    },
  }

  public static initialize (sequelize: Sequelize) {
    this.init(EmployeeEntity, {
      scopes: EmployeeModel.scopes,
      tableName: 'employees',
      sequelize,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
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