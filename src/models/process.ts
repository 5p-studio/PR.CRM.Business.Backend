import { Model, ModelScopeOptions, Sequelize } from 'sequelize';
import ProcessEntity from '@entities/process';
import ProcessInterface from '@interfaces/process';

class processModel extends Model<ProcessInterface> implements ProcessInterface {
    public id: number;
    public name:string;
    public isLocked:boolean;
    public idDepartment:number;
    public createdAt: Date;
    public updatedAt: Date;
    static readonly UPDATEABLE_PARAMETERS = ['name', 'isLocked', 'idDepartment'];
    static readonly CREATABLE_PARAMETERS = ['id', 'name', 'isLocked', 'idDepartment']

    public static initialize (sequelize: Sequelize) {
      this.init(ProcessEntity, {
        tableName: 'processes',
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

export default processModel;
