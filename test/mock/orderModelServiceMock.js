
const  Order  = require('../mock/OrderMock');
const  Inventory  = require('../mock/InventoryMock');

/*
	Order MOCK ---------------------------------------------------------------------------------------------
*/



function getOrderByID(idInv) {
	if (idInv === 100){
		return;
	} else if (idInv === 300) { 
		let order =  Order.mockOrder({order:{id:idInv}});
		order.Inventories = [];
		order.Inventories.push(Inventory.mockInventory({id:1, quantityOrdered:2 }));
		order.Inventories.push(Inventory.mockInventory({id:2, quantityOrdered:5 }));
		return order;
	} else {
		let order =  Order.mockOrder({order:{id:idInv}});
		order.Inventories = [];
		order.Inventories.push(Inventory.mockInventory({Inventory:{id:1}}));
		order.Inventories.push(Inventory.mockInventory({Inventory:{id:2}}));
		return order;
	}
}
function getAllOrders() {
	let Inventories = [];
	Inventories.push(Order.mockOrder({order:{id:1}}));
	Inventories.push(Order.mockOrder({order:{id:2}}));
	return Inventories;
}


function deleteOrder(id) {
	if (id === 100){
		return;
	} else {
		return id;
	}
}

function updateOrder(id) {
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
	return updateOrder(id);
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