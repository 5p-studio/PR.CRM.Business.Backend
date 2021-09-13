import { Model, ModelScopeOptions, Sequelize } from 'sequelize';
import GroupEntity from '@entities/groups';
import GroupInterface from '@interfaces/groups';

class GroupModel extends Model<GroupInterface> implements GroupInterface {
  public id: number;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  public static initialize (sequelize: Sequelize) {
    this.init(GroupEntity, {
      tableName: 'groups',
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

export default GroupModel;
