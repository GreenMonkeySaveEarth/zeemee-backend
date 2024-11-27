import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Drink from '@/models/drink';

class DrinkController {
	/**
	 * Retrieves a drink by its ID.
	 *
	 * @param req - The request object containing the drink ID in the parameters.
	 * @param res - The response object used to send the retrieved drink.
	 * @returns A promise that resolves to void.
	 *
	 * @remarks
	 * This method uses the `findByPk` method of the `Drink` model to fetch the drink
	 * with the specified ID from the database. If the drink is found, it sends the drink
	 * object with a status code of 200. If the drink is not found, it will send a 404 status code.
	 *
	 */
	public async getDrinkById(req: Request, res: Response): Promise<void> {
		const drinkId = req.query.id as string;
		if (!drinkId) {
			res.status(400).send('ID is required');
		} else {
			const drink = await Drink.findByPk(drinkId, {
				include: ['ingredients'],
			});
			res.status(200).send({ drinks: [drink] });
		}
	}

	/**
	 * Handles the search for drinks based on a query string.
	 *
	 * This method retrieves a list of drinks from the database that match the search query.
	 * It supports pagination through the `index` and `limit` query parameters.
	 *
	 * @param req - The HTTP request object, containing query parameters:
	 *   - `index` (optional): The starting index for pagination (default is 0).
	 *   - `limit` (optional): The maximum number of results to return (default is 10).
	 *   - `query` (optional): The search query string to filter drinks by name.
	 * @param res - The HTTP response object used to send back the list of drinks.
	 *
	 * @returns A promise that resolves to void. The response contains a status code of 200
	 * and the list of drinks that match the search criteria.
	 *
	 * @example
	 * // Example request:
	 * // GET /searchDrinks?index=0&limit=10&query=cola
	 *
	 * // Example response:
	 * // HTTP/1.1 200 OK
	 * // [
	 * //   { "id": 1, "name": "Coca Cola", ... },
	 * //   { "id": 2, "name": "Pepsi Cola", ... }
	 * // ]
	 */
	public async searchDrinks(req: Request, res: Response): Promise<void> {
		const index = parseInt(req.query.index as string) || 0;
		const limit = parseInt(req.query.limit as string) || 10;
		const query = (req.query.query as string) || '';

		const whereClause = query
			? {
					name: {
						[Op.like]: `%${query}%`,
					},
				}
			: {};

		const { count, rows } = await Drink.findAndCountAll({
			where: whereClause,
			include: ['ingredients'],
			offset: index,
			limit: limit,
			distinct: true,
			order: [['name', 'ASC']],
		});
		res.status(200).send({ totalCount: count, drinks: rows });
	}
}

export default new DrinkController();
