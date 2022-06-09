const jwt = require('jsonwebtoken');
const SECRET = 'jobfinder';

function verifyToken(req,res,next) {
    const token = req.headers.authorization;

    jwt.verify(token, SECRET, (err) =>{
        if(err) {
            return res.status(401).json({message: 'invalid token'})
        }
        return next();
    })

}
module.exports = verifyToken;