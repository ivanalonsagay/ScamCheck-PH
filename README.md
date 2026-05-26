# ScamCheck PH

ScamCheck PH is a Community-Based Online Scam Awareness and Reporting System built using the MERN Stack. It allows users to report suspicious scam messages, fake links, phishing attempts, fake online sellers, and other online fraud activities. Admin users can review, verify, or reject reports before they appear as public scam warnings.

## Project Description

Online scams are a growing problem in the Philippines, especially through SMS, social media, messaging apps, fake online sellers, and phishing links. ScamCheck PH helps communities become more aware by allowing users to submit scam reports and allowing verified warnings to be displayed publicly.

This project is developed as a MERN Stack web application for academic purposes.

## Objectives

- To provide a platform where users can report suspicious online scam activities.
- To allow admin users to verify or reject submitted scam reports.
- To display verified scam warnings for public awareness.
- To help users identify scam patterns and avoid unsafe links or fake offers.
- To demonstrate a complete MERN Stack web application with clean architecture.

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs

### Tools

- MongoDB Compass
- VS Code
- Git
- GitHub

## Main Features

### Public Users

- View Home Page
- View Verified Scam Warnings
- Sign In
- Sign Up

### Registered Users

- Submit scam reports
- View personal submitted reports
- Track report status
- Access user dashboard

### Admin Users

- View admin dashboard
- View all submitted reports
- Verify scam reports
- Reject scam reports
- Manage report status
- View basic report analytics

## User Roles

```text
User
Admin
```

## Report Statuses

```text
Pending
Verified
Rejected
```

## Folder Structure

```text
scamcheck-ph/
│
├── client/
│   └── React Vite frontend
│
├── server/
│   └── Node.js and Express backend
│
├── .gitignore
└── README.md
```

## System Architecture

```text
User / Admin
     |
     v
React Frontend
     |
     | Axios HTTP Requests
     v
Node.js + Express.js Backend
     |
     | Mongoose ODM
     v
MongoDB Database
```

## Installation Guide

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/scamcheck-ph.git
```

### 2. Go to the project folder

```bash
cd scamcheck-ph
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Install backend dependencies

```bash
cd ../server
npm install
```

### 5. Create backend environment file

Inside the `server` folder, create a `.env` file.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/scamcheck_ph
JWT_SECRET=scamcheck_super_secret_key
NODE_ENV=development
```

### 6. Run the backend server

```bash
cd server
npm run dev
```

### 7. Run the frontend

Open another terminal and run:

```bash
cd client
npm run dev
```

## API Overview

### Authentication Routes

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Report Routes

```text
POST   /api/reports
GET    /api/reports/my-reports
GET    /api/reports/public
GET    /api/reports
PATCH  /api/reports/:id/status
DELETE /api/reports/:id
```

## Clean Architecture

The backend follows a clean structure:

```text
models       - database schemas
controllers  - main request logic
routes       - API endpoints
middleware   - authentication and authorization checks
config       - database configuration
```

The frontend follows a modular structure:

```text
components   - reusable UI parts
pages        - screen-level pages
layouts      - shared page layouts
services     - API request files
context      - global authentication state
hooks        - reusable logic
```

## Developer

```text
Name: Your Name
Course: BSIT - Mobile and Web Applications
School: National University Manila
Project: MERN Stack Web Application
```

## Project Status

```text
Currently in development.
```