const Category = require('../models/category');
const response = require('../utils/response');

const addCategory = async (req, res) => {
  let category;
  try {
    const {
      title, content,
    } = req.body;

    category = await Category.create({
      title,
      content,

    });

    if (!category) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Could not create Category', error: 'Error', data: {},
      });
    }
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Could not create Category', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Category Created', data: category });
};

const modifyCategory = async (req, res) => {
  let category;
  try {
    const {
      title, content,
    } = req.body;
    const { categoryId } = req.params;

    category = await Category.update({ title, content }, { where: { id: categoryId } });

    if (!category) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Could not update Category', error: 'Error', data: {},
      });
    }
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Could not update Category', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Category Updated', data: category });
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    await Category.destroy({ where: { id: categoryId } });
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Could not delete Category', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Category Deleted' });
};

const getCategoryById = async (req, res) => {
  let category;
  try {
    const { categoryId } = req.params;

    category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Could not find Category', error: 'Error', data: {},
      });
    }
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Could not find Category', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Category Found', data: category });
};

const getAllCategory = async (req, res) => {
  let category = [];
  try {
    category = await Category.findAll();
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Could not find Category', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Category Found', data: category });
};

module.exports = {
  addCategory, getCategoryById, getAllCategory, modifyCategory, deleteCategory,
};
