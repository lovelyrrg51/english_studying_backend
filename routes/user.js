const express = require('express');

const router = express.Router();

const user = require('../controllers/user');

// uptime robot check
router.get('/signup', user.singupUser);
router.get('/login', user.loginUser);

module.exports = router;
