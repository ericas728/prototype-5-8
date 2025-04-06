
import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-semibold mb-10">Title of App</h1>
        
        {/* Logo placeholder */}
        <div className="w-24 h-24 bg-black rounded-lg mb-20"></div>
        
        <div className="w-full space-y-4">
          <Link
            to="/signup"
            className="block w-full bg-black text-white p-3 rounded-md font-medium text-center"
          >
            Sign Up
          </Link>
          
          <Link
            to="/login"
            className="block w-full bg-white text-black border border-black p-3 rounded-md font-medium text-center"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
