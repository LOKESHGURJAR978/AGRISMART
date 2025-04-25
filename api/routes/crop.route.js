// routes/crops.js
import express from 'express';
import Crop from '../models/crop.model.js'; // Make sure to use .js extension

const router = express.Router();

// Get all crops
router.get('/', async (req, res) => {
    try {
        const crops = await Crop.find();
        res.json(crops);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new crop
router.post('/', async (req, res) => {
    const crop = new Crop({
        name: req.body.name,
        type: req.body.type,
        plantingDate: req.body.plantingDate,
        growthStage: req.body.growthStage,
        healthStatus: req.body.healthStatus,
    });

    try {
        const newCrop = await crop.save();
        res.status(201).json(newCrop);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
