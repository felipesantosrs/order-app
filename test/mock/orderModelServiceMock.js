
const  Order  = require('../mock/OrderMock');
const  Inventory  = require('../mock/InventoryMock');

/*
	Order MOCK ---------------------------------------------------------------------------------------------
*/



function getOrderByID(idInv) {
	if (idInv === 100){
		return;
	} else {
		let order =  Order.mockOrder({order:{id:idInv}})
		order.inventories = [];
		order.inventories.push(Inventory.mockInventory({Inventory:{id:1}}));
		order.inventories.push(Inventory.mockInventory({Inventory:{id:2}}));
		return order;
	}
}
function getAllOrders() {
	let inventories = [];
	inventories.push(Order.mockOrder({order:{id:1}}))
	inventories.push(Order.mockOrder({order:{id:2}}))
	return inventories;
}


function deleteOrder(id) {
	if (id === 100){
		return;
	} else {
		return id;
	}
}

function updateOrder(id, json) {
	if (id === 100){
		return `Order id ${id} not found`;
	} else {
		return id;
	}
}

function createOrder(json) {
	return json;
}

 function cancelOrder (id) {
	return updateOrder(id, {status:'C'});
}

/*
	EXPORTS ----------------------------------------------------------------------------
*/

const publicFunctions = {
	getOrderByID,
	getAllOrders,
	deleteOrder,
	updateOrder,
	createOrder,
	cancelOrder

};

const privateFunctions = {


};





module.exports = typeof global.it !== 'function' ? publicFunctions : Object.assign(publicFunctions, privateFunctions);