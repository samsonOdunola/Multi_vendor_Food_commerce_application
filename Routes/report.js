const express = require('express');

const router = express.Router();

const reportRender = require('../controllers/report');

router.get('/', reportRender);

module.exports = router;
