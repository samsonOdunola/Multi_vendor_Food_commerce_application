const Permissions = require('../models/permissions');

const populatePermissions = async () => {
  const permissionType = ['READ', 'WRITE', 'UPDATE', 'DELETE'];

  permissionType.map(async (type) => {
    await Permissions.create({ title: type });
  });
};

module.exports = { populatePermissions };
