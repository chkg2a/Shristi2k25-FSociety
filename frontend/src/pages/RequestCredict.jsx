import React, { useState } from 'react';
import axios from 'axios';

const RequestCredit = () => {
  const [requestedCredits, setRequestedCredits] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const requestCredit = async () => {
    try {
      setLoading(true);
      setMessage('');
      const res = await axios.post('http://localhost:3000/api/v1/credit/request', {
        requestedCredits,
        reason
      });
      setMessage('✅ Request submitted successfully!');
      console.log(res);
    } catch (error) {
      console.error(error);
      setMessage('❌ Something went wrong while submitting the request.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requestedCredits || !reason) {
      setMessage('⚠️ Please fill in all fields.');
      return;
    }
    requestCredit();
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Request Credits</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Enter credit amount"
          value={requestedCredits}
          onChange={(e) => setRequestedCredits(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Reason for request"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Request'}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default RequestCredit;
