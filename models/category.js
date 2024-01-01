const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');

class Category extends Model { }

Category.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT('long'),

  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Category',
});

module.exports = Category;
