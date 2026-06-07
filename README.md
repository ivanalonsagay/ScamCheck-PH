# ScamCheck PH

ScamCheck PH is a Community-Based Online Scam Awareness and Reporting System built with the MERN Stack. It helps users report suspicious messages, phishing links, fake sellers, fake delivery notices, investment scams, and other online fraud attempts. Admin users review each report before verified warnings are published publicly.

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
