const express = require('express');

const router = express.Router();
const {
  addStaff, editStaff, removeStaff, resetPassword, verifyStaff, loginStaff, getAllStaff, getStaff,
} = require('../controllers/staff');
const roleAccess = require('../middleware/rolePermissionAuthorization');

const {
  createRole, AddPermissionToRole,
  updateRolePermission, getAllRoles,
  getRoleById, getRolePermissions,
} = require('../controllers/role_permission');
const staffAccess = require('../middleware/staffAuthorisation');
// Staff Logic
router.get('/', verifyStaff);
router.get('/login', loginStaff);
router.post('/', staffAccess.createStaff, addStaff);
router.get('/all', staffAccess.readAnyStaff, getAllStaff);
router.get('/:userId', staffAccess.readOwnStaff, getStaff);

router.put('/:userId', staffAccess.updateOwnStaff, editStaff);
router.put('/password/:userId', staffAccess.updateOwnStaff, resetPassword);
router.delete('/:userId', staffAccess.deleteAnyStaff, removeStaff);

// Roles and Permissions
router.post('/role', roleAccess.createRole, createRole);
router.post('/role/permission/:roleId', roleAccess.createRole, AddPermissionToRole);
router.put('/role/permission/:roleId', roleAccess.updateAnyRolePermission, updateRolePermission);
router.get('/role/permission/:roleId', roleAccess.readOwnRole, getRolePermissions);
router.get('/role/all', roleAccess.readAnyRole, getAllRoles);
router.get('/role/:roleId', roleAccess.readOwnRole, getRoleById);

module.exports = router;
