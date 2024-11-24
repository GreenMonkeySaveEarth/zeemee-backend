import express from 'express';
import drinkController from '@/controller/DrinkController';
import { createRateLimitMiddleware } from '../middleWare/rateLimitMiddleware';

const router = express.Router();
const useRateLimiter = createRateLimitMiddleware({
	windowMs: 15 * 60 * 1000,
	max: 100,
});

router.get('/all', useRateLimiter, async (req, res) => {
	await drinkController.getAllDrinks(req, res);
});

router.get('/:id', useRateLimiter, async (req, res) => {
	await drinkController.getDrinkById(req, res);
});

router.post('/query', useRateLimiter, async (req, res) => {
	await drinkController.queryDrinks(req, res);
});

export default router;
