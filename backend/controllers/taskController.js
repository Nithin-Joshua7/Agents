import Task from '../model/Task.js';
import Agent from '../model/Agent.js';
import { parseCSV } from '../utils/csvparser.js';
import fs from 'fs/promises';
import mongoose from 'mongoose';
import path from 'path';

export const uploadTasks = async (req, res) => {
  try {
    const file = req.file;
    console.log('Uploaded file:', file);
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Validate file extension
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.csv', '.xlsx', '.xls'].includes(ext)) {
      await fs.unlink(file.path);
      return res.status(400).json({ message: 'Only CSV, XLSX, or XLS files are allowed' });
    }

    // Parse CSV
    const data = await parseCSV(file.path);
    console.log('Parsed CSV data:', data);
    if (!data || data.length === 0) {
      await fs.unlink(file.path);
      return res.status(400).json({ message: 'CSV file is empty or invalid' });
    }

    // Map CSV fields to schema fields (handle case sensitivity)
    const validData = data
      .map((item) => ({
        firstName: item.FirstName || item.firstName,
        phone: item.Phone || item.phone,
        notes: item.Notes || item.notes,
      }))
      .filter((item) => item.firstName && item.phone && item.notes);
    if (validData.length === 0) {
      await fs.unlink(file.path);
      return res.status(400).json({ message: 'No valid tasks found in CSV' });
    }

    // Get agents
    const agents = await Agent.find();
    console.log('Agents found:', agents);
    if (agents.length === 0) {
      await fs.unlink(file.path);
      return res.status(400).json({ message: 'No agents found' });
    }

    // Distribute tasks equally
    const distributed = validData.map((item, index) => ({
      firstName: item.firstName,
      phone: item.phone,
      notes: item.notes,
      agent: agents[index % agents.length]._id,
    }));
    console.log('Distributed tasks:', distributed);

    // Insert tasks
    const insertedTasks = await Task.insertMany(distributed, { ordered: false });
    console.log('Inserted tasks:', insertedTasks);

    // Clean up uploaded file
    await fs.unlink(file.path);

    res.json({ message: 'Tasks uploaded and distributed successfully', count: insertedTasks.length });
  } catch (err) {
    console.error('Upload tasks error:', err);
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    res.status(500).json({ message: 'Error uploading tasks', error: err.message });
  }
};

export const getTasksByAgent = async (req, res) => {
  try {
    const { agentId } = req.params;
    console.log('Fetching tasks for agentId:', agentId);

    // Validate agentId
    if (!mongoose.Types.ObjectId.isValid(agentId)) {
      return res.status(400).json({ message: 'Invalid agentId' });
    }

    // Check if agent exists
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    // Fetch tasks
    const tasks = await Task.find({ agent: agentId });
    console.log('Tasks found:', tasks);

    res.json(tasks);
  } catch (err) {
    console.error('Get tasks error:', err);
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};