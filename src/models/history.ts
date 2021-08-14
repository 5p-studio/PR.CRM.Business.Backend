import { Model, ModelScopeOptions, Sequelize } from 'sequelize';
import HistoryEntity from '@entities/history';
import HistoryInterface from '@interfaces/history';

class HistoryModel extends Model<HistoryInterface> implements HistoryInterface {
  public id: number;
  public interactiveObject: string;
  public action: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly UPDATABLE_PARAMETERS = ['interactiveObject', 'action'];
  static readonly ACTION_TYPE_ENUM = { INSERT: 'insert', UPDATE: 'update', DELETE: 'delete' };
  public static initialize (sequelize: Sequelize) {
    this.init(HistoryEntity, {
      tableName: 'history',
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

export default HistoryModel;
