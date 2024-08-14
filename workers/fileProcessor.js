const { parentPort, workerData } = require('worker_threads');
const mongoose = require('mongoose');
const User = require('../models/users');
const xlsx = require('xlsx');


mongoose.connect('mongodb+srv://SmartWork123:SmartWork123@cluster0.aocgo.mongodb.net/finace', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log('Connected to MongoDB in worker');
    processFile(workerData);
})
.catch(err => {
    parentPort.postMessage(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
});


const CHUNK_SIZE = 1000; // Adjust as needed

const processFile = async (filePath) => {
    debugger
    const workbook = xlsx.readFile(filePath);
    const sheetNames = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);

    // Transform the data into an array of user objects
    const users = data.map(row => ({
        firstName: row['firstName'],
        dob: row['dob'],
        address: row['address'],
        phoneNumber: row['phoneNumber'],
        state: row['state'],
        zipCode: row['zipCode'],
        email: row['email'],
        gender: row['gender'],
        userType: row['userType'],
    }));

    // Process data in chunks
    for (let i = 0; i < users.length; i += CHUNK_SIZE) {
        const chunk = users.slice(i, i + CHUNK_SIZE);
        try {
           await User.insertMany(chunk);
        } catch (error) {
            parentPort.postMessage(`Error processing file: ${error.message}`);
            return; // Stop processing on error
        }
    }
    parentPort.postMessage('File processed and data uploaded successfully');
};
