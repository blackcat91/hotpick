var mongoose = require('mongoose')


var portfolioSchema = mongoose.Schema({
    portfolio_name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    heat_score: {
        type: Number,
        
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    stocks: {
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
    }
})


exports.Portfolios = mongoose.model('Portfolios', portfolioSchema)