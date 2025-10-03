// pages/Swap.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { FiArrowDown, FiSettings, FiZap, FiTrendingUp, FiShuffle } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock token data - in real app, this would come from Tapp.Exchange API
const TOKENS = [
  { symbol: "APT", name: "Aptos Coin", logo: "🔷", balance: 0, decimals: 8 },
  { symbol: "USDC", name: "USD Coin", logo: "💵", balance: 0, decimals: 6 },
  { symbol: "USDT", name: "Tether USD", logo: "💸", balance: 0, decimals: 6 },
  { symbol: "TAPP", name: "Tapp Token", logo: "⚡", balance: 0, decimals: 8 },
];

export default function Swap() {
  const { connected, account } = useWallet();
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState(0.5);
  const [isSwapping, setIsSwapping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Mock swap rate - in real app, this would come from Tapp.Exchange
  const getSwapRate = () => {
    const rates = {
      "APT-USDC": 6.78,
      "USDC-APT": 0.147,
      "APT-USDT": 6.75,
      "USDT-APT": 0.148,
      "APT-TAPP": 100,
      "TAPP-APT": 0.01,
      "USDC-USDT": 0.999,
      "USDT-USDC": 1.001,
    };
    return rates[`${fromToken.symbol}-${toToken.symbol}`] || 1;
  };

  // Calculate output amount based on input
  useEffect(() => {
    if (fromAmount && !isNaN(parseFloat(fromAmount))) {
      const rate = getSwapRate();
      const calculated = parseFloat(fromAmount) * rate;
      setToAmount(calculated.toFixed(6));
    } else {
      setToAmount("");
    }
  }, [fromAmount, fromToken, toToken]);

  const handleSwap = async () => {
    if (!fromAmount || !toAmount) return;

    setIsSwapping(true);
    // Simulate swap transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In real app, this would interact with Tapp.Exchange contract
    console.log(`Swapping ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`);

    setIsSwapping(false);
    // Reset form after successful swap
    setFromAmount("");
    setToAmount("");
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
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
                  <span className="text-indigo-500">Advanced</span> Token Swaps
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-sm text-gray-400 mb-8 max-w-lg"
                >
                  Trade tokens with minimal slippage and maximum efficiency using Tapp.Exchange's innovative DeFi hooks.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <button className="flex items-center justify-center bg-indigo-800 px-8 py-4 rounded font-medium transition-all shadow-lg hover:shadow-purple-500/20">
                    Connect Wallet to Swap
                  </button>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {[
                  {
                    title: "Minimal Slippage",
                    description: "Advanced algorithms ensure best execution prices with minimal price impact",
                    icon: <FiTrendingUp className="text-4xl text-indigo-500 mb-4" />,
                  },
                  {
                    title: "Gas Optimization",
                    description: "Smart routing reduces gas costs by up to 40% compared to traditional DEXs",
                    icon: <FiZap className="text-4xl text-indigo-500 mb-4" />,
                  },
                  {
                    title: "Innovative Hooks",
                    description: "Powered by Tapp.Exchange's cutting-edge DeFi hook technology",
                    icon: <FiShuffle className="text-4xl text-indigo-500 mb-4" />,
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
        <h1 className="text-4xl font-bold mb-2 text-white">Advanced Swap</h1>
        <p className="text-gray-400 text-lg">Trade tokens with Tapp.Exchange's innovative hooks</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Swap Interface */}
        <div className="lg:col-span-2">
          <Card className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Swap Tokens</h2>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiSettings className="w-5 h-5" />
                </button>
              </div>

              {/* Settings Panel */}
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6 p-4 bg-black  rounded-lg border border-gray-800"
                >
                  <h3 className="text-sm font-medium text-white mb-3">Transaction Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Slippage Tolerance</label>
                      <div className="flex space-x-2">
                        {[0.1, 0.5, 1.0].map((value) => (
                          <button
                            key={value}
                            onClick={() => setSlippage(value)}
                            className={`px-3 py-1 rounded text-sm ${
                              slippage === value
                                ? "bg-indigo-600 text-white"
                                : "bg-black  text-gray-400 hover:bg-gray-700"
                            }`}
                          >
                            {value}%
                          </button>
                        ))}
                        <Input
                          type="number"
                          placeholder="Custom"
                          value={slippage}
                          onChange={(e) => setSlippage(parseFloat(e.target.value) || 0)}
                          className="bg-black border-gray-700 text-white text-sm w-20"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* From Token */}
              <div className="bg-black rounded-lg p-4 mb-4 border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">From</span>
                  <span className="text-gray-400 text-sm">
                    Balance: {fromToken.balance} {fromToken.symbol}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                      {fromToken.logo}
                    </div>
                    <select
                      value={fromToken.symbol}
                      onChange={(e) => setFromToken(TOKENS.find((t) => t.symbol === e.target.value) || TOKENS[0])}
                      className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {TOKENS.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="bg-transparent border-0 text-white text-right text-xl font-medium focus:ring-0"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center my-2">
                <button
                  onClick={switchTokens}
                  className="p-2 bg-black border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FiArrowDown className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* To Token */}
              <div className="-900 rounded-lg p-4 mb-6 border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">To</span>
                  <span className="text-gray-400 text-sm">
                    Balance: {toToken.balance} {toToken.symbol}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                      {toToken.logo}
                    </div>
                    <select
                      value={toToken.symbol}
                      onChange={(e) => setToToken(TOKENS.find((t) => t.symbol === e.target.value) || TOKENS[1])}
                      className="bg-black  border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {TOKENS.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={toAmount}
                    readOnly
                    className="bg-transparent border-0 text-white text-right text-xl font-medium focus:ring-0"
                  />
                </div>
              </div>

              {/* Swap Details */}
              <div className="bg-black rounded-lg p-4 mb-6 border border-gray-800">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rate</span>
                    <span className="text-white">
                      1 {fromToken.symbol} = {getSwapRate()} {toToken.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Slippage Tolerance</span>
                    <span className="text-white">{slippage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Minimum Received</span>
                    <span className="text-white">
                      {toAmount ? (parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6) : "0"} {toToken.symbol}
                    </span>
                  </div>
                </div>
              </div>

              {/* Swap Button */}
              <Button
                onClick={handleSwap}
                disabled={!fromAmount || !toAmount || isSwapping}
                className="w-full bg-indigo-600 hover:bg-indigo-700 border-0 py-3 text-lg font-medium"
              >
                {isSwapping ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Swapping...
                  </div>
                ) : (
                  `Swap ${fromToken.symbol} for ${toToken.symbol}`
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Advanced Features */}
        <div className="space-y-6">
          {/* Tapp.Exchange Hooks */}
          <Card className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                <FiZap className="text-indigo-500 mr-2" />
                Advanced Hooks
              </h2>

              <div className="space-y-3">
                {[
                  {
                    name: "Limit Orders",
                    description: "Set specific price targets for automatic execution",
                    status: "Available",
                  },
                  {
                    name: "TWAP Orders",
                    description: "Time-weighted average price for large orders",
                    status: "Coming Soon",
                  },
                  {
                    name: "Dynamic Fees",
                    description: "Adaptive fees based on market conditions",
                    status: "Available",
                  },
                  {
                    name: "Flash Loans",
                    description: "Uncollateralized instant loans for arbitrage",
                    status: "Beta",
                  },
                ].map((hook, index) => (
                  <div
                    key={hook.name}
                    className="p-3 bg-black  rounded-lg border border-gray-800 hover:border-indigo-500 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-white text-sm">{hook.name}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          hook.status === "Available"
                            ? "bg-green-500/20 text-green-400"
                            : hook.status === "Beta"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {hook.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">{hook.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gas Optimizer */}
          <Card className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                <FiTrendingUp className="text-indigo-500 mr-2" />
                Gas Optimizer
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Estimated Gas</span>
                  <span className="text-white">0.002 APT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Optimization</span>
                  <span className="text-green-400">-42%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Route</span>
                  <span className="text-white">Direct Pool</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                <p className="text-indigo-400 text-sm text-center">🚀 Using optimized route for best execution</p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Swaps */}
          <Card className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Recent Swaps</h2>

              <div className="text-center py-8">
                <FiShuffle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">No recent swaps</p>
                <p className="text-gray-500 text-xs mt-1">Your swap history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8"
      >
        {[
          {
            title: "Hook-Powered Swaps",
            description: "Leverage Tapp.Exchange's innovative hooks for advanced trading strategies",
            icon: <FiZap className="text-3xl text-indigo-400" />,
          },
          {
            title: "MEV Protection",
            description: "Advanced algorithms protect against maximal extractable value",
            icon: <FiShuffle className="text-3xl text-indigo-500" />,
          },
          {
            title: "Multi-Route Optimization",
            description: "Automatically finds the best trading routes across multiple pools",
            icon: <FiTrendingUp className="text-3xl text-indigo-500" />,
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="bg-black p-6 rounded-lg border border-gray-800 hover:border-indigo-500 transition-all hover:shadow-lg hover:shadow-purple-500/10 text-center"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
