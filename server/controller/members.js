const UserDetails = require('../modals/UserDetails');
const Organization = require('../modals/Organization');


const fetch_members = async (req, res) => {
    try {
        await Organization.findOne({email: req.params.email}, {
            members: 1, _id: 0
        }).then((result) => {
            res.status(200).json(result)
        })
    } catch (err) {
        console.log(err.message, 'error while fetching members');
        return res.sendStatus(500)
    }
}

const fetch_users = async (req, res) => {

    try {
        await UserDetails.find({}, {
            email: 1,
            name: 1,
            role: 1,
            _id: 0
        }).then((result) => {
            res.status(200).json(result)
        })
    } catch (err) {
        console.log(err.message, 'error while fetching users');
        return res.sendStatus(500)
    }

}

const add_member = async (req, res) => {
    try {
        await UserDetails.findOneAndUpdate({email: req.body.email}, {
            role: 'Member'
        })
        await Organization.findOneAndUpdate({email: req.params.email}, {
            $push: {
                members: {
                    email: req.body.email,
                    name: req.body.name
                }
            }
        }, {new: true}).then(() => {
            fetch_users(req, res);
        })
    } catch (e) {
        console.log(e.message, 'error while adding members');
        return res.send(500)
    }
}

const remove_member = async (req, res) => {
    try {

        await UserDetails.findOneAndUpdate({email: req.body.email}, {
            role: 'Guest'
        })

        await Organization.findOne({email: req.params.email}).then((org) => {
            const email = req.body.email
            org.members = org.members.filter(member => member.email !== email )
            org.save()
            return res.status(200).json(org.members);
        })

    } catch (err) {
        console.log(err.message, 'error while removing members');
        return res.sendStatus(500)
    }
}


module.exports = {fetch_users, fetch_members, add_member, remove_member}