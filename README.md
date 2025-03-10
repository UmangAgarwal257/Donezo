# Elon Musk Bot

A web application that sends weekly "What did you get done this week?" emails to recipients, inspired by Elon Musk's management style.

## 🚀 Features

- **Automated Weekly Emails**: Sends emails every Monday at 9 AM UTC
- **Recipient Management**: Add, edit, and remove email recipients
- **Email Tracking**: Logs all sent emails with status and timestamps
- **Test Functionality**: Manually trigger emails for testing

## 🛠️ Tech Stack

### Backend

- **Node.js** with **Express.js**
- **MongoDB** for data storage
- **Resend API** for email delivery
- **node-cron** for scheduling

### Frontend (To Be Implemented)

- Requirements for frontend developers are detailed below

## 📋 API Documentation

### Recipients Management

#### Get All Recipients

- **URL**: `/api/recipients`
- **Method**: `GET`
- **Response**: Array of recipient objects

```json
[
  {
    "_id": "67ceea1b360f7a5e376e0ff8",
    "email": "example@example.com",
    "name": "Example User",
    "active": true,
    "createdAt": "2025-03-10T13:33:15.017Z"
  }
]
```

#### Add New Recipient

- **URL**: `/api/recipients`
- **Method**: `POST`
- **Body**:

```json
{
  "email": "example@example.com",
  "name": "Example User",
  "active": true
}
```

- **Response**: The created recipient object

#### Update Recipient

- **URL**: `/api/recipients/:id`
- **Method**: `PATCH`
- **Body**: Any fields to update

```json
{
  "name": "Updated Name",
  "active": false
}
```

- **Response**: The updated recipient object

#### Delete Recipient

- **URL**: `/api/recipients/:id`
- **Method**: `DELETE`
- **Response**:

```json
{
  "message": "Recipient deleted"
}
```

### Email Logs

#### Get All Email Logs

- **URL**: `/api/logs`
- **Method**: `GET`
- **Response**: Array of email log objects

```json
[
  {
    "_id": "67ceeb2454277ff95d71f210",
    "recipient": {
      "_id": "67ceeb2054277ff95d71f208",
      "email": "example@example.com",
      "name": "Example User"
    },
    "status": "sent",
    "sentAt": "2025-03-10T13:37:40.199Z"
  }
]
```

#### Get Logs for Specific Recipient

- **URL**: `/api/logs/recipient/:recipientId`
- **Method**: `GET`
- **Response**: Array of email logs for the specified recipient

### Test Endpoint

#### Send Test Email

- **URL**: `/api/test/send-email`
- **Method**: `POST`
- **Response**: Results of the email sending operation

```json
{
  "message": "Test emails processed",
  "results": [
    {
      "recipient": "example@example.com",
      "status": "success",
      "emailId": "c319637d-d762-4d71-810c-10980267c06d"
    }
  ]
}
```

## 📊 Data Models

### Recipient

```javascript
{
  email: String,       // Required, unique
  name: String,        // Optional
  active: Boolean,     // Default: true
  createdAt: Date,     // Default: current date
  lastEmailedAt: Date  // Optional
}
```

### EmailLog

```javascript
{
  recipient: ObjectId, // Reference to Recipient
  status: String,      // "sent" or "failed"
  error: String,       // Only present if status is "failed"
  sentAt: Date         // When the email was sent
}
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Resend API key

### Backend Setup

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/elon-musk-bot.git
   cd elon-musk-bot
   ```

2. Install dependencies

   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file in the server directory

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Example `.env` file**:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/your_database_name
   RESEND_API_KEY=your_resend_api_key
   ```

5. Start the server
   ```bash
   npm run dev
   ```

## 🎨 Frontend Requirements

We're looking for a frontend developer to implement:

1. **Recipient Management Interface**:

   - Form to add new recipients
   - Table to display existing recipients
   - Edit and delete functionality
   - Toggle for active/inactive status

2. **Email Logs Dashboard**:

   - Display of all email logs
   - Filtering by status (sent/failed)
   - Sorting by date
   - Search functionality

3. **Test Email Interface**:

   - Button to trigger test emails
   - Feedback on email sending status

4. **Design Requirements**:
   - Clean, modern UI
   - Mobile-responsive design
   - Intuitive user experience
