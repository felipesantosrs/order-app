/*
	DEPENDENCIES &  SETUP --------------------------------------------------------------------------------
*/

const { createLogger, format, transports } = require('winston');


/*
	LOGGER ---------------------------------------------------------------------------------------------
*/

const logger = createLogger({
	transports: [
		new transports.Console({
			level: 'info',
			format: format.simple()
		}),
	],
});

/*
	EXPORTS ----------------------------------------------------------------------------
*/

module.exports = { logger};