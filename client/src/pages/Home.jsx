import React, { useEffect } from 'react';
import { AppBar, Toolbar, Button, Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'; // Import Sidebar
import { useSelector } from 'react-redux';

const Home = () => {

  const { currentUser } = useSelector((state) => state.user); // Assuming user contains { name, profilePhoto, farmName }
  const navigate = useNavigate(); 

    useEffect(() => {
    if (!currentUser) {
      navigate('/sign-up'); // Redirects to the signup page if no user is logged in
    }
  }, [currentUser, navigate]); 
  return (
    <div className="Home flex">
      <Sidebar /> {/* Add Sidebar here */}
      <div style={{ flex: 1, paddingTop: '20px' }}> {/* Adjust padding for the content */}
      {/* Include Sidebar here */}

        {/* Main content area */}
        <div style={{ flex: 1, paddingLeft: '16px' }}> {/* Space between sidebar and content */}
          {/* Hero Section */}
          <section 
            className="bg-cover bg-center text-white text-center py-16" 
            style={{ 
              backgroundImage: 'url("https://media.istockphoto.com/id/1413013150/photo/a-landscape-picture-of-a-beautiful-coffee-plantation-in-the-hill-station-of-coorg-in.jpg?s=612x612&w=0&k=20&c=4PRadlDuDWzbkXU6WuLUN0eBlqm8g4JXwY3eDKBjiYI=")' 
            }}
          >
            <div className="hero-content">
              <h2 className="text-3xl md:text-4xl font-bold shadow-2xl">Smart Farming for a Better Harvest</h2>
              <p className="mt-4 text-base md:text-lg">Streamline your farm operations with SAMS</p>
              <Button variant="contained" color="primary" className="mt-6 bg-blue-500">Get Started</Button>
            </div>
          </section>

          {/* Dashboard Overview */}
          <Container maxWidth="lg" className="my-12">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card className="shadow-lg">
                  <CardContent>
                    <Typography variant="h6" className="font-bold">Weather Forecast</Typography>
                    <Typography className="mt-2 text-sm md:text-base">Current weather and 5-day forecast</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className="shadow-lg">
                  <CardContent>
                    <Typography variant="h6" className="font-bold">Irrigation Status</Typography>
                    <Typography className="mt-2 text-sm md:text-base">Real-time monitoring and control</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className="shadow-lg">
                  <CardContent>
                    <Typography variant="h6" className="font-bold">Task List</Typography>
                    <Typography className="mt-2 text-sm md:text-base">Upcoming tasks and deadlines</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>

          {/* Featured Sections */}
          <section className="bg-gray-100 py-12">
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Card className="shadow-lg">
                    <CardContent>
                      <Typography variant="h6" className="font-bold">Crop of the Month</Typography>
                      <Typography className="mt-2 text-sm md:text-base">Highlighting a suitable crop for the current season</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card className="shadow-lg">
                    <CardContent>
                      <Typography variant="h6" className="font-bold">Water Savings</Typography>
                      <Typography className="mt-2 text-sm md:text-base">Water loss calculation and conservation tips</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </section>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-6 text-center">
            <p className="text-sm md:text-base">Contact: Address, phone number, email</p>
            <p className="mt-2 text-sm md:text-base">
              Follow us: 
              <a href="https://twitter.com" className="ml-4 text-blue-400">Twitter</a> | 
              <a href="https://facebook.com" className="ml-4 text-blue-400">Facebook</a> | 
              <a href="https://linkedin.com" className="ml-4 text-blue-400">LinkedIn</a>
            </p>
            <p className="mt-4 text-sm md:text-base">&copy; 2024 SAMS. All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
