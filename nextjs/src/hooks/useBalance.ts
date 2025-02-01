import {
  TOKEN_COLLECTION_ABI,
  TOKEN_COLLECTION_ADDRESS,
} from "@/constants/TokenCollection";
import { Abi } from "viem";
import { useAccount, useReadContracts } from "wagmi";

function useBalance() {
  const { address } = useAccount();

  const tokenIds = [0, 1, 2, 3, 4, 5, 6];

  const balanceQueries = useReadContracts({
    contracts: tokenIds.map((tokenId) => ({
      address: TOKEN_COLLECTION_ADDRESS as `0x${string}`,
      abi: TOKEN_COLLECTION_ABI as Abi,

      functionName: "balanceOf",
      args: [address as `0x${string}`, BigInt(tokenId)],
    })),
    query: {
      enabled: !!address,
    },
  });

  const tokenBalances: Record<number, bigint> = {};

  tokenIds.forEach((tokenId, index) => {
    const balanceData = balanceQueries.data?.[index];

    if (
      balanceData?.status === "success" &&
      typeof balanceData.result === "bigint"
    ) {
      tokenBalances[tokenId] = balanceData.result;
    } else {
      tokenBalances[tokenId] = BigInt(0);
    }
  });

  return {
    tokenBalances,
    isBalanceLoading: balanceQueries.isLoading,
    refetchBalance: balanceQueries.refetch,
  };
}

export default useBalance;
