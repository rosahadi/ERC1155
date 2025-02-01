import {
  TOKEN_COLLECTION_ABI,
  TOKEN_COLLECTION_ADDRESS,
} from "@/constants/TokenCollection";
import { useMintStore } from "@/store/useMintStore";
import { useEffect } from "react";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

function useMint() {
  const {
    isMintPending,
    isMintLoading,
    activeTokenId,
    setCooldownTimestamp,
    setMintPending,
    setMintLoading,
    setActiveTokenId,
    getRemainingCooldown,
  } = useMintStore();

  const {
    writeContract,
    isPending,
    data: hash,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const { data: COOLDOWN } = useReadContract({
    address: TOKEN_COLLECTION_ADDRESS,
    abi: TOKEN_COLLECTION_ABI,
    functionName: "COOLDOWN",
  });

  const { isLoading, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    setMintPending(isPending);
    if (!isPending && !isLoading) setActiveTokenId(null);
  }, [
    isPending,
    isLoading,
    setMintPending,
    setActiveTokenId,
  ]);

  useEffect(() => {
    setMintLoading(isLoading);
  }, [isLoading, setMintLoading]);

  useEffect(() => {
    if (writeError) {
      setMintPending(false);
      setMintLoading(false);
      setActiveTokenId(null);
      resetWrite?.();
    }
  }, [
    writeError,
    resetWrite,
    setMintPending,
    setMintLoading,
    setActiveTokenId,
  ]);

  useEffect(() => {
    if (isSuccess && activeTokenId !== null) {
      const newCooldownTimestamp =
        Date.now() + (Number(COOLDOWN) ?? 0) * 1000;
      setCooldownTimestamp(newCooldownTimestamp);
      setActiveTokenId(null);
    }
  }, [
    isSuccess,
    activeTokenId,
    COOLDOWN,
    setCooldownTimestamp,
    setActiveTokenId,
  ]);

  const mint = (id: number) => {
    if (
      getRemainingCooldown() > 0 ||
      isMintPending ||
      isMintLoading
    )
      return;

    setActiveTokenId(id);
    writeContract({
      address: TOKEN_COLLECTION_ADDRESS,
      abi: TOKEN_COLLECTION_ABI,
      functionName: "mint",
      args: [BigInt(id)],
    });
  };

  return {
    mint,
    isMintPending,
    isMintSuccess: isSuccess,
    isMintLoading,
    mintError: writeError,
    getRemainingCooldown,
    activeTokenId,
  };
}

export default useMint;
