import React, { useState, useEffect } from "react";
import { Cloud, FileText, Upload } from "lucide-react";
import axios from "axios";
import Navbar from "../components/NavBar";

const DocumentUploader = () => {
  const [isUploaded, setIsUploaded] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedDocumentId, setUploadedDocumentId] = useState(null);
  const [matching, setMatching] = useState(false);
  const [matchResults, setMatchResults] = useState(null);
  const [hasProcessedDocuments, setHasProcessedDocuments] = useState(false);

  // Stats for the matching results
  const [stats, setStats] = useState({
    totalMatches: 0,
    accuracy: 98,
    processingTime: 1.2
  });

  // Function to fetch documents
  const getUserDocuments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/v1/document");
      console.log("Documents fetched:", res.data);
      
      // Transform the documents to match the expected format
      const formattedDocuments = res.data.documents.map(doc => ({
        id: doc._id,
        name: doc.originalName,
        modified: new Date(doc.uploadDate).toLocaleDateString(),
        matchRate: 0 // Default value, will be updated after matching
      }));
      
      setDocuments(formattedDocuments);
      
      // If documents exist, set hasProcessedDocuments to true
      if (formattedDocuments && formattedDocuments.length > 0) {
        setHasProcessedDocuments(true);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setError("Failed to load documents. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch documents when component mounts
  useEffect(() => {
    getUserDocuments();
  }, []);

  // Handle file selection
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

  // Handle file drag and drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === "text/plain") {
      setSelectedFile(file);
      setError(null);
    } else {
      setSelectedFile(null);
      setError("Please select a valid .txt file");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Upload document
  const uploadDocument = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("document", selectedFile);
      
      const res = await axios.post("http://localhost:3000/api/v1/document/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log("Document uploaded:", res.data);
      setUploadedDocumentId(res.data._id);
      setIsUploaded(true);
      getUserDocuments(); // Refresh document list
      
      return res.data._id; // Return the uploaded document ID
    } catch (error) {
      console.error("Error uploading document:", error);
      setError("Failed to upload document. Please try again.");
      return null;
    }
  };

  // Match documents function
  const matchDocument = async (sourceDocumentId, targetDocumentIds) => {
    try {
      setMatching(true);
      setError(null);
      
      const res = await axios.post("http://localhost:3000/api/v1/document/match", {
        sourceDocumentId,
        targetDocumentIds
      });
      
      console.log("Match results:", res.data);
      setMatchResults(res.data);
      setHasProcessedDocuments(true);
      
      // Update documents with match rates if available
      if (res.data.matches) {
        setDocuments(prevDocs => 
          prevDocs.map(doc => {
            const match = res.data.matches.find(m => m.documentId === doc.id);
            return {
              ...doc,
              matchRate: match ? match.matchRate : 0
            };
          })
        );
      }
      
      // Update stats based on match results
      if (res.data) {
        setStats({
          totalMatches: res.data.matches?.length || 0,
          accuracy: res.data.overallAccuracy || 98,
          processingTime: res.data.processingTime || 1.2
        });
      }
      
      setMatching(false);
      return res.data;
    } catch (error) {
      console.error("Error matching documents:", error);
      setError("Failed to match documents. Please try again.");
      setMatching(false);
      return error;
    }
  };

  // Handle start matching
  const handleStartMatching = async () => {
    // If no document is uploaded yet, upload it first
    let sourceId = uploadedDocumentId;
    
    if (!sourceId && selectedFile) {
      sourceId = await uploadDocument();
      if (!sourceId) return; // If upload failed, stop here
    } else if (!sourceId) {
      setError("Please upload a document first");
      return;
    }
    
    // Get IDs of all other documents to match against
    const targetIds = documents
      .filter(doc => doc.id !== sourceId)
      .map(doc => doc.id);
    
    if (targetIds.length === 0) {
      setHasProcessedDocuments(true);
      setMatching(true);
      
      setTimeout(() => {
        setMatching(false);
      }, 1000);
      
      return;
    }
    
    // Start the matching process
    await matchDocument(sourceId, targetIds);
  };

  // Function to handle exporting results
  const handleExportResults = () => {
    const exportData = {
      stats: stats,
      matches: matchResults || [],
      documents: documents
    };
    
    const dataStr = JSON.stringify(exportData);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "matching-results.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                Upload a .txt file to start matching
              </p>

              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full mb-4"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="flex flex-col items-center">
                  <FileText className="text-gray-400 mb-2" size={24} />
                  <p className="text-sm text-gray-500 mb-1">
                    {selectedFile ? `Selected: ${selectedFile.name}` : "Drag and drop your file here or"}
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

              <button 
                className={`${
                  matching ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                } text-white rounded-md px-4 py-2 flex items-center justify-center`}
                onClick={handleStartMatching}
                disabled={matching}
              >
                {matching ? (
                  "Matching..."
                ) : (
                  <>
                    <Upload size={16} className="mr-2" />
                    Start Matching
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {isUploaded && (
            <div className="bg-white w-full rounded-lg shadow-md p-6">
              <h3 className="font-medium mb-6">Matching Results</h3>

              {loading ? (
                <div className="text-center py-8">
                  <p>Loading documents...</p>
                </div>
              ) : matching ? (
                <div className="text-center py-8">
                  <p>Matching documents...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">
                  <p>{error}</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between mb-8">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Total Matches</p>
                      <p className="text-2xl font-bold">{stats.totalMatches}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500">Accuracy</p>
                      <p className="text-2xl font-bold text-green-600">{stats.accuracy}%</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500">Processing Time</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.processingTime}s</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {documents.length > 0 ? (
                      documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between border-b pb-3"
                        >
                          <div className="flex items-center">
                            <FileText size={16} className="text-gray-400 mr-2" />
                            <div>
                              <p className="text-sm">{doc.name}</p>
                              <p className="text-xs text-gray-500">
                                Uploaded: {doc.modified}
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
                      ))
                    ) : hasProcessedDocuments ? (
                      <div className="text-center py-8">
                        <p>Processing complete. No document matches found.</p>
                      </div>
                    ) : (
                      <p className="text-center py-4 text-gray-500">No documents found</p>
                    )}
                  </div>

                  <div className="flex justify-end mt-6">
                    <button 
                      className="text-blue-600 text-sm font-medium flex items-center"
                      onClick={handleExportResults}
                    >
                      <Upload size={16} className="mr-1" /> Export Results
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DocumentUploader;