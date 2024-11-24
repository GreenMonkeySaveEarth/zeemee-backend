require('module-alias/register');
import dotenv from 'dotenv';
import logger from './logger';
import { startServer } from './server';

// Load environment variables
dotenv.config();

// Start the server
startServer().catch((error) => {
	logger.error('Error in starting application', error);
});
