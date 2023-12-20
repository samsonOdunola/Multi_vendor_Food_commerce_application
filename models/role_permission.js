const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/mysql.config');

class RolePermission extends Model { }

RolePermission.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  resource: {
    type: DataTypes.ENUM('All', 'Customer', 'Staff', 'Transaction', 'Order', 'Cart', 'Product', 'RolePermission', 'Role', 'Address', 'Review', 'Logistic', 'PromoCode'),
    allowNull: false,
  },
  readAny: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  readOwn: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  write: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  removeAny: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  removeOwn: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  updateAny: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  updateOwn: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

}, {
  sequelize,
  modelName: 'role_permisison',
  timestamps: true,
});

module.exports = RolePermission;
