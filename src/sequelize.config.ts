import dbConfig from './models/db';

const config = {
	local: {
		...dbConfig,
	},
	development: {
		...dbConfig,
	},
	test: {
		...dbConfig,
	},
	production: {
		...dbConfig,
	},
};

export default config;
