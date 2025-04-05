import { useState } from "react";
import { FaEthereum, FaRupeeSign, FaCoins } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";

const CreditsSection = ({ user }) => {
  const [creditsToBuy, setCreditsToBuy] = useState(100);

  const handleRazorpayPayment = () => {
    // Razorpay integration logic here
    console.log(`Buying ${creditsToBuy} credits with Razorpay`);
  };

  const handleCryptoPayment = () => {
    // Crypto payment logic here
    console.log(`Buying ${creditsToBuy} credits with Crypto`);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        {/* Current Credit Display */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Your Credits</h2>
          <div className="flex items-center gap-2 text-green-600 text-xl font-bold">
            <FaCoins className="text-yellow-500" />
            {user?.credits ?? 0}
          </div>
        </div>

        {/* Credit Input */}
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

        {/* Purchase Options */}
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
      </div>
    </div>
  );
};

export default CreditsSection;
