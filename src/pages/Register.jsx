import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { message, Spin } from "antd";
import signupImg from "../assets/image/signup.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Prepopulate email if provided via location state
  useEffect(() => {
    if (location.state?.email && !formData.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state, formData.email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      setLoading(true);
      const response = await axios.post("https://rul-backend.onrender.com//api/auth/register", {
        email: formData.email,
        password: formData.password,
      });
      console.log(formData);
      setLoading(false);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        message.success("Registration successful");
        navigate("/");
        
      } else {
        message.error("Registration failed");
      }
      
    } catch (error) {
      message.error(error.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center md:gap-0 lg:flex-row lg:px-36 lg:justify-between">
      {loading && (
        <div className="absolute top-5 left-[50%] transform -translate-x-1/2">
          <Spin />
        </div>
      )}
      <img className="w-56 h-56 md:w-96 md:h-96" src={signupImg} alt="Sign Up" />
      <div className="max-w-md bg-stone-100 border-s-4 border-fuchsia-400 rounded-lg overflow-hidden shadow-2xl p-6 w-[90%]">
        <h2 className="text-2xl font-semibold mb-4 text-lime-600 md:text-3xl md:font-bold">
          Sign Up
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 md:text-xl"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 md:text-xl"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 md:text-2xl md:font-bold md:mt-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
