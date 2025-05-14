import Agent from "../model/Agent.js";
export const createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    const agent = new Agent({ name, email, mobile, password });
    await agent.save();

    res.status(201).json({ message: 'Agent created successfully', agent });
  } catch (err) {
    console.error('Create agent error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select('-password');
    res.json(agents);
  } catch (err) {
    console.error('Get agents error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, password } = req.body;

    const agent = await Agent.findById(id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

   

    agent.name = name || agent.name;
    agent.email = email || agent.email;
    agent.mobile = mobile || agent.mobile;

    // Only update password if provided
    if (password) {
      agent.password = password;
    }

    await agent.save();
    res.json({ message: 'Agent updated successfully', agent });
  } catch (err) {
    console.error('Update agent error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await Agent.findByIdAndDelete(id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json({ message: 'Agent deleted successfully' });
  } catch (err) {
    console.error('Delete agent error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};