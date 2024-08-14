const express = require('express');
const multer = require('multer');
const path = require('path');
const { Worker } = require('worker_threads');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

function uploadFile(filePath) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, '../workers/fileProcessor.js'), {
            workerData: filePath,
        });

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const result = await uploadFile(req.file.path);
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
