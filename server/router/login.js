const router = require('express').Router();
const {signup,signin , check_organization} = require('../controller/login');

router.get('/check/organization/:email',check_organization)
router.post('/signup',signup);
router.get('/signin/:email',signin);

module.exports = router;