import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  const isRoot = location.pathname === "/";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getInitials = (fullName) => {
    if (!fullName) return "";
    const nameParts = fullName.trim().split(" ");
    return nameParts.map((part) => part[0]?.toUpperCase() || "").join("");
  };

  return (
    <nav className="bg-white shadow-sm p-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center text-lg font-semibold text-gray-800">
          <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
          </svg>
          DocScan
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center">
          <ul className="flex space-x-8 mr-8 justify-center">
            {isRoot ? (
              <>
                <li><a href="/#features" className="text-gray-600 hover:text-blue-500">Features</a></li>
                <li><a href="/#pricing" className="text-gray-600 hover:text-blue-500">Pricing</a></li>
                <li><a href="/#testimonials" className="text-gray-600 hover:text-blue-500">Testimonials</a></li>
                <li><a href="/#contact" className="text-gray-600 hover:text-blue-500">Contact</a></li>
              </>
            ) : (
              <>
                <li><Link to="/document-matching" className="text-gray-600 hover:text-blue-500">Document Matcher</Link></li>
                <li><Link to="/dashboard" className="text-gray-600 hover:text-blue-500">Dashboard</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <div className="w-[48px] h-[48px] overflow-hidden">
                <div className="flex items-center justify-center w-full h-full rounded-full p-2 bg-gray-200">
                  <p>{getInitials(user.name)}</p>
                </div>
              </div>
            </Link>
          ) : (
            <>
              <Link to="/sign-in" className="text-gray-600 hover:text-blue-500 mr-6">Sign In</Link>
              <Link to="/sign-up" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Sign up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Items */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-10">
            <ul className="flex flex-col p-4">
              {isRoot ? (
                <>
                  <li className="py-2"><a href="/#features" className="text-gray-600 hover:text-blue-500">Features</a></li>
                  <li className="py-2"><a href="/#pricing" className="text-gray-600 hover:text-blue-500">Pricing</a></li>
                  <li className="py-2"><a href="/#testimonials" className="text-gray-600 hover:text-blue-500">Testimonials</a></li>
                  <li className="py-2"><a href="/#contact" className="text-gray-600 hover:text-blue-500">Contact</a></li>
                </>
              ) : (
                <>
                  <li className="py-2"><Link to="/document-matching" className="text-gray-600 hover:text-blue-500">Document Matcher</Link></li>
                  <li className="py-2"><Link to="/dashboard" className="text-gray-600 hover:text-blue-500">Dashboard</Link></li>
                </>
              )}
              {!isAuthenticated && (
                <li className="pt-4">
                  <Link to="/get-started" className="block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Get Started
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
