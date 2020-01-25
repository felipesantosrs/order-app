
const { logger } = require('../../services/loggingService');

/*
	OrderInventory MOCK ---------------------------------------------------------------------------------------------
*/

async function createOrderInventory (orID, invID, quantityOrdered ) {
	logger.info(`create order inventory ${orID} -  ${invID} - ${quantityOrdered}`);
}

/*
	EXPORTS ----------------------------------------------------------------------------
*/

const publicFunctions = {
	createOrderInventory

};

const privateFunctions = {


};





module.exports = typeof global.it !== 'function' ? publicFunctions : Object.assign(publicFunctions, privateFunctions);