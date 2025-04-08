
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface LocationSuggestion {
  id: string;
  name: string;
  address?: string;
  distance?: string;
  coordinates?: [number, number]; 
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const mapboxToken = localStorage.getItem("mapbox_token");

  // Fetch locations from Mapbox Geocoding API
  const searchLocations = async (query: string) => {
    if (!query || query.length < 2) return;
    if (!mapboxToken) {
      setError("Mapbox token not found. Please set your token in map settings.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`;
      const params = new URLSearchParams({
        access_token: mapboxToken,
        autocomplete: 'true',
        limit: '5',
        types: 'place,address,poi'
      });

      const response = await fetch(`${endpoint}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }

      const data = await response.json();
      
      // Transform Mapbox results to our LocationSuggestion format
      const locations: LocationSuggestion[] = data.features.map((feature: any, index: number) => ({
        id: feature.id || `location-${index}`,
        name: feature.text || feature.place_name.split(',')[0],
        address: feature.place_name,
        coordinates: feature.center as [number, number]
      }));

      setSuggestions(locations);
      setShowSuggestions(true);
    } catch (err) {
      console.error('Error fetching location suggestions:', err);
      setError('Failed to fetch locations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle debounced search
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (value.length > 1) {
      debounceTimeout.current = setTimeout(() => {
        searchLocations(value);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
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
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto"
        >
          {loading && (
            <div className="p-3 text-center text-gray-500">
              <div className="animate-pulse">Searching locations...</div>
            </div>
          )}

          {error && (
            <div className="p-3 text-center text-red-500">
              <div>{error}</div>
            </div>
          )}

          {!loading && !error && suggestions.length === 0 && (
            <div className="p-3 text-center text-gray-500">
              <div>No locations found</div>
            </div>
          )}

          {!loading && suggestions.map((suggestion) => (
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
