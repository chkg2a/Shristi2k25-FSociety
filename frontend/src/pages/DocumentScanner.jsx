import { useState, useRef } from "react";
import { Upload, FileText } from "lucide-react";
import Navbar from "../components/NavBar";
import useAuthStore from "../store/authStore";
import axios from "axios";
import { toast } from "react-toastify";

function Card({ children }) {
  return (
    <div className="p-4 flex items-center justify-center border-2 border-dotted border-gray-300 rounded-lg shadow-md h-[300px]">
      {children}
    </div>
  );
}

function Progress({ value }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}

function Button({ children, onClick, disabled = false }) {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded transition-all duration-200 cursor-pointer hover:bg-blue-700 active:scale-95 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default function DocumentScanner() {
  const { upload } = useAuthStore();
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const fileInput1 = useRef(null);
  const fileInput2 = useRef(null);
  const uploadFileInput = useRef(null);
  const [scans, setScans] = useState([
    {
      date: "Jan 15, 2025",
      docs: "Contract_v1.pdf vs Contract_v2.pdf",
      matchRate: 98,
      status: "Completed",
    },
    {
      date: "Jan 14, 2025",
      docs: "Document1.docx vs Document2.docx",
      matchRate: 75,
      status: "Completed",
    },
  ]);

  const handleFileChange = (e, setFile) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/plain') {
      setFile(selectedFile);
    } else {
      toast.error('Please upload a .txt file');
      e.target.value = null;
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      toast.error('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadFile);

      const response = await axios.post('http://localhost:5000/api/v1/document/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      

      if (response.data) {
        toast.success('Document uploaded successfully');
        setUploadFile(null);
        if (uploadFileInput.current) {
          uploadFileInput.current.value = '';
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error uploading document');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = (inputRef) => {
    inputRef.current?.click();
  };

  const handleScan = async () => {
    if (!file1 || !file2) {
      alert("Please upload both documents");
      return;
    }

    setIsLoading(true);
    try {
      // Upload both documents
      const formData = new FormData();
      formData.append('files', file1);
      formData.append('files', file2);
      
      // This would need a new endpoint in your backend for comparing documents
      const response = await axios.post("http://localhost:3000/api/v1/document/compare", 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      setScanResult(response.data);
      
      // Add to recent scans
      const newScan = {
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        docs: `${file1.name} vs ${file2.name}`,
        matchRate: response.data.matchRate,
        status: "Completed",
      };
      
      setScans([newScan, ...scans]);
      
    } catch (error) {
      console.error("Scanning error:", error);
      alert("Error during scanning. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Document Scanner</h1>
        
        {/* Single File Upload Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="text-center">
                <input
                  type="file"
                  ref={uploadFileInput}
                  onChange={(e) => handleFileChange(e, setUploadFile)}
                  accept=".txt"
                  className="hidden"
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  {uploadFile ? uploadFile.name : "Click to upload a document"}
                </p>
                <Button onClick={() => triggerFileInput(uploadFileInput)} className="mt-4">
                  Select File
                </Button>
                <Button 
                  onClick={handleUpload} 
                  disabled={!uploadFile || isUploading}
                  className="mt-4 ml-2"
                >
                  {isUploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Document Comparison Section */}
        <h2 className="text-xl font-semibold mb-4">Compare Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="text-center">
              <input
                type="file"
                ref={fileInput1}
                onChange={(e) => handleFileChange(e, setFile1)}
                accept=".txt"
                className="hidden"
              />
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                {file1 ? file1.name : "Click to upload first document"}
              </p>
              <Button onClick={() => triggerFileInput(fileInput1)} className="mt-4">
                Select File
              </Button>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <input
                type="file"
                ref={fileInput2}
                onChange={(e) => handleFileChange(e, setFile2)}
                accept=".txt"
                className="hidden"
              />
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                {file2 ? file2.name : "Click to upload second document"}
              </p>
              <Button onClick={() => triggerFileInput(fileInput2)} className="mt-4">
                Select File
              </Button>
            </div>
          </Card>
        </div>

        <div className="flex justify-between items-center bg-[#E5E7EB] rounded-lg p-4 mt-8">
          <div className="text-sm text-gray-600">
            <p className="font-bold text-md text-black">
              This scan will use 5 credits
            </p>
            <p>Remaining credits after scan : {80}</p>
          </div>
          <Button onClick={handleScan} disabled={isLoading}>
            {isLoading ? "Scanning..." : "Start Scanning"}
          </Button>
        </div>

        {scanResult && (
          <div className="mt-8 p-4 border rounded-lg">
            <h3 className="text-lg font-bold mb-4">Scan Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Match Rate:</p>
                <Progress value={scanResult.matchRate} />
                <p>{scanResult.matchRate}%</p>
              </div>
              <div>
                <p className="font-semibold">Differences Found:</p>
                <p>{scanResult.differencesCount} differences</p>
              </div>
            </div>
            {/* You could add more detailed results here */}
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto mt-8">
          <h3 className="text-lg font-bold mt-6">Recent Scans</h3>
          <div className="border rounded-lg mt-2">
            <div className="grid grid-cols-4 font-semibold bg-gray-100 p-2 border-b">
              <span>Date</span>
              <span>Documents</span>
              <span>Match Rate</span>
              <span>Status</span>
            </div>
            {scans.map((scan, index) => (
              <div
                key={index}
                className="grid grid-cols-4 p-2 border-b text-sm"
              >
                <span>{scan.date}</span>
                <span>{scan.docs}</span>
                <span>
                  <Progress value={scan.matchRate} />
                  {scan.matchRate}%
                </span>
                <span className="text-green-600">{scan.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}