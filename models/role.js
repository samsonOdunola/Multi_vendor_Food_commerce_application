const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');

class Role extends Model { }

Role.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.ENUM('Owner', 'Admin', 'Inventory', 'Logistics', 'Finance', 'Customer'),
    allowNull: false,

  },
}, {
  sequelize,
  modelName: 'Role',
  timestamps: true,
});

module.exports = Role;
