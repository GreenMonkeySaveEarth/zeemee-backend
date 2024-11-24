import { UUID } from 'crypto';
import { DataTypes, Model } from 'sequelize';
import sequelize from './db';

export interface IIngredient {
	id: UUID;
	drinkId: UUID;
	name: string;
	measurement: string;
}

class Ingredient extends Model {
	public id!: UUID;
	public drinkId!: UUID;
	public name!: string;
	public measurement!: string;
}

// ToDo: need to update the model schema
Ingredient.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		drinkId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		measurement: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Ingredient',
		tableName: 'ingredients', // Make sure this matches your table name
	},
);

export default Ingredient;
