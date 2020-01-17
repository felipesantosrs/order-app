/*
	DEPENDENCIES --------------------------------------------------------------------------------------
*/

const { assert } = require('chai');

const mockery = require('mockery');

var orderService;//load later w/mockery


/*
	DESCRIBE: SETUP/TEARDOWN WRAPPER -----------------------------------------------------------------
*/

function testSuite(testName, tests) {
	describe(testName, () => {
		//SETUP
		before(() => {
		});
		beforeEach(() => {
			mockery.enable({useCleanCache: false, warnOnUnregistered: false});
			mockery.registerSubstitute('../queries/orderModelService', '../test/mock/orderModelServiceMock');
			mockery.registerSubstitute('../queries/inventoryModelService', '../test/mock/inventoryModelServiceMock');
			mockery.registerSubstitute('../queries/orderInventoryModelService', '../test/mock/orderInventoryModelServiceMock');
			orderService = require('../services/orderService');
		});

		//TESTS
		tests();


	});
}


/*
	TESTS ------------------------------------------------------------------------------------------
*/

testSuite('getOrderByID() tests', () => {
	it('1. returns orderByID', async () => {
		const order = await orderService.getOrderByID(1)
		assert.hasAllKeys(order, ['id', 'email', 'status', 'Inventories', 'dateOrderPlaced'])
	});
	it('2. there is no order', async () => { 
		const order = await orderService.getOrderByID(100)
		assert.isUndefined(order)
	});
});//END getOrderByID() tests



testSuite('getAllOrders() tests', () => {
	it('1. returns getAllOrders', async () => {
		const inventories = await orderService.getAllOrders()
		assert.equal(2, inventories.length)
	});
});//END getAllOrders() tests



testSuite('deleteOrder() tests', () => {
	it('1. returns deleteOrder', async () => {
		const id = await orderService.deleteOrder(300)
		assert.equal(id, 300)
	});
});//END deleteOrder() tests



testSuite('createOrder() tests', () => {
	it('1. creates order with no inventory', async () => {
		const  Order  = require('./mock/orderMock');
		let order = Order.mockOrder({order:{id:1}});
		try {
			await orderService.createOrder(order);
			
		} catch (e) {
			assert.equal(e.message, 'No inventory informed on the order')
		}
	});

	it('2. creates order with inventory', async () => {
		const  Order  = require('./mock/orderMock');
		let order = Order.mockOrder({order:{id:1}});
		order.inventories = [1];
		try {
			await orderService.createOrder(order);
			
		} catch (e) {
			assert.equal(e.message, 'No inventory informed on the order')
		}
	});
});//END createOrder() tests


testSuite('updateOrder() tests', () => {
	it('1. updates order', async () => {
		let order = {email:'test@gmail.com'}
		let id = await orderService.updateOrder(1, order);
		assert.equal(id, 1)
	});
	it('2. updates order that doesnt exist', async () => {
		let order = {email:'test@gmail.com'}
		let error = await orderService.updateOrder(100, order);
		assert.equal(error, 'Order id 100 not found')
		
	});

});//END updateOrder() tests



testSuite('orderCancelation() tests', () => {
	it('1. cancelling an order', async () => {
		let id = await orderService.cancelOrder(300);
		assert.equal(id, 300)
	});

});//END orderCancelation() tests


