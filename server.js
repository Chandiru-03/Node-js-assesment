const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/upload');
const policyRoutes = require('./routes/policy');
const scheduledMessageRoutes = require('./routes/scheduledMessage');

// Initialize Express App
const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://SmartWork123:SmartWork123@cluster0.aocgo.mongodb.net/finace', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000, // Increase server selection timeout
    socketTimeoutMS: 45000,  
   
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});


// Routes
app.use('/api', uploadRoutes);
app.use('/api', policyRoutes);
app.use('/api', scheduledMessageRoutes);

// Start Server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Start CPU Monitoring
require('./cpuMoniter');
