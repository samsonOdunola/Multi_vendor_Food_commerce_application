const express = require('express');
const customerAccess = require('../middleware/customerAuthorization');
const addressAccess = require('../middleware/addressAuthorization');
const orderAccess = require('../middleware/orderAuthorization');
const reviewAccess = require('../middleware/reviewAuthorization');
const {
  signup,
  verifyEmail,
  signin,
  addAddress,
  selectDefaultAddress,
  resetPassword,
  viewAllOrder,
  viewOrder,
  reviews,
  getCustomerById,
  getAllCustomer,
} = require('../controllers/customer');

const router = express.Router();

router.get('/reviews/:userId', reviewAccess.readOwn, reviews);
router.post('/signup', signup);
router.get('/login', signin);
router.post('/verify', verifyEmail);
router.get('/order/:userId', orderAccess.readOwn, viewAllOrder);
router.post('/address/:userId', addressAccess.create, addAddress);
router.get('/all', customerAccess.readAnyCustomer, getAllCustomer);
router.put('/address/:userId/:addressId', addressAccess.updateOwn, selectDefaultAddress);

router.get('/order/:userId/:orderId', orderAccess.readOwn, viewOrder);
router.put('/password/reset/:userId', customerAccess.updateOwnCustomer, resetPassword);

router.get('/:userId', customerAccess.readOwnCustomer, getCustomerById);

module.exports = router;
