const router = require('express').Router();
const {fetch_members, fetch_users,add_member , remove_member} = require('../controller/members');

router.get('/members/:email',fetch_members)
router.get('/users',fetch_users)
router.post('/add/:email',add_member)
router.delete('/remove/:email',remove_member)

module.exports = router;