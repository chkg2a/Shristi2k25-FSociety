import React, { useState, useEffect } from "react";
import { Cloud, FileText, Upload, Scale } from "lucide-react";
import axios from "axios";
import Navbar from "../components/NavBar";
import useAuthStore from "../store/authStore";

const DocumentMatcher = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [matching, setMatching] = useState(false);
  const [matchResults, setMatchResults] = useState(null);
  const { getAnalytics } = useAuthStore();
  const [selectedDoc, setSelectedDoc] = useState(null);

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
                Upload a .txt file to compare with your other documents
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full mb-4">
                <div className="flex flex-col items-center">
                  <FileText className="text-gray-400 mb-2" size={24} />
                  <p className="text-sm text-gray-500 mb-1">
                    {selectedFile
                      ? `Selected: ${selectedFile.name}`
                      : "Select a file to upload"}
                  </p>
                  <label className="text-blue-500 text-sm hover:underline cursor-pointer">
                    Browse files
                    <input
                      type="file"
                      className="hidden"
                      accept=".txt"
                      onChange={handleFileSelect}
                    />
                  </label>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            </div>
          </div>

          {/* Document Selection Section */}
          <div className="bg-white w-full rounded-lg shadow-md p-6 mb-6">
            <h3 className="font-medium mb-4">Select Document to Compare</h3>

            {loading ? (
              <p>Loading documents...</p>
            ) : (
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Document to Compare</h4>
                <select
                  className="w-full p-2 border rounded"
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
                <p className="text-sm text-gray-500 mt-2">
                  This document will be compared against all your other documents
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
                        <h4 className="font-medium">{result.originalName}</h4>
                        <p className="text-sm text-gray-500">Document #{index + 1}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Similarity</p>
                        <p className={`text-xl font-bold ${
                          result.score > 70 ? 'text-green-600' : 
                          result.score > 30 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
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
        </div>
      </div>
    </>
  );
};

export default DocumentMatcher;