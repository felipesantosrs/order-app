
/*
	OrderInventory MOCK ---------------------------------------------------------------------------------------------
*/


function mockInventory(testData) {
	try {
		let inventory = {
			id: testData.hasOwnProperty('id') ? testData.id : 1,
			description: testData.hasOwnProperty('description') ? testData.description : 'Sativa-dominant Free Oil has little to minimal THC potency, and the CBD is CO2 extracted and formulated with MCT oil',
			name: testData.hasOwnProperty('name') ? testData.name : 'Free Oil',
			price: testData.hasOwnProperty('price') ? testData.dateOrderPlaced : 10.50,
			quantity:testData.hasOwnProperty('quantity') ? testData.quantity  : 10
		};
	
		if (testData.quantityOrdered){
			inventory.OrderInventory = {'quantyOrdered': testData.quantyOrdered};
		}
		return inventory;
	} catch(e) {
		throw e;
	}
}
/*
EXPORTS ----------------------------------------------------------------------------
*/

const publicFunctions = {
	mockInventory

};

const privateFunctions = {


};



module.exports = typeof global.it !== 'function' ? publicFunctions : Object.assign(publicFunctions, privateFunctions);