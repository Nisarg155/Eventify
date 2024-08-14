const mongoose = require('mongoose');
const Event = require('./Event' );
const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    members:[
        {
            email: {
                type: String,
                required: true,
                trim: true,
                unique: true
            },
            name: {
                type: String,
                required: true,
                trim: true
            },
            role:{
                type: String,
                required: true,
            }
        }
    ]
});
OrganizationSchema.index({email:1} , {unique:true})
const Organization = mongoose.model('Organization', OrganizationSchema);
module.exports = Organization
