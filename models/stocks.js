var mongoose = require('mongoose')


var stocksSchema = mongoose.Schema({
    ticker: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 6
    },

    momentum: {
        type: Number,
        default: []
        
    },
    value: {
        type: Number,
     
        
    },
    overall: {
        type: Number,
        
        
    },
    created_on: {
        type: Date,
        default: Date.now()
    },
    modified_on: {
        type: Date,
        default: Date.now()
    }
})


exports.Stocks = mongoose.model('Stocks', stocksSchema)