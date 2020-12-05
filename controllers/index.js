const express = require('express');
const router = express.Router();

router.use('/', require('./auth/auth'));
router.use('/api', require('./find-user/find-user'));
router.use('/', require('./friend-status/'));
router.use('/api', require('./user'));
router.use('/logout', require('./logout'));
router.use('/updatebio', require('./updatebio'));
router.use('/upload', require('./upload'));




module.exports = router;
