import React from "react";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Simple Pricing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h3 className="text-lg font-medium mb-4">Basic</h3>
            <div className="mb-6">
              <span className="text-3xl font-bold">Free</span>
            </div>

            <div className="flex-grow space-y-3 mb-6">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">20 scans/month</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">Basic OCR</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">2GB Storage</span>
              </div>
            </div>

            <Link to={`${isAuthenticated ? "/document-sharing" : "/sign-up"}`}>
              <button className="text-gray-600 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 text-center mt-auto">
                Choose Basic
              </button>
            </Link>
          </div>

          {/* Pro Plan - Highlighted */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col border-2 border-blue-500">
            <h3 className="text-lg font-medium mb-4">Pro</h3>
            <div className="mb-6">
              <span className="text-3xl font-bold">$5</span>
              <span className="text-gray-500 text-sm">/month</span>
            </div>

            <div className="flex-grow space-y-3 mb-6">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">500 scans/month</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">Advanced OCR</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">25GB Storage</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">Priority Support</span>
              </div>
            </div>

            <Link to={`${isAuthenticated ? "/buy" : "/sign-up"}`}>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-center mt-auto">
                Choose Pro
              </button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <h3 className="text-lg font-medium mb-4">Enterprise</h3>
            <div className="mb-6">
              <span className="text-3xl font-bold">$99</span>
              <span className="text-gray-500 text-sm">/month</span>
            </div>

            <div className="flex-grow space-y-3 mb-6">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">Unlimited Scans</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">Premium OCR</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">100GB Storage</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">24/7 Support</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">API Access</span>
              </div>
            </div>

            <Link to={`${isAuthenticated ? "/buy" : "/sign-up"}`}>
              <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 text-center mt-auto">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
