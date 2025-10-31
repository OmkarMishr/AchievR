const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req, res) => {
    try {
        const { fullname, email, password, role, rollnumber, department } = req.body;

        let user = await userModel.findOne({ email });
        if (user) return res.status(400).send('User already exists');

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({ 
                        fullname, 
                        email, 
                        password: hash, 
                        role, 
                        rollnumber, 
                        department 
                    });
                    let token = generateToken(user);
                    res.cookie('token', token, { httpOnly: true });
                }
            });
        });

    } catch (error) {
        res.send(error.message);
    }
    res.send('User signed up successfully'); 
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await userModel.findOne({email: email});   
        if (!user) return res.status(400).send('User not found');

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.send(err.message);
            if (!isMatch) return res.status(400).send('Invalid credentials');

            let token = generateToken(user);
            res.cookie('token', token, { httpOnly: true });
            res.send('User logged in successfully');
        });
    } catch (error) {
        res.send(error.message);
    }
}