const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');

class Transaction extends Model { }

Transaction.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.ENUM('Credit', 'Debit'),
    defaultValue: 'Debit',
  },
  mode: {
    type: DataTypes.ENUM('Prepaid', 'Pay On Delivery', 'Flutter'),
  },
  status: {
    type: DataTypes.ENUM('New', 'Cancelled', 'Failed', 'Pending', 'Declined', 'Rejected', 'Success'),
  },
  content: {
    type: DataTypes.TEXT('long'),

  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Transaction',
});

module.exports = Transaction;
