const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    rollnumber: { type: Number, required: true, unique: true },
    department: { type: String, required: true }
});

module.exports = mongoose.model('user', userSchema);