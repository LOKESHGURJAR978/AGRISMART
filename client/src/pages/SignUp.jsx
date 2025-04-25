import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Icons for input fields

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of background images
  const images = [
    "https://t3.ftcdn.net/jpg/03/40/70/04/360_F_340700428_AquH6hbzeMOYLQ6g6kfWAMuUvfw60Zd1.jpg",
    "https://static2.tripoto.com/media/filter/tst/img/522191/TripDocument/1551211524_main_qimg_2bbc151d30035d940ca13616813a2b93.png", // Add your next image URL here
    "https://e0.pxfuel.com/wallpapers/734/312/desktop-wallpaper-farmhouse-indian-farmer.jpg",
    "https://media.istockphoto.com/id/108313157/photo/india-farming.jpg?s=612x612&w=0&k=20&c=eIh5qLq3fmUIKfVVzg1GO-aU2cTXCH_6yjf16zMPEK8=", // Add another image URL here
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [images.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div 
      className='min-h-screen flex items-center justify-center bg-cover bg-center' 
      style={{ 
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
     <div className="bg-white shadow-4xl rounded-lg p-6 max-w-lg w-full"> {/* Form with white background and shadow */}
        <h2 className="font-bold text-3xl text-center text-green-600 mb-4 font-sans">Sign Up</h2> {/* Changed to Sign Up */}
        <p className='text-sm text-center mb-4 font-sans'>
          Sign up to share your knowledge and advice in the world of agriculture. Join us today!
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label value="Your username" className="font-sans" />
            <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden w-full">
              <FaUser className="text-gray-400 mx-2" />
              <TextInput
                type="text"
                placeholder="Username"
                id='username'
                onChange={handleChange}
                className="border-none focus:ring-0 focus:outline-none w-full font-sans" // Full width and custom font
              />
            </div>
          </div>

          <div>
            <Label value="Your email" className="font-sans" />
            <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden w-full">
              <FaEnvelope className="text-gray-400 mx-2" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id='email'
                onChange={handleChange}
                className="border-none focus:ring-0 focus:outline-none w-full font-sans" // Full width and custom font
              />
            </div>
          </div>

          <div>
            <Label value="Your password" className="font-sans" />
            <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden w-full">
              <FaLock className="text-gray-400 mx-2" />
              <TextInput
                type="password"
                placeholder="Password"
                id='password'
                onChange={handleChange}
                className="border-none focus:ring-0 focus:outline-none w-full font-sans" // Full width and custom font
              />
            </div>
          </div>

          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg text-sm md:text-base hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-700"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading</span>
              </>
            ) : "Sign Up"}
          </Button>

          {/* Google OAuth Component */}
          <div className="mt-4">
            <OAuth />
          </div>

          <div className='flex gap-2 text-sm mt-4 justify-center'>
            <span className="font-sans">Have an account?</span>
            <Link to='/sign-in' className='text-blue-500 font-sans'>Sign In</Link>
          </div>

          {errorMessage && (
            <Alert className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errorMessage}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
