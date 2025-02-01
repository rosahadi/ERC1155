import {
  TOKEN_FORGE_ABI,
  TOKEN_FORGE_ADDRESS,
} from "@/constants/TokenForge";
import { useState } from "react";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

function useForge() {
  const [pendingTokenId, setPendingTokenId] = useState<
    number | null
  >(null);

  const {
    writeContract,
    isPending,
    data: hash,
    error: writeError,
  } = useWriteContract();

  const { isLoading, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  const forge = (id: number) => {
    setPendingTokenId(id);
    writeContract({
      address: TOKEN_FORGE_ADDRESS,
      abi: TOKEN_FORGE_ABI,
      functionName: "forge",
      args: [BigInt(id)],
    });
  };

  return {
    forge,
    isForgePending: pendingTokenId !== null && isPending,
    isForgeSuccess: isSuccess,
    isForgeLoading: isLoading,
    forgeError: writeError,
  };
}

export default useForge;
