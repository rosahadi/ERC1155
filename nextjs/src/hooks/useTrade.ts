import {
  TOKEN_COLLECTION_ABI,
  TOKEN_COLLECTION_ADDRESS,
} from "@/constants/TokenCollection";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

function useTrade() {
  const {
    writeContract,
    isPending,
    data: hash,
    error: writeError,
  } = useWriteContract();

  const { isLoading, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  const trade = (
    tokenToGive: number,
    tokenToReceive: number,
    amount = 1
  ) => {
    if (tokenToGive > 2 || tokenToReceive > 2) {
      throw new Error("Token IDs must be 0, 1, or 2");
    }

    writeContract({
      address: TOKEN_COLLECTION_ADDRESS,
      abi: TOKEN_COLLECTION_ABI,
      functionName: "trade",
      args: [
        BigInt(tokenToGive),
        BigInt(tokenToReceive),
        BigInt(amount),
      ],
    });
  };

  return {
    trade,
    isTradePending: isPending,
    isTradeSuccess: isSuccess,
    isTradeLoading: isLoading,
    tradeError: writeError,
  };
}

export default useTrade;
