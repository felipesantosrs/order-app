const OrderModelService = require('../queries/orderModelService');

const InventoryModelService = require('../queries/inventoryModelService');

const InventoryService = require('../services/InventoryService');

const OrderInventoryModelService = require('../queries/orderInventoryModelService');



/**
 * @function getOrderByID() - getting ORDER by ID
 * @param {String} id - order by id
 * @returns {Object, Error} - Order object
 */
async function getOrderByID (id) {
	return await OrderModelService.getOrderByID(id);
}


/**
 * @function getAllOrders() - getting all orders
 * @returns {Array, Error}
 */
async function getAllOrders () {
	return await OrderModelService.getAllOrders();
}

/**
 * @function deleteOrder() - delete order by id
 * @param {String} id - order by id
 * @returns {Integer, Error}
 */
async function deleteOrder (id) {
	try {
		await InventoryService.adjustInventoryFromOrderCancelationRemoval(id);
		await OrderModelService.deleteOrder(id);
		return id;
	} catch (error) {
		throw error;
	}
}

/**
 * @function cancelOrder() - cancel an order by id
 * @param {String} id - order by id
 * @returns {Integer, Error}
 */
async function cancelOrder (id) {
	try {
		await InventoryService.adjustInventoryFromOrderCancelationRemoval(id);
		return await OrderModelService.cancelOrder(id);
	} catch (error) {
		throw error;
	}
}


/**
 * @function createOrder() - create an order
 * @param {Object} request - order request object
 * @returns {String, Error} - message
 */
async function createOrder (request) {
	try {
		let warning = [];
		if (!request.inventories) throw Error('No inventory informed on the order');

		let mapInventoryItems = sumItems(request.inventories);
		let inventoryItem = [...new Set(request.inventories)];
		let includeOrder = false;
		let orderID;
		for(let inventoryID of inventoryItem) {
			let inventory = await InventoryModelService.getInventoryByID(inventoryID);
			let quantityOrdered = mapInventoryItems.get(inventoryID);
			if (inventory) {
				let remanescent =  inventory.quantity - quantityOrdered;
				if (remanescent >= 0) {
					await InventoryModelService.updateInventory(inventoryID, {quantity:remanescent});
					if (!includeOrder){
						includeOrder = true;
						orderID = await OrderModelService.createOrder(request);
					}
					if (orderID){
						await OrderInventoryModelService.createOrderInventory(orderID, inventoryID, quantityOrdered);
					}
				}	else {
					warning.push(`Inventory ID ${inventoryID} removed from the order, there is not quantity available `);
				}
			} else {
				warning.push(`Inventory ID ${inventoryID} not found `);
			}
		}
		if (!includeOrder) {
			return `Order has not created due to following errors: (${warning})`;
		}
		let order = await OrderModelService.getOrderByID(orderID);
		return { order, 
			warning, 
			message:'Order created sucessfull'
		};
	} catch (error) {
		throw error;	
	}
}
/**
 * @function sumItems - sum the inventory item by ID
 * @param {List} inventoryIDs 
 * @returns {Map}
 */
function sumItems(inventoryIDs) {
	return inventoryIDs.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

}

/**
 * @function updateOrder() - update an order
 * @param {Integer} id - order id
 * @param {Object} json - request
 * @returns {String, Error} - message
 */
async function updateOrder (id, json) {
	return await OrderModelService.updateOrder(id, json);
}





/*
	EXPORTS ----------------------------------------------------------------------------
*/

const publicFunctions = {
	createOrder,
	deleteOrder,
	updateOrder,
	getAllOrders,
	getOrderByID,
	cancelOrder

};

const privateFunctions = {


};



module.exports = typeof global.it !== 'function' ? publicFunctions : Object.assign(publicFunctions, privateFunctions);