var express = require('express');
const router = express.Router();
var makeRequest = require('../helpers/makeRequest')
const stocksController = require('../controllers/stocks')


/* GET users listing. */
router.post('/', async function(req, res) {
 
  var stocks;
  if(!req.body._id){
  console.log(req.body)
  stocks = await stocksController.paginatedStocks()
  }
  else{
    console.log(req.body)
    stocks = await stocksController.paginatedStocks(req.body._id)
  }
  if(typeof user == "string") return res.status(400).send(stocks)
  res.send(stocks);
  
});


router.get('/topTen', async function(req, res) {
    var stocks = await stocksController.topTen()
    if(typeof stocks == "string") return res.status(400).send(stocks)
    res.send(stocks);
    
  });

router.post('/list', async function(req, res) {
    
    var stocks = await stocksController.getStocks(req.body['stocks[]'])
    if(typeof stocks == "string") return res.status(400).send(stocks)
    res.send(stocks);
});

router.get('/:ticker', async function(req, res) {
    
    var stock = await stocksController.getStocks([req.params.ticker.toUpperCase()])
    if(typeof stock == "string") return res.status(400).send(stock)
  res.send(stock);
});

router.get('/search/:query', async function(req, res) {
    
  var stock = await stocksController.searchStocks(req.params.query.toUpperCase() )
  if(typeof stock == "string") return res.status(400).send(stock)
  res.send(stock);
});


module.exports = router