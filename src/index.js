const { google } = require('googleapis');
const { authorize } = require('./auth');
const { selfMail, replyContent, labelName } = require('./constants');
const LabelsService = require('./services/labels');
const ThreadsService = require('./services/threads');

// Create instances of the services
const threadsService = new ThreadsService();
const labelsService = new LabelsService();

async function getLabelId() {
  const { labelExists, labelsResponse } = await labelsService.labelExists(labelName);

  // Check if the label exists, and create it if not
  let labelId;
  if (!labelExists) {
    const createLabelResponse = await labelsService.createLabel(labelName);
    labelId = createLabelResponse.data.id;
  } else {
    const existingLabel = labelsService.getExistingLabel(labelsResponse.data.labels);
    labelId = existingLabel.id;
  }

  return labelId;
}

const createReply = (to, from, message, text) => {
  const oldSubject = message.headers.find(header => header.name === 'Subject').value;
  return {
    to,
    from,
    subject: `RE: ${oldSubject}`,
    text,
  };
};

// Fetch, reply, and label threads
async function replyAndTagThreads() {
  try {
    // List threads for the authenticated user
    const threads = await threadsService.listThreads();
    const labelId = await getLabelId();

    // Iterate through threads
    for (const thread of threads) {
      const threadData = await threadsService.getThread(thread.id);
      const numMessages = threadData.data.messages.length;

      // Check if the thread has at least 1 message
      if (numMessages >= 1) {
        const { message, firstMessageSender, lastMessageSender } = threadsService.getFirstAndLastSender(threadData);

        // Check if the first message is not sent by you and last message has not been auto-replied
        if (threadsService.canReplyToThread(firstMessageSender, lastMessageSender)) {
          // Get the sender's email address
          const senderEmail = firstMessageSender.split('<')[1].split('>')[0];

          // Send a reply
          await threadsService.sendReply({
            threadId: thread.id,
            reply: createReply(senderEmail, selfMail, message, replyContent),
          });

          // Label the thread
          await threadsService.labelThread(thread.id, labelId);
          console.log(`Replied to and labeled thread with subject: ${message.headers.find(header => header.name === 'Subject').value}`);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function checkAndReply() {
  console.log("Checking for new emails...");
  replyAndTagThreads();

  // Calculate a random interval between 10 seconds and 30 seconds
  const randomInterval = Math.floor(Math.random() * (30000 - 10000 + 1) + 10000);

  // Schedule the next check after the random interval
  const timeout = setTimeout(checkAndReply, randomInterval);

  console.log(`Next check in ${Math.floor(randomInterval / 1000)} seconds`);

  // Clear the timeout if the process is stopped
  process.on('SIGINT', () => {
    clearTimeout(timeout);
    console.log("Process stopped");
    process.exit();
  });
}

// Function to run the process at random intervals
async function runAtRandomIntervals() {
  try {
    // Authorize the client
    const auth = await authorize();

    // Create Gmail API client
    const service = google.gmail({ version: 'v1', auth });

    // Initialize the services
    threadsService.initializeService(service);
    labelsService.initializeManager(service);

    // Initial call
    checkAndReply();
  } catch (error) {
    console.error(error);
  }
}

// Start the process
runAtRandomIntervals();