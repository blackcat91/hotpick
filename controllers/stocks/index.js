const {Stocks} = require('../../models/stocks')



var getStocks = (tickers) => {
    var stock;
    if(tickers.length == 1){
        stock = Stocks.findOne({ticker : tickers[0]})
        if(!stock) return 'Stock not found!'
        return stock
    }
    var stocks = []
    var i;
    for(i=0; i < tickers.length ; i++){
        stock = Stocks.findOne({ticker: tickers[i]})
        if(!stock) continue
        stocks.append(stock)
    }
    return stocks
}


module.exports = {getStocks}