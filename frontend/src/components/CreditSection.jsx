import { useState } from "react";
import { FaEthereum, FaRupeeSign, FaCoins } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import axios from "axios";

const CreditsSection = ({ credits }) => {
  const [creditsToBuy, setCreditsToBuy] = useState(100);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestedCredits, setRequestedCredits] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRazorpayPayment = () => {
    console.log(`Buying ${creditsToBuy} credits with Razorpay`);
  };

  const handleCryptoPayment = () => {
    console.log(`Buying ${creditsToBuy} credits with Crypto`);
  };

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

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!requestedCredits || !reason) {
      setMessage('⚠️ Please fill in all fields.');
      return;
    }
    requestCredit();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        {/* Credit Display */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Your Credits</h2>
          <div className="flex items-center gap-2 text-green-600 text-xl font-bold">
            <FaCoins className="text-yellow-500" />
            {credits}
          </div>
        </div>

        {/* Buy Credits Section */}
        <div>
          <label className="block mb-1 text-sm text-gray-600">Enter credits to buy</label>
          <input
            type="number"
            min={10}
            step={10}
            value={creditsToBuy}
            onChange={(e) => setCreditsToBuy(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Payment Options */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleRazorpayPayment}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            <SiRazorpay className="text-lg" />
            Buy with Razorpay
          </button>
          <button
            onClick={handleCryptoPayment}
            className="w-full flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            <FaEthereum className="text-lg" />
            Buy with Crypto
          </button>
        </div>

        {/* Request Credit Toggle */}
        <div className="text-center">
          <button
            onClick={() => setShowRequestForm(!showRequestForm)}
            className="text-sm text-blue-600 hover:underline mt-4"
          >
            {showRequestForm ? 'Hide Credit Request Form' : 'Request Extra Credits'}
          </button>
        </div>

        {/* Request Credit Form */}
        {showRequestForm && (
          <form onSubmit={handleRequestSubmit} className="space-y-4 mt-4">
            <input
              type="number"
              placeholder="Requested credit amount"
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
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
            {message && (
              <p className="text-sm text-center text-gray-700">{message}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default CreditsSection;
