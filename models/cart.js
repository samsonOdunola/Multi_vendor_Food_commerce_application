const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/mysql.config');

class Cart extends Model { }

Cart.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM('New', 'Cart', 'Checkout', 'Paid', 'Complete', 'Abandoned'),
    defaultValue: 'New',
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Cart',
});

module.exports = Cart;
