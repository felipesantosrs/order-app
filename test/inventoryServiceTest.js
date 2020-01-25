/*
	DEPENDENCIES --------------------------------------------------------------------------------------
*/

const { assert } = require('chai');

const mockery = require('mockery');

var inventoryService;//load later w/mockery



/*
	DESCRIBE: SETUP/TEARDOWN WRAPPER -----------------------------------------------------------------
*/

function testSuite(testName, tests) {
	describe(testName, () => {
		//SETUP
		before(() => {
		});

		beforeEach(() => {
			mockery.enable({useCleanCache: true, warnOnUnregistered: false});
			mockery.registerSubstitute('../queries/inventoryModelService', '../test/mock/inventoryModelServiceMock');
			inventoryService = require('../services/inventoryService');
		});

		//TESTS
		tests();


	});
}


/*
	TESTS ------------------------------------------------------------------------------------------
*/

testSuite('getInventoryByID() tests', () => {
	it('1. returns inventoryByID', async () => {
		const inventory = await inventoryService.getInventoryByID(10);
		assert.hasAllKeys(inventory, ['id', 'description', 'name', 'price','quantity']);
	});
	it('2. there is no inventory', async () => {
		const inventory = await inventoryService.getInventoryByID(100);
		assert.isUndefined(inventory);
	});
});//END getInventoryByID() tests



testSuite('getAllInventories() tests', () => {
	it('1. returns getAllInventories', async () => {
		const inventories = await inventoryService.getAllInventories();
		assert.equal(2, inventories.length);
	});
});//END getAllInventories() tests




testSuite('deleteInventory() tests', () => {
	it('1. returns deleteInventory', async () => {
		const id = await inventoryService.deleteInventory(1);
		assert.equal(id, 1);
	});
	it('2. there is no inventory', async () => {
		const id = await inventoryService.deleteInventory(100);
		assert.isUndefined(id);
	});
});//END deleteInventory() tests



testSuite('createInventory() tests', () => {
	it('1. creates inventory', async () => {
		const  Inventory  = require('../test/mock/inventoryMock');
		let inventory = Inventory.mockInventory({inventory:{id:1}});
		try {
			await inventoryService.createInventory(inventory);
		} catch (e) {
			assert.isTrue(false);
		}
	});

});//END createInventory() tests


testSuite('updateInventory() tests', () => {
	it('1. updates inventory', async () => {
		let inventory = {price:20.00};
		let id = await inventoryService.updateInventory(1, inventory);
		assert.equal(id, 1);
	});
	it('2. updates inventory that doesnt exist', async () => {
		let inventory = {price:20.00};
		let error = await inventoryService.updateInventory(100, inventory);
		assert.equal(error, 'Inventory id 100 not found');
		
	});

});//END updateInventory() tests



