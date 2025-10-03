// pages/PaymentLink.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { FiCopy, FiCheck, FiArrowLeft, FiSend, FiUser, FiDollarSign } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TransferAPT } from "@/components/TransferAPT";

export default function PaymentLink() {
  const { walletAddress } = useParams();
  const navigate = useNavigate();
  const { connected, account } = useWallet();
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOwnAddress = account?.address?.toString() === walletAddress;

  if (!walletAddress) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Payment Link</h1>
          <p className="text-gray-400 mb-8">The payment link is invalid or has expired.</p>
          <Button onClick={() => navigate("/")} className="bg-indigo-600 hover:bg-indigo-700">
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-center flex-1">Send Payment</h1>
          <div className="w-10"></div> {/* Spacer for balance */}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Recipient Info */}
          <div className="space-y-6">
            <Card className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <FiUser className="text-indigo-500 mr-2" />
                  Recipient Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Wallet Address</label>
                    <div className="flex items-center bg-black p-3 rounded-lg border border-gray-800">
                      <code className="text-white text-sm font-mono flex-1 truncate">{walletAddress}</code>
                      <button
                        onClick={() => copyToClipboard(walletAddress)}
                        className="text-gray-400 hover:text-white transition-colors ml-2"
                      >
                        {copied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {isOwnAddress && connected && (
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                      <p className="text-yellow-400 text-sm">
                        ⚠️ This is your own wallet address. You cannot send funds to yourself.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                  <FiDollarSign className="text-indigo-500 mr-2" />
                  Payment Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Amount (APT)</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-black border-gray-800 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Memo (Optional)</label>
                    <Input
                      placeholder="Add a note for this payment"
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                      className="bg-black border-gray-800 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Transfer Component */}
          <div className="space-y-6">
            <Card className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Send Payment</h2>

                {!connected ? (
                  <div className="text-center py-8">
                    <FiSend className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">Connect your wallet to send a payment</p>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">Connect Wallet</Button>
                  </div>
                ) : isOwnAddress ? (
                  <div className="text-center py-8">
                    <FiUser className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">This is your own wallet address</p>
                    <p className="text-indigo-400 text-sm">Create a payment link for someone else to receive funds</p>
                  </div>
                ) : (
                  <TransferAPT />
                )}
              </CardContent>
            </Card>

            {/* Share This Link */}
            <Card className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Share Payment Link</h2>
                <p className="text-gray-400 text-sm mb-4">Share this link with others to receive payments directly</p>

                <div className="flex">
                  <input
                    type="text"
                    value={`${window.location.origin}/pay/${walletAddress}`}
                    readOnly
                    className="flex-grow bg-black border border-gray-700 rounded-l-lg py-3 px-3 text-sm text-white focus:outline-none truncate"
                  />
                  <button
                    onClick={() => copyToClipboard(`${window.location.origin}/pay/${walletAddress}`)}
                    className="bg-black hover:bg-gray-700 border border-gray-700 rounded-r-lg py-2 px-4 transition-all"
                  >
                    {copied ? <FiCheck className="text-green-400" /> : <FiCopy className="text-indigo-400" />}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
