
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MapboxMap from "@/components/MapboxMap";
import RideCard from "@/components/RideCard";
import Navbar from "@/components/Navbar";

const RideSelection = () => {
  const navigate = useNavigate();
  const [selectedRideIndex, setSelectedRideIndex] = useState(0);
  
  // Example destination
  const destination = [-122.4124, 37.7785] as [number, number]; // Target location
  
  // Mock user location
  const userLocation = [-122.4194, 37.7749] as [number, number]; // San Francisco
  
  const rides = [
    { distance: "0.5 miles away", duration: "3-5 minutes", price: "9.50" },
    { distance: "0.7 miles away", duration: "5-7 minutes", price: "8.25" },
    { distance: "1.2 miles away", duration: "7-9 minutes", price: "10.25" }
  ];

  // Markers for the map
  const markers = [
    {
      position: userLocation,
      color: "#3b82f6" // Blue for user location
    },
    {
      position: destination,
      color: "#ef4444" // Red for destination
    }
  ];

  const handleRideSelect = (index: number) => {
    setSelectedRideIndex(index);
  };

  const handleBookRide = () => {
    navigate("/ride-details");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-semibold">Choose your ride</h1>
        </div>
      </div>
      
      {/* Map section */}
      <div className="h-64">
        <MapboxMap 
          className="h-full" 
          center={[(userLocation[0] + destination[0]) / 2, (userLocation[1] + destination[1]) / 2]}
          zoom={13}
          markers={markers}
        />
      </div>
      
      {/* Ride options */}
      <div className="flex-1 bg-white p-4">
        <div className="mb-4">
          {rides.map((ride, index) => (
            <RideCard
              key={index}
              distance={ride.distance}
              duration={ride.duration}
              price={ride.price}
              selected={index === selectedRideIndex}
              onSelect={() => handleRideSelect(index)}
            />
          ))}
        </div>
        
        <button 
          onClick={handleBookRide}
          className="w-full bg-black text-white p-3 rounded-md font-medium"
        >
          Book
        </button>
      </div>
      
      <Navbar />
    </div>
  );
};

export default RideSelection;
