
import React from "react";
import { Home, Search, ClipboardList, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <Link to="/home" className="flex flex-col items-center">
          <Home 
            size={22} 
            className={cn(
              "text-gray-500", 
              isActive("/home") && "text-black"
            )} 
          />
        </Link>
        <Link to="/search" className="flex flex-col items-center">
          <Search 
            size={22} 
            className={cn(
              "text-gray-500", 
              isActive("/search") && "text-black"
            )} 
          />
        </Link>
        <Link to="/lists" className="flex flex-col items-center">
          <ClipboardList 
            size={22} 
            className={cn(
              "text-gray-500", 
              isActive("/lists") && "text-black"
            )} 
          />
        </Link>
        <Link to="/profile" className="flex flex-col items-center">
          <User 
            size={22} 
            className={cn(
              "text-gray-500", 
              isActive("/profile") && "text-black"
            )} 
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
