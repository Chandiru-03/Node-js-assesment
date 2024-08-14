const mongoose = require('mongoose');

const PolicyCarrierSchema = new mongoose.Schema({
    companyName: String,
});

module.exports = mongoose.model('policyCarrier', PolicyCarrierSchema);
