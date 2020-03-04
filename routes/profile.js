const express = require('express');

const router = express.Router();

const profile = require('../controllers/profile');

// uptime robot check
router.get('/create', profile.createProfile);
router.get('/delete', profile.deleteProfile);
router.get('/update', profile.updateProfile);
router.get('/read', profile.readProfile);

module.exports = router;
