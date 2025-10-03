// pages/Lending.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiShield,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiPercent,
  FiClock,
  FiZap,
  FiPieChart,
} from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function Lending() {
  const { connected, account, wallet, network } = useWallet();

  // Mock lending data - in real app, this would come from smart contracts
  const [lendingPools, setLendingPools] = useState([
    {
      id: 1,
      asset: "APT",
      apy: "8.5%",
      totalSupplied: "$12.4M",
      utilization: "72%",
      yourSupply: "0",
      available: "$3.4M",
    },
    {
      id: 2,
      asset: "USDC",
      apy: "5.2%",
      totalSupplied: "$28.7M",
      utilization: "65%",
      yourSupply: "0",
      available: "$10.1M",
    },
    {
      id: 3,
      asset: "USDT",
      apy: "5.1%",
      totalSupplied: "$15.3M",
      utilization: "58%",
      yourSupply: "0",
      available: "$6.4M",
    },
  ]);

  const [borrowPositions, setBorrowPositions] = useState([
    {
      id: 1,
      asset: "APT",
      borrowed: "0 APT",
      collateral: "0 USDC",
      health: "0.0",
      interestRate: "7.2%",
    },
    {
      id: 2,
      asset: "USDC",
      borrowed: "0 USDC",
      collateral: "0 APT",
      health: "0.0",
      interestRate: "9.8%",
    },
  ]);

  const [activeTab, setActiveTab] = useState<"supply" | "borrow">("supply");
  const [supplyAmount, setSupplyAmount] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("APT");

  if (!connected) {
    return (
      <div className="bg-black text-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="relative overflow-hidden pt-24 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="relative z-10">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl lg:text-7xl mb-6 leading-tight"
                >
                  <span className="text-indigo-500">P2P Lending</span> on Aptos
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-sm text-gray-400 mb-8 max-w-lg"
                >
                  Earn interest on your assets or borrow against your collateral. Peer-to-peer lending with competitive
                  rates and full transparency.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button className="flex items-center justify-center bg-indigo-800 px-8 py-4 rounded font-medium transition-all shadow-lg hover:shadow-purple-500/20">
                    Connect Wallet
                  </button>
                  <Link
                    to="/wallet"
                    className="flex items-center justify-center border border-indigo-500 text-indigo-400 hover:bg-purple-500/10 px-8 py-4 rounded font-medium transition-all"
                  >
                    Fund Wallet
                  </Link>
                </motion.div>
              </div>

              {/* Right Column - Features */}
              <div className="grid grid-cols-1 gap-6">
                {[
                  {
                    title: "Earn Interest",
                    description: "Supply assets to lending pools and earn competitive APY",
                    icon: <FiTrendingUp className="text-4xl text-indigo-500 mb-4" />,
                  },
                  {
                    title: "Borrow Assets",
                    description: "Get loans using your crypto as collateral with flexible terms",
                    icon: <FiDollarSign className="text-4xl text-indigo-500 mb-4" />,
                  },
                  {
                    title: "Secure & Transparent",
                    description: "All lending activities secured by Aptos smart contracts",
                    icon: <FiShield className="text-4xl text-indigo-500 mb-4" />,
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

          {/* Features Section */}
          <section className="py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Competitive Rates",
                  description: "Earn up to 12% APY on your digital assets with optimized lending pools",
                  icon: <FiPercent className="text-4xl text-indigo-500 mb-4" />,
                },
                {
                  title: "Instant Access",
                  description: "Withdraw your supplied assets anytime without lock-up periods",
                  icon: <FiZap className="text-4xl text-indigo-500 mb-4" />,
                },
                {
                  title: "Risk Management",
                  description: "Advanced collateralization ratios and liquidation protection",
                  icon: <FiPieChart className="text-4xl text-indigo-500 mb-4" />,
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black p-8 rounded-lg border border-gray-800 hover:border-indigo-500 transition-all hover:shadow-lg hover:shadow-purple-500/10 text-left"
                >
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Connected Wallet View
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-8">
        <h1 className="text-4xl font-bold mb-2 text-white">P2P Lending</h1>
        <p className="text-gray-400 text-lg">Earn interest or borrow assets with competitive rates</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { label: "Total Supplied", value: "$56.4M", icon: FiTrendingUp, change: "+12%" },
          { label: "Total Borrowed", value: "$38.2M", icon: FiDollarSign, change: "+8%" },
          { label: "Available Liquidity", value: "$18.2M", icon: FiUsers, change: "+15%" },
          { label: "Average APY", value: "6.8%", icon: FiPercent, change: "+2%" },
        ].map((stat, index) => (
          <Card key={stat.label} className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2 text-white">{stat.value}</p>
                  <p className="text-green-400 text-sm mt-1">{stat.change}</p>
                </div>
                <div className="p-3 bg-gray-800 rounded-lg">
                  <stat.icon className="w-6 h-6 text-indigo-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Lending Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Action Tabs */}
          <Card className="bg-black border border-gray-800">
            <CardContent className="p-6">
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setActiveTab("supply")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === "supply" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Supply Assets
                </button>
                <button
                  onClick={() => setActiveTab("borrow")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === "borrow" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Borrow Assets
                </button>
              </div>

              {activeTab === "supply" ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Supply Assets to Earn Interest</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Select Asset</label>
                      <select
                        value={selectedAsset}
                        onChange={(e) => setSelectedAsset(e.target.value)}
                        className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="APT">APT - 8.5% APY</option>
                        <option value="USDC">USDC - 5.2% APY</option>
                        <option value="USDT">USDT - 5.1% APY</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Amount to Supply</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={supplyAmount}
                        onChange={(e) => setSupplyAmount(e.target.value)}
                        className="bg-black border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="bg-black rounded-lg p-4 border border-gray-800">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Estimated APY</span>
                      <span className="text-green-400">8.5%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Your Balance</span>
                      <span className="text-white">0.00 {selectedAsset}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 border-0">
                    Supply {supplyAmount || "0"} {selectedAsset}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Borrow Against Collateral</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Asset to Borrow</label>
                      <select
                        value={selectedAsset}
                        onChange={(e) => setSelectedAsset(e.target.value)}
                        className="w-full bg-black border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="APT">APT - 7.2% APR</option>
                        <option value="USDC">USDC - 9.8% APR</option>
                        <option value="USDT">USDT - 9.5% APR</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Amount to Borrow</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={borrowAmount}
                        onChange={(e) => setBorrowAmount(e.target.value)}
                        className="bg-black border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="bg-black rounded-lg p-4 border border-gray-800">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Interest Rate (APR)</span>
                      <span className="text-yellow-400">7.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Collateral Required</span>
                      <span className="text-white">$0.00</span>
                    </div>
                  </div>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 border-0">
                    Borrow {borrowAmount || "0"} {selectedAsset}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lending Pools */}
          <Card className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Lending Pools</h2>
              <div className="space-y-4">
                {lendingPools.map((pool) => (
                  <div
                    key={pool.id}
                    className="flex items-center justify-between p-4 bg-black rounded-lg border border-gray-800 hover:border-indigo-500 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                        <FiDollarSign className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{pool.asset}</p>
                        <p className="text-gray-400 text-sm">Total Supplied: {pool.totalSupplied}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-medium">{pool.apy} APY</p>
                      <p className="text-gray-400 text-sm">Utilization: {pool.utilization}</p>
                    </div>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 border-0">
                      Supply
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Your Positions */}
          <Card className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Your Positions</h2>
              <div className="space-y-4">
                {borrowPositions.map((position) => (
                  <div key={position.id} className="p-4 bg-black rounded-lg border border-gray-800">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-white">{position.asset}</p>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          parseFloat(position.health) > 1.5
                            ? "bg-green-500/20 text-green-400"
                            : parseFloat(position.health) > 1.0
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        Health: {position.health}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-400">Borrowed: {position.borrowed}</p>
                      <p className="text-gray-400">Collateral: {position.collateral}</p>
                      <p className="text-gray-400">Interest Rate: {position.interestRate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-black border border-gray-800">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: FiArrowUpRight, label: "Supply APT", path: "#", color: "from-green-500 to-blue-500" },
                  { icon: FiArrowDownLeft, label: "Borrow USDC", path: "#", color: "from-orange-500 to-red-500" },
                  { icon: FiTrendingUp, label: "View Pools", path: "#", color: "from-purple-500 to-pink-500" },
                  { icon: FiShield, label: "Add Collateral", path: "#", color: "from-yellow-500 to-orange-500" },
                ].map((action) => (
                  <Link key={action.label} to={action.path}>
                    <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 hover:border-indigo-500 p-4 rounded-lg text-center transition-all hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer group">
                      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="font-medium text-white text-sm">{action.label}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Metrics */}
          <Card className="bg-black border border-gray-800 hover:border-indigo-500 transition-all">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                <FiShield className="text-indigo-500 mr-2" />
                Risk Metrics
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Platform Health</span>
                  <span className="text-green-400">Excellent</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Collateral Factor</span>
                  <span className="text-white">75%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Liquidation Threshold</span>
                  <span className="text-white">85%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Safety Margin</span>
                  <span className="text-green-400">25%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8"
      >
        {[
          {
            title: "Instant Liquidity",
            description: "Withdraw your supplied assets anytime without waiting periods",
            icon: <FiZap className="text-3xl text-indigo-400" />,
          },
          {
            title: "Competitive Rates",
            description: "Earn up to 12% APY on your digital assets with optimized pools",
            icon: <FiPercent className="text-3xl text-indigo-500" />,
          },
          {
            title: "Secure & Transparent",
            description: "All lending activities secured by Aptos smart contracts",
            icon: <FiShield className="text-3xl text-indigo-500" />,
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
