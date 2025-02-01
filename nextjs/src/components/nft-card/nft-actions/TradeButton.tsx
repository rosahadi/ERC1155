import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Loader2 } from "lucide-react";
import useTrade from "@/hooks/useTrade";
import useBalance from "@/hooks/useBalance";

const TradeButton: React.FC<{
  tokenId: number;

  balance: number;
}> = ({ tokenId, balance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tradeAmount, setTradeAmount] = useState(1);
  const [tradeTargetToken, setTradeTargetToken] = useState<
    number | undefined
  >(undefined);

  const {
    trade,
    isTradePending,
    isTradeSuccess,
    isTradeLoading,
  } = useTrade();

  const { refetchBalance } = useBalance();

  useEffect(() => {
    if (isTradeSuccess) {
      refetchBalance();
    }
  }, [isTradeSuccess, refetchBalance]);

  const handleTrade = () => {
    if (tradeTargetToken === undefined) return;
    trade(tokenId, tradeTargetToken, tradeAmount);
    setIsOpen(false);
  };

  const isDisabled = isTradePending || isTradeLoading;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`action-button bg-gradient-to-r from-button-secondary to-gradient-intense ${
          isDisabled ? "opacity-50" : ""
        }`}
        disabled={isDisabled}
      >
        {isTradePending || isTradeLoading ? (
          <Loader2 className="loader-icon" />
        ) : (
          "Trade"
        )}
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleTrade}
        isConfirmPending={isTradeLoading}
        title="Trade NFT"
      >
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
      </Modal>
    </>
  );
};

export default TradeButton;
