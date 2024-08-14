const UserDetails = require('../modals/UserDetails');
const Organization = require('../modals/Organization');
const {createJWT} = require('../auth/auth');
const jwt = require("jsonwebtoken");

const check_organization = async (req, res) => {

    Organization.exists({email: req.params.email})
        .then(async exists => {
            if (exists) {
                const organization = await Organization.findOne({email: req.params.email}, {email: 1, name: 1, _id: 1})
                const token = createJWT({
                    email: organization.email,
                    organization_id: organization._id
                })
                res.json({
                    name: organization.name,
                    email: organization.email,
                    token: token,
                    access_level: "Administrator",
                })
            } else {
                return res.sendStatus(204)
            }
        })

}

const signup = async (req, res) => {
    // if user exist and tries to create or create new user
    UserDetails.exists({email: req.params.email}).then(async exists => {
        if (exists) {
            UserDetails.findByIdAndUpdate(exists._id, req.body).then(user => {
                const token = createJWT({email: req.body.email})
                res.json({
                    email: req.body.email,
                    name: req.body.name,
                    branch: req.body.branch,
                    collageid: req.body.collageid,
                    token: token,
                    access_level: "Guest",
                });
            })
        } else {
            const user = new UserDetails({
                name: req.body.name,
                email: req.body.email,
                branch: req.body.branch,
                collageid: req.body.collageid,
            });
            await user.save();
            const token = createJWT({email: req.body.email})
            res.json({
                email: req.body.email,
                name: req.body.name,
                branch: req.body.branch,
                collageid: req.body.collageid,
                token: token,
                access_level: "Guest",
            });
        }
    })

}

const signin = async (req, res) => {

    UserDetails.exists({email: req.params.email}).then(async user => {
        if (user) {
            UserDetails.findById(user._id).then(user => {
                const token = createJWT({email: user.email})
                res.json({
                    name: user.name,
                    email: user.email,
                    branch: user.branch,
                    collageid: user.collageid,
                    token: token,
                    access_level:"Guest"
                })
            })
        } else {
            res.sendStatus(204)
        }
    })
    // const user = await UserDetails.findOne({email: req.params.email}, {name: 1, branch: 1, collageid: 1});
    // const token = createJWT({email: req.params.email})
    // res.json({
    //     email: req.param.email,
    //     name: user.name,
    //     branch: user.branch,
    //     collageid: user.collageid,
    //     token: token,
    //     access_level:"Guest",
    // })
}
module.exports = {signup, signin, check_organization};
