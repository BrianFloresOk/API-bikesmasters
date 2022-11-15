const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = process.env.SECRET_WORD

async function jwtCreate(userData){
    const token = jwt.sign(userData, secret, {
        expiresIn:'1d'
    })
    return {
        success:true,
        user:userData,
        token
    }
};

module.exports = { jwtCreate }