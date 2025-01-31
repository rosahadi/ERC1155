import React, { useState } from "react";
import Modal from "./Modal";

const TradeButton: React.FC<{
  tokenId: number;
  onTrade: (tokenToReceive: number, amount: number) => void;
  isPending: boolean;
  balance: number;
}> = ({ tokenId, onTrade, isPending, balance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tradeAmount, setTradeAmount] = useState(1);
  const [tradeTargetToken, setTradeTargetToken] = useState<
    number | undefined
  >(undefined);

  const handleTrade = () => {
    if (tradeTargetToken !== undefined) {
      onTrade(tradeTargetToken, tradeAmount);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="action-button bg-gradient-to-r from-button to-button-hover "
      >
        Trade
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        isConfirmPending={false}
        title={`Trade Collection #${tokenId + 1}`}
      >
        <div className="space-y-3">
          <label className="text-text-secondary text-3xl">
            Select Token to Receive
          </label>
          <select
            value={tradeTargetToken || ""}
            onChange={(e) =>
              setTradeTargetToken(parseInt(e.target.value))
            }
            className="w-full px-3 py-2 bg-card-highlight rounded border border-solid border-card-neon text-white"
          >
            <option value="">Select token...</option>
            {[0, 1, 2]
              .filter((id) => id !== tokenId)
              .map((id) => (
                <option key={id} value={id}>
                  Collection #{id + 1}
                </option>
              ))}
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-text-secondary text-3xl">
            Amount to Trade
          </label>
          <input
            type="number"
            min="1"
            max={balance}
            value={tradeAmount}
            onChange={(e) =>
              setTradeAmount(
                Math.max(1, parseInt(e.target.value) || 1)
              )
            }
            className="w-full px-3 py-2 bg-card-highlight rounded border border-solid border-card-neon text-white"
          />
        </div>
      </Modal>
    </>
  );
};

export default TradeButton;
