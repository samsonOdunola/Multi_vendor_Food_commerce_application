const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/mysql.config');

class ProductReview extends Model { }

ProductReview.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
  },
  content: {
    type: DataTypes.TEXT('long'),
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 0,

  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Product_Review',
});

module.exports = ProductReview;
