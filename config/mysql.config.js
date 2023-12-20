const Sequelize = require('sequelize');
require('dotenv').config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB;
const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
});

module.exports = sequelize;
