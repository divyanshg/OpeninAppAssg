const { labelName } = require("../constants");

class LabelsManager{
    constructor(){
        this.service = null;
    }

    // Initialize the manager with the Gmail API service
    initializeManager(service){
        this.service = service;
    }

    // Check if the manager is initialized
    checkIfInitialized(){
        if(!this.service){
            throw new Error('LabelsManager not initialized');
        }

        return true;
    }

    // Check if the label exists
    async labelExists(labelName) {
        this.checkIfInitialized();

        // Check if the label exists, and create it if not
        const labelsResponse = await this.service.users.labels.list({
            userId: 'me',
        });

        const labelExists = labelsResponse.data.labels.some(label => label.name === labelName);

        return {labelExists, labelsResponse};
    }

    // Create a new label
    async createLabel(labelName) {
        this.checkIfInitialized();
        return await this.service.users.labels.create({
            userId: 'me',
            requestBody: {
                name: labelName,
                labelListVisibility: 'labelShow',
                messageListVisibility: 'show',
            },
        });
    }

    // Get the label ID for the label we want to add to the message
    getExistingLabel(labels){
        return labels.find(label => label.name === labelName)
    }
}

module.exports = LabelsManager;