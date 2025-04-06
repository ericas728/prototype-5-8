import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle registration here
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="flex-1 flex flex-col">
        <h1 className="text-2xl font-semibold mb-10 text-center">RideShare</h1>
        
        <div className="w-24 h-24 bg-black rounded-lg mx-auto mb-10"></div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-md bg-black text-white"
              required
            />
          </div>
          
          <div>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="DOB"
              className="w-full p-3 border border-gray-300 rounded-md bg-black text-white"
              required
            />
          </div>
          
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
              placeholder="Password (at least 8 characters)"
              className="w-full p-3 border border-gray-300 rounded-md bg-black text-white"
              required
              minLength={8}
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
            Sign Up!
          </button>
        </form>
        
        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-black underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
