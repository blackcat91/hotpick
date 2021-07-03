const jwt = require('jsonwebtoken')


var verify = (req, res, next) => {
  

    try{
        let token = req.body.token
        const verified = jwt.verify(token, process.env.SECRET)
        res.send(verified)
     
    }
    catch(err) {
        return res.status(401).send('Access Denied \n Token was invalid')
    }
}


module.exports.verify = verify;