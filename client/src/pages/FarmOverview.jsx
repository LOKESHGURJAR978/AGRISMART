import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import Sidebar from '../components/Sidebar'; // Import Sidebar
import { FaBell } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const FarmOverview = () => {
  const { currentUser } = useSelector((state) => state.user); // Assuming user contains { name, profilePhoto, farmName }
  const [farmInfo, setFarmInfo] = useState(null); // State to hold farm information
  const [farmImage, setFarmImage] = useState("https://via.placeholder.com/150"); // Default image URL

  const fetchFarmInfo = async () => {
    try {
      const response = await fetch('/api/info'); // Fetch farm information
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFarmInfo(data); // Set farm information in state
    } catch (error) {
      console.error('Error fetching farm info:', error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFarmImage(reader.result); // Set the uploaded image as the new farm image
        localStorage.setItem('farmImage', reader.result); // Store the image in local storage
      };
      reader.readAsDataURL(file); // Read the uploaded file as a data URL
    }
  };

  useEffect(() => {
    fetchFarmInfo(); // Fetch farm info on component mount

    // Check local storage for a saved farm image and set it
    const savedFarmImage = localStorage.getItem('farmImage');
    if (savedFarmImage) {
      setFarmImage(savedFarmImage); // Use saved image if available
    }
  }, []);

  return (
    <div className="FarmOverview bg-gray-50 min-h-screen py-6 flex">
      <Sidebar /> {/* Add Sidebar here */}
      <div style={{ flex: 1, paddingTop: '20px' }}> {/* Adjust padding for the content */}

        {/* Notification and Profile Image at the very top */}
        <div className="flex justify-end items-center p-4">
          <FaBell className="text-2xl cursor-pointer" aria-label="Notifications" />
          <img
            src={currentUser?.profilePicture || '/default-profile.png'} // Ensure default-profile.png is available
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-300 ml-4"
            onError={(e) => { e.target.onerror = null; e.target.src = '/default-profile.png'; }} // Fallback image
          />
        </div>

        {/* Main content area */}
        <Container maxWidth="lg" className="my-12">
          {/* Top Section */}
          <div className="text-center mb-8">
            <Typography variant="h4" className="font-bold text-green-600">{farmInfo?.farmName || 'Farm Name'}</Typography>
            <Typography variant="h6" className="text-gray-600">Location: {farmInfo?.location || 'Your Farm Location'}</Typography>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }} // Hide the file input
              id="upload-farm-image"
              onChange={handleImageUpload}
            />
            <label htmlFor="upload-farm-image">
              <img
                src={farmImage}
                alt="Farm Logo"
                className="mx-auto mt-4 rounded-full border-4 border-green-500 shadow-lg cursor-pointer"
                onClick={() => document.getElementById('upload-farm-image').click()} // Trigger file input on image click
              />
            </label>
          </div>

          {/* Essential Info */}
          <Grid container spacing={3}>
            {farmInfo && [
              { title: "Farm Size", value: `${farmInfo.farmSize} acres` },
              { title: "Soil Type", value: farmInfo.soilType },
              { title: "Crops Grown", value: Array.isArray(farmInfo.crops) ? farmInfo.crops.join(", ") : 'N/A' },
              { title: "Irrigation System", value: farmInfo.irrigationSystem },
            ].map((info, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className="shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                  <CardContent>
                    <Typography variant="h6" className="font-bold text-gray-800">{info.title}</Typography>
                    <Typography className="mt-2 text-lg text-gray-600">{info.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Visualizations */}
          <div className="my-12">
            <Typography variant="h5" className="font-bold mb-4 text-green-600">Visualizations</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                <CardContent>
                  <Typography variant="h6" className="font-bold text-gray-800">Farm Map</Typography>
                  {/* Placeholder for interactive map */}
                  <div className="bg-gray-300 h-40 mt-2 rounded-md flex items-center justify-center">
                    <span className="text-gray-500">Interactive Farm Map</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                <CardContent>
                  <Typography variant="h6" className="font-bold text-gray-800">Crop Distribution</Typography>
                  {/* Placeholder for crop distribution chart */}
                  <div className="bg-gray-300 h-40 mt-2 rounded-md flex items-center justify-center">
                    <span className="text-gray-500">Crop Distribution Chart</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key Performance Indicators (KPIs) */}
          <Typography variant="h5" className="font-bold my-4 text-green-600">Key Performance Indicators (KPIs)</Typography>
          <Grid container spacing={3}>
            {[ 
              { title: "Total Area Under Cultivation", value: farmInfo ? `${farmInfo.totalCultivationArea} acres` : "N/A" },
              { title: "Total Crop Yield", value: farmInfo ? `${farmInfo.totalCropYield} kg` : "N/A" },
              { title: "Water Consumption", value: farmInfo ? `${farmInfo.waterConsumption} liters` : "N/A" },
            ].map((kpi, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                  <CardContent>
                    <Typography variant="h6" className="font-bold text-gray-800">{kpi.title}</Typography>
                    <Typography className="mt-2 text-lg text-gray-600">{kpi.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))} 
          </Grid>

          {/* Call-to-Action (CTA) Buttons */}
          <div className="my-8 text-center">
            <Typography variant="h6" className="mb-4 font-semibold text-gray-700">Quick Actions</Typography>
            <Button variant="contained" color="primary" className="mx-2 hover:bg-blue-600 transition-colors">View Crop Details</Button>
            <Button variant="contained" color="primary" className="mx-2 hover:bg-blue-600 transition-colors">Monitor Soil Health</Button>
            <Button variant="contained" color="primary" className="mx-2 hover:bg-blue-600 transition-colors">Adjust Irrigation Schedule</Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default FarmOverview;
