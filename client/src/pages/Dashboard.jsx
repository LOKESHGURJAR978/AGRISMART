import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Modal } from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaWater, FaTasks, FaThermometerHalf, FaBell } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
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
  const [notificationCount, setNotificationCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Sample data for charts
  const weatherData = [
    { day: 'Mon', temp: 22, humidity: 50 },
    { day: 'Tue', temp: 24, humidity: 55 },
    { day: 'Wed', temp: 19, humidity: 60 },
    { day: 'Thu', temp: 23, humidity: 53 },
    { day: 'Fri', temp: 21, humidity: 52 },
  ];

  const financialData = [
    { name: 'Expenses', value: 2000 },
    { name: 'Income', value: 5000 },
  ];

  const soilMoistureData = [
    { name: 'Soil A', moisture: 70 },
    { name: 'Soil B', moisture: 55 },
    { name: 'Soil C', moisture: 60 },
  ];

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
      setNotificationCount(response.data.length);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/sign-up');
    } else {
      fetchTasks();
    }
  }, [currentUser, navigate]);

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

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <div className="p-4 md:p-6 pt-4">
          {/* Notification and Profile Image */}
          <div className="flex justify-end items-center space-x-4 mb-4">
          <div className="relative">
  <FaBell
    className="text-2xl cursor-pointer"
    aria-label="Notifications"
    onClick={toggleModal}
  />
  {notificationCount > 0 && (
    <span className="absolute top-[-5px] right-[-10px] bg-red-600 text-white rounded-full w-5 h-5 text-center text-xs flex items-center justify-center">
      {notificationCount}
    </span>
  )}
</div>

            <img
              src={currentUser?.profilePicture || '/default-profile.png'}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
          </div>

          {/* Header Section */}
          <header className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-green-400 to-green-800 text-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img
                src={currentUser?.profilePicture || '/default-profile.png'}
                alt={currentUser?.username || 'Guest'}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <Typography variant="h6" className="font-bold">{currentUser?.username || 'Guest'}</Typography>
               
              </div>
            </div>
            <div className="space-x-4">
              <Button variant="contained" color="primary" className="bg-blue-600 shadow-md">Water Irrigation</Button>
              <Link to='/tasks'><Button variant="contained" color="primary" className="bg-blue-600 shadow-md" >Assign Task</Button>
           </Link> </div>
          </header>

          {/* Main Dashboard */}
          <main className="mt-4 md:mt-6">
            <Grid container spacing={4}>
              {/* Section 1: Farm Overview (Weather, Soil, Temp/Humidity) */}
              <Grid item xs={12} md={6} lg={4}>
                <Card className="shadow-lg bg-white">
                  <CardContent>
                    <Typography variant="h6" className="font-bold text-black">
                      <FaThermometerHalf className="inline mr-2" /> Farm Overview
                    </Typography>
                    <div className="bg-gradient-to-r from-pink-600 to-pink-400 p-4 rounded-lg flex justify-center items-center">
                      <LineChart width={250} height={150} data={weatherData} animationDuration={500}>
                        <Line type="monotone" dataKey="temp" stroke="white" />
                        <Line type="monotone" dataKey="humidity" stroke="white" />
                        <CartesianGrid stroke="rgba(255, 255, 255, 0.5)" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                      </LineChart>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              {/* Section 2: Irrigation Management (Water Usage) */}
              <Grid item xs={12} md={6} lg={4}>
                <Card className="shadow-lg bg-white">
                  <CardContent>
                    <Typography variant="h6" className="font-bold text-black">
                      <FaWater className="inline mr-2" /> Irrigation Management
                    </Typography>
                    <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-4 rounded-lg flex justify-center items-center">
                      <BarChart width={250} height={150} data={soilMoistureData} animationDuration={500}>
                        <Bar dataKey="moisture" fill="yellow" />
                        <CartesianGrid stroke="rgba(255, 255, 255, 0.5)" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                      </BarChart>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              {/* Section 3: Financial Overview (Pie Chart) */}
              <Grid item xs={12} md={6} lg={4}>
                <Card className="shadow-lg bg-white">
                  <CardContent>
                    <Typography variant="h6" className="font-bold text-black">Financial Overview</Typography>
                    <div className="bg-gradient-to-r from-blue-400 to-teal-400 p-4 rounded-lg flex justify-center items-center">
                      <PieChart width={250} height={150} animationDuration={500}>
                        <Pie data={financialData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" stroke="white" label />
                        <Tooltip />
                      </PieChart>
                    </div>
                    <Typography className="text-black">Profit/Loss: <span className="text-green-500 font-bold">$3000</span></Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Section 4: Task Management */}
              <Grid item xs={12} md={6} lg={4}>
                <Card className="shadow-lg bg-white">
                  <CardContent>
                    <Typography variant="h6" className="font-bold text-black">
                      <FaTasks className="inline mr-2" /> Task Management
                    </Typography>
                    <Typography className="text-black">Upcoming Tasks:</Typography>
                    {tasks.length > 0 ? (
                      <ul className="list-disc pl-4">
                        {tasks.map((task) => (
                          <li key={task._id} className="text-black flex justify-between items-center">
                            {task.title} - Due: {new Date(task.dueDate).toLocaleDateString()}
                            <div>
                              <Button onClick={() => handleEditTask(task)} color="primary">Edit</Button>
                              <Button onClick={() => handleDeleteTask(task._id)} color="secondary">Delete</Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Typography className="text-gray-500">No upcoming tasks.</Typography>
                    )}
                    <div className="mt-4">
                      <Button variant="contained" color="primary" className="bg-blue-600 shadow-md" onClick={editMode ? handleUpdateTask : handleCreateTask}>
                        {editMode ? 'Update Task' : 'Add Task'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>

              {/* Section 5: Farm Layout */}
              <Grid item xs={12}>
                <Card className="shadow-lg mt-8 bg-white">
                  <CardContent>
                    <Typography variant="h6" className="font-bold text-black">Farm Layout</Typography>
                    <MapContainer center={[19.0617, 73.1037]} zoom={13} className="mt-4" style={{ height: '400px', width: '100%' }}>
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[19.0617, 73.1037]}>
                        <Popup>Your Farm Location</Popup>
                      </Marker>
                    </MapContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </main>

          {/* Notification Modal */}
          <Modal open={modalOpen} onClose={toggleModal}>
            <div className="flex flex-col p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-20">
              <Typography variant="h6" className="font-bold">Notifications</Typography>
              {tasks.length > 0 ? (
                <ul className="list-disc pl-4 mt-2">
                  {tasks.map((task) => (
                    <li key={task._id} className="text-black">
                      {task.title} - Due: {new Date(task.dueDate).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography className="text-gray-500">No upcoming tasks.</Typography>
              )}
              <Button variant="contained" color="primary" className="mt-4" onClick={toggleModal}>Close</Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
