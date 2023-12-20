const Role = require('../models/role');
const RolePermission = require('../models/role_permission');

const customerPermissions = [
  { resource: 'Customer', readOwn: true, updateOwn: true },
  { resource: 'Order', readOwn: true },
  { resource: 'Cart', readOwn: true, updateOwn: true },
  { resource: 'Review', readOwn: true, updateOwn: true },
  {
    resource: 'Address', write: true, removeOwn: true, readOwn: true, updateOwn: true,
  },
  { resource: 'Transaction', readOwn: true },
];
const ownerPermissions = [{
  resource: 'All', readAny: true, readOwn: true, write: true, updateAny: true, updateOwn: true, removeAny: true, removeOwn: true,
}];
const initRoles = async () => {
  try {
    const customerRole = await Role.findAll({ where: { title: 'Customer' } });

    if (customerRole.length === 0) {
      await Role.create({ title: 'Customer' });
    }
    const ownerRole = await Role.findAll({ where: { title: 'Owner' } });
    if (ownerRole.length === 0) {
      await Role.create({ title: 'Owner' });
    }
  } catch (err) {
    return 'Error in creating init roles';
  }
};

const initPermission = async () => {
  try {
    const customer = await Role.findOne({ where: { title: 'Customer' } });

    customerPermissions.map(async (permission) => {
      const {
        resource, readAny, readOwn, write, updateAny, updateOwn, removeAny, removeOwn,
      } = permission;
      await RolePermission.create({
        RoleId: customer.id,
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
    const owner = await Role.findOne({ where: { title: 'Owner' } });
    ownerPermissions.map(async (permission) => {
      const {
        resource, readAny, readOwn, write, updateAny, updateOwn, removeAny, removeOwn,
      } = permission;
      await RolePermission.create({
        RoleId: owner.id,
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
    return 'Error in creating init roles';
  }
};

module.exports = { initRoles, initPermission };
