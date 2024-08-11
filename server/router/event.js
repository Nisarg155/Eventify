const router = require('express').Router();

router.post('/create')
router.patch('/edit/:id')
router.delete('/delete/:id')
router.get('/:id')
router.post('/register')
router.post('accept_registration')

module.exports = router;