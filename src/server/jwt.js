const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

const getSaltSync = (len) => {
    return bcrypt.genSaltSync(len);
}

const hashSync = (content, salt) => {
    return bcrypt.hashSync(content, salt);
}

const signToken = (content, expiresIn) => {
    return jwt.sign(content, process.env.TOKEN_KEY, {expiresIn});
}

const verifyToken = (token) => {
    try {
        jwt.verify(token, process.env.TOKEN_KEY);
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = {
    getSaltSync,
    hashSync,
    signToken,
    verifyToken,
}
