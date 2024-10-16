const Event = require('../modals/Event')
const moment = require("moment");
const Organization = require('../modals/Organization');
const User = require('../modals/UserDetails');
const {registratationTemplate} = require("../mail_service/templates/registratation");
const {sendEmail} = require('../mail_service/mailgun')
const delete_template = require('../mail_service/templates/delete')


const delete_event = async (req, res) => {
    console.log(req.params.id)
    try {
        const eventname = req.params.name;
       await  Event.exists({_id: req.params.id}).then(async (existingEvent) => {
            if (existingEvent) {
                 await Event.findByIdAndDelete(req.params.id)
                const users = await User.find({},{
                    email:1,name:1
                })
                 const subject = "Event Cancellation Notice";
                users.forEach((user) => {
                    const html = delete_template(user.name,eventname)
                    sendEmail(user.email,subject,html)
                })

                return res.status(200).json({
                    success: false,
                    message: 'Event Deleted Successfully'
                })

            } else {
                console.log('delete , event not found')
                return res.status(200).json({
                    success: false,
                    message: 'Not Found'
                })
            }
        })
    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}


const register_event = async (req, res) => {
    try {
        await Event.findOneAndUpdate({_id: req.body.eventId}, {
            $push: {
                Users: {
                    email: req.body.email,
                    name: req.body.name,
                    sem: req.body.sem,
                    branch: req.body.branch,
                    registered: true
                }
            }

        }, {
            new: true
        })

        await User.findOneAndUpdate({email: req.body.email}, {
            $push: {
                registeredEvent: req.body.eventId
            }
        }, {new: true})

        res.status(200).json({
            _id:req.body.eventId
        })

    } catch
        (e) {
        console.log(e.message, 'error in event registration')
        return res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}

const create = async (req, res) => {
    try {
        const parseDate = moment(req.body.date, 'DD/MM/YYYY', true);
        if (parseDate.isValid()) {
            const date = parseDate.format('YYYY-MM-DD');
            let org_id;
            await Organization.findOne({email: req.body.email}).then((res) => {
                org_id = res._id
            })
            const event = new Event({
                name: req.body.name,
                description: req.body.description,
                date: date,
                location: req.body.location,
                time: req.body.time,
                organization: org_id
            })
            await event.save().then((result) => {
                res.json({
                    id: result._id,
                    name: result.name,
                    description: result.description,
                    date: result.date,
                    location: result.location,
                    time: result.time,
                });
            }).catch((err) => {
                console.log(err.message, 'error in creating event');
                return res.status(500).json({
                    message: 'Internal Server  Error'
                })
            })
        } else {
            return res.status(400).json({
                message: 'Internal Server Error'
            });
        }
    } catch (e) {
        console.log(e.message, 'error in creating event')
        return res.status(500).json({
            message: 'Internal Server Error',
        })
    }

}

const get_new = async (req, res) => {
    try {
        await Event.find({
            date: {
                $gte: new Date(req.params.date),
            },
        }, {
            _id: 1, name: 1, description: 1, location: 1, time: 1, date: 1
        }).sort({date: 1}).then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err.message, 'in finding events');
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        })
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}

const get_old = async (req, res) => {
    try {
        await Event.find({
            date: {$lt: new Date(req.params.date)}
        }, {
            _id: 1, name: 1, description: 1, location: 1, time: 1, date: 1
        }).sort({date: -1}).then((result) => {
            res.status(200).json(result)
        })
    } catch (e) {
        console.log(e.message, 'error in finding old events')
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}

const get_accepted = async (req, res) => {
    try {
        await Event.findOne({_id: req.params.eventId}, {
            _id: 0, registeredUsers: 1, attendedUsers: {
                $map: {
                    input: '$attendedUsers',
                    as: 'user',
                    in: {email: '$$user.email', sem: '$$user.sem', branch: '$$user.branch'},
                }
            }
        }).then((users) => {
            if (users) {
                res.status(200).json(users)
            }
        })
    } catch (e) {
        console.log(e.message, 'error while getting accepted users')
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}

const accept_registered = async (req, res) => {
    try {
        await User.findOneAndUpdate({email: req.body.email}, {
            $push: {
                attendedEvent: req.body.eventId
            }
        })

        await Event.findOneAndUpdate({_id: req.body.eventId , "Users.email":req.body.email }, {
            $set:{
                "Users.$.attended": true,
            }
        }, {new: true}).then((result) => {
            res.status(200).json({
                Users:result.Users
            })
        })
    } catch (e) {
        console.log(e.message, 'error while accepting registration')
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}

const get_registered = async (req, res) => {
    try {
        const date = new Date(req.params.date)
        const user = await User.findOne({email: req.params.email}, {
            registeredEvent: 1, _id: 0,attendedEvent: 1
        })

        const registeredIds = await Event.find({
            _id: {$in: user.registeredEvent},
            date: {$gt: date} // Filter events after the specified date
        }).select('_id'); // Select only the _id field

        const attendedIds = await Event.find({
            _id: {$in: user.attendedEvent},
            date: {$gt: date} // Filter events after the specified date
        }).select('_id');

        return res.status(200).json({
            registeredIds: registeredIds,
            attendedIds:attendedIds
        });
    } catch (e) {
        console.log(e.message, 'error while getting registered event')
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}

const fetch_users = async (req, res) => {
    try{
        Event.findOne({_id:req.params.eventId},{
            _id:0,Users:1
        }).then(users => {
            res.status(200).json(users)
        })
    }catch(e)
    {
        console.log(e.message, 'error while getting users')
        res.status(500).json({
            message: 'internal server error'
        })
    }

}

module.exports = {
    create,
    get_new,
    get_old,
    delete_event,
    register_event,
    get_registered,
    get_accepted,
    accept_registered,
    fetch_users
}
