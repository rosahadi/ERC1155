import React from "react";
import { Loader2 } from "lucide-react";

const MintButton: React.FC<{
  onMint: (amount: number) => void;
  isPending: boolean;
}> = ({ onMint, isPending }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onMint}
        disabled={isPending}
        className="action-button bg-gradient-to-r from-pink-500 to-purple-500"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin mx-auto" />
        ) : (
          "Mint"
        )}
      </button>
    </div>
  );
};

export default MintButton;
