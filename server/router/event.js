const router = require('express').Router();
const {fetch_users,  get_event, update_event ,  get_registered_old,create ,get_new,get_old,delete_event,register_event ,get_registered , get_accepted , accept_registered} = require('../controller/event');

router.post('/create',create)
router.patch('/edit',update_event)
router.delete('/delete/:id/:name',delete_event)
router.get('/new/:date',get_new)
router.get('/old/:date',get_old)
router.post('/register',register_event)
router.patch('/registration/accept/',accept_registered)
router.get('/accepted/:eventId',get_accepted)
router.get('/registered/:email/:date',get_registered)
router.get('/registered/old/:email/:date',get_registered_old)
router.get('/users/:eventId',fetch_users)
router.get('/event/:id',get_event)


module.exports = router;