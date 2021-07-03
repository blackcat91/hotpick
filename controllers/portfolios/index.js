const {Portfolios} = require('../../models/portfolios');
const { Users } = require('../../models/users');

var  getPortfolios = async (id) => {
    var portfolio;
    var portfolios = []
    if(id == null) {
        portfolios = await Portfolios.find({isPublic : true})
        return portfolios
    }
    if(id.length == 1 ) {
        portfolio = await Portfolios.findOne({_id: id[0]})
        if(!portfolio) return "Portfolio Doesn't Exist"
        return portfolio
    }
    var i;
    
    for(i =0; i < id.length; i++){
        portfolio = await Portfolios.findOne({_id: ids[i]})
        if(!portfolio) continue
        portfolios.push(portfolio)
    }
    return portfolios

}

var createPortfolio = async (portfolioInfo) => {
    var portfolio = new Portfolios(portfolioInfo)
    var savedPortfolio = await portfolio.save()
    let user = await Users.findOne({_id: portfolioInfo.userID})
    user.portfolios.push(savedPortfolio._id)
    await Users.updateOne({_id: portfolioInfo.userID}, {portfolios : user.portfolios})
    return savedPortfolio

}

var deletePortfolio = async (id) => {
    var portfolio = await Portfolios.findById(id)
    if(!portfolio) return "Portfolio Not Found"
    let user = await Users.findById(portfolio.userID)
    
    user.portfolios.filter((v, i ,a) => {
        return v != portfolio.name
    })
    await Users.updateOne({_id: portfolio.userID}, {portfolios : user.portfolios})
    await Portfolio.findByIdAndDelete(id)
    
    return 'Portfolio Deleted'

}

var addStock = async (pId,ticker) => {
    var portfolio = await Portfolios.findById(pId)
    if(!portfolio) return "Portfolio Not Found"
    if(portfolio['stocks'].includes(ticker)) return 'Stock Already In Portfolio'
    portfolio['stocks'].push(ticker)
    await Portfolios.updateOne({_id: pId}, {stocks: portfolio['stocks'], modified_on: Date.now()})
    return 'Stock Added'

}

var removeStock = async (pId, ticker) => {
   
    var portfolio = await Portfolios.findById(pId)
    if(!portfolio) return "Portfolio Not Found"
    if(!portfolio['stocks'].includes(ticker)) return 'Stock Not In Portfolio'
    var stocks = portfolio['stocks'].filter((v, i) => {return v != ticker})
    
    await Portfolios.updateOne({_id: pId}, {stocks: stocks, modified_on: Date.now()})
    return 'Stock Removed'


}


module.exports = {getPortfolios, createPortfolio, deletePortfolio, addStock, removeStock}