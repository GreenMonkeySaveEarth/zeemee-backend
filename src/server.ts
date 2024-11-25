import http from 'http';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import config from './config/config';
import logger from './logger';
import connection from './models/db';
import drinkRouter from './routes/drink';

/**
 * Starts the Express server.
 *
 * This function initializes the Express application, sets up middleware,
 * configures routes, connects to the database, and starts the HTTP server.
 * It also handles graceful shutdown on receiving a SIGTERM signal.
 *
 * @returns {Promise<void>} A promise that resolves when the server is started.
 *
 * @throws Will throw an error if there is an issue synchronizing the database.
 *
 * @example
 * startServer().then(() => {
 *   console.log('Server started successfully');
 * }).catch((error) => {
 *   console.error('Failed to start server:', error);
 * });
 */
export async function startServer(): Promise<void> {
	// Initialize the express app
	const app = express();
	const httpServer = http.createServer(app);

	// Middleware setup
	app.use(cors());
	app.use(helmet());
	app.use(express.json()); // For parsing application/json
	app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

	// Routes setup
	app.use('/api/drinks', drinkRouter);

	// Database connection
	try {
		logger.info('Database connecting');
		await connection.sync({ alter: process.env.NODE_ENV === 'local' });
		logger.info('Database synchronized');
	} catch (error) {
		logger.error('Error synchronizing the database:', error);
		throw error;
	}

	// Start the server
	httpServer.listen(config.port, () => {
		logger.info(`c http://localhost:${config.port}`);
	});

	// Graceful shutdown
	process.on('SIGTERM', () => {
		logger.info('SIGTERM signal received: closing HTTP server');
		httpServer.close(() => {
			logger.info('HTTP server closed');
		});
	});
}
