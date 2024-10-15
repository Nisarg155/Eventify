const mongoose = require('mongoose');
const Organization = require('./Organization')

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    organization:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organization'
    },
    poster: {
        url: {
            type: String,
        },
        fileName: String
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    Users:[{
        email: {
            type: String,
            trim: true,
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        sem: {
            type: Number,
            required: true,
        },
        branch: {
            type: String,
            trim: true,
            required: true,
        },
        registered:{
            type:Boolean,
            default:true
        },
        attended:{
            type:Boolean,
            default:false
        }
    }],
});

module.exports = mongoose.model('Event', EventSchema);
