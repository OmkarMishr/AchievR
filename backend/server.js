const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose-connection');
const signupRouter = require('./routes/signupRouter');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/signup', signupRouter);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000);