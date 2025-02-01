import {
  TOKEN_COLLECTION_ABI,
  TOKEN_COLLECTION_ADDRESS,
} from "@/constants/TokenCollection";
import { useEffect, useState } from "react";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

function useMint() {
  const [cooldownTimestamps, setCooldownTimestamps] =
    useState<number>(() =>
      parseInt(
        sessionStorage.getItem("mintCooldown") ?? "0",
        10
      )
    );

  const [pendingTokenId, setPendingTokenId] = useState<
    number | null
  >(null);

  const {
    writeContract,
    isPending,
    data: hash,
    error: writeError,
  } = useWriteContract();

  const { data: COOLDOWN } = useReadContract({
    address: TOKEN_COLLECTION_ADDRESS,
    abi: TOKEN_COLLECTION_ABI,
    functionName: "COOLDOWN",
  });

  const { isLoading, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess && pendingTokenId !== null) {
      const newCooldownTimestamp =
        Date.now() + (Number(COOLDOWN) ?? 0) * 1000;
      setCooldownTimestamps(newCooldownTimestamp);
      sessionStorage.setItem(
        "mintCooldown",
        newCooldownTimestamp.toString()
      );
      setPendingTokenId(null);
    }
  }, [isSuccess, pendingTokenId, COOLDOWN]);

  const getRemainingCooldown = () =>
    Math.max(
      0,
      Math.ceil((cooldownTimestamps - Date.now()) / 1000)
    );

  const mint = (id: number) => {
    if (getRemainingCooldown() > 0) return;
    setPendingTokenId(id);
    writeContract({
      address: TOKEN_COLLECTION_ADDRESS,
      abi: TOKEN_COLLECTION_ABI,
      functionName: "mint",
      args: [BigInt(id)],
    });
  };

  return {
    mint,
    isMintPending: pendingTokenId !== null && isPending,
    isMintSuccess: isSuccess,
    isMintLoading: isLoading,
    mintError: writeError,
    getRemainingCooldown,
  };
}

export default useMint;
