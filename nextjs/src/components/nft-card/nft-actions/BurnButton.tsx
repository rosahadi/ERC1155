import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import Modal from "./Modal";
import useBurn from "@/hooks/useBurn";

const BurnButton: React.FC<{
  balance: number;
  tokenId: number;
}> = ({ balance, tokenId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [burnAmount, setBurnAmount] = useState(1);
  const {
    burn,
    isBurnPending,
    isBurnSuccess,
    isBurnLoading,
  } = useBurn();

  const handleBurn = () => {
    burn(tokenId, burnAmount);
    setIsOpen(false);
  };

  const isDisabled = isBurnPending || isBurnLoading;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`action-button bg-gradient-to-r from-red-500 to-pink-500 ${
          isDisabled ? "opacity-50" : ""
        }`}
        disabled={isDisabled}
      >
        {isBurnPending || isBurnLoading ? (
          <Loader2 className="loader-icon" />
        ) : (
          "Burn"
        )}
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleBurn}
        isConfirmPending={isBurnLoading}
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
      {isBurnSuccess && (
        <p className="text-green-500">Burn successful!</p>
      )}
    </>
  );
};

export default BurnButton;
