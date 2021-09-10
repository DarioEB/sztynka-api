const express = require('express');
const router = express.Router();
const dateController = require('../controllers/dateController');
router.get(
    '/',
    dateController.getDates
);

router.post(
    '/',
    dateController.createDate
);

router.delete(
    '/:id',
    dateController.deleteDate
);

module.exports = router;