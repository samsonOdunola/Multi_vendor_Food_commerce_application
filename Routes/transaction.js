const express = require('express');
const {
  getAllTransaction, getTransactionbyReference, verifyTransaction,
} = require('../controllers/transaction');
const transactionAccess = require('../middleware/transactionAuthorization');

const router = express.Router();

router.get('/', transactionAccess.readAny, getAllTransaction);

router.put('/:transactionReference', transactionAccess.updateAny, verifyTransaction);

router.get('/:transactionReference', transactionAccess.readAny, getTransactionbyReference);

module.exports = router;
