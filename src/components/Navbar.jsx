import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-teal-800 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-xl font-bold">
          <Link
            to={token ? "/dashboard" : "/"}
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Machine Life Predictor
          </Link>
        </h2>
        <ul className="flex items-center space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          {token ? (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/predict"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Predict
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 transition-colors duration-200 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
