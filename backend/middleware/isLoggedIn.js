const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels');

module.exports.isLoggedIn = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash("error",'you need to login first');
        return res.redirect('/signup');
    }
};