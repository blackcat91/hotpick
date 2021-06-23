var express = require('express');
const router = express.Router();
const makeRequest = require('../helpers/makeRequest')
const portfolioController = require('../controllers/portfolios')


/* GET users listing. */
router.get('/', async function(req, res) {
  var portfolios = await portfolioController.getPortfolios()
  if(typeof portfolios === "String") return res.statusCode(400).send(portfolios)
  res.send(portfolios);
  
});

router.get('/:id', async function(req, res) {
  
  var portfolio = await portfolioController.getPortfolios([req.params.id])
  if(typeof portfolio === "String") return res.statusCode(400).send(portfolio)
  res.send(portfolio);
});

router.post('/', async function(req, res) {
  
  var portfolio = await portfolioController.getPortfolios([req.body.ids])
  if(typeof portfolio === "String") return res.statusCode(400).send(portfolio)
  res.send(portfolio);
});

router.post('/create', async function(req, res) {
  
  var portfolio = await portfolioController.createPortfolio(req.body)
  if(typeof portfolio === "String") return res.statusCode(400).send(portfolio)
  res.send(portfolio);
});


router.delete('/', async function(req, res) {
  
  var portfolio = await portfolioController.deletePortfolio(req.body.id)
  if(portfolio == "Portfolio Not Found") return res.statusCode(400).send(portfolio)
  res.send(portfolio);
});


router.put('/add', async function(req, res) {
  
  var portfolio = await portfolioController.addStock(req.body.pId, req.body.ticker)
  if(portfolio != "Stock Added") return res.statusCode(400).send(portfolio)
  res.send(portfolio);
});

router.put('/remove', async function(req, res) {
  
  var portfolio = await portfolioController.removeStock(req.body.pId, req.body.ticker)
  if(portfolio != "Stock Removed") return res.statusCode(400).send(portfolio)
  res.send(portfolio);
});


module.exports = router