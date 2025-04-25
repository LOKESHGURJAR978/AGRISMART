// backend/controllers/chatController.js

// In-memory store for messages (use a database in production)
let messages = [];

// Get all messages
export const getMessages = (req, res) => {
  res.json(messages);
};

// Post a new message
export const postMessage = (req, res) => {
  const { text, user } = req.body;
  messages.push({ text, user, timestamp: new Date() });
  res.status(201).json({ message: 'Message added' });
};

export const deleteMessage = (req, res) => {
  const index = parseInt(req.params.index); // Convert string to number
  if (isNaN(index) || index < 0 || index >= messages.length) {
    return res.status(404).json({ error: 'Message not found' });
  }
  messages.splice(index, 1);
  res.status(204).send(); // No content to send back
};
