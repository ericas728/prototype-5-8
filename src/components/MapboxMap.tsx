
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [mapInitialized, setMapInitialized] = useState<boolean>(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken || mapInitialized) return;
    
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: center,
      zoom: zoom,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    
    // Add current location marker
    new mapboxgl.Marker({ color: "#3b82f6" })
      .setLngLat(center)
      .addTo(map.current);
    
    setMapInitialized(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("mapbox-token");
    if (token) {
      setMapboxToken(token);
    }
  }, []);

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }
    
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("mapbox-token", mapboxToken);
    initializeMap();
  };

  return (
    <div className={`relative ${className}`}>
      {!mapboxToken && !mapInitialized ? (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center p-4">
          <p className="text-sm text-gray-600 mb-2 text-center">
            Please enter your Mapbox public token to display the map
          </p>
          <form onSubmit={handleTokenSubmit} className="w-full max-w-sm">
            <div className="flex">
              <input
                type="text"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="Enter Mapbox public token"
                className="flex-1 bg-white border border-gray-300 px-3 py-2 rounded-l-md text-sm"
              />
              <button
                type="submit"
                className="bg-black text-white px-3 py-2 rounded-r-md text-sm"
              >
                Set Token
              </button>
            </div>
            <p className="text-xs mt-2 text-gray-500">
              Find your token at{" "}
              <a
                href="https://account.mapbox.com/access-tokens/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                mapbox.com
              </a>
            </p>
          </form>
        </div>
      ) : !mapInitialized ? (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <p>Loading map...</p>
        </div>
      ) : null}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default MapboxMap;
