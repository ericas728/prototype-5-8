
import React from "react";

interface RideCardProps {
  distance: string;
  duration: string;
  price: string;
  onSelect?: () => void;
  selected?: boolean;
}

const RideCard: React.FC<RideCardProps> = ({ 
  distance, 
  duration, 
  price, 
  onSelect,
  selected = false
}) => {
  return (
    <div 
      onClick={onSelect}
      className={`bg-white p-4 rounded-lg shadow-sm mb-3 flex justify-between items-center border ${selected ? 'border-black' : 'border-transparent'}`}
    >
      <div className="flex items-center">
        <div className="w-14 h-10 mr-3">
          <img 
            src="/lovable-uploads/2593519d-6a1f-4796-aff4-ced869ce2116.png" 
            alt="Car" 
            className="w-full h-full object-contain" 
          />
        </div>
        <div>
          <p className="text-xs text-gray-500">Priority ride</p>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-500">{distance}</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">{duration}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">${price}</p>
        <button className="bg-black text-white text-xs rounded-full px-3 py-1 mt-1">
          Book
        </button>
      </div>
    </div>
  );
};

export default RideCard;
