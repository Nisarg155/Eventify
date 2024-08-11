const router = require('express').Router();
const {signup,signin} = require('../controller/login');

router.post('/signup',signup);
router.get('/signin',signin);

module.exports = router;