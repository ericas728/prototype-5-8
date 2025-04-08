
import React from "react";

interface MapProps {
  className?: string;
}

const Map: React.FC<MapProps> = ({ className }) => {
  return (
    <div className={`bg-gray-100 relative ${className}`}>
      {/* Map grid background to simulate a map */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
        {Array.from({ length: 36 }).map((_, i) => (
          <div 
            key={i} 
            className="border-gray-300 border-r border-b flex items-center justify-center text-[8px] text-gray-400"
          >
            {i % 5 === 0 && `Street ${Math.floor(i / 3) + 1}`}
          </div>
        ))}
      </div>
      
      {/* Location markers */}
      <div className="absolute top-1/4 left-1/4 bg-red-500 h-3 w-3 rounded-full z-10"></div>
      
      {/* Store icons */}
      <div className="absolute top-2/3 left-1/3 bg-white p-1 rounded-md z-10 shadow-md">
        <div className="bg-red-500 h-6 w-6 rounded-md flex items-center justify-center">
          <span className="text-white text-[8px] font-bold">M</span>
        </div>
      </div>
      
      <div className="absolute top-1/3 right-1/4 bg-white p-1 rounded-md z-10 shadow-md">
        <div className="bg-blue-500 h-6 w-6 rounded-md flex items-center justify-center">
          <span className="text-white text-[8px] font-bold">W</span>
        </div>
      </div>
      
      {/* Current location indicator */}
      <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 bg-blue-500 h-4 w-4 rounded-full z-10 flex items-center justify-center">
        <div className="bg-white h-2 w-2 rounded-full"></div>
      </div>
    </div>
  );
};

export default Map;
