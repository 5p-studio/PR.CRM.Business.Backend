import { Model, ModelScopeOptions, Op, Sequelize } from 'sequelize';
import WorkEntity from '@entities/works';
import WorkInterface from '@interfaces/works';

class workModel extends Model<WorkInterface> implements WorkInterface {
   public id: number;
   public orderId:number;
   public name:string;
   public isLocked:boolean;
   public idProcess:number;
   public createdAt: Date;
   public updatedAt: Date;

   static readonly UPDATEABLE_PARAMETERS = ['orderId', 'name', 'isLocked', 'idProcess'];
   static readonly CREATABLE_PARAMETERS = ['id', 'orderId', 'name', 'isLocked', 'idProcess'];
  _previousDataValues: any;

  public static initialize (sequelize: Sequelize) {
    this.init(WorkEntity, {
      tableName: 'works',
      hooks: {
        async beforeCreate (record) {
          const changeRecord = await workModel.findAll({ where: { orderId: { [Op.gte]: record.orderId } } });
          if (changeRecord) {
            for (let index = 0; index < changeRecord.length; index++) {
              changeRecord[index].orderId++;
              changeRecord[index].save();
            }
          }
        },
        async beforeUpdate (record) {
          const orderIdNew = record.orderId;
          const orderIdOld = record._previousDataValues.orderId;
          if (orderIdNew > orderIdOld) {
            const changeRecord = await workModel.findAll({ where: { [Op.and]: [{ orderId: { [Op.gt]: orderIdOld } }, { orderId: { [Op.lte]: orderIdNew } }] } });
            for (let i = 0; i < changeRecord.length; i++) {
              changeRecord[i].orderId--;
              changeRecord[i].save({ hooks: false });
            }
          } else {
            const changeRecord = await workModel.findAll({ where: { [Op.and]: [{ orderId: { [Op.gte]: orderIdNew } }, { orderId: { [Op.lt]: orderIdOld } }] } });
            for (let i = 0; i < changeRecord.length; i++) {
              changeRecord[i].orderId++;
              changeRecord[i].save({ hooks: false });
            }
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

export default workModel;
