const {Stocks} = require('../../models/stocks')



var getStocks = async (tickers) => {
    var stock;
    if(tickers.length == 1){
        stock = await Stocks.findOne({ticker : tickers[0]})
        if(!stock) return 'Stock not found!'
        return stock
    }
    var stocks = []
    var i;
    for(i=0; i < tickers.length ; i++){
        stock = await Stocks.findOne({ticker: tickers[i].toUpperCase()})
        if(!stock) continue
        stocks.push(stock)
    }
    return stocks
}

var searchStocks = async (ticker) => {
    var stocks;
    console.log(ticker)
    let regexp = new RegExp(ticker, 'i')
    stocks = await Stocks.find({ticker : regexp})
    if(!stocks) return 'Stock not found!'
        
   
    return stocks
}


var paginatedStocks = async (startID) => {
    let stocks;
    if(!startID){
        stocks = Stocks.find().limit(15).sort({'ticker': 1})
        
        return stocks
    }
    
    stocks = Stocks.find({_id: {$gt: startID}}).limit(15).sort({'ticker': 1})
    console.log(startID)
    return stocks
}

var topTen = async() => {
    var topT = await Stocks.find().sort({'overall': -1}).limit(10)
    if(!topT)  return 'Error Retrieving Top Ten!'
    return topT
}

module.exports = {getStocks, topTen, paginatedStocks, searchStocks}