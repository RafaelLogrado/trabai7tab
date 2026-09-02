const jwt = require("jsonwebtoken")

const SECRET = process.env.JWT_SECRET

function generateToken(payload){
    return jwt.sign(payload, SECRET, { expiresIn: process.env.JWT_EXPIRES_IN})
}


function verifyToken(token){
    try{
        return jwt.verify(token, SECRET)
    }catch(err){
        console.error("Erro ao verificar o token")
        return null
    }
}

module.exports = { generateToken, verifyToken }