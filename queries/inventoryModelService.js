
const { Inventory } = require('../models');


/**
 * @function getInventoryByID() - getting inventory by ID
 * @param {String} id - inventory by id
 * @returns {Object, Error} - Inventory object
 */
async function getInventoryByID (id) {
	return await Inventory.findByPk(Number.parseInt(id),{ raw: true });
}



/**
 * @function getAllInventories() - getting all inventorys
 * @returns {Array, Error}
 */
async function getAllInventories () {
	return await Inventory.findAll({ raw: true });
}

/**
 * @function deleteInventory() - delete inventory by id
 * @param {String} id - inventory by id
 * @returns {Integer, Error}
 */
async function deleteInventory (id) {
	try {
		let inventory = await Inventory.findByPk(Number.parseInt(id));
		if (!inventory) throw Error(`Inventory id ${id} not found `);
		inventory.destroy();
		return id;
	} catch (e) {
		throw (e);
	}
}

/**
 * @function createInventory() - create an inventory
 * @param {Object} request - inventory request object
 * @returns {Str ing, Error} - message
 */
async function createInventory (request) {
	try {
		let result = await Inventory.create(request);
		if (result && result.id) return result.id
		return;
	} catch (e) {
		throw (e);
	}
}

/**
 * @function updateInventory() - update an inventory
 * @param {Integer} id - inventory id
 * @param {Object} json - request
 * @returns {Str ing, Error} - message
 */
async function updateInventory (id, json) {
	try {
		let inventory = await Inventory.findByPk(Number.parseInt(id));
		if (!inventory) return `Inventory id ${inventory.id} not found`
		let result = await inventory.update(json)
		if (result && result.id) return result.id
		return;
	} catch (e) {
		throw (e)
	}
}


/*
	EXPORTS ----------------------------------------------------------------------------
*/

const publicFunctions = {
	createInventory,
	deleteInventory,
	updateInventory,
	getAllInventories,
	getInventoryByID

};

const privateFunctions = {


};



module.exports = typeof global.it !== 'function' ? publicFunctions : Object.assign(publicFunctions, privateFunctions);