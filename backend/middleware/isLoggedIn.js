const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels');

module.exports.isLoggedIn = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash("error",'you need to login first');
        return res.redirect('/signup');
    }

    try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    req.user = await userModel
    .findOne({email: decoded.email})
    .select('-password');

    next();
    } 
    catch (error) {
        req.flash("error", 'Invalid token');
        return res.redirect('/signup');
    }
};

