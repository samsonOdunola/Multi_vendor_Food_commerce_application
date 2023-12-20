const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerJsDocs = YAML.load('./api.yaml');

const customerRoute = require('./Routes/customer');
const generalRoute = require('./Routes/general');
const staffRoute = require('./Routes/staff');
const inventoryRoute = require('./Routes/inventory');
const reviewRoute = require('./Routes/reviews');
const promoRoute = require('./Routes/promocode');
const reportRoute = require('./Routes/report');
const transactionRoute = require('./Routes/transaction');
const vendorRoute = require('./Routes/vendor');

const App = express();
App.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
App.use(express.urlencoded({ extended: false }));
App.use(express.json({ limit: '50mb' }));
App.use(helmet());
App.use(cors());
App.get('/', (req, res) => {
  res.send('Welcome to server');
});

App.use('/api/v1', generalRoute);
App.use('/api/v1/customer', customerRoute);
App.use('/api/v1/staff', staffRoute);
App.use('/api/v1/inventory', inventoryRoute);
App.use('/api/v1/review', reviewRoute);
App.use('/api/v1/promo', promoRoute);
App.use('/api/v1/report', reportRoute);
App.use('/api/v1/transaction', transactionRoute);
App.use('/api/v1/vendor', vendorRoute);
module.exports = App;
