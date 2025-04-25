import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FarmInfoForm = () => {
  const [formData, setFormData] = useState({
    farmName: "",
    farmType: "",
    farmSize: "",
    location: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    crops: [],
    livestock: [],
    irrigationSystem: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const API_URL = '/api/info'; // API endpoint
  const LOCATIONIQ_API_KEY = 'pk.736d78c072aae0b519f70469b225af83'; // Your API key

  const createFarmInfo = async (farmData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(farmData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const getFarmInfo = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const fetchLocationSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]); // Clear suggestions if input is too short
      return;
    }

    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/autocomplete.php`, {
        params: {
          key: LOCATIONIQ_API_KEY,
          q: query,
          format: 'json',
        },
      });
      setSuggestions(response.data); // Set suggestions based on API response
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "location") {
      await fetchLocationSuggestions(value);
    }
  };

  const handleMultiSelectChange = (e) => {
    const { options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({ ...formData, [e.target.name]: selectedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFarmInfo(formData);
      navigate("/"); // Redirect after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    
    const loadFarmInfo = async () => {
      try {
        const data = await getFarmInfo();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching farm info:", error);
      }
    };
    loadFarmInfo();
  }, []);

  const handleSelectSuggestion = (suggestion) => {
    setFormData({ ...formData, location: suggestion.display_name });
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-700 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white font-bold text-xl">Farm Information</h1>
          <nav>
            <ul className="flex space-x-4 text-white">
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          {/* Farm Details Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Farm Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Farm Name</label>
                <input
                  type="text"
                  name="farmName"
                  value={formData.farmName}
                  onChange={handleInputChange}
                  placeholder="Enter farm name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Farm Type</label>
                <select
                  name="farmType"
                  value={formData.farmType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>Select farm type</option>
                  <option value="livestock">Livestock</option>
                  <option value="crops">Crops</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Farm Size (Acres)</label>
                <input
                  type="number"
                  name="farmSize"
                  value={formData.farmSize}
                  onChange={handleInputChange}
                  placeholder="Enter farm size"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {suggestions.length > 0 && (
                  <ul className="absolute bg-white border border-gray-300 mt-1 rounded-md z-10">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        {suggestion.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>

          {/* Farmer Information Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Farmer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </section>

          {/* Crops and Livestock Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Crops and Livestock</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Crops</label>
                <select
                  name="crops"
                  multiple
                  value={formData.crops}
                  onChange={handleMultiSelectChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="wheat">Wheat</option>
                  <option value="corn">Corn</option>
                  <option value="rice">Rice</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Livestock</label>
                <select
                  name="livestock"
                  multiple
                  value={formData.livestock}
                  onChange={handleMultiSelectChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="cattle">Cattle</option>
                  <option value="sheep">Sheep</option>
                  <option value="chickens">Chickens</option>
                </select>
              </div>
            </div>
          </section>

          {/* Irrigation System Section */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Irrigation System</h2>
            <input
              type="text"
              name="irrigationSystem"
              value={formData.irrigationSystem}
              onChange={handleInputChange}
              placeholder="Enter irrigation system"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </section>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmInfoForm;
