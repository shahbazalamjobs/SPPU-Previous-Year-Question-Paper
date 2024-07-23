// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
        <div className="flex space-x-6">
          <Link
            to="/"
            className="px-4 py-2 rounded-md text-lg font-medium hover:bg-gray-700 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/papers"
            className="px-4 py-2 rounded-md text-lg font-medium hover:bg-gray-700 transition-colors duration-300"
          >
            Papers
          </Link>
        </div>
        <div className="text-2xl font-bold ml-auto px-4 ">
          <Link to="/" className="hover:text-gray-300 transition-colors duration-300">
            SPPU PYQ
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
