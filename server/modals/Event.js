const mongoose = require('mongoose');


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
    poster: {
        url: {
            type: String,
            required: true
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
    registeredUsers: [{
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
        sem: {
            type: Number,
            required: true
        },
        branch: {
            type: String,
            required: true,
            trim: true
        }
    }],
    attendedUsers: [{
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
        sem: {
            type: Number,
            required: true
        },
        branch: {
            type: String,
            required: true,
            trim: true
        }
    }],

    countByBranchAndSem: [{
        branchName: {
            type: String,
            required: true,
            trim: true
        },
        sem: {
            type: Number,
            required: true
        },
        count: {
            type: Number,
            required: true,
            default: 0 // Initialize count to 0
        }
    }]
});


EventSchema.index({ 'registeredUsers.email': 1 });
module.exports = mongoose.model('Event', EventSchema);
