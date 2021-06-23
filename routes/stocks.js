var express = require('express');
const router = express.Router();
var makeRequest = require('../helpers/makeRequest')
const stocksController = require('../controllers/stocks')


/* GET users listing. */
router.post('/', async function(req, res) {
  var user = await stocksController.getStocks(req.body.ids)
  if(typeof user === "String") return res.statusCode(400).send(user)
  res.send(user);
  
});


router.post('/topTen', async function(req, res) {
    var stocks = await stocksController.topTen()
    if(typeof stocks === "String") return res.statusCode(400).send(stocks)
    res.send(stocks);
    
  });


router.get('/:id', async function(req, res) {
    
    var stock = await stocksController.getStocks(req.params.id)
    if(typeof stock === "String") return res.statusCode(400).send(stock)
  res.send(stock);
});


module.exports = router