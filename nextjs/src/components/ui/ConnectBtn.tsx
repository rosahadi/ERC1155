import React, { ReactNode } from "react";
import { useAccount, useBalance } from "wagmi";

interface ConnectBtnProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const ConnectBtn: React.FC<ConnectBtnProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const formattedBalance = balance
    ? `${
        Number(balance.value) /
        Math.pow(10, balance.decimals)
      }`
    : "0";
  const shortenedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  if (!isConnected) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          relative group px-8 py-4 
          bg-gradient-to-r from-[#ff007f] to-[#00ffff] 
          rounded-xl overflow-hidden 
          transition-all duration-300 
          disabled:opacity-50 disabled:cursor-not-allowed 
          ${className}
        `}
      >
        <div className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff007f] to-[#00ffff] blur-xl" />
        </div>
        <div className="absolute inset-[1px] bg-[#081425] rounded-xl" />
        <div className="relative flex items-center justify-center">
          <div className="relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] via-[#ffd700] to-[#00ffff] text-3xl">
            {children}
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center px-8 py-4
        bg-[#102347] hover:bg-[#0a1931]
        rounded-lg transition-colors duration-200
        ${className}
      `}
    >
      <div className="flex space-x-4 items-center">
        <span className="text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] to-[#00ffff]">
          {parseFloat(formattedBalance).toFixed(4)}{" "}
          {balance?.symbol}
        </span>
        <span className="text-xl bg-[#081425] px-3 py-1.5 rounded-full text-white/70">
          {shortenedAddress}
        </span>
      </div>
    </button>
  );
};

export default ConnectBtn;
