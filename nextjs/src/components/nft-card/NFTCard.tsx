"use client";
import React, { useEffect, useState } from "react";
import NFTImage from "./NFTImage";
import NFTMetadata from "./NFTMetadata";
import NFTActions from "./NFTActions";
import useBalance from "@/hooks/useBalance";

const IPFS_BASE_URL =
  "ipfs://bafybeie5ecok52umnm4ohgbmi6grr2tmpkvlkildoqxt22o7jxcla6logu/";

interface TokenCardProps {
  tokenId: number;
}

const NFTCard: React.FC<TokenCardProps> = ({ tokenId }) => {
  const [metadata, setMetadata] = useState<{
    name?: string;
    description?: string;
    image?: string;
  }>({});
  const [imageUrl, setImageUrl] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [metadataError, setMetadataError] = useState<
    string | null
  >(null);

  const {
    tokenBalances,
    isBalanceLoading,
    refetchBalance,
  } = useBalance();

  useEffect(() => {
    if (
      tokenBalances &&
      tokenBalances[tokenId] !== undefined
    ) {
      setBalance(Number(tokenBalances[tokenId]));
    }
  }, [tokenBalances, tokenId]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const fullUrl = `${IPFS_BASE_URL}${tokenId}.json`;
        const response = await fetch(
          fullUrl.replace(
            "ipfs://",
            "https://ipfs.io/ipfs/"
          )
        );
        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}`
          );
        }
        const data = await response.json();
        setMetadata(data);
        if (data.image) {
          const resolvedImageUrl = data.image
            .replace("ipfs://", "https://ipfs.io/ipfs/")
            .replace(
              "ipfs://ipfs/",
              "https://ipfs.io/ipfs/"
            );
          setImageUrl(resolvedImageUrl);
        }
      } catch (error) {
        console.error(
          `Error fetching metadata for token ${tokenId}:`,
          error
        );
        setMetadataError(
          error instanceof Error
            ? error.message
            : String(error)
        );
      } finally {
      }
    };

    fetchMetadata();
  }, [tokenId]);

  const requiredTokens: Record<
    number,
    { tokenId: number; amount: number }[]
  > = {
    3: [
      { tokenId: 0, amount: 1 },
      { tokenId: 1, amount: 1 },
    ],
    4: [
      { tokenId: 1, amount: 1 },
      { tokenId: 2, amount: 1 },
    ],
    5: [
      { tokenId: 0, amount: 1 },
      { tokenId: 2, amount: 1 },
    ],
    6: [
      { tokenId: 0, amount: 1 },
      { tokenId: 1, amount: 1 },
      { tokenId: 2, amount: 1 },
    ],
  };

  const renderRequiredTokens = () => {
    const required = requiredTokens[tokenId] || [];
    return required.map(({ tokenId, amount }) => (
      <div key={tokenId}>
        Collection #{tokenId + 1} x {amount}
      </div>
    ));
  };

  return (
    <div className="w-full flex flex-col overflow-hidden rounded-lg bg-card">
      <NFTImage imageUrl={imageUrl} metadata={metadata} />

      <div className="flex flex-col gap-8 p-8">
        <NFTMetadata
          metadata={metadata}
          tokenId={tokenId}
          balance={balance}
        />

        {(tokenId === 3 ||
          tokenId === 4 ||
          tokenId === 5 ||
          tokenId === 6) && (
          <div className="p-4 rounded-lg bg-background-glow flex flex-col justify-center">
            <span className="text-text-primary text-[1.8rem]">
              Forge Requirement:
            </span>
            <div className="text-2xl text-text-subtle mt-2">
              {renderRequiredTokens()}
            </div>
          </div>
        )}

        <NFTActions tokenId={tokenId} balance={balance} />
      </div>
    </div>
  );
};

export default NFTCard;
