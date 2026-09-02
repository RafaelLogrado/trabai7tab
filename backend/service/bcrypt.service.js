const bcrypt = require("bcrypt")
const SALT_ROUNDS = 10

// gera hash
async function hashPassword(password){
    return await bcrypt.hash(password, SALT_ROUNDS)
}

// compara hash com senha
async function comparePassword(password, hash){
    return await bcrypt.compare(password, hash)
}

module.exports = { hashPassword, comparePassword }