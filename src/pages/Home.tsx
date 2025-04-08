
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MapboxMap from "@/components/MapboxMap";
import LocationInput from "@/components/LocationInput";

const Home = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };
  
  const handleFindRide = () => {
    navigate("/ride-selection");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Welcome section */}
      <div className="p-5">
        <h1 className="text-xl font-semibold mb-2">Welcome to your home page, Lisa</h1>
        <div className="flex space-x-3 mb-4">
          <button className="px-3 py-1 border border-gray-300 rounded-full text-xs">
            ⭐ Favorites
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-full text-xs">
            🔥 Fast rides
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-full text-xs">
            👨 Friends
          </button>
        </div>
      </div>
      
      {/* Location card */}
      <div className="mx-5 bg-white shadow-md rounded-lg p-4 -mt-2 relative mb-4 z-10">
        <h2 className="font-medium mb-2">Your location</h2>
        <LocationInput 
          value={location} 
          onChange={handleLocationChange} 
          placeholder="San Francisco" 
        />
      </div>
      
      {/* Map view */}
      <div className="flex-1 relative">
        <MapboxMap className="h-full" />
        
        {/* Store cards */}
        <div className="absolute bottom-20 left-0 right-0 px-5">
          <div className="bg-white shadow-md rounded-lg p-3 mb-3 flex items-center">
            <div className="bg-red-500 h-10 w-10 rounded-md flex items-center justify-center mr-3">
              <span className="text-white font-bold">M</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Target</h3>
              <p className="text-xs text-gray-500">0.5 miles away</p>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-3 mb-3 flex items-center">
            <div className="bg-blue-500 h-10 w-10 rounded-md flex items-center justify-center mr-3">
              <span className="text-white font-bold">W</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Walmart</h3>
              <p className="text-xs text-gray-500">1.2 miles away</p>
            </div>
          </div>
        </div>
        
        {/* Find ride button */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={handleFindRide}
            className="bg-black text-white px-5 py-2 rounded-full font-medium"
          >
            Find a ride?
          </button>
        </div>
      </div>
      
      <Navbar />
    </div>
  );
};

export default Home;
