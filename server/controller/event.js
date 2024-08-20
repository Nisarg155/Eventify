const Event = require('../modals/Event')
const moment = require("moment");
const Organization = require('../modals/Organization');

const delete_event = async (req, res) => {
    try{
        Event.exists({_id:req.params.id}).then((existingEvent)=>{
            if(existingEvent){
                Event.findByIdAndDelete(req.params.id).then(() => {
                    res.status(200).json({
                        success: true,
                        message:'Successfully Deleted'
                    })
                })
            }
            else {
                console.log('delete , event not found')
                return res.status(200).json({
                    success:false,
                    message:'Not Found'
                })
            }
        })
    }catch (e) {
        console.log(e.message)
        res.status(500).json({
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
                console.log(err.message,'error in creating event');
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
        console.log(e.message,'error in creating event')
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
    try{
        await Event.find({
            date: { $lt: new Date(req.params.date) }
        },{
            _id: 1,name: 1, description: 1, location: 1, time: 1, date: 1
        }).sort({date: -1}).then((result) => {
            res.status(200).json(result)
        })
    }catch (e) {
        console.log(e.message,'error in finding old events')
    }
}

module.exports = {create, get_new ,get_old,delete_event}
