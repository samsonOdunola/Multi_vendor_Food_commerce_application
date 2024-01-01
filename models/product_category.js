const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');

class ProductCategory extends Model { }

ProductCategory.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Product_Category',
});

module.exports = ProductCategory;
