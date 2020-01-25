/*
	DEPENDENCIES ----------------------------------------------------------------------------------------------------------------------------
*/

const express = require('express');
const inventoryRoutes = express.Router();

const bodyParser = require('body-parser');


const {logger} = require('../services/loggingService');


inventoryRoutes.use(bodyParser.json({limit: '5mb'}));



inventoryRoutes.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

//convert query params to lowercase
inventoryRoutes.use((req, res, next) => {
	for(var key in req.query) {
		req.query[key.toLowerCase()] = req.query[key];
	}
	next();
});

const InventoryService = require('../services/inventoryService');


/*
	EXTERNAL ROUTES --------------------------------------------------------------------------------------------------------------------------------------------
*/

/**
	* @name inventories
	* @route {POST} - creates a new inventory
	* @req.body - inventory json
	* @returns {String} - [message]
*/
inventoryRoutes.post('/', async (req, res) => {
	try {
		if (req && req.body) {
			let id = await InventoryService.createInventory(req.body);
			return res.status(200).json(new Message(`Inventory id ${id} created`));
		}
		return res.status(400).json(new Message('Request Invalid'));

	}   catch(e) {
		logger.error(e.stack);
		return res.status(400).json(e);//something went wrong, log error & sent to client
	}
});

/**
	* @name inventories/:id
	* @route {POST} - updates an inventory
	* @returns {String} - [message]
*/
inventoryRoutes.put('/:id', async (req, res) => {
	try {
		let id = await InventoryService.updateInventory(req.params.id , req.body);
		if (id){
			return res.status(200).json(new Message(`Inventory id ${id} updated`));
		}
		return res.status(200).json(new Message(`Inventory id ${id} not found`));
	}   catch(e) {
		logger.error(e.stack);
		return res.status(400).json(e);//something went wrong, log error & sent to client
	}
});

/**
	* @name inventories
	* @route {GET} - gets all Inventory
	* @returns {List} - list all inventories
*/
inventoryRoutes.get('/', async (req, res) => {
	try {
		let result = await InventoryService.getAllInventories();
		return res.status(200).json(result);
	} catch(e) {
		logger.error(e.stack);
		return res.status(400).json(e);//something went wrong, log error & sent to client
	}
});

/**
	* @name inventories/:id
	* @route {DELETE} - delete an inventory by id
	* @returns {List} - list all inventories
*/
inventoryRoutes.delete('/:id', async (req, res) => {
	try {
		let id = await InventoryService.deleteInventory(req.params.id);
		if (id){
			return res.status(200).json(new Message(`Inventory id ${id} deleted`));
		}
		return res.status(200).json(new Message(`Inventory id ${id} not found`));
	} catch(e) {
		return res.status(200).json(e);//something went wrong, log error & sent to client
	}
});

/**
	* @name inventories/:id
	* @route {GET} - get inventory by id
	* @returns {Object} - Inventory JSON
*/
inventoryRoutes.get('/:id', async (req, res) => {
	try {
		let result = await InventoryService.getInventoryByID(req.params.id);
		if (result){
			return res.status(200).json(result);
		}
		return res.status(200).json(new Message('Inventory not found'));
	} catch(e) {
		return res.status(400).json(e);//something went wrong, log error & sent to client
	}
});


class Message {
	constructor(message){
		this.message = message;
	}
}
/*
	EXPORTS ------------------------------------------------------------------------------------------------------------------------------------------------
*/

module.exports = {
	inventoryRoutes
};
