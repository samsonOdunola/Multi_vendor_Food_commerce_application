const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/mysql.config');

class Product extends Model { }

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  metaTitle: {
    type: DataTypes.STRING,
  },
  sellingPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  costPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  longDescription: {
    type: DataTypes.STRING,
  },
  expiryDate: {
    type: DataTypes.DATE,
  },
  image: {
    type: DataTypes.STRING,
  },

  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Product',
});

module.exports = Product;
