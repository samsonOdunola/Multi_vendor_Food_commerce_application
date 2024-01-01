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

const vendorPermissions = [

  { resource: 'Order', readOwn: true },

  { resource: 'Review', readOwn: true },

  { resource: 'Transaction', readOwn: true },
  {
    resource: 'Product', readOwn: true, write: true, updateOwn: true, removeOwn: true,
  },
  { resource: 'Vendor', readOwn: true, updateOwn: true },
  {
    resource: 'Staff', readOwn: true, write: true, updateOwn: true, removeOwn: true,
  },
  {
    resource: 'Role', readOwn: true, write: true, updateOwn: true, removeOwn: true,
  },

];

const adminPermissions = [{
  resource: 'All', readAny: true, readOwn: true, write: true, updateAny: true, updateOwn: true, removeAny: true, removeOwn: true,
}];
const initRoles = async () => {
  try {
    const customerRole = await Role.findAll({ where: { title: 'Customer' } });

    if (customerRole.length === 0) {
      await Role.create({ title: 'Customer' });
    }

    const adminRole = await Role.findAll({ where: { title: 'Admin' } });
    if (adminRole.length === 0) {
      await Role.create({ title: 'Admin' });
    }
    const vendorRole = await Role.findAll({ where: { title: 'Vendor' } });
    if (vendorRole.length === 0) {
      await Role.create({ title: 'Vendor' });
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
    const admin = await Role.findOne({ where: { title: 'Admin' } });
    adminPermissions.map(async (permission) => {
      const {
        resource, readAny, readOwn, write, updateAny, updateOwn, removeAny, removeOwn,
      } = permission;
      await RolePermission.create({
        RoleId: admin.id,
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
    const vendor = await Role.findOne({ where: { title: 'Vendor' } });
    vendorPermissions.map(async (permission) => {
      const {
        resource, readAny, readOwn, write, updateAny, updateOwn, removeAny, removeOwn,
      } = permission;
      await RolePermission.create({
        RoleId: vendor.id,
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
