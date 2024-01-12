
# Gmail Auto-Reply Bot

Automate the process of replying to first-time emails and labeling them in Gmail.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Technologies and Libraries](#technologies-and-libraries)
- [Code Structure](#code-structure)

## Introduction

This project is a Gmail Auto-Reply Bot designed to identify and respond to first-time emails received in your Gmail mailbox. The bot sends automated replies with customizable content and labels the threads for better organization.

## Features

- Automatically replies to first-time emails.
- Labels the threads in Gmail for better organization.
- Uses local authentication for secure access to Gmail APIs (Login with Google).
- Periodically checks for new emails at random intervals.

## Getting Started

### Prerequisites

- Node.js installed
- Gmail API credentials (credentials.json)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/gmail-auto-reply-bot.git
   cd gmail-auto-reply-bot
2. Install Dependencies
	```bash
	npm install

### Configuration
1.  Obtain Gmail API credentials:
    
    -   Follow the Gmail API Quickstart guide to obtain the `credentials.json` file.
2.  Configure constants:
    
    -   Open the `constants.js` file and update `selfMail`, `replyContent`, and `labelName` with your email address, desired reply content, and label name.
3. Create a `credentials.json` file
	- store your obtained gmail `credentials` in this file

### Usage
Run the application using the following command:
`npm start`

The bot will check for new emails, reply to first-time emails, and label the threads at random intervals.

## Technologies and Libraries
### 1. Google APIs (googleapis)

**Description:** The `googleapis` library is a collection of Google APIs client libraries. It provides a set of APIs for interacting with various Google services, including Gmail.

**Purpose in Code:** Used for creating the Gmail API client and accessing Gmail-related functionalities.

----------

### 2. Local Authentication Module (@google-cloud/local-auth and ./auth module)

**Description:** Local authentication module provides a mechanism for authenticating the application locally, usually during development. It helps in obtaining OAuth 2.0 tokens without the need for a web server.

**Purpose in Code:** Used for authenticating the application to access Gmail APIs locally.

----------

### 3. Constants Module (./constants module)

**Description:** A module containing constants used throughout the application, such as email addresses, reply content, and label names.

**Purpose in Code:** Provides a centralized location for managing constants used in the application.

----------

### 4. Services Modules (./services/labels and ./services/threads modules)

**Description:** Modules that encapsulate functionalities related to Gmail labels and threads. They abstract away the complexity of API interactions and provide methods for common operations.

**Purpose in Code:** Improves code organization and maintainability by modularizing functionalities related to labels and threads.

----------

### 5. ThreadsService and LabelsService Instances

**Description:** Instances of `ThreadsService` and `LabelsService` classes are created to encapsulate methods related to threads and labels, respectively.

**Purpose in Code:** Improves code organization and adheres to the principles of object-oriented programming by encapsulating related functionalities into separate instances.

----------

### 6. Async/Await Syntax and Promises

**Description:** The code extensively uses `async/await` syntax to handle asynchronous operations. Promises are utilized for handling asynchronous tasks and improving code readability.

**Purpose in Code:** Ensures non-blocking behavior, making the code more readable and maintainable when dealing with asynchronous operations, such as API requests.

----------

### 7. Arrow Functions and Template Literals

**Description:** Arrow functions are used for concise syntax, and template literals are employed for string interpolation and improved readability.

**Purpose in Code:** Enhances code readability and provides a more modern and concise syntax.

----------

### 8. Random Interval Calculation and Timeout Handling

**Description:** The code calculates a random interval between 10 and 30 seconds for checking emails. It uses `setTimeout` to schedule the next email check and handles the process interruption with `process.on('SIGINT')`.

**Purpose in Code:** Ensures periodic and random checking of emails and provides a mechanism to gracefully handle the interruption of the checking process.

----------

### 9. SIGINT Signal Handling

**Description:** The code listens for the `SIGINT` signal (Ctrl+C) and clears the timeout, ensuring a clean exit when the process is stopped.

**Purpose in Code:** Provides a graceful way to stop the periodic email checking process.

----------

### 10. Error Handling (try/catch blocks)

**Description:** The code utilizes `try/catch` blocks for error handling, capturing and logging any errors that occur during the execution of asynchronous tasks.

**Purpose in Code:** Ensures robust error handling, making the application more resilient to unexpected issues.

----------

### 11. ES6 Features (Destructuring, Object Shorthand, Arrow Functions)

**Description:** The code takes advantage of ES6 features, including destructuring, object shorthand notation, and arrow functions, to write cleaner and more concise code.

**Purpose in Code:** Enhances code readability and adheres to modern JavaScript standards.

----------

### 12. Clearing Timeout on Process Exit (process.on('SIGINT'))

**Description:** The code listens for the `SIGINT` signal to handle the process exit gracefully by clearing the timeout.

**Purpose in Code:** Ensures proper cleanup when the application is stopped, preventing lingering processes.

----------

### 13. Dynamic Subject Generation (createReply Function)

**Description:** The `createReply` function dynamically generates the subject for the reply based on the original email's subject.

**Purpose in Code:** Provides flexibility and maintains context in the subject line of the automated replies.

## Code Structure

-   `auth.js`: Handles local authentication and token retrieval.
-   `constants.js`: Centralizes constants used throughout the application.
-   `services/labels.js` and `services/threads.js`: Modules encapsulating functionalities related to Gmail labels and threads.
-   `index.js`: Main application entry point.