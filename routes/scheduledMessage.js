const express = require('express');
const mongoose = require('mongoose');
const schedule = require('node-schedule');

const ScheduledMessageSchema = new mongoose.Schema({
    message: String,
    day: String,
    time: String,
    scheduledDateTime: Date,
});

const ScheduledMessage = mongoose.model('ScheduledMessage', ScheduledMessageSchema);

const router = express.Router();

router.post('/schedule-message', async (req, res) => {
    const { message, day, time } = req.body;

    const scheduledDateTime = new Date(`${day}T${time}`);
    const scheduledMessage = new ScheduledMessage({ message, day, time, scheduledDateTime });
    await scheduledMessage.save();

    schedule.scheduleJob(scheduledDateTime, async () => {
        console.log(`Message: ${message} sent at ${scheduledDateTime}`);
    });

    res.json({ message: 'Message scheduled successfully' });
});

module.exports = router;
