const { authenticate } = require('@google-cloud/local-auth');
const { getPathOf } = require('./utils');
const { loadSavedCredentialsIfExist, saveCredentials } = require('./credentials');

// Define the scopes required for Gmail API
const SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.labels',
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.addons.current.action.compose',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.send'
];

// Path for credentials files
const CREDENTIALS_PATH = getPathOf('credentials.json');

// Function to authorize the application using saved or new credentials
async function authorize() {
    console.log("Please log in to your Google account...");
    let client = await loadSavedCredentialsIfExist();

    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });

    if (client.credentials) {
        console.log("Authorization successful");
        await saveCredentials(client);
    } else {
        console.log("Authorization failed");
    }

    return client;
}

// Export function
module.exports = {
    authorize,
};
