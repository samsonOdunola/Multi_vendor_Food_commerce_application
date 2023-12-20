const phoneToken = require('generate-sms-verification-code');
const Order = require('../models/order');
const Customer = require('../models/customer');
const Transaction = require('../models/transaction');
const { sendconfirmationCodeMail } = require('../utils/email');
const response = require('../utils/response');

const initiateDeliveryConfirmation = async (req, res) => {
  try {
    const { transactionReference } = req.params;
    const transaction = await Transaction.findOne({ where: { code: transactionReference } });
    const order = await Order.findOne({ where: { id: transaction.OrderId } });
    const customer = await Customer.findByPk(order.CustomerId);

    const confirmationCode = phoneToken(4, { type: 'string' });

    await order.update({ deliveryCode: confirmationCode });

    await sendconfirmationCodeMail(customer.email, confirmationCode);
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true,
    message: 'Confirmation Code sent to Customer',
    data: {},
  });
};

const finalizeDeliveryConfirmation = async (req, res) => {
  try {
    const { transactionReference } = req.params;
    const { deliveryCode } = req.body;
    const transaction = await Transaction.findOne({ where: { code: transactionReference } });
    const order = await Order.findOne({ where: { id: transaction.OrderId } });

    if (order.deliveryCode !== deliveryCode) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Incorrect Code', error: 'Incorrect Code', data: {},
      });
    }

    await order.update({ status: 'Delivered' });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true,
    message: 'Delivery Confirmed',
    data: {},
  });
};

module.exports = { initiateDeliveryConfirmation, finalizeDeliveryConfirmation };
