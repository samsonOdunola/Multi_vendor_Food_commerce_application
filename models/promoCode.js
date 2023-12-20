const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/mysql.config');

class PromoCode extends Model { }

PromoCode.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.00,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: new Date(),
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: new Date(),
  },
  used: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

}, {
  sequelize,
  timestamps: true,
  modelName: 'Promo_code',
});

module.exports = PromoCode;
