/* eslint-disable camelcase */
const { Op } = require('sequelize');
const response = require('../utils/response');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Address = require('../models/address');

const createCheckout = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartInfo = await Cart.findOne({ where: { CustomerId: userId, status: 'New' }, include: Product });
    const productList = await cartInfo.getProducts({ attributes: ['title', 'id', 'sellingPrice', 'discount', 'image'] });
    const address = await Address.findOne({
      where: {
        [Op.and]: [{ CustomerId: userId },
          { defaultAddress: true }],
      },
    });

    const deliveryType = 'Pickup';
    const customerAddress = address;
    const paymentType = 'Pay with Card';
    let subTotal = 0;
    let totalItemQuantity = 0;
    const deliveryFee = 0;

    productList.map((item) => {
      const { Cart_Item, sellingPrice, discount } = item;
      const { quantity } = Cart_Item;
      subTotal += ((sellingPrice * quantity) - discount);
      totalItemQuantity += quantity;
    });
    // cartInfo.update({ status: 'Checkout' });

    return res.status(response.OK).json({
      success: true,
      message: 'Summary created',
      data: {
        productList,
        userId,
        deliveryType,
        paymentType,
        customerAddress,
        subTotal,
        totalItemQuantity,
        deliveryFee,
      },
    });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in generating Summmary', error: err.message, data: {},
    });
  }
};
const changeAddress = async (req, res) => {
  try {
    const {
      productList, deliveryType, paymentType, subTotal,
      totalItemQuantity, newAddressId, deliveryFee,
    } = req.body;
    const { userId } = req.params;
    const newAddress = await Address.findOne({
      where: {
        CustomerId: userId,
        id: newAddressId,
      },
    });
    return res.status(response.OK).json({
      success: true,
      message: 'Address changed',
      data: {
        productList,
        deliveryType,
        paymentType,
        customerAddress: newAddress,
        deliveryFee,
        subTotal,
        totalItemQuantity,
      },
    });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in updating order', error: err.message, data: {},
    });
  }
};
const changePaymentType = async (req, res) => {
  try {
    const {
      productList, deliveryType,
      customerAddress, subTotal, totalItemQuantity, newPaymentType, deliveryFee,
    } = req.body;

    return res.status(response.OK).json({
      success: true,
      message: 'Order updated',
      data: {
        productList,
        deliveryType,
        paymentType: newPaymentType,
        customerAddress,
        deliveryFee,
        subTotal,
        totalItemQuantity,
      },
    });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in updating Order', error: err.message, data: {},
    });
  }
};
const changeDeliveryType = async (req, res) => {
  try {
    const {
      productList,
      paymentType,
      customerAddress,
      subTotal,
      totalItemQuantity,
      deliveryFee,
      newDeliveryType,
    } = req.body;

    return res.status(response.OK).json({
      success: true,
      message: 'Order updated',
      data: {
        productList,
        deliveryType: newDeliveryType,
        paymentType,
        customerAddress,
        deliveryFee,
        subTotal,
        totalItemQuantity,

      },
    });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in updating Order', error: err.message, data: {},
    });
  }
};

module.exports = {
  createCheckout, changePaymentType, changeAddress, changeDeliveryType,
};
