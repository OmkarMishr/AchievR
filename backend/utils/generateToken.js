const jwt = require('jsonwebtoken');
const config = require('config');

const generateToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.JWT_KEY);
};

module.exports.generateToken = generateToken;
