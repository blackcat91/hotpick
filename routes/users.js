var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
var makeRequest = require('../helpers/makeRequest')
const userController = require('../controllers/users')
const portController = require('../controllers/portfolios')
const schedule = require('node-schedule')

/* GET users listing. */
router.post('/login', async function(req, res) {
  var request = req
  var user = await userController.getUsers({userInfo: request.body})
  console.log(typeof user)
  if(typeof user == 'string') return res.status(400).send(user)
  var expiry = Date.now() + (1000 * 60 * 60 *36)
  const token = jwt.sign({_id: user._id, expiry: expiry}, process.env.SECRET)
  var update = await userController.updateUser(user._id, {jwt: token})
  if(typeof update == "string") return res.status(400).send(update)
  schedule.scheduleJob(expiry, async() => {
    var job = await userController.updateUser(user._id, {jwt: null})
    if(typeof job == "string") return res.status(400).send(job)
  })
  res.header('X-Auth-Token', token).send(token)
  
  
});


router.get('/:id', async function(req, res) {
  var request = req
  var user = await userController.getUsers({id: request.params.id})
  
  if(typeof user == "string") return res.status(400).send(user)
  res.send(user);
});

router.post('/register', async function(req, res) {
  var request = req
  var user = await userController.createUser(request.body)
  if(typeof user == "string") return res.status(400).send(user)
  var portfolio = await portController.createPortfolio({portfolio_name: 'Portfolio', userID: user._id})
  if(typeof portfolio == "string") return res.status(400).send(portfolio)
  res.send(user);
  
});

router.put('/:id', async function(req, res) {
  var request = req
  var user = await userController.updateUser(request.params.id, request.body)
  if(typeof user == "string") return res.statusCode(400).send(user)
  res.send(user);
  

});

router.delete('/', async function(req, res) {
  var request = req
  var user = await userController.deleteUser(request.body.id)
  if(typeof user == "string") return res.statusCode(400).send(user)
  res.send(user);
});


router.post('/logout', async(req, res) => {
  let token = req.body
  let logout = await userController.logOut(token)
  if(logout == 'Logout Failed!') return res.status(400).send(logout)
  res.send(logout)
})

module.exports = router;
