import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

const DocumentScanningHero = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <div className="bg-gray-100 py-4 rounded-lg p-4">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto">
        {/* Left Column - Text Content */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 outfit-hero-title">
            Smart Document Scanning & Matching Solution
          </h1>
          <p className="text-gray-600 mb-8">
            Transform your document management with AI-powered scanning and
            intelligent matching capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={`${isAuthenticated ? "/document-matching" : "/sign-up"}`}>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Start Free Trial
              </button>
            </Link>
            <Link to={`${isAuthenticated ? "/document-matching" : "/sign-up"}`}>
              <button className="bg-transparent text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors flex items-center">
                Start Matching
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column - Dashboard Image */}
        <div className="lg:w-1/2 relative">
          <img
            src="/images/hero.svg"
            alt="Document management dashboard"
            className="rounded w-full"
          />

          {/* Floating Documents */}
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="absolute w-16 h-20 bg-white rounded shadow-md transform rotate-3 animate-bounce"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${item * 20}%`,
                animationDelay: `${item * 0.2}s`,
                animationDuration: "3s",
              }}
            >
              <div className="h-2 w-8 bg-gray-300 m-2 rounded"></div>
              <div className="h-2 w-10 bg-gray-300 m-2 rounded"></div>
              <div className="h-2 w-6 bg-gray-300 m-2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentScanningHero;
