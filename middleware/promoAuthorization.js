const { Op } = require('sequelize');
const RolePermission = require('../models/role_permission');
const { verifyUser } = require('../utils/authorisation');
const response = require('../utils/response');

const resourceMain = 'PromoCode';

const create = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', `${resourceMain}`] }, write: true } });

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
const readAny = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', `${resourceMain}`] }, readAny: true } });

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
const readOwn = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', `${resourceMain}`] }, readOwn: true } });

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
const updateOwn = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', `${resourceMain}`] }, updateOwn: true } });

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
const updateAny = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', `${resourceMain}`] }, updateAny: true } });

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
const deleteAny = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', `${resourceMain}`] }, removeAny: true } });

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
const deleteOwn = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', `${resourceMain}`] }, removeOwn: true } });

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
  readAny,
  readOwn,
  updateOwn,
  updateAny,
  deleteAny,
  deleteOwn,
  create,
};
