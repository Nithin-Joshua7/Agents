import express from 'express';
import multer from 'multer';
import { uploadTasks, getTasksByAgent } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// @route   POST /api/tasks/upload
// @desc    Upload CSV file and distribute tasks
// @access  Private (Admin)
router.post('/upload', protect, upload.single('file'), uploadTasks);

// @route   GET /api/tasks/:agentId
// @desc    Get tasks for a specific agent
// @access  Private (Admin)
router.get('/:agentId', protect, getTasksByAgent);

export default router;