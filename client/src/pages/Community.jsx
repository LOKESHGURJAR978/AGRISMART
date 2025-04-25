import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  IconButton,
  Snackbar,
  Avatar,
  Grid,
  Alert,
  Container,
  Box,
  Tooltip,
  Divider,
  CircularProgress,
  Fab,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Sidebar from '../components/Sidebar';
import { deepPurple } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Community = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState('User1'); // Replace with user login logic for dynamic usernames
  const [error, setError] = useState('');
  const [replyTo, setReplyTo] = useState(null); // Track which message is being replied to
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Typing indicator
  const [loading, setLoading] = useState(true); // Loading state
  const [scrollToBottom, setScrollToBottom] = useState(false); // To handle FAB scrolling

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/chat/messages');
        if (!res.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error(err);
        setError('Could not load messages. Please try again later.');
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (text.trim() === '') return;

    const newMessage = { text, user, replyTo, timestamp: new Date().toLocaleTimeString() };
    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setMessages((prev) => [...prev, newMessage]);
      setText('');
      setReplyTo(null); // Reset replyTo after sending
      setIsTyping(false); // Stop typing indicator
    } catch (err) {
      console.error(err);
      setError('Could not send message. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleDelete = async (messageId) => {
    try {
      const res = await fetch(`/api/chat/messages/${messageId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete message');
      }

      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    } catch (err) {
      console.error(err);
      setError('Could not delete message. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleReply = (message) => {
    setReplyTo(message);
    setText(`@${message.user}: `);
  };

  const handleTyping = (e) => {
    setText(e.target.value);
    setIsTyping(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleScrollToBottom = () => {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Sidebar />
      <Container maxWidth="md" style={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
              Community Chat
            </Typography>
          </Grid>

          <Grid item xs={12} id="chat-container" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Paper elevation={3} style={{ padding: '16px', position: 'relative' }}>
                <List>
                  {messages.map((msg) => (
                    <ListItem
                      key={msg.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '15px',
                        borderRadius: '10px',
                        backgroundColor: '#fff',
                        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
                        padding: '10px',
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ bgcolor: deepPurple[500], marginRight: '15px' }}>{msg.user[0]}</Avatar>
                        <ListItemText
                          primary={
                            <>
                              <Typography component="span" fontWeight="bold" color="primary">
                                {msg.user}
                              </Typography>
                              : {msg.text}
                            </>
                          }
                          secondary={
                            <>
                              {msg.replyTo && (
                                <Typography component="span" fontStyle="italic">
                                  Replying to: {msg.replyTo.text}
                                </Typography>
                              )}
                              <Typography variant="caption" display="block">
                                {msg.timestamp}
                              </Typography>
                            </>
                          }
                        />
                      </Box>
                      <div>
                        <Tooltip title="Reply">
                          <IconButton onClick={() => handleReply(msg)} aria-label="reply" color="primary">
                            <ReplyIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Like">
                          <IconButton aria-label="like" color="primary">
                            <ThumbUpIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(msg.id)} aria-label="delete" color="secondary">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </ListItem>
                  ))}
                </List>
                {isTyping && (
                  <Typography variant="caption" color="textSecondary" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                    Someone is typing...
                  </Typography>
                )}
              </Paper>
            )}
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Type a message"
                variant="outlined"
                fullWidth
                value={text}
                onChange={handleTyping}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSend();
                  }
                }}
                style={{ marginRight: '10px', borderRadius: '25px' }}
              />
              <Button onClick={handleSend} variant="contained" color="primary" endIcon={<SendIcon />} style={{ height: '56px', borderRadius: '25px' }}>
                Send
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Fab
          color="primary"
          aria-label="scroll down"
          onClick={handleScrollToBottom}
          style={{ position: 'fixed', bottom: '30px', right: '30px' }}
        >
          <KeyboardArrowDownIcon />
        </Fab>
      </Container>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Community;
