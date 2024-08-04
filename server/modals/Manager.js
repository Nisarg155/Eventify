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
    number: String,
    role: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Manager', ManagerSchema);
