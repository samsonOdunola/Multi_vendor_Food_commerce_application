const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');

class Address extends Model { }

Address.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  defaultAddress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,

  },
  line1: {
    type: DataTypes.TEXT('long'),
  },
  line2: {
    type: DataTypes.TEXT('long'),
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  State: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nearestLandmark: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },

}, {
  sequelize,
  timestamps: true,
  modelName: 'Address',
});

module.exports = Address;
