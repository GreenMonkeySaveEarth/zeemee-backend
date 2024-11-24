import http from 'http';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import config from './config/config';
import logger from './logger';
import connection from './models/db';
import drinkRouter from './routes/drink';

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
	app.use('/drinks/', drinkRouter);

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
