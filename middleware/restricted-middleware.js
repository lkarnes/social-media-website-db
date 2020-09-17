const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.headers.token;
    if(req.decodedJwt) {
        next();
    }else if(token){
        jwt.verify(token, process.env.SECRET, (err, decodedJwt) => {
            if(err) {
                res.status(401).json({access:"token is not valid", error: err})
            } else {
                req.decodedJwt = decodedJwt; 
                next();
            }
        })
    } else {
        res.status(401).json({access:"headers does not contain token"})
    }
}