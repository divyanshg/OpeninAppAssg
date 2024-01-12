const { google } = require('googleapis');
const { getPathOf } = require('./utils');

const fs = require('fs').promises;

// Path for token.json file and credentials.json file
//it is used to store the user's access and refresh tokens, and is created
//automatically when the authorization flow completes for the first time.

const TOKEN_PATH = getPathOf('token.json');
const CREDENTIALS_PATH = getPathOf('credentials.json');

// Function to load saved credentials if they exist
// If they don't exist, return null
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);

        console.log("Credentials loaded from file");
        const client = google.auth.fromJSON(credentials);
        return client
    } catch (err) {
        return null;
    }
}

// Function to save credentials to file
// This is used to store credentials after the first authorization flow
// It saves the access and refresh tokens for later use in token.json file
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;

    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });

    // Write credentials to file
    await fs.writeFile(TOKEN_PATH, payload);
    console.log("Credentials saved to file");
}

// Export functions
module.exports = {
    loadSavedCredentialsIfExist,
    saveCredentials,
};