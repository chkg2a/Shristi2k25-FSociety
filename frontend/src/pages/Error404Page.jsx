import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const Error404Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r">
      <div className="text-6xl font-bold mb-6">
        <FaExclamationTriangle className="inline-block text-yellow-400" />
        404
      </div>
      <div className="text-2xl mb-4">Oops! Page not found.</div>
      <div className="mb-8 text-center text-lg">
        Looks like you've taken a wrong turn. The page you're looking for doesn't exist.
      </div>
      <button
        onClick={() => window.location.href = '/'}
        className="bg-yellow-400 text-black py-2 px-6 rounded-md hover:bg-yellow-500 transition duration-300"
      >
        Go Home
      </button>
      <div className="mt-6 text-sm">
        <a href="/" className="text-yellow-400 hover:underline">Back to the homepage</a>
      </div>
    </div>
  );
};

export default Error404Page;
