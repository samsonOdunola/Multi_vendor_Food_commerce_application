const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');

class Vendor extends Model { }

Vendor.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalStaff: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalProducts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  verificationToken: {
    type: DataTypes.STRING,

  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

}, {
  sequelize,
  modelName: 'Vendor',
  timeStamps: true,
});

module.exports = Vendor;
