// pages/Trading.tsx
import { motion } from "framer-motion";
import { FiTrendingUp, FiTrendingDown, FiBarChart2, FiDollarSign } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Trading() {
  const tradingPairs = [
    { pair: "APT/USDC", price: "$6.78", change: "+2.3%", volume: "$2.4M" },
    { pair: "BTC/USDC", price: "$42,150", change: "-1.2%", volume: "$15.8M" },
    { pair: "ETH/USDC", price: "$2,850", change: "+0.8%", volume: "$8.3M" },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Advanced Trading</h1>
        <p className="text-gray-400">Trade with advanced tools and deep liquidity</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trading Pairs */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Markets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tradingPairs.map((market, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          market.change.startsWith("+") ? "bg-green-500/20" : "bg-red-500/20"
                        }`}
                      >
                        {market.change.startsWith("+") ? (
                          <FiTrendingUp className="w-5 h-5 text-green-400" />
                        ) : (
                          <FiTrendingDown className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{market.pair}</p>
                        <p className="text-gray-400 text-sm">Volume: {market.volume}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{market.price}</p>
                      <p className={market.change.startsWith("+") ? "text-green-400" : "text-red-400"}>
                        {market.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trading Chart */}
          <Card className="bg-gray-900 border-gray-800 mt-6">
            <CardHeader>
              <CardTitle>APT/USDC Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Trading chart visualization</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trade Panel */}
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Trade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button className="bg-green-600 hover:bg-green-700">Buy</Button>
                <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/20">
                  Sell
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Amount</label>
                <Input placeholder="0.00" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Price</label>
                <Input placeholder="0.00" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Total</label>
                <Input placeholder="0.00" />
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700">Place Order</Button>
            </CardContent>
          </Card>

          {/* Order Book */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Order Book</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Price (USDC)</span>
                  <span>Size (APT)</span>
                </div>
                {/* Bids */}
                <div className="text-green-400 text-sm">
                  <div className="flex justify-between">
                    <span>6.77</span>
                    <span>125.4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>6.76</span>
                    <span>89.2</span>
                  </div>
                </div>
                {/* Current Price */}
                <div className="text-center py-2 border-y border-gray-700">
                  <span className="font-bold">$6.78</span>
                </div>
                {/* Asks */}
                <div className="text-red-400 text-sm">
                  <div className="flex justify-between">
                    <span>6.79</span>
                    <span>67.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>6.80</span>
                    <span>142.1</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
