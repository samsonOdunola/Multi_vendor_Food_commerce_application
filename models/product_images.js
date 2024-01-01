const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');

class ProductImage extends Model { }

ProductImage.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  imageString: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Product_Images',
});

module.exports = ProductImage;
