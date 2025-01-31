import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import Modal from "./Modal";

const BurnButton: React.FC<{
  onBurn: (amount: number) => void;
  isPending: boolean;
  balance: number;
}> = ({ onBurn, isPending, balance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [burnAmount, setBurnAmount] = useState(1);

  const handleBurn = () => {
    onBurn(burnAmount);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="action-button bg-gradient-to-r from-red-500 to-pink-500 "
      >
        Burn
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        isConfirmPending={false}
        title="Burn NFT"
      >
        <label className="text-text-secondary text-3xl">
          Amount to Burn
        </label>
        <input
          type="number"
          min="1"
          max={balance}
          value={burnAmount}
          onChange={(e) =>
            setBurnAmount(
              Math.max(1, parseInt(e.target.value) || 1)
            )
          }
          className="w-full px-3 py-2 bg-card-highlight rounded border border-solid border-card-neon text-white"
        />
      </Modal>
    </>
  );
};

export default BurnButton;
