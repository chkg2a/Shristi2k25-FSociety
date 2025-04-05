import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Payment = () => {
    const [account, setAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [signer, setSigner] = useState(null);
    const navigate = useNavigate();

    const contractAddress = "0xE4B1710dbBea759F9d28eF675F7f3827aEe5f643";

    const handleWallet = async () => {
        try {
            if (!window.ethereum) {
                toast.error("Please install MetaMask");
                return;
            }

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const selectedAccount = accounts[0];
            if (!selectedAccount) return;

            setAccount(selectedAccount);

            const provider = new ethers.BrowserProvider(window.ethereum);
            const newSigner = await provider.getSigner();
            setSigner(newSigner);

            window.ethereum.on("accountsChanged", (accounts) => {
                setAccount(accounts[0] || "");
            });

            toast.success("Wallet connected!");
        } catch (error) {
            console.error("Wallet connection error:", error);
            toast.error("Failed to connect wallet");
        }
    };

    const handleTopUp = async () => {
        if (!signer || !amount || parseFloat(amount) <= 0) {
            toast.error("Enter a valid amount");
            return;
        }

        try {
            setLoading(true);

            // Send ETH to contract
            const tx = await signer.sendTransaction({
                to: contractAddress,
                value: ethers.parseEther(amount),
            });

            await tx.wait();
            toast.success("Top-up sent successfully!");
            setAmount("");

            // Send credit request
            await axios.post("http://localhost:3000/api/v1/credit/request", {
                requestedCredits: 50,
                reason: tx.hash,
            });

            toast.success("Credits requested successfully!");
            navigate("/document-matching");

        } catch (error) {
            console.error("Top-up error:", error);
            toast.error("Top-up failed: " + (error.reason || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Credit Top-Up</h1>

            {account ? (
                <>
                    <div className="mb-4 p-3 bg-gray-100 rounded-md">
                        <p className="font-semibold">Connected Account:</p>
                        <p className="text-sm truncate">{account}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">Send ETH</h2>
                        <div className="flex">
                            <input
                                type="number"
                                placeholder="Amount in ETH"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="flex-1 p-2 border rounded-l-md"
                                step="0.01"
                                min="0"
                            />
                            <button
                                onClick={handleTopUp}
                                disabled={loading}
                                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 disabled:bg-gray-400"
                            >
                                {loading ? "Sending..." : "Send ETH"}
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center p-6">
                    <p className="mb-4">Connect your wallet to send ETH</p>
                    <button
                        onClick={handleWallet}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Connect Wallet
                    </button>
                </div>
            )}
        </div>
    );
};

export default Payment;
