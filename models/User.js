const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    venmo: {
        type: String,
        default: ''
    },
    group_id: [{
        type: mongoose.Schema.Types.ObjectId,
        default: []
    }],
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = User = mongoose.model('User', UserSchema)
