
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle login here
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-2xl font-semibold mb-10 text-center">Title of App</h1>
        
        {/* Logo placeholder */}
        <div className="w-24 h-24 bg-black rounded-lg mx-auto mb-10"></div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md bg-black text-white"
              required
            />
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md bg-black text-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={20} className="text-white" />
              ) : (
                <Eye size={20} className="text-white" />
              )}
            </button>
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-md font-medium"
          >
            Login
          </button>
        </form>
        
        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-black underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
