import FarmInfo from '../models/info.model.js';

export const getFarmInfo = async (req, res) => {
  try {
    const info = await FarmInfo.findOne(); // Assuming you have a single farm info entry
    if (!info) return res.status(404).json({ message: 'Farm info not found' });
    res.json(info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
