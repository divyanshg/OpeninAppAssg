const path = require('path');
const process = require('process');

// Function to get path of a file
function getPathOf(fileName) {
    return path.join(process.cwd(), fileName)
}

module.exports = {
    getPathOf,
};