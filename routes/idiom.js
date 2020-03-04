/* Written by Pooh, 2019-11-08 */

const express = require('express');
const router = express.Router();
const idiom = require('../controllers/idiom');

router.get('/getlist', idiom.getList);
router.post('/register', idiom.createIdiom);
router.put('/update', idiom.updateIdiom);
router.delete('/delete', idiom.deleteIdiom);

module.exports = router;