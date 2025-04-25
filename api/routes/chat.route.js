// backend/routes/chatRoutes.js

import express from 'express';
import { deleteMessage, getMessages, postMessage } from '../controllers/chat.controller.js'; // Import controller functions

const router = express.Router();

// Define routes
router.get('/messages', getMessages);
router.post('/messages', postMessage);
// Delete a message
router.delete('/messages/:index',deleteMessage);

export default router; // Export the router
