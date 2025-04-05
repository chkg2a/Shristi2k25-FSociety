import React from 'react';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Powerful Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Smart Scanning Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start">
            <div className="text-blue-500 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Scanning</h3>
            <p className="text-gray-600 text-sm">
              Advanced OCR technology for accurate document scanning and text extraction.
            </p>
          </div>
          
          {/* AI Matching Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start">
            <div className="text-blue-500 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12h8"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Matching</h3>
            <p className="text-gray-600 text-sm">
              Intelligent document matching and comparison using machine learning.
            </p>
          </div>
          
          {/* Cloud Storage Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start">
            <div className="text-blue-500 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Cloud Storage</h3>
            <p className="text-gray-600 text-sm">
              Secure cloud storage with easy access and sharing capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
