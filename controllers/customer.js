const crypto = require('crypto');
const Customer = require('../models/customer');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const { sendMail } = require('../utils/email');
const { signUser } = require('../utils/authorisation');
const response = require('../utils/response');
const Address = require('../models/address');
const Order = require('../models/order');
const Product = require('../models/product');
const ProductReview = require('../models/product_review');

require('dotenv').config();
// TODO

const signup = async (req, res) => {
  let user;
  try {
    const {
      name, email, phoneNumber, password,
    } = req.body;
    const passwordHash = await hashPassword(password);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    await sendMail(email, verificationToken);

    user = await Customer.create({
      name, email, phoneNumber, password: passwordHash, verificationToken,
    });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in creating Resource', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Signup Successfull', data: user });
};

const verifyEmail = async (req, res) => {
  let user;
  try {
    const { token, email } = req.query;

    user = await Customer.findOne({ where: { email } });

    if (user.verificationToken === token) {
      await user.update({ verified: true });
    } else {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Verification failed', error: 'Wrong/Expired token', data: {},
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in verifying Resource', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Verification Successfull', data: user });
};

const signin = async (req, res) => {
  let user;
  let token;

  try {
    const { email, password } = req.body;
    user = await Customer.findOne({ where: { email } });
    if (user === null) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Error in Logging In User', error: 'User Not found', data: {},
      });
    }
    if (!user.verified) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Verify your Email before logging In', error: 'User Not verified', data: {},
      });
    }
    const correctPassword = await comparePassword(password, user.password);

    if (!correctPassword) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Incorrect User Name or password', error: 'User Not found', data: {},
      });
    }

    token = await signUser(user);
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in logging in User', error: err.message, data: {},
    });
  }

  return res.status(response.OK).json({
    success: true, message: 'success', data: user, token,
  });
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { userId } = req.params;

    const userDetails = await Customer.findByPk(userId);
    const passwordHash = await hashPassword(newPassword);

    await userDetails.update({ password: passwordHash });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in reseting password', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'Password reset Successfull', data: {},
  });
};
const viewAllOrder = async (req, res) => {
  let allOrders = [];
  try {
    const { userId } = req.params;
    allOrders = await Order.findAll({ where: { CustomerId: userId }, include: Product });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Cannot retrieve orders', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'success', data: allOrders,
  });
};
const viewOrder = async (req, res) => {
  let order;
  try {
    const { userId, orderId } = req.params;
    order = await Order.findAll({ where: { id: orderId, CustomerId: userId }, include: Product });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Cannot retrieve order detail', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'success', data: order,
  });
};

// const inbox = async (req, res) => { };
const reviews = async (req, res) => {
  let userReviews = [];
  try {
    const { userId } = req.params;
    userReviews = await ProductReview.findAll({ where: { CustomerId: userId }, include: Product });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Cannot retrieve user reviews', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'success', data: userReviews,
  });
};
const addAddress = async (req, res) => {
  let newAddress;
  try {
    const { userId } = req.params;
    const {
      line1, line2, city, state, country, nearestLandmark,
    } = req.body;
    const existingAddress = await Address.findOne({ where: { CustomerId: userId } });

    if (existingAddress) {
      newAddress = await Address.create({
        line1, line2, city, State: state, country, nearestLandmark, CustomerId: userId,
      });
    } else {
      newAddress = await Address.create({
        line1,
        line2,
        city,
        State: state,
        country,
        nearestLandmark,
        CustomerId: userId,
        defaultAddress: true,
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in adding Address', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'success', data: newAddress,
  });
};
const selectDefaultAddress = async (req, res) => {
  let updatedAddress;
  try {
    const { userId, addressId } = req.params;
    const existingDefaultAddress = await Address.findOne({
      where:
        { CustomerId: userId, defaultAddress: true },
    });
    updatedAddress = await Address.findOne({ where: { id: addressId } });

    // Update respective address
    await existingDefaultAddress.update({ defaultAddress: false });
    await updatedAddress.update({ defaultAddress: true });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in updating Address', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'success', data: updatedAddress,
  });
};

const getCustomerById = async (req, res) => {
  let customer;
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Error in retrieving User', error: 'No User Id supplied', data: {},
      });
    }
    customer = await Customer.findByPk(userId);
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in retrieving User', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'success', data: customer,
  });
};
const getAllCustomer = async (req, res) => {
  let customers = [];
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Error in retrieving User', error: 'No User Id supplied', data: {},
      });
    }
    customers = await Customer.findAll();
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in retrieving User', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'success', data: customers,
  });
};

module.exports = {
  signup,
  verifyEmail,
  signin,
  resetPassword,
  viewAllOrder,
  viewOrder,
  reviews,
  addAddress,
  selectDefaultAddress,
  getCustomerById,
  getAllCustomer,
};
