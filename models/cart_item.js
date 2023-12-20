const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');

class CartItem extends Model { }

CartItem.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Cart_Item',
});

module.exports = CartItem;
