const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId
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

//creating a group
//first user should appear
//then add other people in this group