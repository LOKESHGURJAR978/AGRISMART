// models/farmModel.js
let farmInfo = {}; // Sample in-memory data storage

export const createFarmInfo = (data) => {
  farmInfo = data; // Save the farm data
  return farmInfo; // Return the saved farm info
};

export const getFarmInfo = () => {
  return farmInfo; // Return the stored farm info
};
