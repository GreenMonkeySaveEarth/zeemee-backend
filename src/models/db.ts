import { Sequelize } from 'sequelize';
import config from '../config/config';

const sequelize = new Sequelize({
	dialect: 'sqlite',
	logging: console.log,
	storage: config.dbStorage,
});

export default sequelize;
