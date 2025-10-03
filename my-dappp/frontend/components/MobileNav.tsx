// components/MobileNav.tsx
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiSend, FiBarChart2, FiDollarSign, FiTrendingUp } from "react-icons/fi";

export function MobileNav() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: FiHome, label: "Home" },
    { path: "/wallet", icon: FiSend, label: "Wallet" },
    { path: "/remittance", icon: FiSend, label: "Send" },
    { path: "/analytics", icon: FiBarChart2, label: "Stats" },
    { path: "/lending", icon: FiDollarSign, label: "Earn" },
    { path: "/trading", icon: FiTrendingUp, label: "Trade" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                isActive ? "text-purple-400" : "text-gray-400"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
