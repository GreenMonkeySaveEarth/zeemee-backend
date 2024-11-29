import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;

const config = {
	port,
	nodeEnv,
	dbStorage: process.env.DB_STORAGE,
};

export default config;
