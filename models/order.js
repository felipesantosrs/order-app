module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define('Order', 
	{
		email: DataTypes.STRING,
		status: {
			type: DataTypes.ENUM,
			values: ['A', 'C' ]
		},
		dateOrderPlaced: {
			type: DataTypes.DATE,
			defaultValue: sequelize.fn("NOW")
		}
	}, 
	{
		tableName: 'orders'
	});
	return Order;
  }