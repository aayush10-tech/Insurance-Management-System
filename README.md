# 🛡️ Insurance Management System

A full-stack **Insurance Management System (IMS)** developed using the **MERN ecosystem (React + Express)** with **Prisma ORM** and **PostgreSQL**. The system enables insurance companies to efficiently manage customers, insurance policies, premium payments, claims, documents, users, reports, and analytics through a modern web interface.

---

## 📌 Features

### 🔐 Authentication
- JWT-based Login
- Secure Password Hashing (bcrypt)
- Protected Routes
- User Session Management

### 👥 Customer Management
- Add Customer
- Edit Customer
- Delete Customer
- Search Customers
- Pagination
- View Customer Details
- Export PDF
- Export Excel

### 📑 Policy Management
- Create Insurance Policy
- Edit Policy
- Renew Policy
- Cancel Policy
- Policy Status Tracking
- Search & Filter

### 💳 Premium Payment Management
- Record Premium Payments
- Payment Status
- Payment Methods
- Payment History
- Export Reports

### 📋 Claims Management
- Register Claims
- Approve / Reject Claims
- Claim Tracking
- Claim History

### 📁 Document Management
- Upload Documents
- Download Documents
- Delete Documents
- Customer-wise Documents

### 👨‍💼 User Management
- Create Users
- Update Users
- Delete Users
- User Roles

### 📊 Dashboard & Reports
- Dashboard Analytics
- Customer Statistics
- Policy Statistics
- Premium Collection
- Monthly Revenue
- Customer Growth
- Policy Distribution
- Claims Statistics
- Recent Customers
- Recent Claims
- Expiring Policies
- Export Reports (PDF & Excel)

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- Zod Validation
- Axios
- React Toastify
- Recharts
- Lucide React
- React Icons

## Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt
- Multer
- Swagger UI

## Database
- PostgreSQL

---

# 📂 Project Structure

```
Insurance-Management-System
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── prisma
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   ├── validators
│   │   └── app.js
│   └── package.json
│
├── docs
├── database
└── README.md
```

---

# 🗄 Database

Main Entities

- User
- Customer
- Policy
- Premium Payment
- Claim
- Document

Relationship Overview

```
Customer
   │
   ├──── Policies
   │        │
   │        ├──── Premium Payments
   │        └──── Claims
   │
   └──── Documents
```

---

# 🔑 Authentication Flow

```
Login
   │
   ▼
JWT Generated
   │
   ▼
Client Stores Token
   │
   ▼
Authorization Header
   │
   ▼
Protected API
```

---

# 📊 Dashboard

Dashboard provides

- Total Customers
- Total Policies
- Active Policies
- Expired Policies
- Total Claims
- Approved Claims
- Pending Claims
- Total Payments
- Premium Collection
- Monthly Revenue
- Customer Growth
- Policy Distribution
- Recent Customers
- Recent Claims
- Upcoming Renewals
- Expiring Policies

---

# 📸 Screenshots

Add screenshots here after deployment.

Example

```
docs/screenshots/

login.png

dashboard.png

customers.png

policies.png

payments.png

claims.png

documents.png

users.png

reports.png
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/Insurance-Management-System.git
```

---

## Client

```bash
cd client

npm install

npm run dev
```

---

## Server

```bash
cd server

npm install

npm run dev
```

---

# Environment Variables

Create `.env` inside the **server** folder.

```env
DATABASE_URL=

JWT_SECRET=

PORT=5000
```

---

# API Documentation

Swagger UI

```
http://localhost:5000/api-docs
```

---

# Future Enhancements

- Email Notifications
- SMS Notifications
- Two-Factor Authentication
- Dark Mode
- Mobile Application
- AI Fraud Detection
- Multi-language Support
- Cloud Storage Integration

---

# Author

**Aayush Mahadik**

Full Stack Developer

AI Enthusiast

Web Developer
---

# License

This project is developed for educational purposes.