const PromoCode = require('../models/promoCode');
const response = require('../utils/response');

const addPromoCode = async (req, res) => {
  let promoCode;
  try {
    const {
      code, discount, startDate, endDate,
    } = req.body;
    promoCode = await PromoCode.create({
      code, discount, startDate, endDate,
    });
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'cannot crreate Code', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Code created successfully', data: promoCode });
};
const removePromoCode = async (req, res) => {
  try {
    const { promoId } = req.params;

    const promo = await PromoCode.findOne({ where: { id: promoId } });
    if (!promo) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Could not find code', error: 'error', data: {},
      });
    }
    PromoCode.destroy({ where: { id: promoId } });
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'cannot delete promo code', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Code deleted successfully', data: {} });
};

const getAllPromoCodes = async (req, res) => {
  let promoCodes = [];
  let promoCode;
  try {
    const { promoId } = req.query;
    if (promoId) {
      promoCode = await PromoCode.findOne({ where: { id: promoId } });
      if (!promoCode) {
        return res.status(response.NOT_FOUND).json({
          success: false, message: 'Could not find promo code', error: 'error', data: {},
        });
      }
      return res.status(response.OK).json({ success: true, message: 'success', data: promoCode });
    }
    promoCodes = await PromoCode.findAll();
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Error in retrieving Information', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'success', data: promoCodes });
};
const deletePromoCode = async (req, res) => {
  try {
    const { promoId } = req.params;
    const code = await PromoCode.findByPk(promoId);
    if (!code) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Could not find promo code', error: 'error', data: {},
      });
    }
  } catch (err) {
    return res.status(response.INTERNAL_SERVER_ERROR).json({
      success: false, message: 'Error in retrieving Information', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'promo code deleted', data: {} });
};
module.exports = {
  addPromoCode, removePromoCode, getAllPromoCodes, deletePromoCode,
};
