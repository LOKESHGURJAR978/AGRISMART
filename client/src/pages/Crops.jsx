import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { differenceInWeeks } from 'date-fns';  // Library to calculate date differences

const CropsPage = () => {
  const [crops, setCrops] = useState([]);
  const [openCropDialog, setOpenCropDialog] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [cropName, setCropName] = useState('');
  const [cropType, setCropType] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [healthStatus, setHealthStatus] = useState('');

  useEffect(() => {
    const fetchCrops = async () => {
      const response = await fetch('/api/crops');
      const data = await response.json();
      
      const updatedCrops = data.map(crop => ({
        ...crop,
        growthStage: calculateGrowthStage(crop.plantingDate)
      }));
      
      setCrops(updatedCrops);
    };
    fetchCrops();
  }, []);

  const handleOpenCropDialog = (crop) => {
    if (crop) {
      setSelectedCrop(crop);
      setCropName(crop.name);
      setCropType(crop.type);
      setPlantingDate(crop.plantingDate);
      setGrowthStage(crop.growthStage);
      setHealthStatus(crop.healthStatus);
    } else {
      setSelectedCrop(null);
      setCropName('');
      setCropType('');
      setPlantingDate('');
      setGrowthStage('');
      setHealthStatus('');
    }
    setOpenCropDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedCrop(null);
    setOpenCropDialog(false);
  };

  const calculateGrowthStage = (plantingDate) => {
    if (!plantingDate) return '';

    const today = new Date();
    const weeksElapsed = differenceInWeeks(today, new Date(plantingDate));

    if (weeksElapsed <= 1) {
      return 'Germination';
    } else if (weeksElapsed <= 3) {
      return 'Seedling';
    } else if (weeksElapsed <= 6) {
      return 'Vegetative';
    } else if (weeksElapsed <= 10) {
      return 'Flowering/Budding';
    } else if (weeksElapsed <= 14) {
      return 'Fruiting';
    } else {
      return 'Maturation';
    }
  };

  const handleAddCrop = async () => {
    const newCrop = {
      name: cropName,
      type: cropType,
      plantingDate: plantingDate,
      growthStage: calculateGrowthStage(plantingDate),
      healthStatus: healthStatus,
    };

    console.log("New crop data:", newCrop);

    try {
      const response = await fetch('/api/crops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCrop),
      });

      if (response.ok) {
        const addedCrop = await response.json();
        setCrops([...crops, addedCrop]);
        handleCloseDialog();
      } else {
        console.error('Failed to add crop');
      }
    } catch (error) {
      console.error('Error while adding crop:', error);
    }
  };

  return (
    <div className="CropsPage flex">
      <Sidebar />
      <Container>
        <Typography variant="h4" gutterBottom>Crops Management</Typography>
        <Button variant="contained" onClick={() => handleOpenCropDialog(null)}>Add New Crop</Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Crop Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Planting Date</TableCell>
              <TableCell>Growth Stage</TableCell>
              <TableCell>Health Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {crops.map((crop, index) => (
              <TableRow key={index}>
                <TableCell>{crop.name}</TableCell>
                <TableCell>{crop.type}</TableCell>
                <TableCell>{new Date(crop.plantingDate).toLocaleDateString()}</TableCell>
                <TableCell>{crop.growthStage}</TableCell>
                <TableCell>{crop.healthStatus}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenCropDialog(crop)}>View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={openCropDialog} onClose={handleCloseDialog}>
          <DialogTitle>{selectedCrop ? 'Crop Details' : 'Add New Crop'}</DialogTitle>
          <DialogContent>
            {selectedCrop ? (
              <>
                <Typography variant="h6">Crop Name: {selectedCrop.name}</Typography>
                <Typography variant="h6">Type: {selectedCrop.type}</Typography>
                <Typography variant="h6">Planting Date: {new Date(selectedCrop.plantingDate).toLocaleDateString()}</Typography>
                <Typography variant="h6">Growth Stage: {selectedCrop.growthStage}</Typography>
                <Typography variant="h6">Health Status: {selectedCrop.healthStatus}</Typography>
              </>
            ) : (
              <>
                <Typography variant="h6">Enter Crop Details:</Typography>
                <TextField
                  margin="dense"
                  label="Crop Name"
                  fullWidth
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Type"
                  fullWidth
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Planting Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={plantingDate}
                  onChange={(e) => setPlantingDate(e.target.value)}
                />
                <Typography variant="h6">Estimated Growth Stage: {growthStage}</Typography>
                <TextField
                  margin="dense"
                  label="Health Status"
                  fullWidth
                  value={healthStatus}
                  onChange={(e) => setHealthStatus(e.target.value)}
                />
                <Button onClick={handleAddCrop} color="primary" variant="contained">Submit</Button>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default CropsPage;
