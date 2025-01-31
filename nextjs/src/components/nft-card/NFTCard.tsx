"use client";
import React, { useEffect, useState } from "react";
import NFTImage from "./NFTImage";
import NFTMetadata from "./NFTMetadata";
import NFTActions from "./NFTActions";

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
  const [balance, setBalance] = useState<number>(2);
  const [isLoading, setIsLoading] = useState(true);
  const [metadataError, setMetadataError] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setIsLoading(true);
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
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [tokenId]);

  return (
    <div className="w-full flex flex-col overflow-hidden rounded-lg bg-card">
      <NFTImage imageUrl={imageUrl} metadata={metadata} />

      <div className="flex flex-col gap-8 p-8">
        <NFTMetadata
          metadata={metadata}
          tokenId={tokenId}
          balance={balance}
        />
        <NFTActions tokenId={tokenId} balance={balance} />
      </div>
    </div>
  );
};

export default NFTCard;
