const Transaction = require('../models/transaction');
const Order = require('../models/order');
const response = require('../utils/response');

const getTransactionbyReference = async (req, res) => {
  let transaction;
  try {
    const { transactionReference } = req.params;
    transaction = await Transaction.findOne({ where: { code: transactionReference } });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: 'false', message: 'Error in retrieving Transaction', error: err.message, data: { },
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Success', data: transaction });
};

const getAllTransaction = async (req, res) => {
  let transactions = [];
  try {
    transactions = await Transaction.findAll();
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: 'false', message: 'Error in retrieving Transaction', error: err.message, data: { },
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Success', data: transactions });
};

const verifyTransaction = async (req, res) => {
  let result;
  try {
    const { transactionReference } = req.params;
    const transaction = await Transaction.findOne({ where: { code: transactionReference } });
    const order = await Order.findOne({ where: { id: transaction.OrderId } });

    result = await verifyTransaction(transactionReference);
    if (result.data.data.status) {
      await transaction.update({ status: 'Success' });
      await order.update({ status: 'Paid' });
    } else {
      await transaction.update({ status: 'Failed' });
      await order.update({ status: 'Failed' });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({ error: err.message });
  }
  return res.status(response.OK).json({
    success: true,
    message: result.data.data.message,
    data: result.data,
  });
};

module.exports = { getTransactionbyReference, getAllTransaction, verifyTransaction };
