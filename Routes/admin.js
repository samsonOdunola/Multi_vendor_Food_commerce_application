const express = require('express');

const router = express.Router();
const {
  addCategory, getCategoryById, getAllCategory, modifyCategory, deleteCategory,
} = require('../controllers/category');

const {
  createRole, AddPermissionToRole,
  updateRolePermission, getAllRoles,
  getRoleById, getRolePermissions,
} = require('../controllers/role_permission');

const { getAllProducts } = require('../controllers/inventory');

// category
router.post('/category', addCategory);
router.get('/category/:categoryId', getCategoryById);
router.put('/category/:categoryId', modifyCategory);
router.delete('/category/:categoryId', deleteCategory);
router.get('/category', getAllCategory);

// Roles and Permissions
router.post('/role', createRole);
router.post('/role/permission/:roleId', AddPermissionToRole);
router.put('/role/permission/:roleId', updateRolePermission);
router.get('/role/permission/:roleId', getRolePermissions);
router.get('/role/all', getAllRoles);
router.get('/role/:roleId', getRoleById);

// Product
router.get('/inventory/all', getAllProducts);

module.exports = router;
