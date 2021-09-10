const express = require('express');
const router = express.Router();
const timesController = require('../controllers/timesController');

router.get(
    '/',
    timesController.getTimes
);

module.exports = router;