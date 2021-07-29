import { Sequelize } from 'sequelize';

const env: any = process.env.NODE_ENV || 'development';
// eslint-disable-next-line node/no-path-concat
const config = require(`${__dirname}/../configs/database`)[env];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const models: any = [

];

models.forEach((model :any) => {
  model.initialize(sequelize);
});

models.forEach((model :any) => {
  model.associate();
});

models.forEach((model :any) => {
  model.addScopes();
});

export default sequelize;
