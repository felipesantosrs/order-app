/*
	DEPENDENCIES -----------------------------------------------------------------------------------------------------------------------------
*/

const express = require('express');
const app = express();

const {logger} = require('./services/loggingService');

const port = 3000

/*
	ROUTES -----------------------------------------------------------------------------------------------------------------------------------
*/

//include routes files

//include inventory route file
const inventoryRoutes = require('./routes/inventoryRoutes').inventoryRoutes;
//include inventory route file
const orderRoutes = require('./routes/orderRoutes').orderRoutes;

app.use('/inventories', inventoryRoutes);
app.use('/orders', orderRoutes);



/*
	SETUP & EXPORTS ---------------------------------------------------------------------------------------------------------------------------
*/

//Run the app on port 3000
if(typeof global.it !== 'function') {
	//check if we are on the right version of nodeJS
	var engineName = process.title, engineVersion = process.version;
	if((!engineName.includes('node') && !engineName.includes('npm')) || engineVersion.replace(/v/, '').split('.')[0] < 7) {
		throw 'Order API application only works on NodeJS v7.6.0 & greater. Please update NodeJS environment to continue. Easiest technique: http://davidwalsh.name/upgrade-nodejs';
	}

	//listen
	const server = app.listen(port).on('listening', () => {
		logger.info(`Order API listening on port ${server.address().port}`);
	});
} else {//for testing
	module.exports = app;
}