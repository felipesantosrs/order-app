
/*
	mockOrderInventory MOCK ---------------------------------------------------------------------------------------------
*/


function mockOrderInventory(testData) {
	try {
		let orderInventory = {
			id: testData.hasOwnProperty('orderId') ? testData.orderID : 1,
			email: testData.hasOwnProperty('inventoryId') ? testData.inventoryId : 1
		
		};
		return orderInventory;
	} catch(e) {
		throw e;
	}
}


/*
	EXPORTS ----------------------------------------------------------------------------
*/

module.exports = mockOrderInventory;