const Product = require('../models/product');
const Vendor = require('../models/vendor');
const Category = require('../models/category');
const response = require('../utils/response');

const addNewInventoryItem = async (req, res) => {
  let product;
  try {
    const {
      title, metaTitle, sellingPrice, costPrice, discount,
      quantity, longDescription, expiryDate, categoryId,
    } = req.body;
    const { vendorId } = req.params;

    const vendor = await Vendor.findByPk(vendorId);

    if (!vendor) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Could not create product', error: 'Vendor Error', data: {},
      });
    }

    product = await Product.create({
      title,
      metaTitle,
      sellingPrice,
      costPrice,
      discount,
      quantity,
      longDescription,
      expiryDate,
      VendorId: vendorId,

    });

    if (!product) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Could not create product', error: 'Error', data: {},
      });
    }
    await product.addCategory(categoryId);
    await vendor.increment('totalProducts');
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Could not create product', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Product Created', data: product });
};

const deleteInventoryItem = async (req, res) => {
  try {
    const { productId, vendorId } = req.params;
    await Product.destroy({ where: { id: productId, VendorId: vendorId } });
    const vendor = await Vendor.findByPk(vendorId);

    await vendor.decrement('totalProducts');
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Could not delete product', error: err.mesage, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Product Deleted', data: {} });
};

const getProductbyId = async (req, res) => {
  let product;
  try {
    const { productId, vendorId } = req.params;
    product = await Product.findOne({ where: { id: productId, VendorId: vendorId }, include: { model: Category, attributes: ['id', 'title'] } });

    if (!product) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Product Not found', error: 'Not found', data: {},
      });
    }
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Error', error: err.mesage, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Product Information retrieved successfully', data: product });
};
const getAllProducts = async (req, res) => {
  let products = [];
  try {
    products = await Product.findAll({ include: { model: Category, attributes: ['id', 'title'] } });
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Error', error: err.mesage, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Success', data: products });
};

const modifyProduct = async (req, res) => {
  let modifiedProduct;
  try {
    const { productId, vendorId } = req.params;

    const {
      title, metaTitle, sellingPrice, costPrice, discount, quantity, longDescription, expiryDate,
    } = req.body;
    const product = await Product.findOne({ where: { id: productId, VendorId: vendorId } });

    if (!product) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Product not found', error: 'error', data: {},
      });
    }
    await Product.update({
      title, metaTitle, sellingPrice, costPrice, discount, quantity, longDescription, expiryDate,
    }, { where: { id: productId, VendorId: vendorId } });

    modifiedProduct = await Product.findByPk(productId);
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Error', error: err.mesage, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Product Updated', data: modifiedProduct });
};

const likeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.increment({ likes: 1 }, { where: { id: productId } });
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Error', error: err.mesage, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Success', data: {} });
};

const bulkAdd = async (req, res) => {
  const products = [];
  try {
    const {
      allProducts,
    } = req.body;
    const { vendorId } = req.params;
    const vendor = await Vendor.findByPk(vendorId);

    allProducts.map(async (item) => {
      const {
        title, metaTitle, sellingPrice, costPrice, discount, quantity,
        longDescription, expiryDate, categoryId,
      } = item;
      // eslint-disable-next-line prefer-const
      let product = await Product.create({
        title,
        metaTitle,
        sellingPrice,
        costPrice,
        discount,
        quantity,
        longDescription,
        expiryDate,
        VendorId: vendorId,
      });
      if (!product) {
        return res.status(response.BAD_REQUEST).json({
          success: false, message: 'Could not create product', error: 'Error', data: {},
        });
      }
      await product.addCategory(categoryId);
      await vendor.increment('totalProducts');
      products.push(product);
    });
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Could not create product', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Products Created', data: products });
};

const bulkDelete = async (req, res) => {
  try {
    const { products } = req.body;
    const { vendorId } = req.params;
    const vendor = await Vendor.findByPk(vendorId);

    const deleteItem = async (productId) => {
      const deleted = await Product.destroy({
        where: {
          id: Number(productId),
          VendorId: vendorId,
        },
      });
      if (deleted === 0) {
        throw new Error('Product Not Found');
      }
      await vendor.decrement('totalProducts');
      return deleted;
    };

    const promises = products.map(deleteItem);
    await Promise.all(promises);
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Could not delete product', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Products Deleted', data: {} });
};

const getAllVendorProduct = async (req, res) => {
  let products = [];
  try {
    const { vendorId } = req.params;
    products = await Product.findAll({ where: { VendorId: vendorId }, include: { model: Category, attributes: ['id', 'title'] } });
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Error', error: err.mesage, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Success', data: products });
};
module.exports = {
  addNewInventoryItem,
  deleteInventoryItem,
  getProductbyId,
  getAllProducts,
  modifyProduct,
  likeProduct,
  bulkAdd,
  bulkDelete,
  getAllVendorProduct,
};
