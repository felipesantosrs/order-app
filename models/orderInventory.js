

module.exports = (sequelize, DataTypes) => {
	const OrderInventory = sequelize.define('OrderInventory', 
		{
			quantityOrdered: DataTypes.INTEGER
		},
		{
			tableName: 'order_inventory'
		});

	return OrderInventory;

};

