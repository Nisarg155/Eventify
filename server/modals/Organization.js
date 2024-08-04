const mongoose = require('mongoose');
const Event = require('Event');
const ManagerSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Manager', ManagerSchema);
