const { Op } = require('sequelize');
const RolePermission = require('../models/role_permission');
const { verifyUser } = require('../utils/authorisation');
const response = require('../utils/response');

const readAnyCustomer = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Customer'] }, readAny: true } });

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
const readOwnCustomer = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Customer'] }, readOwn: true } });

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
const updateOwnCustomer = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Customer'] }, updateOwn: true } });

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
const updateAnyCustomer = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Customer'] }, updateAny: true } });

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
const deleteAnyCustomer = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Customer'] }, removeAny: true } });

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
const deleteOwnCustomer = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Customer'] }, removeOwn: true } });

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
  readAnyCustomer,
  readOwnCustomer,
  updateAnyCustomer,
  updateOwnCustomer,
  deleteAnyCustomer,
  deleteOwnCustomer,
};
