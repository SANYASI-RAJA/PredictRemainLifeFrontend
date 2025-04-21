import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import loginImg from "../assets/image/login.jpg"; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeHandle = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://rul-backend.onrender.com//api/auth/login", formData);
      const { token } = res.data;
      if (token) {
        localStorage.setItem("token", token);
        message.success("Login successful");
        navigate("/");
      } else {
        message.error("Login failed");
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || "Login failed";
      setError(errMsg);
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center gap-10 lg:flex-row lg:px-16 lg:justify-between">
      <img
        src={loginImg}
        alt="Login"
        className="rounded-md w-56 md:w-[60%] lg:w-[40%]"
      />
      <div className="bg-stone-100 border border-teal-400 p-4 w-[80%] md:w-[70%] lg:w-[40%] shadow-lg shadow-gray-600">
        <h2 className="text-lime-600 font-semibold text-4xl mb-4">Login Form</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col gap-5" onSubmit={submitHandle}>
          <input
            className="p-3 mt-2 rounded-md border border-[#ccc]"
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandle}
            placeholder="Email"
            required
          />
          <input
            className="p-3 mt-2 rounded-md border border-[#ccc]"
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandle}
            placeholder="Password"
            required
          />
          <button
            className="bg-blue-700 p-2 text-[16px] text-white font-bold rounded-md w-24 text-center disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
