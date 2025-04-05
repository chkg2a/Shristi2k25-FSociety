import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Cloud, FileText, Upload } from "lucide-react";
import Navbar from "./NavBar";

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(true); // Always true for now
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalMatches: 0,
    accuracy: 0,
    processingTime: 0,
  });

  const getUserDocuments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/v1/document");
      console.log("Documents fetched:", res.data);
      setDocuments(res.data);
      setStats({
        totalMatches: res.data.length,
        accuracy: 98,
        processingTime: 1.2,
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError("Failed to load documents. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDocuments();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/plain") {
      setFile(selectedFile);
    } else {
      toast.error("Please upload a .txt file");
      e.target.value = null;
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:3000/api/v1/document/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      console.log("response", response);
      if (response.data) {
        toast.success("Document uploaded successfully");
        navigate("/document-matching");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error uploading document");
    } finally {
      setLoading(false);
    }
  };

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
                Upload a .txt file to store in the database for later matching
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full mb-4">
                <div className="flex flex-col items-center">
                  <FileText className="text-gray-400 mb-2" size={24} />
                  <p className="text-sm text-gray-500 mb-1">
                    Drag and drop your file here or
                  </p>
                  {/* Modified file input */}
                  <div className="w-[240px] flex items-center">
                    <input
                      type="file"
                      accept=".txt"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className={`bg-blue-500 text-white rounded-md px-4 py-2 flex items-center justify-center ${
                  loading || !file ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                <Upload size={16} className="mr-2" />
                Upload File
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentUpload;
