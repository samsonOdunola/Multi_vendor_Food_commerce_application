const express = require('express');

const router = express.Router();
const {
  signUp, verifyEmail, login,
} = require('../controllers/vendor');

router.post('/login', login);
router.post('/', signUp);
router.get('/verify', verifyEmail);

module.exports = router;
