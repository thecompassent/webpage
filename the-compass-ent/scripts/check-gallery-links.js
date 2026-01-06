const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'lib', 'data.ts');
const publicPath = path.join(__dirname, '..', 'public');

const dataContent = fs.readFileSync(dataPath, 'utf8');

// Find all /images/events/ paths (only event images)
const regex = /["']\/images\/events\/([^"']+)["']/g;
let match;
const missingFiles = [];
const checkedPaths = new Set();

while ((match = regex.exec(dataContent)) !== null) {
    const relativePath = match[1];
    if (checkedPaths.has(relativePath)) continue;
    checkedPaths.add(relativePath);

    const fullPath = path.join(publicPath, 'images', 'events', relativePath);
    if (!fs.existsSync(fullPath)) {
        missingFiles.push({
            dataPath: `/images/events/${relativePath}`,
            fullPath: fullPath
        });
    }
}

console.log(`Checked ${checkedPaths.size} unique event image paths.\n`);

if (missingFiles.length === 0) {
    console.log('All event gallery images are correctly linked!');
} else {
    console.log(`Found ${missingFiles.length} missing event images:\n`);
    missingFiles.forEach(f => {
        console.log(`MISSING: ${f.dataPath}`);
        console.log(`  Full path: ${f.fullPath}\n`);
    });
}
