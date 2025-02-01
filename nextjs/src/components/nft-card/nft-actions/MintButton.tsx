import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import useMint from "@/hooks/useMint";

const MintButton: React.FC<{ tokenId: number }> = ({
  tokenId,
}) => {
  const {
    mint,
    isMintPending,
    isMintLoading,
    getRemainingCooldown,
  } = useMint();

  const remainingCooldown = getRemainingCooldown();
  const [currentCooldown, setCurrentCooldown] = useState(
    remainingCooldown
  );

  const isDisabled =
    isMintPending || isMintLoading || currentCooldown > 0;

  useEffect(() => {
    setCurrentCooldown(remainingCooldown);
    if (remainingCooldown > 0) {
      const interval = setInterval(() => {
        setCurrentCooldown((prev) => Math.max(0, prev - 1));
        if (currentCooldown === 0) clearInterval(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [remainingCooldown, currentCooldown]);

  const getCooldownText = () => {
    if (remainingCooldown <= 0) return null;
    const minutes = Math.floor(remainingCooldown / 60);
    const seconds = remainingCooldown % 60;
    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <button
      onClick={() => mint(tokenId)}
      disabled={isDisabled}
      className={`
        action-button bg-gradient-to-r from-pink-500 to-purple-500
      `}
    >
      {isMintPending || isMintLoading ? (
        <Loader2 className="loader-icon" />
      ) : remainingCooldown > 0 ? (
        `Cooldown ${getCooldownText()}`
      ) : (
        "Mint"
      )}
    </button>
  );
};

export default MintButton;
