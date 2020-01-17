
const { OrderInventory, Order, Inventory } = require('../models');


OrderInventory.removeAttribute('id')
Order.belongsToMany(Inventory, { through: OrderInventory, foreignKey: 'orderId' });
Inventory.belongsToMany(Order, { through: OrderInventory, foreignKey: 'inventoryId' });

/**
 * @function createOrderInventory() - create an order inventory
 * @param {Integer} orID 
 * @param {Integer} invID 
 * @param {Integer} quantityOrdered
 * @returns {null, Error} 
 */
async function createOrderInventory (orID, invID, quantityOrdered ) {
	try {
		await OrderInventory.create({orderId: orID, inventoryId: invID, quantityOrdered: quantityOrdered});
	} catch (e) {
		throw (e);
	}
}


/**
 * @function deleteOrderInventory() - delete deleteOrderInventory by id
 * @param {String} id - inventory by id
 * @returns {Integer, Error}
 */
async function deleteOrderInventory (id) {
		return OrderInventory.destroy({
			where: {
				orderId: id
			}})

}


/*
	EXPORTS ----------------------------------------------------------------------------
*/

const publicFunctions = {
	createOrderInventory,
	deleteOrderInventory

};

const privateFunctions = {


};



module.exports = typeof global.it !== 'function' ? publicFunctions : Object.assign(publicFunctions, privateFunctions);