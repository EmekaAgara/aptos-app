// components/QRCodeModal.tsx
import { motion } from "framer-motion";
import { FiX, FiCopy, FiDownload } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

export function QRCodeModal({ isOpen, onClose, address }: QRCodeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-lg max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Receive Funds</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <FiX className="w-5 h-5" />
          </Button>
        </div>

        <div className="text-center space-y-4">
          {/* QR Code Placeholder */}
          <div className="bg-white p-8 rounded-lg inline-block">
            <div className="w-48 h-48 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">QR Code</span>
            </div>
          </div>

          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Your Aptos Address</p>
            <div className="flex items-center justify-between">
              <code className="text-sm break-all">{address}</code>
              <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(address)}>
                <FiCopy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              <FiDownload className="w-4 h-4 mr-2" />
              Save QR
            </Button>
            <Button className="flex-1" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
