const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    dob: Date,
    address: String,
    phoneNumber: String,
    state: String,
    zipCode: String,
    email: String,
    gender: String,
    userType: String,
});

module.exports = mongoose.model('users', UserSchema);
