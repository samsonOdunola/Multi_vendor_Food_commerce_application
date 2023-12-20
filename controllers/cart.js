const { Op } = require('sequelize');
const response = require('../utils/response');
const Cart = require('../models/cart');
const CartItem = require('../models/cart_item');
const Product = require('../models/product');

// TODO
// Fix  potential issue with new cart and old cart

const addToCart = async (req, res) => {
  let cart = null;

  try {
    const { userId, productId } = req.params;

    if (userId) {
      cart = await Cart.findOne({ where: { [Op.and]: [{ CustomerId: userId }, { status: 'New' }] } });
      if (cart) {
        await cart.addProduct(productId);
      } else {
        cart = await Cart.create({ CustomerId: userId });
        await cart.addProduct(productId);
      }
    } else {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Cannot Add to Cart', error: 'User does not exist', data: {},
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Item not added to Cart', error: err, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'Item added to cart', data: cart,
  });
};
const showCart = async (req, res) => {
  let userCart = null;
  let productList = [];
  try {
    const { userId } = req.params;

    userCart = await Cart.findOne({ where: { [Op.and]: [{ CustomerId: userId }, { status: 'New' }] }, include: Product });
    productList = await userCart.getProducts({ attributes: ['title', 'id', 'sellingPrice', 'discount', 'image'] });
  } catch (err) {
    return res.status(response.NOT_FOUND).json({
      success: false, message: 'Error in retrieving cart Items', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'Cart Items retrieved', data: productList,
  });
};

const deleteCartItem = async (req, res) => {
  let userCart;
  let productList = [];
  try {
    const { userId } = req.params;
    const { productId } = req.query;

    userCart = await Cart.findOne({ where: { CustomerId: userId, status: 'New' } });
    await userCart.removeProduct(productId);
    productList = await userCart.getProducts({ attributes: ['title', 'id', 'sellingPrice', 'discount', 'image'] });
  } catch (err) {
    return res.status(response.NOT_FOUND).json({
      success: false, message: 'Error in deleting cart Item', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'Cart Items retrieved', data: productList,
  });
};

const updateCartItemQty = async (req, res) => {
  let userCart;
  let productList = [];
  try {
    const { userId, productId, action } = req.params;

    if (action === 'INCREMENT') {
      userCart = await Cart.findOne({ where: { [Op.and]: [{ CustomerId: userId }, { status: 'New' }] }, include: Product });
      await CartItem.increment(
        { quantity: 1 },
        { where: { CartId: userCart.id, ProductId: productId } },
      );
    } else if (action === 'DECREMENT') {
      userCart = await Cart.findOne({ where: { [Op.and]: [{ CustomerId: userId }, { status: 'New' }] }, include: Product });
      const cartitem = await CartItem.findOne({
        where: {
          CartId: userCart.id,
          ProductId: productId,
        },
      });
      if (cartitem.quantity > 1) {
        await CartItem.decrement(
          { quantity: 1 },
          { where: { [Op.and]: [{ CartId: userCart.id }, { ProductId: productId }] } },
        );
      }
    }
    productList = await userCart.getProducts({ attributes: ['title', 'id', 'sellingPrice', 'discount', 'image'] });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in incementing Item count', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'quantity update sucessfull', data: productList,
  });
};

module.exports = {
  showCart, addToCart, deleteCartItem, updateCartItemQty,
};
