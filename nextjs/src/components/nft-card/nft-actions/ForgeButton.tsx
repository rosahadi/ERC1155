import React from "react";
import { Loader2 } from "lucide-react";
import useForge from "@/hooks/useForge";

const ForgeButton: React.FC<{
  tokenId: number;
}> = ({ tokenId }) => {
  const { forge, isForgePending, isForgeLoading } =
    useForge();

  const isDisabled = isForgePending || isForgeLoading;

  return (
    <button
      onClick={() => forge(tokenId)}
      disabled={isForgePending || isForgeLoading}
      className={`action-button bg-gradient-to-r from-yellow-500 to-orange-500
        ${isDisabled ? "opacity-50" : ""}
      `}
    >
      {isForgePending || isForgeLoading ? (
        <Loader2 className="loader-icon" />
      ) : (
        "Forge"
      )}
    </button>
  );
};

export default ForgeButton;
