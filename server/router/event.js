const router = require('express').Router();
const {create ,get_new,get_old,delete_event,register_event ,get_registered} = require('../controller/event');

router.post('/create',create)
router.patch('/edit/:id')
router.delete('/delete/:id',delete_event)
router.get('/new/:date',get_new)
router.get('/old/:date',get_old)
router.post('/register',register_event)
router.post('/accept_registration')
router.get('/registered/:email',get_registered)


module.exports = router;