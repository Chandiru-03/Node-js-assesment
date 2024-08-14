const mongoose = require('mongoose');

const UserAccountSchema = new mongoose.Schema({
    accountName: String,
});

module.exports = mongoose.model('userAccount', UserAccountSchema);
