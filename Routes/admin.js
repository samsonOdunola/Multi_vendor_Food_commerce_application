const express = require('express');

const router = express.Router();
const {
  addCategory, getCategoryById, getAllCategory, modifyCategory, deleteCategory,
} = require('../controllers/category');

router.post('/category', addCategory);
router.get('/:categoryId', getCategoryById);
router.put('/:categoryId', modifyCategory);
router.delete('/:categoryId', deleteCategory);
router.get('/category', getAllCategory);

module.exports = router;
