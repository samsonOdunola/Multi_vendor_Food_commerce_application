const express = require('express');
const {
  createCheckout, changeAddress, changePaymentType, changeDeliveryType,
} = require('../controllers/checkout');
const {
  showCart, addToCart, deleteCartItem, updateCartItemQty,
} = require('../controllers/cart');

const orderAccess = require('../middleware/orderAuthorization');
const logisticAccess = require('../middleware/logisticsAuthorization');

const {
  generateOrder, verifyOrder,
  confirmShipment,
} = require('../controllers/order');

const { initiateDeliveryConfirmation, finalizeDeliveryConfirmation } = require('../controllers/logistics');

const { likeProduct } = require('../controllers/inventory');

const router = express.Router();

// TODO -
// Move verify shipment route to vendor/staff route
// Move verify confirm delivery to logistics route

// checkout
router.get('/checkout/:userId', createCheckout);
router.put('/checkout/address/:userId', changeAddress);
router.put('/checkout/payment_method/:us erId', changePaymentType);
router.put('/checkout/delivery_type/:userId', changeDeliveryType);

// Cart
router.get('/cart/:userId', showCart);
router.put('/cart/:userId/:productId', addToCart);
router.delete('/cart/:userId', deleteCartItem);
router.put('/cart/product/:userId/:productId/:action', updateCartItemQty);

// order
router.post('/order/:userId', orderAccess.create, generateOrder);
router.get('/order/verify/:transactionReference', verifyOrder);
router.get('/order/verify/shipment/:transactionReference', orderAccess.updateAny, confirmShipment);
router.post('/order/delivery/:transactionReference', logisticAccess.create, initiateDeliveryConfirmation);
router.put('/order/delivery/:transactionReference', logisticAccess.updateAny, finalizeDeliveryConfirmation);

// Product
router.put('/product/like/:productId', likeProduct);

module.exports = router;
