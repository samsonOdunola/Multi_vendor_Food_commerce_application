/* eslint-disable camelcase */
const { Op } = require('sequelize');
const response = require('../utils/response');
const Cart = require('../models/cart');
const Order = require('../models/order');
const PromoCode = require('../models/promoCode');
const Customer = require('../models/customer');
const Transaction = require('../models/transaction');
const { initializePayment, verifyTransaction } = require('../utils/paystack');

const generateOrder = async (req, res) => {
  let order;
  try {
    const { userId } = req.params;

    const { data } = req.body;
    const {
      productList,
      deliveryType,
      paymentType,
      customerAddress,
      subTotal,
      deliveryFee,
      promoCode,
    } = data;
    const { line1, city, state } = customerAddress;
    let orderDiscount = 0.0;
    let grandTotal = 0.0;
    const tax = 0;
    let PromoCodeId;
    const user = await Customer.findByPk(userId);
    if (promoCode) {
      const promoCodeDetails = await PromoCode.findOne({ where: { code: promoCode } });
      if (promoCodeDetails) {
        orderDiscount = promoCodeDetails.discount;
        PromoCodeId = promoCodeDetails.id;
      } else {
        orderDiscount = 0.0;
      }
    }

    grandTotal = subTotal + tax + deliveryFee - orderDiscount;

    order = await Order.create({
      status: 'New',
      note: '',
      subTotal,
      tax,
      shipping: deliveryFee,
      discount: orderDiscount,
      grandTotal,
      name: user.name,
      email: user.email,
      phone: user.phoneNumber,
      address: line1,
      city,
      state,
      country: 'Nigeria',
      CustomerId: userId,
      PromoCodeId,
      deliveryType,

    });
    const cart = await Cart.findOne({ where: { [Op.and]: [{ CustomerId: userId }, { status: 'New' }] } });
    await cart.update({ status: 'Checkout' });
    productList.map(async (product) => {
      const { id, Cart_Item } = product;
      await order.addProducts(id, { through: { quantity: Cart_Item.quantity } });
    });
    if (paymentType === 'Pay with Card') {
      const url = await initializePayment(user.email, grandTotal);

      if (url.status === 200 && url.data.status) {
        console.log(url.data.data);
        await Transaction.create({
          CustomerId: userId, OrderId: order.id, mode: 'Prepaid', code: url.data.data.reference, status: 'Pending',
        });
        await cart.update({ status: 'Paid' });
        return res.redirect(307, url.data.data.authorization_url);
      }
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Error in Initializing payment', error: 'Payment Error', data: {},
      });
    } if (paymentType === 'Pay on delivery') {
      await Transaction.create({
        CustomerId: userId, OrderId: order.id, mode: 'Pay On Delivery', code: null, status: 'Pending',
      });

      // delivery control
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in creating order', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'Order Created', data: order,
  });
};

const verifyOrder = async (req, res) => {
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
const confirmShipment = async (req, res) => {
  try {
    const { transactionReference } = req.params;
    const transaction = await Transaction.findOne({ where: { code: transactionReference } });
    const order = await Order.findOne({ where: { id: transaction.OrderId } });
    const cart = await Cart.findOne({ where: { [Op.and]: [{ CustomerId: transaction.CustomerId }, { status: 'Paid' }] } });
    await order.update({ status: 'Shipped' });
    await cart.update({ status: 'Complete' });

    // send message to user about order
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true,
    message: 'Confirmation of shipment successfull',
    data: {},
  });
};

module.exports = {
  generateOrder,
  verifyOrder,
  confirmShipment,
};
