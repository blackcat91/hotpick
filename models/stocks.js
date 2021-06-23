var mongoose = require('mongoose')


var stocksSchema = mongoose.Schema({
    ticker: {
        type: String,
        required: true,
        min: 3,
        max: 6
    },
    company_name: {
        type: String,
        required: true
        
    },
    price: {
        type: Number,
        required: true
    },
    momentum_score: {
        type: Number,
        default: []
        
    },
    value_score: {
        type: Number,
     
        
    },
    overall_score: {
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