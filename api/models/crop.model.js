// models/Crop.js
import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    plantingDate: { type: Date, required: true },
    growthStage: { type: String, required: true },
    healthStatus: { type: String, required: true },
});

export default mongoose.model('Crop', cropSchema);
