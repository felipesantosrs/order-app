
const  Inventory  = require('../mock/inventoryMock');
const { logger } = require('../../services/loggingService');

/*
	OrderInventory MOCK ---------------------------------------------------------------------------------------------
*/



function getInventoryByID(idInv) {
	if (idInv === 100){
		return;
	} else {
		return Inventory.mockInventory({inventory:{id:idInv}})
	}
}
function getAllInventories() {
	let inventories = [];
	inventories.push(Inventory.mockInventory({inventory:{id:1}}))
	inventories.push(Inventory.mockInventory({inventory:{id:2}}))
	return inventories;
}


function deleteInventory(id) {
	if (id === 100){
		return;
	} else {
		return id;
	}
}

function updateInventory(id, json) {
	if (id === 100){
		return `Inventory id ${id} not found`;
	} else {
		return id;
	}
}

function adjustInventoryFromOrderCancelationRemoval () {
	logger.info('Changed the inventory quantity');
}

function createInventory(json) {
	return json;
}


/*
	EXPORTS ----------------------------------------------------------------------------
*/

const publicFunctions = {
	getInventoryByID,
	getAllInventories,
	deleteInventory,
	updateInventory,
	createInventory,
	adjustInventoryFromOrderCancelationRemoval

};

const privateFunctions = {


};





module.exports = typeof global.it !== 'function' ? publicFunctions : Object.assign(publicFunctions, privateFunctions);