var express = require('express');
var router = express.Router();
var makeRequest = require('../helpers/makeRequest')
const userController = require('../controllers/users')
const schedule = require('node-schedule')

/* GET users listing. */
router.post('/login', async function(req, res) {
  var request = makeRequest(req)
  var user = await userController.getUsers({userInfo: request.body})
  if(typeof user === "String") return res.statusCode(400).send(user)
  var expiry = Date.now() + (1000 * 60 * 60 *36)
  const token = jwt.sign({_id: user._id, expiry: expiry}, process.env.SECRET)
  var update = await userController.updateUser(user._id, {jwt: token})
  if(typeof update === "String") return res.statusCode(400).send(update)
  schedule.scheduleJob(expiry, async() => {
    var job = await userController.updateUser(user._id, {jwt: null})
    if(typeof job === "String") return res.statusCode(400).send(job)
  })
  res.header('X-Auth-Token', token).send(token)
  
  
});


router.get('/:id', function(req, res) {
  var request = makeRequest(req)
  var user = await userController.getUsers({id: request.params.id})
  if(typeof user === "String") return res.statusCode(400).send(user)
  res.send(user);
});

router.post('/register', function(req, res) {
  var request = makeRequest(req)
  var user = await userController.createUser(request.body)
  if(typeof user === "String") return res.statusCode(400).send(user)
  res.send(user);
  
});

router.put('/:id', function(req, res) {
  var request = makeRequest(req)
  var user = await userController.updateUser(request.params.id, request.body)
  if(typeof user === "String") return res.statusCode(400).send(user)
  res.send(user);
  

});

router.delete('/', function(req, res) {
  var request = makeRequest(req)
  var user = await userController.deleteUser(request.body.id)
  if(typeof user === "String") return res.statusCode(400).send(user)
  res.send(user);
});

module.exports = router;
