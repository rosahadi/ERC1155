import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface ConnectWalletBtnProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const ConnectWalletBtn: React.FC<ConnectWalletBtnProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group
        px-8 py-4 
        bg-gradient-to-r from-[#ff007f] to-[#00ffff]
        rounded-xl
        overflow-hidden
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {/* Glow effect container */}
      <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff007f] to-[#00ffff] blur-xl" />
      </div>

      {/* Border gradient */}
      <div className="absolute inset-[1px] bg-[#081425] rounded-xl" />

      {/* Content container with hover effects */}
      <div className="relative flex items-center justify-center space-x-2 group-hover:scale-105 transition-transform">
        {/* Button text with gradient */}
        <div className="relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] via-[#ffd700] to-[#00ffff]">
          {children}
        </div>
      </div>
    </motion.button>
  );
};

export default ConnectWalletBtn;
