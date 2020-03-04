/* Written by Pooh, 2019-11-08 */

const express = require('express');
const router = express.Router();
const classify = require('../controllers/classify');

router.get('/getList', classify.getList);
router.post('/create', classify.createClassify);
router.delete('/delete', classify.deleteClassify);
router.put('/update', classify.updateClassify);

module.exports = router;