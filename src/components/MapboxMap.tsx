
import React from "react";

interface MapboxMapProps {
  className?: string;
  center?: [number, number];
  zoom?: number;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ 
  className = "", 
  center = [-122.4194, 37.7749], // Default to San Francisco
  zoom = 12 
}) => {
  // Calculate the appropriate map style based on the class name
  const mapHeight = className.includes("h-64") ? "h-64" : "h-full";
  const mapStyle = `${className} ${mapHeight} flex items-center justify-center bg-gray-100`;
  
  return (
    <div className={mapStyle}>
      <div className="relative w-full h-full overflow-hidden">
        {/* Static map background */}
        <div className="absolute inset-0 bg-blue-50">
          {/* Simulated roads */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-300"></div>
          <div className="absolute left-0 right-0 top-1/3 h-0.5 bg-gray-300"></div>
          <div className="absolute left-0 right-0 top-2/3 h-0.5 bg-gray-300"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-300"></div>
          <div className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-gray-300"></div>
          <div className="absolute top-0 bottom-0 left-2/3 w-0.5 bg-gray-300"></div>
          
          {/* Simulated blocks */}
          <div className="absolute left-[20%] top-[20%] w-[15%] h-[15%] bg-blue-100 border border-gray-300"></div>
          <div className="absolute left-[60%] top-[30%] w-[12%] h-[10%] bg-green-100 border border-gray-300"></div>
          <div className="absolute left-[30%] top-[60%] w-[20%] h-[15%] bg-yellow-100 border border-gray-300"></div>
          
          {/* Current location marker */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-blue-500"></div>
          </div>
        </div>
        
        {/* Destination marker */}
        <div className="absolute left-[60%] top-[40%]">
          <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-red-500"></div>
        </div>
        
        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path 
            d="M 50% 50% Q 55% 45%, 60% 40%" 
            stroke="#3b82f6" 
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="5,5"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};

export default MapboxMap;
