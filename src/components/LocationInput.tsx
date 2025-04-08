
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface LocationSuggestion {
  id: string;
  name: string;
  address?: string;
  distance?: string;
}

interface LocationInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLocationSelect?: (location: LocationSuggestion) => void;
  placeholder?: string;
  className?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({ 
  value, 
  onChange, 
  onLocationSelect,
  placeholder = "Search location", 
  className 
}) => {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Sample locations data - in a real app, this would come from an API
  const mockLocations: LocationSuggestion[] = [
    { id: '1', name: 'San Francisco', address: 'California, USA' },
    { id: '2', name: 'Los Angeles', address: 'California, USA' },
    { id: '3', name: 'New York', address: 'New York, USA' },
    { id: '4', name: 'Chicago', address: 'Illinois, USA' },
    { id: '5', name: 'Seattle', address: 'Washington, USA' },
    { id: '6', name: 'Boston', address: 'Massachusetts, USA' },
    { id: '7', name: 'Austin', address: 'Texas, USA' },
    { id: '8', name: 'Miami', address: 'Florida, USA' },
    { id: '9', name: 'Target Store', address: '789 Market St, San Francisco', distance: '0.5 miles away' },
    { id: '10', name: 'Walmart', address: '123 Main St, San Francisco', distance: '1.2 miles away' },
    { id: '11', name: 'Downtown Mall', address: '456 Market St, San Francisco', distance: '0.8 miles away' },
  ];

  useEffect(() => {
    // Filter locations based on input value
    if (value.length > 0) {
      const filtered = mockLocations.filter(location => 
        location.name.toLowerCase().includes(value.toLowerCase()) || 
        (location.address && location.address.toLowerCase().includes(value.toLowerCase()))
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocationClick = (location: LocationSuggestion) => {
    if (onLocationSelect) {
      onLocationSelect(location);
    }
    setShowSuggestions(false);
  };

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div className="relative flex items-center">
        <div className="absolute left-3">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-gray-100 w-full py-2 pl-10 pr-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
          onFocus={() => value && setShowSuggestions(true)}
        />
      </div>
      
      {/* Location suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
              onClick={() => handleLocationClick(suggestion)}
            >
              <div className="font-medium">{suggestion.name}</div>
              {suggestion.address && (
                <div className="text-xs text-gray-500">{suggestion.address}</div>
              )}
              {suggestion.distance && (
                <div className="text-xs text-gray-500 mt-1">{suggestion.distance}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
