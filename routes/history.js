const express = require('express');

const router = express.Router();

const history = require('../controllers/history');

router.get('/edithistory', history.editHistory);
router.get('/gethistory', history.getHistory);

module.exports = router;
