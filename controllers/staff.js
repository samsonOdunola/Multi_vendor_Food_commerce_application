// const phoneToken = require('generate-sms-verification-code');
const crypto = require('crypto');
const Staff = require('../models/staff');
const response = require('../utils/response');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const { signUser } = require('../utils/authorisation');
const { sendMail } = require('../utils/email');

const addStaff = async (req, res) => {
  let newStaff;
  try {
    const {
      firstName, lastName, middleName, phoneNumber, email, password, roleId,
    } = req.body;
    const passwordHash = await hashPassword(password);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    await sendMail(email, verificationToken);

    newStaff = await Staff.create({
      firstName, lastName, middleName, phoneNumber, email, passwordHash, verificationToken,
    });

    await newStaff.setRole(roleId);
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in creating resource', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Resource created successfully', data: newStaff });
};

const verifyStaff = async (req, res) => {
  let user;
  try {
    const { token, email } = req.query;

    user = await Staff.findOne({ where: { email } });

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

const loginStaff = async (req, res) => {
  let user;
  let token;

  try {
    const { email, password } = req.body;
    user = await Staff.findOne({ where: { email } });
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
    const correctPassword = await comparePassword(password, user.passwordHash);

    if (!correctPassword) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Incorrect User Name or password', error: 'Incorrect User Name or password', data: {},
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

const editStaff = async (req, res) => {
  let updatedUser;
  try {
    const {
      firstName, lastName, middleName, phoneNumber,
    } = req.body;
    const { userId } = req.params;
    if (!userId) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'User Id not supplied', error: 'user id not supplied', data: {},
      });
    }
    const user = await Staff.findOne({ id: userId });
    if (!user) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'User not found', error: 'user not found', data: {},
      });
    }

    if (user.phoneNumber === phoneNumber) {
      updatedUser = await user.update({
        firstName, lastName, middleName, phoneNumber,
      });
    } else {
      updatedUser = await user.update({
        firstName, lastName, middleName, phoneNumber, verifiedPhoneNumber: false,
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in updating resource', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'success', data: updatedUser,
  });
};

const removeStaff = async (req, res) => {
  try {
    const { userId } = req.params;
    const staff = await Staff.destroy({ where: { id: userId } });
    if (staff !== 1) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Error in deleting resource', error: 'Error in deleting resource', data: {},
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in deleting resource', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Resource deleted successfully', data: {} });
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { userId } = req.params;

    const userDetails = await Staff.findByPk(userId);
    if (!userDetails) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'User not found', error: 'user not found', data: {},
      });
    }
    const passwordHash = await hashPassword(newPassword);

    await userDetails.update({ passwordHash });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in reseting password', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'Password reset Successfull', data: {},
  });
};

const getAllStaff = async (req, res) => {
  let allStaff = [];
  try {
    allStaff = await Staff.findAll({ where: {} });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in getting resources', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'Success', data: allStaff,
  });
};
const getStaff = async (req, res) => {
  let staff;
  try {
    const { userId } = req.params;
    staff = await Staff.findOne({ where: { id: userId } });

    if (!staff) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Resource not found', error: 'error', data: {},
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in getting resources', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'Success', data: staff,
  });
};
// const verifyPhoneNumber = async (req, res) => {
//   const generatedToken = phoneToken(6, { type: 'number' });
// };
module.exports = {
  addStaff, editStaff, removeStaff, verifyStaff, loginStaff, resetPassword, getAllStaff, getStaff,
};
