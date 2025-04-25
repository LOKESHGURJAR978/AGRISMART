import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

// Use your API key directly here (but it's better to store it in environment variables for security)
const API_KEY = '14fcf190fff685d32471aa8486775ec5';

const WeatherPage = () => {
  const location = useLocation(); // Get location state
  const userLocation = location.state?.location || 'Navi Mumbai, Thane Taluka, Maharashtra, India'; // Default to London if no location is passed

  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch Current Weather
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&units=metric&appid=${API_KEY}`
        );
        setWeatherData(weatherResponse.data);
      } catch (err) {
        setError("Failed to fetch current weather data.");
        console.error('Error fetching weather data:', err);
      }
    };

    const fetchForecastData = async () => {
      try {
        // Fetch 5-Day Forecast
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${userLocation}&units=metric&appid=${API_KEY}`
        );
        const forecastList = forecastResponse.data.list;

        // Filter to get one forecast per day (use noon forecast)
        const dailyForecasts = forecastList.filter((entry) =>
          entry.dt_txt.includes('12:00:00')
        );
        setForecastData(dailyForecasts);
      } catch (err) {
        setError("Failed to fetch forecast data.");
        console.error('Error fetching forecast data:', err);
      }
    };

    fetchWeatherData();
    fetchForecastData();
  }, [userLocation]); // Dependency array includes userLocation

  if (error) {
    return (
      <div className="WeatherPage bg-gradient-to-r from-blue-300 to-green-300 min-h-screen py-6 flex justify-center items-center">
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className="WeatherPage bg-gradient-to-r from-blue-300 to-green-300 min-h-screen py-6 flex">
      <Sidebar />
      <div style={{ flex: 1, paddingTop: '20px' }}>
        <div style={{ flex: 1, paddingLeft: '16px' }}>
          <Container maxWidth="lg" className="my-12">
            {/* Current Weather Section */}
            <Typography variant="h4" className="font-bold text-center text-blue-900 mb-6">Current Weather</Typography>
            {weatherData ? (
              <Card className="shadow-lg mb-8 bg-white">
                <CardContent className="flex flex-col items-center">
                  <Typography variant="h5" className="text-gray-800">Location: {weatherData.name}</Typography>
                  <div className="flex items-center mt-4">
                    <img 
                      src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                      alt="Weather Icon" 
                      className="mr-2"
                    />
                    <Typography variant="h3" className="text-blue-900">{weatherData.main.temp}°C</Typography>
                  </div>
                  <Typography className="mt-2 text-lg text-gray-600">Humidity: {weatherData.main.humidity}%</Typography>
                  <Typography className="mt-2 text-lg text-gray-600">Condition: {weatherData.weather[0].description}</Typography>
                </CardContent>
              </Card>
            ) : (
              <Typography>Loading current weather...</Typography>
            )}

            {/* 5-Day Forecast Section */}
            <Typography variant="h4" className="font-bold text-center text-blue-900 mb-6">5-Day Forecast</Typography>
            {forecastData.length > 0 ? (
              <Grid container spacing={3}>
                {forecastData.slice(0, 5).map((forecast, index) => (
                  <Grid item xs={12} sm={6} md={2} key={index}>
                    <Card className="shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl bg-white">
                      <CardContent className="flex flex-col items-center">
                        <Typography variant="h6" className="font-bold text-gray-800">
                          {new Date(forecast.dt_txt).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </Typography>
                        <img 
                          src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} 
                          alt="Weather Icon" 
                        />
                        <Typography className="mt-2 text-lg text-gray-600">High: {forecast.main.temp_max}°C</Typography>
                        <Typography className="text-lg text-gray-600">Low: {forecast.main.temp_min}°C</Typography>
                        <Typography className="text-lg text-gray-600">Precipitation: {Math.round(forecast.pop * 100)}%</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>Loading 5-day forecast...</Typography>
            )}

            {/* Alerts Section */}
            <Typography variant="h4" className="font-bold text-center text-blue-900 mb-6 mt-12">Weather Alerts</Typography>
            {alerts.length ? (
              <Card className="shadow-lg mb-8 bg-white">
                <CardContent>
                  {alerts.map((alert, index) => (
                    <Typography key={index} className="mt-2 text-lg text-gray-600">{alert}</Typography>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Typography>No alerts available.</Typography>
            )}

            {/* Call-to-Action Buttons */}
            <div className="text-center my-8">
              <Button variant="contained" color="primary" className="mx-2 hover:bg-blue-600 transition-colors">View Detailed Forecast</Button>
              <Button variant="contained" color="primary" className="mx-2 hover:bg-blue-600 transition-colors">Set Weather Alerts</Button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
