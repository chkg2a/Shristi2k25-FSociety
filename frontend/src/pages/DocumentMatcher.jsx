import React, { useState } from "react";
import { Cloud, FileText, Upload } from "lucide-react";
import Navbar from "../components/NavBar";

const DocumentUploader = () => {
  const [isUploaded, setIsUploaded] = useState(true);

  const documents = [
    { id: 1, name: "document1.txt", modified: "Jan 15, 2025", matchRate: 88 },
    { id: 2, name: "document2.txt", modified: "Jan 14, 2025", matchRate: 76 },
    { id: 3, name: "document3.txt", modified: "Jan 13, 2025", matchRate: 65 },
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mx-auto bg-[#f9fafb] pt-8">
        <div className="w-full max-w-4xl">
          {/* Upload Section */}
          <div className="bg-white w-full rounded-lg shadow-md p-8 mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-2 rounded-full mb-2">
                <Cloud className="text-blue-500" size={24} />
              </div>
              <h2 className="text-lg font-medium mb-1">Upload Your Document</h2>
              <p className="text-sm text-gray-500 mb-4">
                Upload a .txt file to start matching
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full mb-4">
                <div className="flex flex-col items-center">
                  <FileText className="text-gray-400 mb-2" size={24} />
                  <p className="text-sm text-gray-500 mb-1">
                    Drag and drop your file here or
                  </p>
                  <button className="text-blue-500 text-sm hover:underline">
                    Browse files
                  </button>
                </div>
              </div>

              <button className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center justify-center">
                <Upload size={16} className="mr-2" />
                Start Matching
              </button>
            </div>
          </div>

          {/* Results Section */}
          {isUploaded && (
            <div className="bg-white w-full rounded-lg shadow-md p-6">
              <h3 className="font-medium mb-6">Matching Results</h3>

              <div className="flex justify-between mb-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">24</p>
                  <p className="text-xs text-gray-500">Total Matches</p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">98%</p>
                  <p className="text-xs text-gray-500">Accuracy</p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">1.2s</p>
                  <p className="text-xs text-gray-500">Processing Time</p>
                </div>
              </div>

              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div className="flex items-center">
                      <FileText size={16} className="text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          Last modified: {doc.modified}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-600 font-medium">
                        {doc.matchRate}%
                      </p>
                      <p className="text-xs text-gray-500">Match Rate</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <button className="text-blue-600 text-sm font-medium flex items-center">
                  <Upload size={16} className="mr-1" /> Export Results
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DocumentUploader;
