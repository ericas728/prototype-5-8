
import React from "react";
import { Search } from "lucide-react";

interface LocationInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search location", 
  className 
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="absolute left-3">
        <Search size={20} className="text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-100 w-full py-2 pl-10 pr-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
};

export default LocationInput;
