const mongoose = require('mongoose');

const PolicyInfoSchema = new mongoose.Schema({
    policyNumber: String,
    policyStartDate: Date,
    policyEndDate: Date,
    policyCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'policyCategory' },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'policyCarrier' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('policyInfo', PolicyInfoSchema);
