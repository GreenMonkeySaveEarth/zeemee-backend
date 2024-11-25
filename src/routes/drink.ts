/**
 * @file drink.ts
 * @description This file contains the routes for drink-related operations.
 * It uses Express.js for routing and includes rate limiting middleware.
 */

import express from 'express';
import drinkController from '@/controller/DrinkController';
import { createRateLimitMiddleware } from '../middleWare/rateLimitMiddleware';

const router = express.Router();
const useRateLimiter = createRateLimitMiddleware({
	windowMs: 15 * 60 * 1000,
	max: 100,
});

/**
 * GET /search
 * @summary Searches for drinks based on query parameters.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {void}
 * @throws {Error} If there is an error during the search operation.
 * @description This route handles searching for drinks. It does not use rate limiting.
 */
router.get('/search', (req, res) => {
	drinkController.searchDrinks(req, res).catch((error: any) => {
		res.status(500).send(error.message);
	});
});

/**
 * GET /:id
 * @summary Retrieves a drink by its ID.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @returns {void}
 * @throws {Error} If there is an error during the retrieval operation.
 * @description This route handles retrieving a specific drink by its ID. It uses rate limiting to prevent abuse.
 */
router.get('/:id', useRateLimiter, (req, res) => {
	drinkController.getDrinkById(req, res).catch((error) => {
		res.status(500).send(error.message);
	});
});

/**
 * @description The search endpoint is placed above the :id endpoint to avoid conflicts.
 * If the :id endpoint were placed first, it could mistakenly interpret 'search' as an ID.
 */

export default router;
