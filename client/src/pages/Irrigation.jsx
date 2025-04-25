import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import Sidebar from '../components/Sidebar'; // Importing the Sidebar
import Navbar from '../components/Navbar'; // Importing the updated Navbar

const IrrigationPage = () => {
  return (
    <div className="IrrigationPage bg-gray-50 min-h-screen flex">
      {/* Sidebar Component */}
       <Sidebar /> {/* Add Sidebar here */}
      <div style={{ flex: 1, paddingTop: '20px' }}> {/* Adjust padding for the content */}
        

        {/* Content Padding Top to Avoid Overlap with Navbar */}
        <div style={{ paddingTop: '64px', padding: '20px' }}>
          <Container maxWidth="lg">
            {/* Headline and Subheading */}
            <Typography variant="h4" className="font-bold text-center text-green-600 mb-6">
              Irrigation Solutions
            </Typography>
            <Typography variant="h6" className="text-center text-gray-700 mb-8">
              Optimize your irrigation for better crop yield and water conservation.
            </Typography>

            {/* Irrigation Methods Section */}
            <Grid container spacing={4}>
              {/* Drip Irrigation Card */}
              <Grid item xs={12} md={4}>
                <Card className="shadow-lg">
                  <CardContent>
                    <img
                      src="https://via.placeholder.com/200"
                      alt="Drip Irrigation"
                      className="w-full h-32 object-cover"
                    />
                    <Typography variant="h6" className="font-bold mt-2">
                      Drip Irrigation
                    </Typography>
                    <Typography className="text-gray-600">
                      Highly efficient method that minimizes water wastage.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Sprinkler Irrigation Card */}
              <Grid item xs={12} md={4}>
                <Card className="shadow-lg">
                  <CardContent>
                    <img
                      src="https://via.placeholder.com/200"
                      alt="Sprinkler Irrigation"
                      className="w-full h-32 object-cover"
                    />
                    <Typography variant="h6" className="font-bold mt-2">
                      Sprinkler Irrigation
                    </Typography>
                    <Typography className="text-gray-600">
                      Flexible and effective for various crops and terrains.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Flood Irrigation Card */}
              <Grid item xs={12} md={4}>
                <Card className="shadow-lg">
                  <CardContent>
                    <img
                      src="https://via.placeholder.com/200"
                      alt="Flood Irrigation"
                      className="w-full h-32 object-cover"
                    />
                    <Typography variant="h6" className="font-bold mt-2">
                      Flood Irrigation
                    </Typography>
                    <Typography className="text-gray-600">
                      Traditional method effective for certain crops.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Additional Sections */}
            {/* Diagrams and Charts Section */}
            <Typography variant="h5" className="font-bold text-center text-green-600 my-8">
              Irrigation Systems Overview
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <img
                  src="https://via.placeholder.com/600x300"
                  alt="Irrigation System Diagram"
                  className="w-full"
                />
                <Typography className="text-center text-gray-600 mt-2">
                  Diagram of Irrigation System Components
                </Typography>
              </Grid>
            </Grid>

            {/* Water Conservation Tips */}
            <Typography variant="h5" className="font-bold text-center text-green-600 my-8">
              Water Conservation Tips
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <img
                  src="https://via.placeholder.com/600x200"
                  alt="Water Conservation Tips Infographic"
                  className="w-full"
                />
                <Typography className="text-center text-gray-600 mt-2">
                  Infographic on Water Conservation Tips
                </Typography>
              </Grid>
            </Grid>

            {/* Comparison Charts */}
            <Typography variant="h5" className="font-bold text-center text-green-600 my-8">
              Irrigation Method Comparison
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <img
                  src="https://via.placeholder.com/600x300"
                  alt="Irrigation Method Comparison Chart"
                  className="w-full"
                />
                <Typography className="text-center text-gray-600 mt-2">
                  Chart comparing irrigation methods
                </Typography>
              </Grid>
            </Grid>

            {/* CTA Buttons Section */}
            <div className="text-center my-8">
              <Button variant="contained" color="primary" className="mx-2 hover:bg-blue-600 transition-colors">
                Learn More
              </Button>
              <Button variant="contained" color="primary" className="mx-2 hover:bg-blue-600 transition-colors">
                Contact an Expert
              </Button>
            </div>

            {/* Contact Information */}
            <div className="text-center mt-12">
              <Typography variant="h6" className="font-bold text-gray-800">Need Assistance?</Typography>
              <Typography className="text-gray-600">
                Contact us at: <a href="tel:+1234567890" className="text-blue-500">+123 456 7890</a> | <a href="mailto:support@smartfarm.com" className="text-blue-500">support@smartfarm.com</a>
              </Typography>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default IrrigationPage;
