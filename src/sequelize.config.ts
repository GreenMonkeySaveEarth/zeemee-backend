import dbConfig from './config/dbSetUp';

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
