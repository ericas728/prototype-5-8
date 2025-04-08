
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MapboxMap from "@/components/MapboxMap";
import LocationInput from "@/components/LocationInput";
import { toast } from "@/components/ui/use-toast";

interface LocationSuggestion {
  id: string;
  name: string;
  address?: string;
  distance?: string;
  coordinates?: [number, number]; 
}

const Home = () => {
  const [location, setLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion | null>(null);
  const navigate = useNavigate();
  
  // Example store locations with coordinates
  const stores = [
    { 
      id: "target", 
      name: "Target", 
      distance: "0.5 miles away", 
      coordinates: [-122.4124, 37.7785] as [number, number]
    },
    { 
      id: "walmart", 
      name: "Walmart", 
      distance: "1.2 miles away", 
      coordinates: [-122.4284, 37.7690] as [number, number]
    }
  ];
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    if (e.target.value === "") {
      setSelectedLocation(null);
    }
  };
  
  const handleLocationSelect = (location: LocationSuggestion) => {
    setLocation(location.name);
    setSelectedLocation(location);
    
    // Display toast when location is selected
    toast({
      title: "Location selected",
      description: `${location.name} has been selected`,
    });
  };
  
  const handleFindRide = () => {
    if (!selectedLocation) {
      toast({
        title: "No location selected",
        description: "Please search and select a location first",
        variant: "destructive"
      });
      return;
    }
    navigate("/ride-selection", { 
      state: { 
        selectedLocation 
      } 
    });
  };

  // Prepare markers for the map
  const markers = [
    // Add markers for stores
    ...stores.map(store => ({
      position: store.coordinates,
      color: store.id === "target" ? "#ef4444" : "#3b82f6"
    }))
  ];

  // If we have selected location coordinates, add its marker and use it for map center
  const mapCenter = selectedLocation?.coordinates || [-122.4194, 37.7749];
  
  if (selectedLocation?.coordinates) {
    markers.push({
      position: selectedLocation.coordinates,
      color: "#10b981" // green color for selected location
    });
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Welcome section */}
      <div className="p-5">
        <h1 className="text-xl font-semibold mb-2">Welcome to your home page, Lisa</h1>
        <div className="flex space-x-3 mb-4 overflow-x-auto">
          <button className="px-3 py-1 border border-gray-300 rounded-full text-xs whitespace-nowrap">
            ⭐ Favorites
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-full text-xs whitespace-nowrap">
            🔥 Fast rides
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-full text-xs whitespace-nowrap">
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
          onLocationSelect={handleLocationSelect}
          placeholder="Search for any location..." 
        />
        {selectedLocation && (
          <div className="mt-2 text-xs text-gray-500">
            {selectedLocation.address && <div>{selectedLocation.address}</div>}
            {selectedLocation.distance && <div>{selectedLocation.distance}</div>}
          </div>
        )}
      </div>
      
      {/* Map view */}
      <div className="flex-1 relative">
        <MapboxMap 
          className="h-full" 
          center={mapCenter}
          zoom={14}
          markers={markers}
        />
        
        {/* Store cards */}
        <div className="absolute bottom-20 left-0 right-0 px-5">
          {stores.map(store => (
            <div key={store.id} className="bg-white shadow-md rounded-lg p-3 mb-3 flex items-center">
              <div className={`${store.id === 'target' ? 'bg-red-500' : 'bg-blue-500'} h-10 w-10 rounded-md flex items-center justify-center mr-3`}>
                <span className="text-white font-bold">{store.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{store.name}</h3>
                <p className="text-xs text-gray-500">{store.distance}</p>
              </div>
            </div>
          ))}
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
