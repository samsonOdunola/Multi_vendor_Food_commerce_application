const Product = require('../models/product');
const response = require('../utils/response');

const addNewInventoryItem = async (req, res) => {
  let product;
  try {
    const {
      title, metaTitle, sellingPrice, costPrice, discount, quantity, longDescription, expiryDate,
    } = req.body;
    product = await Product.create({
      title, metaTitle, sellingPrice, costPrice, discount, quantity, longDescription, expiryDate,
    });
    if (!product) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Could not create product', error: 'Error', data: {},
      });
    }
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Could not create product', error: err.mesage, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Product Created', data: product });
};

const deleteInventoryItem = async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.destroy({ where: { id: productId } });
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
    const { productId } = req.params;
    product = await Product.findOne({ where: { id: productId } });

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
    products = await Product.findAll();
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
    const { productId } = req.params;
    const {
      title, metaTitle, sellingPrice, costPrice, discount, quantity, longDescription, expiryDate,
    } = req.body;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Product not found', error: 'error', data: {},
      });
    }
    await Product.update({
      title, metaTitle, sellingPrice, costPrice, discount, quantity, longDescription, expiryDate,
    }, { where: { id: productId } });

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

    allProducts.map(async (item) => {
      const {
        title, metaTitle, sellingPrice, costPrice, discount, quantity, longDescription, expiryDate,
      } = item;
      // eslint-disable-next-line prefer-const
      let product = await Product.create({
        title, metaTitle, sellingPrice, costPrice, discount, quantity, longDescription, expiryDate,
      });
      if (!product) {
        return res.status(response.BAD_REQUEST).json({
          success: false, message: 'Could not create product', error: 'Error', data: {},
        });
      }
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

    const deleteItem = async (productId) => {
      const deleted = await Product.destroy({ where: { id: Number(productId) } });
      if (deleted === 0) {
        throw new Error('Product Not Found');
      }
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

module.exports = {
  addNewInventoryItem,
  deleteInventoryItem,
  getProductbyId,
  getAllProducts,
  modifyProduct,
  likeProduct,
  bulkAdd,
  bulkDelete,
};
