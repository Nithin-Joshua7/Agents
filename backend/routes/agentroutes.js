import express from 'express';
import { createAgent, deleteAgent, getAgents, updateAgent } from '../controllers/agentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/agents
// @desc    Create a new agent
// @access  Private (Admin)
router.post('/', protect, createAgent);

// @route   GET /api/agents
// @desc    Get all agents
// @access  Private (Admin)
router.get('/', protect, getAgents);

router.put('/:id',protect,updateAgent)

router.delete('/:id', protect, deleteAgent);
export default router;