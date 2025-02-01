import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import useMint from "@/hooks/useMint";
import { useMintStore } from "@/store/useMintStore";
import useBalance from "@/hooks/useBalance";

const MintButton: React.FC<{ tokenId: number }> = ({
  tokenId,
}) => {
  const {
    mint,
    isMintPending,
    isMintLoading,
    isMintSuccess,
    activeTokenId,
  } = useMint();

  const { refetchBalance } = useBalance();

  const currentCooldown = useMintStore((state) =>
    state.getRemainingCooldown()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      useMintStore.setState({});
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMintSuccess) {
      refetchBalance();
    }
  }, [isMintSuccess, refetchBalance]);

  const isDisabled =
    isMintPending || isMintLoading || currentCooldown > 0;
  const isActiveToken = activeTokenId === tokenId;

  const getCooldownText = () => {
    if (currentCooldown <= 0) return null;
    const minutes = Math.floor(currentCooldown / 60);
    const seconds = currentCooldown % 60;
    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <button
      onClick={() => mint(tokenId)}
      disabled={isDisabled}
      className={`action-button bg-gradient-to-r from-pink-500 to-purple-500 ${
        isDisabled && !isActiveToken ? "opacity-50" : ""
      }`}
    >
      {(isMintPending || isMintLoading) && isActiveToken ? (
        <Loader2 className="loader-icon" />
      ) : currentCooldown > 0 ? (
        `Cooldown ${getCooldownText()}`
      ) : (
        "Mint"
      )}
    </button>
  );
};

export default MintButton;
