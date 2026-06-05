# Event Management Backend API

> 🚀 Personal backend project for a comprehensive event management system. Currently in active development.

## Overview

A robust Node.js backend API for managing events, users, payments, and team coordination. Built with Express.js and MongoDB, featuring authentication, real-time caching, email notifications, and payment processing.

## 🎯 Features

- **User Management**
  - Authentication with JWT tokens
  - Email OTP verification
  - Role-based access control (RBAC)
  - User profiles and settings

- **Event Management**
  - Create, read, update, delete events
  - Event scheduling and coordination
  - Team management for events
  - Event registration system

- **Payment Processing**
  - Secure payment handling
  - Payment status tracking
  - Transaction management

- **File Uploads**
  - Integration with Cloudinary
  - Secure file upload middleware

- **Email & Notifications**
  - Email OTP for verification
  - Email notifications
  - Transactional email support

- **Performance & Caching**
  - Redis caching layer
  - Request logging and monitoring
  - Response formatting middleware

- **AI Integration**
  - AI service module for advanced features

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Cache:** Redis
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** Cloudinary
- **Email Service:** [Your Email Provider]
- **Validation:** Joi
- **Logging:** Custom middleware

## 📁 Project Structure

```
event-back/
├── src/
│   ├── config/                 # Configuration files
│   │   ├── cloudinary.js      # Cloudinary setup
│   │   ├── email.js           # Email configuration
│   │   └── redis.js           # Redis configuration
│   ├── controller/            # Route controllers
│   │   ├── auth.controller.js
│   │   ├── event.controller.js
│   │   ├── payment.controller.js
│   │   ├── schedule.controller.js
│   │   ├── teams.controller.js
│   │   ├── upload.controller.js
│   │   └── user.controller.js
│   ├── middleware/            # Custom middleware
│   │   ├── auth.middleware.js
│   │   ├── logger.middleware.js
│   │   ├── responseFormatter.middleware.js
│   │   ├── role.middleware.js
│   │   ├── upload.middleware.js
│   │   └── validate.js
│   ├── model/                 # Database models
│   │   ├── db.js
│   │   ├── emailotp.model.js
│   │   ├── event.model.js
│   │   ├── registraton.model.js
│   │   ├── schedule.model.js
│   │   └── user.model.js
│   ├── routes/                # API routes
│   │   ├── auth.route.js
│   │   ├── event.route.js
│   │   ├── payment.route.js
│   │   ├── schedule.route.js
│   │   ├── teams.routes.js
│   │   ├── upload.route.js
│   │   └── user.routes.js
│   ├── services/              # Business logic services
│   │   └── ai.service.js
│   ├── utils/                 # Utility functions
│   │   ├── generateTokens.js
│   │   ├── redisHelper.js
│   │   ├── sendemail.js
│   │   ├── setAuthCookies.js
│   │   └── verify.email.js
│   └── validators/            # Input validation schemas
│       └── joi.validate.js
├── logs/                       # Application logs
├── app.js                      # Express app setup
├── index.js                    # Entry point
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Redis
- Cloudinary account (for file uploads)
- Email service credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-back
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/event-db
   
   # Redis
   REDIS_HOST=localhost
   REDIS_PORT=6379
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRY=7d
   
   # Cloudinary
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Email Service
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_password
   
   # Application
   APP_NAME=Event Management API
   ```

4. **Start the application**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Authentication Routes (`/auth`)
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/verify-otp` - Verify email OTP
- `POST /auth/refresh-token` - Refresh JWT token

### User Routes (`/user`)
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile
- `GET /user/:id` - Get user by ID

### Event Routes (`/event`)
- `POST /event/create` - Create new event
- `GET /event/all` - Get all events
- `GET /event/:id` - Get event details
- `PUT /event/:id` - Update event
- `DELETE /event/:id` - Delete event

### Payment Routes (`/payment`)
- `POST /payment/process` - Process payment
- `GET /payment/status/:id` - Check payment status

### Schedule Routes (`/schedule`)
- `POST /schedule/create` - Create schedule
- `GET /schedule/:eventId` - Get event schedule
- `PUT /schedule/:id` - Update schedule

### Teams Routes (`/teams`)
- `POST /teams/create` - Create team
- `GET /teams/:id` - Get team details
- `PUT /teams/:id` - Update team

### Upload Routes (`/upload`)
- `POST /upload/image` - Upload image (Cloudinary)
- `POST /upload/file` - Upload file

## ⚙️ Configuration

### Redis Setup
Configure Redis connection in `src/config/redis.js` for caching and session management.

### Email Configuration
Update `src/config/email.js` with your email service provider credentials.

### Cloudinary Integration
Set up Cloudinary in `src/config/cloudinary.js` for file uploads.

### Database Connection
MongoDB connection is configured in `src/model/db.js`.

## 🔐 Security Features

- JWT-based authentication
- Email OTP verification
- Role-based access control (RBAC)
- Secure password handling
- CORS protection
- Input validation with Joi
- Request logging for monitoring

## 📊 Logging

Application logs are stored in the `logs/` directory:
- `requests.log` - HTTP request logs
- `errors.log` - Application errors (if configured)

## 🧪 Development Notes

- **Status:** 🚧 In Active Development
- **Last Updated:** 2026-06-05
- **Personal Project:** Yes

### TODO / In Progress
- [ ] Complete payment integration
- [ ] AI service implementation
- [ ] Advanced scheduling features
- [ ] Unit tests
- [ ] Integration tests
- [ ] API documentation (Swagger/OpenAPI)

## 🤝 Contributing

This is a personal project. Feel free to modify and extend as needed.

## 📝 Notes

- This project is under active development
- Configuration files may contain sensitive data - use `.env` for production
- Redis is required for optimal performance
- Email service must be configured for OTP verification

## 📧 Support

For development issues or questions, review the code structure and middleware implementations.

---

**Last Updated:** June 2026  
**Status:** In Development 🚧  
**Author:** Personal Project
