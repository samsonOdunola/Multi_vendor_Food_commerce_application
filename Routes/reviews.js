const express = require('express');
const {
  addNewReview, modifyReview, deleteReview, getReview, getAllReview,
} = require('../controllers/review');
const reviewAccess = require('../middleware/reviewAuthorization');

const router = express.Router();

router.post('/:userId/:productId', reviewAccess.create, addNewReview);
router.put('/:reviewId', reviewAccess.updateOwn, modifyReview);
router.get('/all', reviewAccess.readAny, getAllReview);
router.delete('/:reviewId', reviewAccess.deleteOwn, deleteReview);
router.get('/:userId', reviewAccess.readOwn, getReview);

module.exports = router;
