// routes/farmRoutes.js
import express from 'express';
import { createFarmInfo, getFarmInfo } from '../models/info.model.js';

const router = express.Router();

// Route to create farm info
router.post('/', (req, res) => {
  const farmData = createFarmInfo(req.body); // Save the farm data
  res.status(201).json(farmData); // Respond with created farm info
});

// Route to get farm info
router.get('/', (req, res) => {
  const farmData = getFarmInfo(); // Get stored farm info
  res.json(farmData); // Respond with stored farm info
});

export default router;
