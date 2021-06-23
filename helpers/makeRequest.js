module.exports.default = function makeRequest(req) {
    
    return Object.freeze({
        body : req.body,
        params: req.params,
        query: req.query, 
        headers: req.headers
    })
}