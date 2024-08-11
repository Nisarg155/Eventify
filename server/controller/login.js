const UserDetails = require('../modals/UserDetails');
const {createJWT} = require('../auth/auth');
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
    const user = new UserDetails({
        name:req.body.name,
        email:req.body.email,
        branch:req.body.branch,
        collageid:req.body.collageid
    });
    await user.save();
    const token = createJWT({email:req.body.email})
   res.json({
       token:token
   });
}

const signin = async (req, res) => {
    const user = await UserDetails.findOne({
        email:req.body.email
    },{email: 1,name: 1,branch: 1,collageid:1})
    const token = createJWT({email:req.body.email})
    console.log(user.email)
    res.json({
        token:token,
        user:{
            "name":user.name,
            "email":user.email,
            "branch":user.branch,
            "collageid":user.collageid
        }
    })
}
module.exports = {signup,signin};
