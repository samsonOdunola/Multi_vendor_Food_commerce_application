const { Op } = require('sequelize');
const ProductReview = require('../models/product_review');
const response = require('../utils/response');
const Customer = require('../models/customer');

const addNewReview = async (req, res) => {
  let review;
  try {
    const { userId, productId } = req.params;
    const { content, rating } = req.body;

    const customer = await Customer.findByPk(userId);

    if (!customer) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Error in adding review', error: 'User not found', data: {},
      });
    }

    review = await ProductReview.create({
      content, ProductId: Number(productId), rating, CustomerId: Number(userId),
    });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in creating review', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Review created', data: review });
};

const modifyReview = async (req, res) => {
  let review;
  try {
    const { reviewId } = req.params;
    const { content, rating } = req.body;
    const checkReview = await ProductReview.findByPk(reviewId);

    if (!checkReview) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Error in modifying review', error: 'Review not found', data: {},
      });
    }
    review = await ProductReview.update(
      { content, rating },
      { where: { id: reviewId } },
    );
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in updating review', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Review updated', data: review });
};

const deleteReview = async (req, res) => {
  let review;
  try {
    const { reviewId } = req.params;
    review = await ProductReview.destroy({ where: { id: reviewId } });
    if (review === 0) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Error in deleting review', error: '', data: {},
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in creating review', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Review deleted', data: review });
};

const getReview = async (req, res) => {
  let review;
  try {
    const { userId } = req.params;
    review = await ProductReview.findAll({ where: { CustomerId: userId } });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in retrieving review', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'success', data: review });
};

const getAllReview = async (req, res) => {
  let reviews = [];
  try {
    const { userId, productId } = req.query;

    if (userId && !productId) {
      reviews = await ProductReview.findAll({ where: { CustomerId: userId } });
    }
    if (!userId && productId) {
      reviews = await ProductReview.findAll({ where: { ProductId: productId } });
    }
    if (userId && productId) {
      reviews = await ProductReview.findAll({
        where: {
          [Op.and]: [{ ProductId: productId },
            { CustomerId: userId }],
        },
      });
    }
    if (!userId && !productId) {
      reviews = await ProductReview.findAll();
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in retrieving reviews', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'successes', data: reviews });
};

module.exports = {
  addNewReview, modifyReview, deleteReview, getReview, getAllReview,
};
