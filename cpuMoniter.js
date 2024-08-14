const os = require('os-utils');
const { exec } = require('child_process');

setInterval(() => {
    os.cpuUsage((v) => {
        console.log(`CPU Usage (%): ${v * 100}`);
        if (v * 100 > 70) {
            exec('pm2 restart all', (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error restarting server: ${err.message}`);
                    return;
                }
                console.log('Server restarted due to high CPU usage');
            });
        }
    });
}, 5000);
