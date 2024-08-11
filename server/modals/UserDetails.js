const mongoose = require('mongoose');

const UserDetailSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            trim:true
        },
        name:{
            type: String,
            required:true,
        },
        branch:{
            type: String,
        },
        collageid:{
            type: String,
        },
        registeredEvent:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        }],
        attendedEvent:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }],
    }
)

UserDetailSchema.index({ email: 1 }, { unique: true });
const UserDetails = mongoose.model('UserDetails', UserDetailSchema);
module.exports = UserDetails;
