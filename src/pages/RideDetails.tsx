
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Map from "@/components/Map";
import Navbar from "@/components/Navbar";

const RideDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-4">
        <div className="flex items-center mb-2">
          <button onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-semibold">Your location</h1>
        </div>
      </div>
      
      {/* Map section */}
      <div className="h-64">
        <Map className="h-full" />
      </div>
      
      {/* Ride details */}
      <div className="flex-1 bg-white p-4">
        <div className="mb-6">
          <div className="mb-4">
            <div className="w-20 h-14 mx-auto mb-2">
              <img 
                src="/lovable-uploads/2593519d-6a1f-4796-aff4-ced869ce2116.png" 
                alt="Car" 
                className="w-full h-full object-contain" 
              />
            </div>
            <p className="text-center text-gray-500">Priority rides</p>
            <p className="text-center font-semibold">0.7 miles • 5-7 minutes</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold">Priority rides</p>
                <p className="text-xs text-gray-500">0.7 miles • 5-7 minutes</p>
              </div>
              <div>
                <p className="font-bold">$9.50</p>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          className="w-full bg-black text-white p-3 rounded-md font-medium mb-3"
        >
          Share a ride
        </button>
        
        <button 
          className="w-full bg-black text-white p-3 rounded-md font-medium"
        >
          Confirm for 5 PM?
        </button>
      </div>
      
      <Navbar />
    </div>
  );
};

export default RideDetails;
