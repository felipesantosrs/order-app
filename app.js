/*
	DEPENDENCIES -----------------------------------------------------------------------------------------------------------------------------
*/

const express = require('express')
const app = express()
const sls = require('serverless-http');



/*
	ROUTES -----------------------------------------------------------------------------------------------------------------------------------
*/



//include inventory route file
const inventoryRoutes = require('./routes/inventoryRoutes').inventoryRoutes;
//include inventory route file
const orderRoutes = require('./routes/orderRoutes').orderRoutes;

app.use('/inventories', inventoryRoutes);
app.use('/orders', orderRoutes);


app.get('/', (req, res) => {
	res.json({ message: 'Express API Powered by AWS Lambda!' });
})
/*
	SETUP & EXPORTS ---------------------------------------------------------------------------------------------------------------------------
*/
// app.js

module.exports.server = sls(app)

/*
//Run the app on port 3000
if(typeof global.it !== 'function') {
	//check if we are on the right version of nodeJS
	var engineName = process.title, engineVersion = process.version;
	if((!engineName.includes('node') && !engineName.includes('npm')) || engineVersion.replace(/v/, '').split('.')[0] < 7) {
		throw 'NodeJS Order App only works on NodeJS v7.6.0 & greater. Please update NodeJS environment to continue. Easiest technique: http://davidwalsh.name/upgrade-nodejs';
	}

	//listen
	try {
		
		const server = app.listen(port).on('listening', () => {
			logger.info(`NodeJS Order App on port ${server.address().port}`);
		});
	} catch(e) {
		logger.error(e);
	}
	process.on('unhandledRejection', (reason, p) => {
		logger.error(`Unhandled Rejection at: ${util.inspect(p, { compact: true, depth: 5, breakLength: 80 })} reason: ${reason}`);
	});
} else {//for testing
	module.exports = app;
}
*/
