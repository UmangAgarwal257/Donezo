# Donezo

A modern web application that sends personalized weekly review emails in the style of tech visionaries like Elon Musk and Steve Jobs. Built with Next.js, Express, and MongoDB.

## ✨ Features

- **Stylized Email Templates**
  - Elon Musk style - Direct and results-focused
  - Steve Jobs style - Visionary and product-focused
  - Weekly check-ins and reminders

- **Modern Web Interface**
  - Clean, dark-themed UI with glassmorphism effects
  - Mobile-responsive design
  - Real-time feedback with toast notifications

- **Email Management**
  - Send instant test emails
  - Automated weekly emails (every Monday at 9 AM UTC)
  - Email delivery tracking and logging

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Beautiful, consistent icons
- **React Hot Toast** - Elegant notifications

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Resend** - Modern email delivery
- **Node-cron** - Email scheduling

## 🚀 Getting Started

### Prerequisites
- Node.js 14 or higher
- MongoDB
- [Resend](https://resend.com) API key

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd weekly-review-email
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Configure backend environment
Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
RESEND_API_KEY=your_resend_api_key
```

4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

5. Configure frontend environment
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running the Application

1. Start the backend server
```bash
cd server
npm run dev
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## 📧 Email Templates

### Weekly Check Template
- Subject: "Weekly Review: What did you accomplish?"
- Customized greeting with recipient's name
- Available in both Elon Musk and Steve Jobs styles

### Reminder Template
- Subject: "Quick Check-in"
- More casual tone for follow-ups
- Available in both leadership styles

## 🔍 API Endpoints

### Test Email
- `POST /api/test/send-email`
```json
{
  "style": "elonMusk",
  "type": "weeklyCheck",
  "recipient": {
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### Email Logs
- `GET /api/logs` - Get all email logs
- `GET /api/logs/recipient/:recipientId` - Get logs for specific recipient

## 📱 Frontend Pages

### Landing Page
- Modern, animated hero section
- Quick access to email testing
- Social links and project information

### Email Testing Interface
- Email template selection
- Recipient information input
- Instant feedback on email status

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by leadership styles of tech visionaries
- Built with modern web technologies
- Designed for simplicity and effectiveness
