import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    required: true,
    trim: true,
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true,
  },
});

export default mongoose.model('Task', taskSchema);