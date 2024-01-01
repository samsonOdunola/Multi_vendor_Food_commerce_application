const express = require('express');

const router = express.Router();
const {
  signUp, verifyEmail, login, viewAllOrder, viewOrder, reviews,
} = require('../controllers/vendor');

router.post('/login', login);
router.post('/', signUp);
router.get('/verify', verifyEmail);

router.get('/orders/:vendorId', viewAllOrder);
router.get('/order/:vendorId/:orderId', viewOrder);
router.get('/reviews/:vendorId', reviews);

module.exports = router;
