const InventoryModelService = require('../queries/inventoryModelService');
const OrderModelService = require('../queries/orderModelService');

/**
 * @function getInventoryByID() - getting inventory by ID
 * @param {String} id - inventory by id
 * @returns {Object, Error} - Inventory object
 */
async function getInventoryByID (id) {
	return await InventoryModelService.getInventoryByID(id)
}


/**
 * @function getAllInventories() - getting all inventories
 * @returns {Array, Error}
 */
async function getAllInventories () {
	return await InventoryModelService.getAllInventories();
}

/**
 * @function deleteInventory() - delete inventory by id
 * @param {String} id - inventory by id
 * @returns {Integer, Error}
 */
async function deleteInventory (id) {
	return InventoryModelService.deleteInventory(id);
}


/**
 * @function createInventory() - create an inventory
 * @param {Object} request - inventory request object
 * @returns {String, Error} - message
 */
async function createInventory (json) {
	return await InventoryModelService.createInventory(json)
}

/**
 * @function updateInventory() - update an inventory
 * @param {Integer} id - inventory id
 * @param {Object} json - request
 * @returns {String, Error} - message
 */
async function updateInventory (id, json) {
	return InventoryModelService.updateInventory(id, json);


}

async function adjustInventoryFromOrderCancelationRemoval (orderID) {
	let order = await OrderModelService.getOrderByID(orderID);
	if (order) {
		let inventories = order.Inventories;
		for (let inventory of inventories) {
			let quantity = inventory.quantity + inventory.OrderInventory.quantityOrdered;
			await InventoryModelService.updateInventory(inventory.id, {quantity});
		}
	}
	return;
}

/*
	EXPORTS ----------------------------------------------------------------------------
*/

const publicFunctions = {
	createInventory,
	deleteInventory,
	updateInventory,
	getAllInventories,
	getInventoryByID,
	adjustInventoryFromOrderCancelationRemoval
};

const privateFunctions = {


};



module.exports = typeof global.it !== 'function' ? publicFunctions : Object.assign(publicFunctions, privateFunctions);