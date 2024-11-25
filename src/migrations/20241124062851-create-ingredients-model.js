'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable('ingredients', {
			id: {
				type: Sequelize.STRING,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			drinkId: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'drinks',
					key: 'id',
				},
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			measurement: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.dropTable('ingredients');
	},
};
