const { allowedSender, selfMail } = require("../constants");

class ThreadsService {
    constructor(){
        this.service = null;
    }

    initializeService(service){
        this.service = service;
    }

    checkIfInitialized(){
        if(!this.service){
            throw new Error('ThreadsService not initialized');
        }

        return true;
    }

    async listThreads(){
        this.checkIfInitialized();

        const response = await this.service.users.threads.list({
            userId: 'me',
        });

        return response.data.threads || [];
    }

    async getThread(threadId){
        this.checkIfInitialized();

        return await this.service.users.threads.get({
            userId: 'me',
            id: threadId,
        });
    }

    async sendReply({threadId, reply}){
        this.checkIfInitialized();

        await this.service.users.messages.send({
            userId: 'me',
            requestBody: {
                threadId: threadId,
                raw: Buffer.from(
                    `From: ${reply.from}\n` +
                    `To: ${reply.to}\n` +
                    `Subject: ${reply.subject}\n\n` +
                    `${reply.text}`
                ).toString('base64'),
            },
        });
    }

    async labelThread(threadId, labelId){
        this.checkIfInitialized();

        await this.service.users.threads.modify({
            userId: 'me',
            id: threadId,
            requestBody: {
                addLabelIds: [labelId],
            },
        });
    }

    getFirstAndLastSender(threadData){
        const message = threadData.data.messages[0].payload;
        const numMessages = threadData.data.messages.length;

        const lastMessage = threadData.data.messages[numMessages - 1].payload;

        const lastMessageSender = lastMessage.headers.find(
            (header) => header.name === 'From'
        ).value;

        const firstMessageSender = message.headers.find(
            (header) => header.name === 'From'
        ).value;

        return {
            message,
            firstMessageSender,
            lastMessageSender
        }
    }

    canReplyToThread(firstMessageSender, lastMessageSender){
        return !firstMessageSender.includes(selfMail) && (allowedSender != "*" ? firstMessageSender.includes(allowedSender) : true) && !lastMessageSender.includes(selfMail);
    }
}

module.exports = ThreadsService;