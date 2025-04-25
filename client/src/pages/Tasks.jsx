// src/pages/TasksPage.js

import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, TextField } from '@mui/material';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import axios from 'axios';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    assignee: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    try {
      const response = await axios.post('/api/tasks', newTask);
      setTasks([...tasks, response.data]);
      resetForm();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditMode(true);
    setCurrentTaskId(task._id);
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      assignee: task.assignee,
    });
  };

  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(`/api/tasks/${currentTaskId}`, newTask);
      setTasks(tasks.map(task => (task._id === currentTaskId ? response.data : task)));
      resetForm();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const resetForm = () => {
    setNewTask({ title: '', description: '', dueDate: '', priority: '', assignee: '' });
    setEditMode(false);
    setCurrentTaskId(null);
  };

  return (
    <div className="TasksPage bg-gray-50 min-h-screen py-6 flex">
      <Sidebar />
      <div style={{ flex: 1, paddingTop: '10px' }}>
        <div style={{ flex: 1, paddingLeft: '16px' }}>
          <div style={{ paddingTop: '80px' }}>
            <Container maxWidth="lg">
              <Typography variant="h4" className="font-bold text-center text-green-600 mb-6">Tasks</Typography>
              
              <div className="mb-6">
                <Typography variant="h6" className="text-gray-700 mb-4">{editMode ? 'Edit Task' : 'Create New Task'}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Task Title"
                      variant="outlined"
                      fullWidth
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Due Date"
                      type="date"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={2}
                      fullWidth
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Priority"
                      variant="outlined"
                      fullWidth
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      placeholder="High/Medium/Low"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Assignee"
                      variant="outlined"
                      fullWidth
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={editMode ? handleUpdateTask : handleCreateTask}
                    >
                      {editMode ? 'Update Task' : 'Add Task'}
                    </Button>
                  </Grid>
                </Grid>
              </div>

              <Typography variant="h6" className="text-gray-700 mb-4">Task List</Typography>
              <Grid container spacing={3}>
                {tasks.map((task) => (
                  <Grid item xs={12} sm={6} md={4} key={task._id}>
                    <Card className="shadow-lg">
                      <CardContent>
                        <Typography variant="h6" className="font-bold">{task.title}</Typography>
                        <Typography className="text-gray-600">{task.description}</Typography>
                        <Typography className="text-gray-500 mt-2">Due: {new Date(task.dueDate).toLocaleDateString()}</Typography>
                        <Typography className={`text-sm mt-2 ${task.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                          Status: {task.status}
                        </Typography>
                        <Typography className="text-gray-600 mt-1">Priority: {task.priority}</Typography>
                        <Typography className="text-gray-600 mt-1">Assignee: {task.assignee}</Typography>
                        <div className="mt-4 flex justify-between">
                          <Button variant="outlined" color="primary" onClick={() => handleEditTask(task)}>Edit</Button>
                          <Button variant="outlined" color="secondary" onClick={() => handleDeleteTask(task._id)}>Delete</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
