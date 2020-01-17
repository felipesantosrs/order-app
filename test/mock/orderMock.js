
/*
	Order MOCK ---------------------------------------------------------------------------------------------
*/


function mockOrder(testData) {
	try {
		let order = {
			id: testData.hasOwnProperty('id') ? testData.id : 1,
			email: testData.hasOwnProperty('email') ? testData.email : 'test@gmail.com',
			dateOrderPlaced: testData.hasOwnProperty('dateOrderPlaced') ? testData.dateOrderPlaced : '2020-01-15 19:04:52',
			status:testData.hasOwnProperty('status') ? testData.status : 'A'
		};
		return order;
	} catch(e) {
		throw e;
	}
}


/*
	EXPORTS ----------------------------------------------------------------------------
*/


const publicFunctions = {
	mockOrder

};

const privateFunctions = {


};



module.exports = typeof global.it !== 'function' ? publicFunctions : Object.assign(publicFunctions, privateFunctions);