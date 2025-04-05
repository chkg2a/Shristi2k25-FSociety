import React, { useState, useEffect } from "react";
import { Cloud, FileText, Upload, Scale } from "lucide-react";
import axios from "axios";
import Navbar from "../components/NavBar";
import useAuthStore from "../store/authStore";
import CreditSection from "../components/CreditSection";
import { toast } from "react-toastify";

const DocumentMatcher = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [matching, setMatching] = useState(false);
  const [matchResults, setMatchResults] = useState(null);
  const { getAnalytics, user } = useAuthStore();
  const [selectedDoc, setSelectedDoc] = useState(null);

  // New state for document upload functionality
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const getUserDocuments = async () => {
    try {
      setLoading(true);
      await getAnalytics();
      const res = await axios.get("http://localhost:3000/api/v1/document");
      const formattedDocuments = res.data.documents.map((doc) => ({
        id: doc._id,
        name: doc.originalName,
        uploadDate: new Date(doc.uploadDate).toLocaleDateString(),
      }));
      setDocuments(formattedDocuments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setError("Failed to load documents. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDocuments();
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      setSelectedFile(file);
      setError(null);
    } else {
      setSelectedFile(null);
      setError("Please select a valid .txt file");
    }
  };

  // New handlers for document upload
  const handleUploadFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/plain") {
      setUploadFile(selectedFile);
    } else {
      toast.error("Please upload a .txt file");
      e.target.value = null;
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      toast.error("Please select a file");
      return;
    }

    try {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append("file", uploadFile);

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

      if (response.data) {
        toast.success("Document uploaded successfully");
        getUserDocuments(); // Refresh the document list
        setUploadFile(null); // Reset the file input
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error uploading document");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDocSelect = (docId) => {
    setSelectedDoc(docId);
  };

  const uploadDocument = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return null;
    }

    try {
      const formData = new FormData();
      formData.append("document", selectedFile);

      const res = await axios.post(
        "http://localhost:3000/api/v1/document/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      getUserDocuments();
      return res.data._id;
    } catch (error) {
      console.error("Error uploading document:", error);
      setError("Failed to upload document. Please try again.");
      return null;
    }
  };

  const matchDocuments = async (sourceDocId) => {
    if (!sourceDocId) {
      setError("Please select a document to compare");
      return;
    }

    try {
      setMatching(true);
      setError(null);

      const res = await axios.post("http://localhost:3000/api/v1/match", {
        sourceDocumentId: sourceDocId,
      });

      setMatchResults(res.data);
      setMatching(false);
    } catch (error) {
      console.error("Error matching documents:", error);
      setError("Failed to match documents. Please try again.");
      setMatching(false);
    }
  };

  const handleStartMatching = async () => {
    let sourceDocId = selectedDoc;

    if (selectedFile) {
      const newDocId = await uploadDocument();
      if (!newDocId) return;

      if (!sourceDocId) {
        sourceDocId = newDocId;
      }
    }

    await matchDocuments(sourceDocId);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row h-full min-h-screen justify-center mx-auto bg-[#f9fafb] pt-8 gap-8 ">
        <div className="w-full max-w-2xl">
          {/* Integrated Document Upload Section */}
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
                  <div className="w-[240px] flex items-center">
                    <input
                      type="file"
                      accept=".txt"
                      onChange={handleUploadFileChange}
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
                disabled={uploadLoading || !uploadFile}
                className={`bg-blue-500 text-white rounded-md px-4 py-2 flex items-center justify-center ${
                  uploadLoading || !uploadFile
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                <Upload size={16} className="mr-2" />
                Upload File
              </button>
            </div>
          </div>

          {/* Document Matching Section */}
          {matchResults === null || matchResults.remainingCredits > 0 ? (
            <>
              <div className="bg-white w-full rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-medium mb-4">Select Document to Compare</h3>

                {loading ? (
                  <p>Loading documents...</p>
                ) : (
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Document to Compare
                    </h4>

                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      value={selectedDoc || ""}
                      onChange={(e) => handleDocSelect(e.target.value)}
                    >
                      <option value="">Select a document</option>
                      {documents.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} ({doc.uploadDate})
                        </option>
                      ))}
                    </select>

                    <p className="text-sm text-gray-500 mt-3">
                      This document will be{" "}
                      <span className="font-medium text-gray-700">
                        compared
                      </span>{" "}
                      against all your other documents.
                    </p>
                  </div>
                )}

                <div className="mt-6 flex justify-center">
                  <button
                    className={`${
                      matching ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    } text-white rounded-md px-4 py-2 flex items-center justify-center`}
                    onClick={handleStartMatching}
                    disabled={matching || (!selectedDoc && !selectedFile)}
                  >
                    {matching ? (
                      "Comparing..."
                    ) : (
                      <>
                        <Scale size={16} className="mr-2" />
                        Compare Documents
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Results Section */}
              {matchResults && (
                <div className="bg-white w-full rounded-lg shadow-md p-6">
                  <h3 className="font-medium mb-6">Comparison Results</h3>

                  <div className="space-y-4">
                    {matchResults.results.map((result, index) => (
                      <div key={result.documentId} className="border-b pb-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">
                              {result.originalName}
                            </h4>
                            <p className="text-sm text-gray-500">
                              Document #{index + 1}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Similarity</p>
                            <p
                              className={`text-xl font-bold ${
                                result.score > 70
                                  ? "text-green-600"
                                  : result.score > 30
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                            >
                              {result.score}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                      Compared against {matchResults.results.length} documents
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Remaining credits: {matchResults.remainingCredits}
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-red-600 mt-4 font-medium">
              You have no remaining credits. Please upgrade your plan or contact
              support.
            </div>
          )}
        </div>

        {/* Credits Sidebar */}
        <div>
          <CreditSection
            credits={
              matchResults ? matchResults.remainingCredits : user.credits
            }
          />
        </div>
      </div>
    </>
  );
};

export default DocumentMatcher;

