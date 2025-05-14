# Agent Management Application

This application allows admins to manage agents, including adding new agents, editing existing agents, and handling tasks such as CSV uploads for task distribution. The app is built with the MERN stack (MongoDB, Express, React, Node.js) and uses JWT for authentication.

## Features
- Admin login with JWT authentication
- Add, edit, and list agents
- CSV upload for task distribution


## Prerequisites

- Node.js (>= 14.x)
- npm or yarn (for dependency management)
- MongoDB (either local or MongoDB Atlas)

## Setup Instructions

### Backend Setup (Node.js + MongoDB)

1. **Clone the Repository**
   git clone https://github.com/your-repository/agent-management-app.git
   cd agent-management-app

2. Install Backend Dependencies
Navigate to the backend directory and install the required dependencies:
cd backend
npm install

Or, if you're using yarn:
yarn install

Here are the key dependencies for the backend:

express: A minimal web framework for Node.js.

mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js.

jsonwebtoken: Used for creating and verifying JWT tokens for authentication.

dotenv: Loads environment variables from a .env file for configuration.

cors: Middleware for enabling Cross-Origin Resource Sharing.

bcryptjs: For securely hashing user passwords.

multer: Middleware for handling file uploads, such as CSV files.

csv-parser: For parsing CSV files, particularly for the task distribution feature.

3. Set Up Environment Variables
Create a .env file in the backend directory and add the following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Make sure to replace your_mongodb_connection_string and your_jwt_secret with the actual values.

4. Run the Backend
Start the server with the following command:
npm run dev
Or if you're using yarn:
yarn start
The backend will run on http://localhost:5000.

## Frontend Setup (React + Tailwind CSS)

Navigate to the Frontend Directory
cd frontend

Install Frontend Dependencies
npm install

Or with yarn:
yarn install


Here are the key dependencies used in the frontend:

React Router DOM: For routing between pages.

Axios: For making HTTP requests to the backend.

Tailwind CSS: A utility-first CSS framework for styling.

DaisyUI: A UI component library for Tailwind CSS.

React Hot Toast: For displaying notifications.

Vite: For fast development and build tooling.

Start the Frontend
npm run dev
Or with yarn:
yarn dev
The frontend will run on:
👉 http://localhost:5173 (default Vite port)