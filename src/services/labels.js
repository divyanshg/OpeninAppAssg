const { labelName } = require("../constants");

class LabelsManager{
    constructor(){
        this.service = null;
    }

    initializeManager(service){
        this.service = service;
    }

    checkIfInitialized(){
        if(!this.service){
            throw new Error('LabelsManager not initialized');
        }

        return true;
    }

    async labelExists(labelName) {
        this.checkIfInitialized();

        // Check if the label exists, and create it if not
        const labelsResponse = await this.service.users.labels.list({
            userId: 'me',
        });

        const labelExists = labelsResponse.data.labels.some(label => label.name === labelName);

        return {labelExists, labelsResponse};
    }

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

    getExistingLabel(labels){
        return labels.find(label => label.name === labelName)
    }
}

module.exports = LabelsManager;