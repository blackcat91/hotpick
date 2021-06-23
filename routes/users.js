var express = require('express');
var router = express.Router();
var makeRequest = require('../helpers/makeRequest')
const userController = require('../controllers/users')


/* GET users listing. */
router.post('/login', async function(req, res) {
  var request = makeRequest(req)
  var user = await userController.getUsers({userInfo: request.body})
  if(typeof user === "String") return res.statusCode(400).send(user)
  res.send(user);
  
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
