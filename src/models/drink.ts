import { UUID } from 'crypto';
import { DataTypes, Model } from 'sequelize';
import sequelize from './db';
import Ingredient from './ingredient';

export interface IDrink {
	id: UUID;
	name: string;
	category: string;
	container: string;
	instructions: string;
	image: string;
	ingredients: string[];
}

class Drink extends Model {
	public id!: UUID;
	public name!: string;
	public category!: string;
	public container!: string;
	public instructions!: string;
	public image!: string;
}

Drink.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		container: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		instructions: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		modelName: 'Drink',
		tableName: 'drinks', // Make sure this matches your table name
	},
);
Drink.hasMany(Ingredient, {
	sourceKey: 'id',
	foreignKey: 'drinkId',
});

export default Drink;
