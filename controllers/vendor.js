const crypto = require('crypto');
const Vendor = require('../models/vendor');
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

module.exports = {
  signUp, login, resetPassword, resetPasswordRequest, verifyEmail,
};
