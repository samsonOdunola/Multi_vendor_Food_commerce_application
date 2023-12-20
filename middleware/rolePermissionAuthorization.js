const { Op } = require('sequelize');
const RolePermission = require('../models/role_permission');
const { verifyUser } = require('../utils/authorisation');
const response = require('../utils/response');

const createRole = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Role'] }, write: true } });

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
const readAnyRole = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Role'] }, readAny: true } });

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
const readOwnRole = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Role'] }, readOwn: true } });

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

const updateAnyRolePermission = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'RolePermission'] }, updateAny: true } });

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
const deleteAnyRole = async (req, res, next) => {
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
    const userDetails = await RolePermission.findAll({ where: { resource: { [Op.or]: ['All', 'Role'] }, removeAny: true } });

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
  createRole, readAnyRole, readOwnRole, updateAnyRolePermission, deleteAnyRole,
};
