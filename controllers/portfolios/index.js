const {Portfolios} = require('../../models/portfolios')

var  getPortfolios = async (ids) => {
    var portfolio;
    var portfolios = []
    if(ids == null) {
        portfolios = await Portfolios.find({isPublic : true})
        return portfolios
    }
    if(ids.length == 1 ) {
        portfolio = await Portfolios.findOne({_id: ids[0]})
        if(!portfolio) return "Portfolio Doesn't Exist"
        return portfolio
    }
    var i;
    
    for(i =0; i < ids.length; i++){
        portfolio = await Portfolios.findOne({_id: ids[i]})
        if(!portfolio) continue
        portfolios.append(portfolio)
    }
    return portfolios

}

var createPortfolio = async (portfolioInfo) => {
    var portfolio = new Portfolio(portfolioInfo)
    return portfolio

}

var deletePortfolio = async (id) => {
    var portfolio = await Portfolios.findById(id)
    if(!portfolio) return "Portfolio Not Found"
    await Portfolio.findByIdAndDelete(id)
    return 'Portfolio Deleted'

}

var addStock = async (pId,ticker) => {
    var portfolio = await Portfolios.findById(pId)
    if(!portfolio) return "Portfolio Not Found"
    if(portfolio['stocks'].includes(ticker)) return 'Stock Already In Portfolio'
    portfolio['stocks'].append(ticker)
    await Portfolios.updateOne({_id: pID}, {stocks: portfolio['stocks'], modified_on: Date.now()})
    return 'Stock Added'

}

var removeStock = async (pId, ticker) => {
   
    var portfolio = await Portfolios.findById(pId)
    if(!portfolio) return "Portfolio Not Found"
    if(!portfolio['stocks'].includes(ticker)) return 'Stock Not In Portfolio'
    var stocks = portfolio['stocks'].filter((v) => {return v != ticker})
    
    await Portfolios.updateOne({_id: pID}, {stocks: stocks, modified_on: Date.now()})
    return 'Stock Removed'


}


module.exports = {getPortfolios, createPortfolio, deletePortfolio, addStock, removeStock}