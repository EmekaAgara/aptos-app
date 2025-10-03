import { motion } from "framer-motion";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { FiSend, FiDollarSign, FiTrendingUp, FiArrowUpRight, FiArrowDownLeft, FiZap, FiGlobe } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { connected, account, wallet, network } = useWallet();

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
                  <span className="text-indigo-500">Global Payments</span> on Aptos
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-sm text-gray-400 mb-8 max-w-lg"
                >
                  Send and receive money globally with instant APT transfers. Low fees, fast settlement, and borderless
                  payments.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button className="flex items-center justify-center bg-indigo-800 px-8 py-4 rounded font-medium transition-all shadow-lg hover:shadow-purple-500/20">
                    Connect Wallet
                    {/* <div className="">
                      <WalletSelector />
                    </div> */}
                  </button>
                  <Link
                    to="/remittance"
                    className="flex items-center justify-center border border-indigo-500 text-indigo-400 hover:bg-purple-500/10 px-8 py-4 rounded font-medium transition-all"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>

              {/* Right Column - Features */}
              <div className="grid grid-cols-1 gap-6">
                {[
                  {
                    title: "Instant Transfers",
                    description: "Send APT anywhere in seconds with blockchain speed",
                    icon: <FiZap className="text-4xl text-indigo-500 mb-4" />,
                  },
                  {
                    title: "Low Fees",
                    description: "Pay minimal network fees, keep more of your money",
                    icon: <FiDollarSign className="text-4xl text-indigo-500 mb-4" />,
                  },
                  {
                    title: "Global Reach",
                    description: "Send to anyone, anywhere with internet access",
                    icon: <FiGlobe className="text-4xl text-indigo-500 mb-4" />,
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
                  title: "Borderless Payments",
                  description: "Send money across borders without traditional banking limitations",
                  icon: <FiGlobe className="text-4xl text-indigo-500 mb-4" />,
                },
                {
                  title: "Secure & Transparent",
                  description: "All transactions are secured by Aptos blockchain technology",
                  icon: <FiTrendingUp className="text-4xl text-indigo-500 mb-4" />,
                },
                {
                  title: "24/7 Availability",
                  description: "Access your funds and send payments anytime, anywhere",
                  icon: <FiZap className="text-4xl text-indigo-500 mb-4" />,
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

  // Connected Wallet View - Only Real Data
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to AptosPay</h1>
        <p className="text-gray-400 text-lg">Your global payment dashboard</p>
      </motion.div>

      {/* Wallet Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Account Overview */}
        <Card className="bg-black border border-gray-800 hover:border-indigo-800 transition-all">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Account Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-800">
                <span className="text-gray-400">Wallet Name</span>
                <span className="text-white font-medium">{wallet?.name || "Unknown"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-800">
                <span className="text-gray-400">Network</span>
                <span className="text-white font-medium">{network?.name || "Unknown"}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">Account Address</span>
                <span className="text-white font-mono text-sm">
                  {account?.address?.toString().slice(0, 8)}...{account?.address?.toString().slice(-6)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-black border border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: FiSend, label: "My Wallet", path: "/remittance", color: "gray-500" },
                { icon: FiArrowUpRight, label: "Trade Crypto", path: "/wallet", color: "from-green-500 to-blue-500" },
                { icon: FiArrowDownLeft, label: "Swap Crypto", path: "/wallet", color: "from-orange-500 to-red-500" },
                {
                  icon: FiDollarSign,
                  label: "P2P Loans",
                  path: "/lending",
                  color: "from-yellow-500 to-orange-500",
                },
              ].map((action) => (
                <Link key={action.label} to={action.path}>
                  <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 hover:border-indigo-500 p-4 rounded-lg text-center transition-all hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer group">
                    <div
                      className={`w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-medium text-white text-sm">{action.label}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity - Only show if we have real data */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="bg-black border border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Recent Activity</h2>
            <div className="text-center py-12">
              <FiTrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No recent transactions</p>
              <p className="text-gray-500 text-sm mt-2">
                Your transaction history will appear here once you start using AptosPay
              </p>
              <Link
                to="/remittance"
                className="inline-flex text-white items-center mt-4 px-6 py-3 bg-indigo-600  hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20"
              >
                <FiSend className="w-4 h-4 mr-2" />
                Make Your First Transfer
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8"
      >
        {[
          {
            title: "Instant Global Transfers",
            description: "Send APT anywhere in the world in seconds",
            icon: <FiZap className="text-3xl text-indigo-400" />,
          },
          {
            title: "Lowest Fees",
            description: "Pay minimal network fees compared to traditional remittance",
            icon: <FiDollarSign className="text-3xl text-indigo-500" />,
          },
          {
            title: "Secure & Transparent",
            description: "All transactions are verified on Aptos blockchain",
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
