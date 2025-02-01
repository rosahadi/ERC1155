import {
  TOKEN_COLLECTION_ABI,
  TOKEN_COLLECTION_ADDRESS,
} from "@/constants/TokenCollection";
import { useState } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

function useBurn() {
  const { address } = useAccount();
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

  const burn = (id: number, amount = 1) => {
    setPendingTokenId(id);
    writeContract({
      address: TOKEN_COLLECTION_ADDRESS,
      abi: TOKEN_COLLECTION_ABI,
      functionName: "burn",
      args: [address, BigInt(id), BigInt(amount)],
    });
  };

  return {
    burn,
    isBurnPending: pendingTokenId !== null && isPending,
    isBurnSuccess: isSuccess,
    isBurnLoading: isLoading,
    BurnError: writeError,
  };
}

export default useBurn;
