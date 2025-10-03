// pages/Analytics.tsx
import { motion } from "framer-motion";
import { FiUsers, FiTrendingUp, FiDollarSign, FiActivity } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analytics() {
  const metrics = [
    { label: "Total Volume", value: "$2.4M", change: "+12%", icon: FiTrendingUp },
    { label: "Active Wallets", value: "15.2K", change: "+8%", icon: FiUsers },
    { label: "TVL", value: "$45.7M", change: "+23%", icon: FiDollarSign },
    { label: "Transactions", value: "89.3K", change: "+15%", icon: FiActivity },
  ];

  const recentTransactions = [
    { hash: "0x1a2b...3c4d", type: "Transfer", amount: "50 APT", time: "2 min ago" },
    { hash: "0x5e6f...7g8h", type: "Swap", amount: "1000 USDC", time: "5 min ago" },
    { hash: "0x9i0j...1k2l", type: "Deposit", amount: "25 APT", time: "10 min ago" },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">AptosChain Analytics</h1>
        <p className="text-gray-400">Real-time on-chain metrics and insights</p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{metric.label}</p>
                    <p className="text-2xl font-bold mt-2">{metric.value}</p>
                    <p className="text-green-400 text-sm mt-1">{metric.change}</p>
                  </div>
                  <div className="p-3 bg-gray-800 rounded-lg">
                    <metric.icon className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Volume Chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Volume 24h</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Volume chart visualization</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((tx, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{tx.type}</p>
                    <p className="text-gray-400 text-sm">{tx.hash}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{tx.amount}</p>
                    <p className="text-gray-400 text-sm">{tx.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
