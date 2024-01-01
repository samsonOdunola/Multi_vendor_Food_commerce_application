const crypto = require('crypto');
const Vendor = require('../models/vendor');
const Order = require('../models/order')
const ProductReview = require('../models/product_review')
const Product = require('../models/product')
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const { sendMail, sendPasswordResetMail } = require('../utils/email');
const { signUser } = require('../utils/authorisation');
const response = require('../utils/response');

const signUp = async (req, res) => {
  let vendor;
  try {
    const {
      name, email, country, password,
    } = req.body;
    const passwordHash = await hashPassword(password);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    await sendMail(email, verificationToken);

    vendor = await Vendor.create({
      name, email, passwordHash, verificationToken, country,
    });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in creating Vendor', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Signup Successfull', data: vendor });
};

const verifyEmail = async (req, res) => {
  let vendor;
  try {
    const { token, email } = req.query;

    vendor = await Vendor.findOne({ where: { email } });

    if (vendor.verificationToken === token) {
      await vendor.update({ verified: true });
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
  return res.status(response.OK).json({ success: true, message: 'Verification Successfull', data: vendor });
};
const login = async (req, res) => {
  let vendor;
  let token;

  try {
    const { email, password } = req.body;
    vendor = await Vendor.findOne({ where: { email } });
    if (vendor === null) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Error in Logging In User', error: 'User Not found', data: {},
      });
    }
    if (!vendor.verified) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Verify your Email before logging In', error: 'User Not verified', data: {},
      });
    }
    const correctPassword = await comparePassword(password, vendor.passwordHash);

    if (!correctPassword) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Incorrect User Name or password', error: 'User Not found', data: {},
      });
    }

    token = await signUser(vendor);
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in logging in User', error: err.message, data: {},
    });
  }

  return res.status(response.OK).json({
    success: true, message: 'success', data: vendor, token,
  });
};
const resetPasswordRequest = async (req, res) => {
  let vendorEmail;
  try {
    const { email } = req.body;
    vendorEmail = email;

    const vendor = await Vendor.findOne({ where: { email } });

    if (vendor === null) {
      return res.status(404).json({ success: false, message: 'Email not found oe registered to a vendor', data: {} });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in reseting password', error: err.message, data: {},
    });
  }
  await sendPasswordResetMail(vendorEmail);
  return res.status(200).json({ success: true, message: 'password reset link sent to email' });
};
const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { vendorId } = req.params;

    const userDetails = await Vendor.findOne({ id: vendorId });
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
      const { vendorId } = req.params;
      allOrders = await Order.findAll({ where: { VendorId: vendorId }, include: Product });
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
      const { vendorId, orderId } = req.params;
      order = await Order.findAll({ where: { id: orderId, VendorId: vendorId }, include: Product });
    } catch (err) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Cannot retrieve order detail', error: err.message, data: {},
      });
    }
    return res.status(response.OK).json({
      success: true, message: 'success', data: order,
    });
}; 
  
const reviews = async (req, res) => {
    let userReviews = [];
    try {
        const { vendorId } = req.params;
        const { productId } = req.query
        
        if (!productId) {
            userReviews = await ProductReview.findAll({ where: { VendorId: vendorId }, include: Product });
            
        }
        userReviews = await ProductReview.findAll({ where: { VendorId: vendorId, ProductId:productId}, include: Product });
      
    } catch (err) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Cannot retrieve user reviews', error: err.message, data: {},
      });
    }
    return res.status(response.OK).json({
      success: true, message: 'success', data: userReviews,
    });
  };
module.exports = {
  signUp, login, resetPassword, resetPasswordRequest, verifyEmail, viewAllOrder, viewOrder, reviews
};
