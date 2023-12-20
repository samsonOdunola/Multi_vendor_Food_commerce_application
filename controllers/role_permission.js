const { Op } = require('sequelize');
const response = require('../utils/response');
const Role = require('../models/role');
const RolePermission = require('../models/role_permission');

const createRole = async (req, res) => {
  let role;
  try {
    const { title } = req.body;
    role = await Role.create({ title });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in creating resource', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Resource created successfully', data: role });
};

const AddPermissionToRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissions } = req.body;
    const role = await Role.findByPk(roleId);

    if (!role) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Error in creating resource', error: 'Role does not exist', data: {},
      });
    }
    permissions.map(async (item) => {
      const {
        resource, readAny, readOwn, write, updateAny, updateOwn, removeAny, removeOwn,
      } = item;
      await RolePermission.create({
        RoleId: roleId,
        resource,
        readAny,
        readOwn,
        write,
        updateAny,
        updateOwn,
        removeAny,
        removeOwn,
      });
    });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in creating resource', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Permission created successfully', data: {} });
};
const updateRolePermission = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissions } = req.body;
    const role = await Role.findByPk(roleId);

    if (!role) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Error in creating resource', error: 'Role does not exist', data: {},
      });
    }
    permissions.map(async (item) => {
      const {
        resource, readAny, readOwn, write, updateAny, updateOwn, removeAny, removeOwn,
      } = item;
      await RolePermission.update({
        readAny,
        readOwn,
        write,
        updateAny,
        updateOwn,
        removeAny,
        removeOwn,
      }, {
        where: {
          [Op.and]: [
            { RoleId: roleId },
            { resource },
          ],
        },
      });
    });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in updating resource', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Permission updated successfully', data: {} });
};
const getRolePermissions = async (req, res) => {
  let permissions = [];
  try {
    const { roleId } = req.params;

    permissions = await RolePermission.findAll({ where: { RoleId: roleId } });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in updating resource', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Success', data: permissions });
};
const getAllRoles = async (req, res) => {
  let allRoles = [];
  try {
    allRoles = await Role.findAll();
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in retrieving resource', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Success', data: allRoles });
};

const getRoleById = async (req, res) => {
  let role;
  try {
    const { roleId } = req.params;
    role = await Role.findone({ where: { id: roleId }, include: RolePermission });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in retrieving resource', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Success', data: role });
};

module.exports = {
  createRole,
  AddPermissionToRole,
  updateRolePermission,
  getRolePermissions,
  getAllRoles,
  getRoleById,
};
