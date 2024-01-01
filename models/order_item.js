const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/mysql.config');

class OrderItem extends Model { }

OrderItem.init({

  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,

  },
  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },

}, {
  sequelize,
  timestamps: true,
  modelName: 'Order_Item',
});

module.exports = OrderItem;
