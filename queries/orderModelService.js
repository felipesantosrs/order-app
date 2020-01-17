
const { Order, Inventory } = require('../models');
const OrderInventoryModelService = require('../queries/orderInventoryModelService')


/**
 * @function getOrderByID() - getting ORDER by ID
 * @param {String} id - order by id
 * @returns {Object, Error} - Order object
 */
async function getOrderByID (id) {
	return await Order.findByPk(Number.parseInt(id), {
		include: [{
			model: Inventory,
			attributes: ['name', 'description', 'id', 'quantity'],
			through: {
				attributes: ['quantityOrdered']
			}
		}]});
}

/**
 * @function getAllOrders() - getting all orders
 * @returns {Array, Error}
 */
async function getAllOrders () {
	return await Order.findAll({
		include: [{
			model: Inventory,
			attributes: ['name', 'description', 'id', 'quantity'],
			through: {
				attributes: ['quantityOrdered']
			}
		}]});
}

/**
 * @function deleteOrder() - delete order by id
 * @param {String} id - order by id
 * @returns {Integer, Error}
 */
async function deleteOrder (id) {
	try {
		let order = await Order.findByPk(Number.parseInt(id));
		if (!order) throw Error('Order not found');
		await OrderInventoryModelService.deleteOrderInventory(id);
		order.destroy();
		return id;
	} catch (e) {
		throw (e);
	}
}

/**
 * @function createOrder() - create an order
 * @param {Object} request - order request object
 * @returns {String, Error} - message
 */
async function createOrder (request) {
	try {
		let result = await Order.create(
			request, 
			{
			fields:['email']}
			);
		if (result && result.id) return result.id
	} catch (e) {
		throw (e);
	}
}

/**
 * @function updateOrder() - update an order
 * @param {Integer} id - order id
 * @param {Object} json - request
 * @returns {String, Error} - message
 */
async function updateOrder (id, json) {
	try {
		let order = await Order.findByPk(Number.parseInt(id));
		if (!order) return  null;
		order.update(json);
		return id;
	} catch (e) {
		throw (e)
	}
}
/**
 * @function cancelOrder() - cancel an order
 * @param {Integer} id  - order id
 */
async function cancelOrder(id){
	let orderObject = await Order.findByPk(Number.parseInt(id));
	if (!orderObject || orderObject.status === 'C') return  null;
	orderObject.update({status: 'C'});
	return id
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