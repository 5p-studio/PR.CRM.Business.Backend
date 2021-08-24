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

   public static initialize (sequelize: Sequelize) {
     this.init(WorkEntity, {
       tableName: 'works',
       // validate: workModel.validation,
       hooks: {
         async beforeSave (record) {
           const changeRecord = await workModel.findAll({ where: { orderId: { [Op.gte]: record.orderId } } });
           if (changeRecord) {
             for (let index = 0; index < changeRecord.length; index++) {
               changeRecord[index].orderId++;
               changeRecord[index].save();
             }
           }
         },
       },
       sequelize,
     });
   }

   // static readonly validation: ModelValidateOptions = {
   //   async unique () {
   //     if (this.orderId && this.idProcess) {
   //       const existedRecord = await workModel.findOne({
   //         attributes: ['id'],
   //         where: {
   //           orderId: this.orderId,
   //           idProcess: this.idProcess,
   //         },
   //       });
   //       if (existedRecord && existedRecord.id !== this.id) {
   //         // throw new ValidationErrorItem('vị trí công việc đã tồn tại', 'unique', 'err', this.value);
   //         const changeRecord = await workModel.findAll({
   //           where: {
   //             orderId: {
   //               [Op.gte]: this.orderId,
   //             },
   //           },
   //         });
   //         console.log('hihi ' + changeRecord[0].id);
   //       }
   //     }
   //   },
   // }

   public static associate () { }

   public static addScopes () {
     const scopes: ModelScopeOptions = { };
     Object.keys(scopes).forEach((scopeName) => {
       this.addScope(scopeName, (scopes as any)[scopeName], { override: true });
     });
   }
}

export default workModel;
