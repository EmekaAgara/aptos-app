import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { FiHome, FiSend, FiDollarSign, FiUser, FiMenu, FiX, FiGlobe } from "react-icons/fi";
import { WalletSelector } from "./WalletSelector";

export function Navigation() {
  const location = useLocation();
  const { connected, account } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", icon: FiHome, label: "Home" },
    { path: "/wallet", icon: FiSend, label: "Wallet" },
    { path: "/swap", icon: FiSend, label: "Swap" },
    { path: "/lending", icon: FiDollarSign, label: "P2P Lending" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-black text-white pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 no-underline">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <FiGlobe className="w-4 h-4 text-white" />
              </div>
              <span className="text-2xl font-bold text-indigo-500">AptosPay</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium no-underline ${
                      isActive ? "text-indigo-500" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* User Info & Wallet */}
            <div className="flex items-center space-x-4">
              {/* {connected && account && (
                <div className="flex items-center space-x-2 bg-[#121212] px-3 py-2 rounded-lg border border-gray-800">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <FiUser className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-300">
                    {account.ansName ||
                      `${account.address.toString().slice(0, 6)}...${account.address.toString().slice(-4)}`}
                  </span>
                </div>
              )} */}
              <div className="flex items-center">
                <WalletSelector />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {connected && account && (
              <div className="hidden sm:flex items-center space-x-2 bg-[#121212] px-3 py-2 rounded-lg mr-4">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">
                  {`${account.address.toString().slice(0, 4)}...${account.address.toString().slice(-4)}`}
                </span>
              </div>
            )}
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#121212] focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={mobileMenuOpen ? "open" : "closed"}
                variants={{
                  closed: { rotate: 0 },
                  open: { rotate: 180 },
                }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            // variants={menuVariants}
            className="md:hidden overflow-hidden bg-black"
          >
            <motion.div
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium no-underline ${
                        isActive ? "text-indigo-500 bg-[#121212]" : "text-gray-300 hover:text-white hover:bg-[#121212]"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                      {isActive && <div className="ml-auto w-2 h-2 bg-indigo-500 rounded-full"></div>}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Wallet Section in Mobile Menu */}
              <motion.div className="px-3 py-3">
                <div className="flex justify-start">
                  <WalletSelector />
                </div>
              </motion.div>

              {/* Account Info in Mobile Menu */}
              {connected && account && (
                <motion.div>
                  <div className="px-3 py-4 bg-[#121212] rounded-md">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Connected Account</h3>
                    <div className="flex items-center space-x-2">
                      <FiUser className="w-4 h-4 text-gray-400" />
                      <code className="text-sm break-all text-gray-300">
                        {account.ansName || account.address.toString()}
                      </code>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
