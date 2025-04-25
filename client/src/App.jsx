// src/App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import FarmOverview from './pages/FarmOverview';
import WeatherPage from './pages/Weather';
import IrrigationPage from './pages/Irrigation';
import TasksPage from './pages/Tasks';
import SettingsPage from './pages/Settings';
import FinancePage from './pages/Finances';
import CropsPage from './pages/Crops';
import FarmInfoForm from './pages/Farminfo';
import Community from './pages/Community';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/" element={<Home />} />
     <Route path="/info" element={<FarmInfoForm />} />
    <Route path="/crops" element={<CropsPage />} />
    <Route path="/finances" element={<FinancePage />} />
   < Route path="/settings" element={<SettingsPage />} />
     <Route path="/tasks" element={<TasksPage />} />
     <Route path="/irrigation" element={<IrrigationPage />} />
     <Route path='/community' element={<Community/>}/>
     <Route path="/weather" element={<WeatherPage />} />
      <Route path="/farm-overview" element={<FarmOverview />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path='/sign-in' element={<Signin />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
