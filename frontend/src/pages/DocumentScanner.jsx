import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import Navbar from "../components/NavBar";

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

function Button({ children, onClick }) {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded transition-all duration-200 cursor-pointer hover:bg-blue-700 active:scale-95"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function DocumentScanner() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
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

  return (
    <>
      <Navbar />
      <div className="bg-[#f9fafb] pt-8">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Document Scanning & Matching
          </h2>
          <p className="text-gray-600 mb-4">
            Upload two documents to compare and analyze their contents
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[setFile1, setFile2].map((setFile, index) => (
              <Card key={index}>
                <div className="text-center">
                  <FileText className="text-blue-600 mx-auto mb-4" size={42} />
                  <p className="text-lg mb-2 font-bold">
                    {index === 0 ? "First Document" : "Second Document"}
                  </p>
                  <p className="text-sm text-gray-500">
                    (TEXT, DOCX, or JPG (Max 20MB))
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button className="mt-2 cursor-pointer px-4 py-2 border rounded bg-[#EFF6FF] text-[#2563EB] hover:bg-gray-200 active:scale-95">
                    Choose File
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center bg-[#E5E7EB] rounded-lg p-4 mt-8">
            <div className="text-sm text-gray-600">
              <p className="font-bold text-md text-black">
                This scan will use 5 credits
              </p>
              <p>Remaining credits after scan : {80}</p>
            </div>
            <Button onClick={() => alert("Scanning started!")}>
              Start Scanning
            </Button>
          </div>
        </div>
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
    </>
  );
}
