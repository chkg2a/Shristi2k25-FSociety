import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/plain') {
      setFile(selectedFile);
    } else {
      toast.error('Please upload a .txt file');
      e.target.value = null;
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:3000/api/v1/document/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log("response",response);
      if (response.data) {
        toast.success('Document uploaded successfully');
        navigate('/documents');
      }

    } catch (error) {
      toast.error(error.response?.data?.message || 'Error uploading document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Upload Document</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Document (.txt only)
            </label>
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
          <button
            type="submit"
            disabled={loading || !file}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${loading || !file ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Uploading...' : 'Upload Document'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentUpload; 