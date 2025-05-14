import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import agentRoutes from './routes/agentroutes.js'
import taskRoutes from './routes/taskroutes.js'
import cors from "cors"
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors(
  {
    origin:"http://localhost:5173",
    credentials:true,
  }
))
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});