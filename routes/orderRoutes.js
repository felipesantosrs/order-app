/*
	DEPENDENCIES ----------------------------------------------------------------------------------------------------------------------------
*/

const express = require('express');
const orderRoutes = express.Router();

const bodyParser = require('body-parser');


const {logger} = require('../services/loggingService');


orderRoutes.use(bodyParser.json({limit: '5mb'}));



//convert query params to lowercase
orderRoutes.use((req, res, next) => {
	for(var key in req.query) {
		req.query[key.toLowerCase()] = req.query[key];
	}
	next();
});

const OrderService = require('../services/orderService');

/*
	EXTERNAL ROUTES --------------------------------------------------------------------------------------------------------------------------------------------
*/

/**
	* @name orders
	* @route {POST} - creates a new order
	* @req.body - order json
	* @returns {String} - [message]
*/
orderRoutes.post('/', async (req, res) => {
	try {
		if (req && req.body) {
			let order = await OrderService.createOrder(req.body);
			return res.status(200).json(order)
		}
		return res.status(400).json(new Message('Invalid Request'));

	}   catch(e) {
		logger.error(e.stack);
		return res.status(400).json(e);//something went wrong, log error & sent to client
	}
});


/**
	* @name orders/:id
	* @route {PUT} - updates an order
	* @returns {String} - [message]
*/
orderRoutes.put('/:id', async (req, res) => {
	try {
		let id = await OrderService.updateOrder(req.params.id , req.body);
		if (id){
			return res.status(200).json(new Message(`Order id ${id} updated`));
		}
		return res.status(200).json(new Message(`Order id ${id} not found`));
	}   catch(e) {
		logger.error(e.stack);
		return res.status(400).json(e);//something went wrong, log error & sent to client
	}
});


/**
	* @name orders/:id/cancelation
	* @route {PUT} - updates an order
	* @returns {String} - [message]
*/
orderRoutes.put('/:id/cancelation', async (req, res) => {
	try {
		let id = await OrderService.cancelOrder(req.params.id);
		if (id){
			return res.status(200).json(new Message(`Order id ${id} cancelled`));
		}
		return res.status(200).json(new Message(`Order not found or already cancelled`));
	}   catch(e) {
		logger.error(e.stack);
		return res.status(400).json(e);//something went wrong, log error & sent to client
	}
});

/**
	* @name orders
	* @route {GET} - gets all Order
	* @returns {List} - list all orders
*/
orderRoutes.get('/', async (req, res) => {
	try {
		let result = await OrderService.getAllOrders();
		return res.status(200).json(result);
	} catch(e) {
		logger.error(e.stack);
		return res.status(400).json(e);//something went wrong, log error & sent to client
	}
});

/**
	* @name orders/:id
	* @route {DELETE} - delete an order by id
*/
orderRoutes.delete('/:id', async (req, res) => {
	try {
		let id = await OrderService.deleteOrder(req.params.id);
		
		if (id) return res.status(200).json(new Message(`Order id ${id} deleted`));
		
		
	} catch(e) {
		return res.status(200).json(new Message(e.message));//something went wrong, log error & sent to client
	}
});

/**
	* @name orders/:id
	* @route {GET} - get order by id
	* @returns {Object} - Order JSON
*/
orderRoutes.get('/:id', async (req, res) => {
	try {
		let result = await OrderService.getOrderByID(req.params.id);
		if (result){
			return res.status(200).json(result);
		}
		return res.status(200).json(new Message('Order not found'));
	} catch(e) {
		return res.status(400).json(e);//something went wrong, log error & sent to client
	}
});


class Message {
	constructor(message){
		this.message = message
	}
}
/*
	EXPORTS ------------------------------------------------------------------------------------------------------------------------------------------------
*/

module.exports = {
	orderRoutes
};
