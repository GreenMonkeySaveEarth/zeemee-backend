import Drink from '@/models/drink';

class DrinkController {
	public async getAllDrinks(_req: any, res: any) {
		try {
			const drinks = await Drink.findAll();
			res.status(200).send(drinks);
		} catch (error) {
			res.status(500).send('Internal Server Error');
		}
	}
	public async getDrinkById(req: any, res: any) {
		try {
			const drink = await Drink.findByPk(req.params.id);
			res.status(200).send(drink);
		} catch (error) {
			res.status(500).send('Internal Server Error');
		}
	}

	public async queryDrinks(req: any, res: any) {
		try {
			const drinks = await Drink.findAll({
				where: req.body,
			});
			res.status(200).send(drinks);
		} catch (error) {
			res.status(500).send('Internal Server Error');
		}
	}
}

export default new DrinkController();
