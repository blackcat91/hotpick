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
        stocks.append(stock)
    }
    return stocks
}


var topTen = async() => {
    var topT = await Stocks.find().sort({'overall': -1}).limit(10)
    if(!topT)  return 'Error Retrieving Top Ten!'
    return topT
}

module.exports = {getStocks, topTen}