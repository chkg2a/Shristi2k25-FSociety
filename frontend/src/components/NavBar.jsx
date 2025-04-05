import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm p-4 ">
      {/* Logo */}
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center">
          <a
            href="/"
            className="flex items-center text-lg font-semibold text-gray-800"
          >
            <svg
              className="w-6 h-6 mr-2 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeLinecap="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
            </svg>
            DocScan
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <ul className="flex space-x-8 mr-8 justify-center">
            <li>
              <a href="#features" className="text-gray-600 hover:text-blue-500">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="text-gray-600 hover:text-blue-500">
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-500"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-600 hover:text-blue-500">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <Link
            to="/sign-in"
            className="text-gray-600 hover:text-blue-500 mr-6"
          >
            Sign In
          </Link>
          <Link
            to="/get-started"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-10">
            <ul className="flex flex-col p-4">
              <li className="py-2">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Features
                </a>
              </li>
              <li className="py-2">
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Pricing
                </a>
              </li>
              <li className="py-2">
                <a
                  href="#testimonials"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Testimonials
                </a>
              </li>
              <li className="py-2">
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Contact
                </a>
              </li>
              <li className="py-2">
                <a
                  href="/sign-in"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Sign In
                </a>
              </li>
              <li className="pt-4">
                <a
                  href="/get-started"
                  className="block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
