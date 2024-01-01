const express = require('express');

const router = express.Router();
const {
  getProductbyId, addNewInventoryItem, deleteInventoryItem,
  modifyProduct, bulkAdd, bulkDelete, getAllVendorProduct,
} = require('../controllers/inventory');

const productAccess = require('../middleware/inventoryAuthorisation');

// Inventory
router.get('/all_products/:vendorId', productAccess.deleteAnyProduct, getAllVendorProduct);
router.post('/:vendorId/product', productAccess.createProduct, addNewInventoryItem);
router.get('/:productId/:vendorId', getProductbyId);
router.delete('/:productId/:vendorId', productAccess.deleteAnyProduct, deleteInventoryItem);
router.put('/:productId/:vendorId', productAccess.updateAnyProduct, modifyProduct);

router.delete('/:vendorId', productAccess.deleteAnyProduct, bulkDelete);

router.post('/:vendorId', productAccess.createProduct, bulkAdd);

router.get('/all_products/:vendorId', productAccess.deleteAnyProduct, getAllVendorProduct);

module.exports = router;
