const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema({
    users: [{
        type: String
    }],
    name: {
        type: String,
        required: true,
    },
    pin: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Group = mongoose.model('Group', GroupSchema)
