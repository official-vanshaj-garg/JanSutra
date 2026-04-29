const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '../client/dist');
const dest = path.join(__dirname, '../server/public');

console.log('Copying client build from', source, 'to', dest);

try {
    if (fs.existsSync(dest)) {
        fs.rmSync(dest, { recursive: true, force: true });
    }
    
    if (fs.existsSync(source)) {
        fs.cpSync(source, dest, { recursive: true });
        console.log('Client build copied to server public directory successfully.');
    } else {
        console.error('Error: Client build directory not found. Please run build in client/ first.');
        process.exit(1);
    }
} catch (error) {
    console.error('Error copying client build:', error.message);
    process.exit(1);
}
