/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

('use strict');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		const filePath = path.join(
			__dirname,
			'..',
			'..',
			'data',
			'cocktail_recipes.json',
		);
		const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

		for (const recipe of data) {
			const { ingredients, ...drinkData } = recipe;
			// Auto-generate a UUID for each drink since we're using UUIDs as primary keys and sqlite doesn't support UUIDs
			const id = uuidv4();
			const drinkId = await queryInterface.bulkInsert(
				'Drinks',
				[{ ...drinkData, id }],
				{ returning: true },
			);
			if (ingredients && ingredients.length > 0) {
				const ingredientData = ingredients.map((ingredient) => ({
					id: uuidv4(),
					...ingredient,
					drinkId: id,
				}));

				await queryInterface.bulkInsert('Ingredients', ingredientData, {});
			}
		}
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('Drinks', null, {});
		await queryInterface.bulkDelete('Ingredients', null, {});
	},
};
