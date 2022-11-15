const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = process.env.SECRET_WORD

async function jwtCreate(userData){
    const token = jwt.sign(userData, secret, {
        expiresIn:'1h'
    })
    return {
        success: true,
        user: userData,
        token
    }
};

function validateToken(req, res, next){
    
    const token = req.headers['token']

    if(!token){
        return res.status(403).json({
            success: false,
            message: "A token is required for this process"
        })
    }

    return verifyToken(token, req, res, next)
};

function verifyToken(token,req,res,next){
    try{
        const decoded = jwt.verify(token, secret)
        delete decoded.iat
        delete decoded.exp
        req.user = decoded

        return next()
    }catch({message,name}){
        return res.status(403).json({
            success:false,
            message,
            type:name
        })
    }
};

module.exports = { jwtCreate, validateToken }