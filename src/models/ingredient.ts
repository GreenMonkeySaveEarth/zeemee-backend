import { UUID } from 'crypto';
import { DataTypes, Model } from 'sequelize';
import sequelize from './db';

export interface IIngredient {
	id: UUID;
	drinkId: UUID;
	name: string;
	measurement: string;
	createdAt: Date;
	updatedAt: Date;
}

class Ingredient extends Model {
	public id!: UUID;
	public drinkId!: UUID;
	public name!: string;
	public measurement!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
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
			references: {
				model: 'drinks',
				key: 'id',
			},
			onDelete: 'CASCADE', // Add this line to handle cascade delete
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		measurement: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		modelName: 'Ingredient',
		tableName: 'ingredients', // Make sure this matches your table name
	},
);

export default Ingredient;
