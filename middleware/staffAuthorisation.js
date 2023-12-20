const { Op } = require('sequelize');
const RolePermission = require('../models/role_permission');
const { verifyUser } = require('../utils/authorisation');
const response = require('../utils/response');

const createStaff = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const token = authorization.split(' ')[1];
    const bearer = authorization.split(' ')[0];

    if (bearer !== 'Bearer') {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Staff'] }, write: true } });

    const userInfo = await verifyUser(token);

    if (!userInfo) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Invalid Token', data: {},
      });
    }

    const roleIdFromToken = userInfo.user.RoleId;

    const allowedRolesList = [];

    userDetails.map((item) => {
      const { RoleId } = item.dataValues;
      allowedRolesList.push(RoleId);
    });

    if (!allowedRolesList.includes(roleIdFromToken)) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Authorization error', error: err.message, data: {},
    });
  }
  next();
};
const readAnyStaff = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const token = authorization.split(' ')[1];
    const bearer = authorization.split(' ')[0];

    if (bearer !== 'Bearer') {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Staff'] }, readAny: true } });

    const userInfo = await verifyUser(token);
    if (!userInfo) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Invalid Token', data: {},
      });
    }

    const roleIdFromToken = userInfo.user.RoleId;

    const allowedRolesList = [];

    userDetails.map((item) => {
      const { RoleId } = item.dataValues;
      allowedRolesList.push(RoleId);
    });

    if (!allowedRolesList.includes(roleIdFromToken)) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Authorization error', error: err.message, data: {},
    });
  }
  next();
};
const readOwnStaff = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const token = authorization.split(' ')[1];
    const bearer = authorization.split(' ')[0];

    if (bearer !== 'Bearer') {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Staff'] }, readOwn: true } });

    const userInfo = await verifyUser(token);
    if (!userInfo) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Invalid Token', data: {},
      });
    }

    const roleIdFromToken = userInfo.user.RoleId;

    const allowedRolesList = [];

    userDetails.map((item) => {
      const { RoleId } = item.dataValues;
      allowedRolesList.push(RoleId);
    });

    if (!allowedRolesList.includes(roleIdFromToken)) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Authorization error', error: err.message, data: {},
    });
  }
  next();
};
const updateOwnStaff = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const token = authorization.split(' ')[1];
    const bearer = authorization.split(' ')[0];

    if (bearer !== 'Bearer') {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Staff'] }, updateOwn: true } });

    const userInfo = await verifyUser(token);
    if (!userInfo) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Invalid Token', data: {},
      });
    }

    const roleIdFromToken = userInfo.user.RoleId;

    const allowedRolesList = [];

    userDetails.map((item) => {
      const { RoleId } = item.dataValues;
      allowedRolesList.push(RoleId);
    });

    if (!allowedRolesList.includes(roleIdFromToken)) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Authorization error', error: err.message, data: {},
    });
  }
  next();
};
const updateAnyStaff = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const token = authorization.split(' ')[1];
    const bearer = authorization.split(' ')[0];

    if (bearer !== 'Bearer') {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Staff'] }, updateAny: true } });

    const userInfo = await verifyUser(token);
    if (!userInfo) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Invalid Token', data: {},
      });
    }

    const roleIdFromToken = userInfo.user.RoleId;

    const allowedRolesList = [];

    userDetails.map((item) => {
      const { RoleId } = item.dataValues;
      allowedRolesList.push(RoleId);
    });

    if (!allowedRolesList.includes(roleIdFromToken)) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Authorization error', error: err.message, data: {},
    });
  }
  next();
};
const deleteAnyStaff = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const token = authorization.split(' ')[1];
    const bearer = authorization.split(' ')[0];

    if (bearer !== 'Bearer') {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Staff'] }, removeAny: true } });

    const userInfo = await verifyUser(token);
    if (!userInfo) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Invalid Token', data: {},
      });
    }

    const roleIdFromToken = userInfo.user.RoleId;

    const allowedRolesList = [];

    userDetails.map((item) => {
      const { RoleId } = item.dataValues;
      allowedRolesList.push(RoleId);
    });

    if (!allowedRolesList.includes(roleIdFromToken)) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Authorization error', error: err.message, data: {},
    });
  }
  next();
};
const deleteOwnStaff = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const token = authorization.split(' ')[1];
    const bearer = authorization.split(' ')[0];

    if (bearer !== 'Bearer') {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Staff'] }, removeOwn: true } });

    const userInfo = await verifyUser(token);
    if (!userInfo) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Invalid Token', data: {},
      });
    }

    const roleIdFromToken = userInfo.user.RoleId;

    const allowedRolesList = [];

    userDetails.map((item) => {
      const { RoleId } = item.dataValues;
      allowedRolesList.push(RoleId);
    });

    if (!allowedRolesList.includes(roleIdFromToken)) {
      return res.status(response.NOT_AUTHORIZED).json({
        success: false, message: 'Unauthorised Access', error: 'Error', data: {},
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Authorization error', error: err.message, data: {},
    });
  }
  next();
};

module.exports = {
  readAnyStaff,
  readOwnStaff,
  updateOwnStaff,
  updateAnyStaff,
  deleteAnyStaff,
  deleteOwnStaff,
  createStaff,
};
