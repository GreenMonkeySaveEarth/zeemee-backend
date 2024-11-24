import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
	dialect: 'sqlite',
	logging: console.log,
	storage: '/Users/chang-yunglin/Documents/zeewee-db',
});

export default sequelize;
