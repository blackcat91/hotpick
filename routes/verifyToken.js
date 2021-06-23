const jwt = require('jsonwebtoken')


var verify = (req, res, next) => {
    const token = req.header('X-Auth-Token');
    if(!token) return res.status(401).send('Access Denied')


    try{
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified
        next()
     
    }
    catch(err) {
        return res.status(401).send('Access Denied \n Token was invalid')
    }
}


module.exports.verify = verify;