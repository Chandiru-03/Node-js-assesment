const mongoose = require('mongoose');

const PolicyCategorySchema = new mongoose.Schema({
    categoryName: String,
});

module.exports = mongoose.model('policyCategory', PolicyCategorySchema);
