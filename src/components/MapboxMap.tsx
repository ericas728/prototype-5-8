
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapboxMapProps {
  className?: string;
  center?: [number, number];
  zoom?: number;
  markers?: {
    position: [number, number];
    color: string;
  }[];
}

const MapboxMap: React.FC<MapboxMapProps> = ({ 
  className = "", 
  center = [-122.4194, 37.7749], // Default to San Francisco
  zoom = 12,
  markers = []
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string | null>(localStorage.getItem("mapbox_token"));
  const [showTokenInput, setShowTokenInput] = useState<boolean>(!mapboxToken);

  // Handle token input
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = document.getElementById("mapbox-token") as HTMLInputElement;
    const token = input.value.trim();
    if (token) {
      localStorage.setItem("mapbox_token", token);
      setMapboxToken(token);
      setShowTokenInput(false);
    }
  };

  useEffect(() => {
    // If we don't have a token or container, don't initialize the map
    if (!mapboxToken || !mapContainerRef.current) return;

    try {
      // Set the access token
      mapboxgl.accessToken = mapboxToken;
      
      // Initialize the map
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: zoom,
        attributionControl: false
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      
      // Add markers if provided
      markers.forEach(marker => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundColor = marker.color;
        el.style.width = '15px';
        el.style.height = '15px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 2px rgba(0,0,0,0.3)';
        
        new mapboxgl.Marker(el)
          .setLngLat(marker.position)
          .addTo(map.current!);
      });
      
      // Add user location marker
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (map.current) {
            const userLocation: [number, number] = [position.coords.longitude, position.coords.latitude];
            
            const el = document.createElement('div');
            el.className = 'user-marker';
            el.style.backgroundColor = '#3b82f6';
            el.style.width = '20px';
            el.style.height = '20px';
            el.style.borderRadius = '50%';
            el.style.border = '3px solid white';
            el.style.boxShadow = '0 0 3px rgba(0,0,0,0.5)';
            
            new mapboxgl.Marker(el)
              .setLngLat(userLocation)
              .addTo(map.current);
              
            // Center map on user location if no other center is specified
            if (center[0] === -122.4194 && center[1] === 37.7749) {
              map.current.flyTo({
                center: userLocation,
                zoom: 14,
                essential: true
              });
            }
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } catch (error) {
      console.error("Error initializing map:", error);
      // If there's an error with the token, we'll show the input again
      setShowTokenInput(true);
      localStorage.removeItem("mapbox_token");
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken, center, zoom, markers]);

  // Render token input if no token is available
  if (showTokenInput) {
    return (
      <div className={`flex flex-col items-center justify-center p-4 ${className} bg-gray-100 rounded-lg`}>
        <p className="text-sm text-gray-700 mb-3">To display the map, please enter your Mapbox token:</p>
        <form onSubmit={handleTokenSubmit} className="w-full">
          <input
            id="mapbox-token"
            type="text"
            placeholder="Enter your Mapbox token"
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <button 
            type="submit" 
            className="w-full bg-black text-white p-2 rounded"
          >
            Submit
          </button>
          <p className="text-xs text-gray-500 mt-2">
            You can get a free Mapbox token by signing up at <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500">mapbox.com</a>
          </p>
        </form>
      </div>
    );
  }

  // Render the map
  return (
    <div className={`${className} relative`}>
      <div ref={mapContainerRef} className="absolute inset-0" />
    </div>
  );
};

export default MapboxMap;
