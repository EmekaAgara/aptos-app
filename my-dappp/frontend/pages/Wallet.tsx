// pages/Wallet.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { FiCopy, FiDownload, FiUpload, FiCheck, FiShare2, FiLink, FiUser } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TransferAPT } from "@/components/TransferAPT";
import QRCode from "react-qr-code";

export default function Wallet() {
  const { connected, account } = useWallet();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const walletAddress = account?.address?.toString() || "";
  const walletLink = walletAddress ? `${window.location.origin}/wallet/${walletAddress}` : "";

  const copyToClipboard = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  // const sharePaymentLink = async () => {
  //   const paymentLink = `${window.location.origin}/pay/${account?.address.toString()}`;

  //   if (navigator.share) {
  //     try {
  //       await navigator.share({
  //         title: "My AptosPay Payment Link",
  //         text: "Send me APT using my AptosPay payment link",
  //         url: paymentLink,
  //       });
  //     } catch (err) {
  //       console.error("Error sharing:", err);
  //       // Fallback to copy
  //       copyToClipboard(paymentLink);
  //     }
  //   } else {
  //     copyToClipboard(paymentLink);
  //   }
  // };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My AptosPay Wallet",
          text: "Send me crypto on AptosPay!",
          url: walletLink,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      copyToClipboard();
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  if (!connected) {
    return (
      <div className="bg-black text-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="relative overflow-hidden pt-24 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative z-10">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl lg:text-7xl mb-6 leading-tight"
                >
                  <span className="text-indigo-500">Manage Your</span> Digital Assets
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-sm text-gray-400 mb-8 max-w-lg"
                >
                  Securely store, send, and receive APT and other digital assets with low fees and instant transactions.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <button className="flex items-center justify-center bg-indigo-800 px-8 py-4 rounded font-medium transition-all shadow-lg hover:shadow-purple-500/20">
                    Connect Wallet to Access
                  </button>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {[
                  {
                    title: "Secure Storage",
                    description: "Your keys, your crypto. Full control over your digital assets",
                    icon: <FiUser className="text-4xl text-indigo-500 mb-4" />,
                  },
                  {
                    title: "Instant Transfers",
                    description: "Send and receive APT anywhere in seconds",
                    icon: <FiUpload className="text-4xl text-indigo-500 mb-4" />,
                  },
                  {
                    title: "Low Fees",
                    description: "Pay minimal network fees for all transactions",
                    icon: <FiDownload className="text-4xl text-indigo-500 mb-4" />,
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-black p-6 rounded-lg border border-gray-800 hover:border-indigo-500 transition-all hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    {feature.icon}
                    <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-8">
        <h1 className="text-4xl font-bold mb-2 text-white">My Wallet</h1>
        <p className="text-gray-400 text-lg">Manage your digital assets and transactions</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Wallet Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Balance Card */}
          <Card className="bg-black border border-gray-900">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-indigo-200 text-sm">Total Balance</p>
                  <h2 className="text-4xl font-bold mt-2 text-white">0.00 APT</h2>
                  <p className="text-indigo-200 mt-2 text-sm">≈ $0.00 USD</p>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => setShowQR(true)} className="bg-white/20 hover:bg-white/30 text-white border-0">
                    <FiDownload className="w-4 h-4 mr-2" />
                    Receive
                  </Button>
                  <Button
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                    onClick={shareLink}
                  >
                    {shared ? <FiCheck className="w-4 h-4 mr-2" /> : <FiShare2 className="w-4 h-4 mr-2" />}
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              className="h-16 bg-indigo-600 hover:bg-indigo-700 text-white border-0"
              onClick={() => document.getElementById("buy-section")?.scrollIntoView()}
            >
              <FiUpload className="w-5 h-5 mr-2" />
              Buy Crypto
            </Button>
            <Button
              className="h-16 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0"
              onClick={() => document.getElementById("sell-section")?.scrollIntoView()}
            >
              <FiDownload className="w-5 h-5 mr-2" />
              Sell Crypto
            </Button>
          </div>

          {/* Transfer Section */}
          <Card className="bg-black border text-white border-gray-900 hover:border-indigo-500 transition-all">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Send APT</h2>
              <TransferAPT />
            </CardContent>
          </Card>

          {/* Fiat On-Ramp Section */}
          <Card id="buy-section" className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Buy Crypto with Fiat</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "Credit Card", time: "Instant purchase", icon: "💳" },
                    { name: "Bank Transfer", time: "1-3 business days", icon: "🏦" },
                    { name: "Apple/Google Pay", time: "Instant", icon: "📱" },
                  ].map((method) => (
                    <Card
                      key={method.name}
                      className="bg-black border border-gray-900 hover:border-indigo-500 transition-all cursor-pointer"
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <p className="font-medium text-white text-sm">{method.name}</p>
                        <p className="text-xs text-gray-400">{method.time}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <Input placeholder="Amount in USD" className="bg-black border-gray-800 text-white" />
                  <Button className="bg-indigo-600 hover:bg-indigo-700 border-0">Continue</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                <FiLink className="text-indigo-500 mr-2" />
                Your Payment Link
              </h2>

              <p className="text-gray-400 text-sm mb-4">Share your unique payment link to receive APT from anyone</p>

              <div className="space-y-3">
                <div className="flex">
                  <input
                    type="text"
                    value={`${window.location.origin}/pay/${account?.address.toString()}`}
                    readOnly
                    className="flex-grow bg-black border border-gray-700 rounded-l-lg py-2 px-3 text-sm text-white focus:outline-none truncate"
                  />
                  <button
                    // onClick={() => copyToClipboard(`${window.location.origin}/pay/${account?.address.toString()}`)}
                    className="bg-black hover:bg-gray-700 border border-gray-700 rounded-r-lg py-2 px-3 transition-all"
                  >
                    {copied ? (
                      <FiCheck className="text-green-400 w-4 h-4" />
                    ) : (
                      <FiCopy className="text-indigo-400 w-4 h-4" />
                    )}
                  </button>
                </div>

                <Button
                  // onClick={sharePaymentLink}
                  variant="outline"
                  className="w-full border-indigo-500 text-indigo-400 hover:bg-indigo-500/10"
                >
                  <FiShare2 className="w-4 h-4 mr-2" />
                  Share Payment Link
                </Button>

                <div className="text-center">
                  <a
                    href={`/pay/${account?.address.toString()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
                  >
                    View your payment page →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Enhanced Wallet Details */}
          <Card className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Wallet Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-400 text-sm">Network</span>
                  <span className="text-white font-medium text-sm">Aptos Testnet</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-400 text-sm">Status</span>
                  <span className="text-green-400 font-medium text-sm">Connected</span>
                </div>
                <div className="py-2">
                  <span className="text-gray-400 text-sm block mb-2">Wallet Address</span>
                  <div className="flex items-center justify-between bg-black border border-gray-800 p-3 rounded-lg">
                    <code className="text-white text-sm font-mono truncate">
                      {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                    </code>
                    <button onClick={copyToClipboard} className="text-gray-400 hover:text-white transition-colors">
                      {copied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Quick Receive Card */}
          <Card className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                <FiLink className="text-indigo-500 mr-2" />
                Receive Funds
              </h2>
              <p className="text-gray-400 text-sm mb-4">Share your wallet address to receive APT and other tokens</p>
              <div className="space-y-3">
                <Button onClick={() => setShowQR(true)} className="w-full bg-indigo-600 hover:bg-indigo-700 border-0">
                  <FiDownload className="w-4 h-4 mr-2" />
                  Show QR Code
                </Button>
                <Button
                  onClick={shareLink}
                  variant="outline"
                  className="w-full border-indigo-500 text-indigo-400 hover:bg-indigo-500/10"
                >
                  {shared ? <FiCheck className="w-4 h-4 mr-2" /> : <FiShare2 className="w-4 h-4 mr-2" />}
                  Share Address
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black border border-gray-800 rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Receive Funds</h3>
              <button onClick={() => setShowQR(false)} className="text-gray-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg mb-4">
                <QRCode
                  value={`${window.location.origin}/pay/${account?.address.toString()}`}
                  size={256}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="H"
                />
              </div>

              <div className="w-full mb-4">
                <p className="text-gray-400 text-sm mb-2">Your Aptos Address</p>
                <div className="flex">
                  <input
                    type="text"
                    value={walletAddress}
                    readOnly
                    className="flex-grow bg-black border border-gray-700 rounded-l-lg py-3 px-3 text-sm text-white focus:outline-none truncate"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="bg-black hover:bg-gray-700 border border-gray-900 rounded-r-lg py-2 px-4 transition-all"
                  >
                    {copied ? <FiCheck className="text-green-400" /> : <FiCopy className="text-indigo-400" />}
                  </button>
                </div>
              </div>

              <p className="text-gray-400 text-sm text-center">Scan this QR code to receive APT and other tokens</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
