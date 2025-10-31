const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose-connection');
const signupRouter = require('./routes/signupRouter');
const expressSession = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use('/signup', signupRouter);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000);