var mongoose = require('mongoose')


var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    portfolios: {
        type: Array,
        default: []
        
    },
    created_on: {
        type: Date,
        default: Date.now()
    },
    modified_on: {
        type: Date,
        default: Date.now()
    },
    jwt: {
        type: String
    }
})


exports.Users = mongoose.model('Users', userSchema)