const express = require('express');

const router = express.Router();
const {
  addStaff, editStaff, removeStaff, resetPassword, verifyStaff, loginStaff, getAllStaff, getStaff,
} = require('../controllers/staff');
// const roleAccess = require('../middleware/rolePermissionAuthorization');

const staffAccess = require('../middleware/staffAuthorisation');
// Staff Logic
router.get('/', verifyStaff);
router.post('/login', loginStaff);
router.post('/:vendorId', staffAccess.createStaff, addStaff);
router.get('/all/:vendorId', staffAccess.readAnyStaff, getAllStaff);
router.get('/:userId/:vendorId', staffAccess.readOwnStaff, getStaff);

router.put('/:userId/:vendorId', staffAccess.updateOwnStaff, editStaff);
router.put('/password/:userId/:vendorId', staffAccess.updateOwnStaff, resetPassword);
router.delete('/:userId/:vendorId', staffAccess.deleteAnyStaff, removeStaff);

module.exports = router;
