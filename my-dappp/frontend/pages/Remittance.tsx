// pages/Remittance.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiGlobe, FiClock, FiShield } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Remittance() {
  const [sendAmount, setSendAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("APT");
  const [toCurrency, setToCurrency] = useState("USD");
  const [recipientCountry, setRecipientCountry] = useState("US");

  const countries = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "PH", name: "Philippines", flag: "🇵🇭" },
    { code: "MX", name: "Mexico", flag: "🇲🇽" },
    { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  ];

  const features = [
    {
      icon: FiGlobe,
      title: "Global Reach",
      description: "Send to 150+ countries instantly",
    },
    {
      icon: FiClock,
      title: "Fast Transfers",
      description: "Most transfers complete in minutes",
    },
    {
      icon: FiShield,
      title: "Secure",
      description: "Bank-level security and encryption",
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Global Remittance</h1>
        <p className="text-gray-400">Send money worldwide with low fees and fast settlement</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Send Money Form */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Send Money</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">You send</label>
                  <div className="flex space-x-2">
                    <Input placeholder="0.00" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} />
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="APT">APT</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Recipient gets</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="0.00"
                      value={receiveAmount}
                      onChange={(e) => setReceiveAmount(e.target.value)}
                    />
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="PHP">PHP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Recipient Country */}
              <div>
                <label className="text-sm font-medium mb-2 block">Recipient Country</label>
                <Select value={recipientCountry} onValueChange={setRecipientCountry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <span className="flex items-center space-x-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Recipient Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Recipient Email</label>
                  <Input placeholder="recipient@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Mobile Number</label>
                  <Input placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              {/* Delivery Method */}
              <div>
                <label className="text-sm font-medium mb-2 block">Delivery Method</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Card className="bg-gray-800 border-gray-700 cursor-pointer hover:border-purple-500 transition-colors">
                    <CardContent className="p-4 text-center">
                      <p className="font-medium text-sm">Bank Transfer</p>
                      <p className="text-xs text-gray-400">1-2 days</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700 cursor-pointer hover:border-purple-500 transition-colors">
                    <CardContent className="p-4 text-center">
                      <p className="font-medium text-sm">Cash Pickup</p>
                      <p className="text-xs text-gray-400">Minutes</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800 border-gray-700 cursor-pointer hover:border-purple-500 transition-colors">
                    <CardContent className="p-4 text-center">
                      <p className="font-medium text-sm">Mobile Wallet</p>
                      <p className="text-xs text-gray-400">Instant</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700 h-12">
                <FiSend className="w-5 h-5 mr-2" />
                Continue to Review
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features & Info */}
        <div className="space-y-6">
          {/* Exchange Rate */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">Exchange Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-2xl font-bold">1 APT = $6.78 USD</p>
                <p className="text-sm text-gray-400 mt-1">Last updated 2 min ago</p>
              </div>
            </CardContent>
          </Card>

          {/* Fee Breakdown */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">Fee Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Transfer Fee</span>
                <span>$1.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Exchange Rate Margin</span>
                <span>0.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Network Fee</span>
                <span>$0.02</span>
              </div>
              <div className="border-t border-gray-700 pt-2 flex justify-between font-medium">
                <span>Total Cost</span>
                <span>$2.36</span>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg">Why Choose Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium">{feature.title}</p>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
