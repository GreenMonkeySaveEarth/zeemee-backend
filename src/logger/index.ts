import winston from 'winston';

const logger = winston.createLogger({
	level: 'debug',
	format: winston.format.json(),
	transports: [
		//
		// - Write all logs with importance level of `error` or less to `error.log`
		// - Write all logs with importance level of `info` or less to `combined.log`
		//
		new winston.transports.Console(),
	],
});

// Referncce the doc for different log levels

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
//

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple(),
			level: 'info',
		}),
	);
}
export default logger;
