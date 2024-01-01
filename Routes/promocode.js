const express = require('express');

const router = express.Router();
const {
  addPromoCode, getAllPromoCodes, deletePromoCode,
} = require('../controllers/promocode');

const promoAccess = require('../middleware/promoAuthorization');

router.post('/', promoAccess.create, addPromoCode);
router.get('/', promoAccess.readAny, getAllPromoCodes);
router.delete('/:promoId', promoAccess.deleteAny, deletePromoCode);
module.exports = router;
