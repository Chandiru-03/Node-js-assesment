const express = require('express');
const User = require('../models/users');
const PolicyInfo = require('../models/policyInfo');

const router = express.Router();

router.get('/policy/:username', async (req, res) => {
    try {
        const user = await User.findOne({ firstName: req.params.username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const policies = await PolicyInfo.find({ userId: user._id })
            .populate('policyCategoryId')
            .populate('companyId');
        res.json(policies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/aggregated-policies', async (req, res) => {
    try {
        const policies = await PolicyInfo.aggregate([
            { $group: { _id: '$userId', totalPolicies: { $sum: 1 } } },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            { $project: { 'user.firstName': 1, totalPolicies: 1 } },
        ]);

        res.json(policies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
