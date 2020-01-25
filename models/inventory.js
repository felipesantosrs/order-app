module.exports = (sequelize, DataTypes) => {
	const Inventory = sequelize.define('Inventory', 
		{
			name: DataTypes.STRING,
			description: DataTypes.STRING,
			price: DataTypes.NUMERIC,
			quantity: DataTypes.INTEGER
		},
		{
			tableName: 'inventories'
		});
	return Inventory;
};

