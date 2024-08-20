const router = require('express').Router();
const {create ,get_new,get_old,delete_event} = require('../controller/event');

router.post('/create',create)
router.patch('/edit/:id')
router.delete('/delete/:id',delete_event)
router.get('/new/:date',get_new)
router.get('/old/:date',get_old)
router.post('/register')
router.post('/accept_registration')

module.exports = router;