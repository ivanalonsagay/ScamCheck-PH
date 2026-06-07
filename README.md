# ScamCheck PH

ScamCheck PH is a Community-Based Online Scam Awareness and Reporting System built with the MERN Stack. It helps users report suspicious messages, phishing links, fake sellers, fake delivery notices, investment scams, and other online fraud attempts. Admin users review each report before verified warnings are published publicly.

## Project Scope

- Login/Register
- Submit Scam Report
- View My Reports
- Public Verified Scam Board
- Admin Dashboard
- Admin Verify/Reject Reports
- Deployment

## UI Style

The interface is designed as a professional cyber-awareness platform:

- Dark navy navigation and dashboard sidebar
- White cards for report tables, charts, and forms
- Blue accent buttons and active navigation states
- Red/orange warning badges for scam risk
- Green badges for verified reports
- Yellow badges for pending verification

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

## Main Features

### Public Users

- View the landing page
- Browse the public verified scam warning board
- Search and filter verified reports
- Create an account or sign in

### Registered Users

- Submit scam reports
- View personal submitted reports
- Track report statuses: Pending, Verified, or Rejected
- View dashboard statistics for personal reports

### Admin Users

- View total, pending, verified, and rejected report cards
- View report analytics by type and recent activity
- Search and filter submitted reports
- Review scam report details
- Add safety tips, admin remarks, and risk level
- Verify or reject reports
- Delete invalid reports

## System Architecture

```text
[User / Admin]
      |
      v
[React Frontend]
- Landing Page
- Scam Warning Board
- User Dashboard
- Admin Dashboard
      |
      | Axios HTTP Requests
      v
[Node.js + Express.js Backend]
- Auth Routes
- Report Routes
- Admin Routes
- JWT Middleware
- Role Middleware
      |
      | Mongoose
      v
[MongoDB Atlas]
- Users Collection
- Reports Collection
```

## Deployment Architecture

```text
[GitHub] -> [Vercel Frontend]
[GitHub] -> [Vercel Backend]
[MongoDB Atlas Database]
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
GET    /api/reports/stats
GET    /api/reports
GET    /api/reports/:id
PATCH  /api/reports/:id/status
DELETE /api/reports/:id
```

## Installation Guide

### 1. Clone the repository

```bash
git clone https://github.com/ivanalonsagay/ScamCheck-PH.git
cd ScamCheck-PH
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

### 4. Create backend environment file

Inside the `server` folder, create a `.env` file:

```env
PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=http://localhost:5173
```

### 5. Create frontend environment file

Inside the `client` folder, create a `.env` file:

```env
VITE_API_URL=http://localhost:5001/api
```

### 6. Run the backend

```bash
cd server
npm run dev
```

### 7. Run the frontend

```bash
cd client
npm run dev
```

## Deployment Guide

### Backend on Vercel

1. Import the GitHub repository into Vercel.
2. Set the backend root directory to `server`.
3. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLIENT_URL`
4. Deploy and copy the backend URL.

### Frontend on Vercel

1. Import the same GitHub repository into Vercel.
2. Set the frontend root directory to `client`.
3. Add environment variable:
   - `VITE_API_URL=https://your-backend-url.vercel.app/api`
4. Deploy the frontend.
5. Update backend `CLIENT_URL` with the deployed frontend URL.

## Folder Structure

```text
ScamCheck-PH/
|-- client/   React Vite frontend
|-- server/   Node.js and Express backend
|-- README.md
```

## Developer

```text
Name: Ivan Alonso Sagay
Project: ScamCheck PH
Type: MERN Stack Web Application
```
