"use client";
import React from "react";
import NFTCard from "./nft-card/NFTCard";

const NFTCollection = () => {
  const tokens = [0, 1, 2, 3, 4, 5, 6].map((tokenId) => ({
    tokenId,
  }));
  const freeTokens = tokens.filter(
    (token) => token.tokenId <= 2
  );
  const premiumTokens = tokens.filter(
    (token) => token.tokenId >= 3
  );

  return (
    <div className="space-y-36 w-full max-[630px]:px-11">
      {/* Free Tokens Section */}
      <div className="w-full">
        <h2 className="text-4xl font-bold mb-10 text-text-subtle">
          Free Tokens
        </h2>
        <div className="grid grid-cols-1 min-[630px]:grid-cols-2 min-[850px]:grid-cols-3 gap-12 min-[1200px]:gap-20 w-full">
          {freeTokens.map((token) => (
            <div key={token.tokenId} className="w-full">
              <NFTCard tokenId={token.tokenId} />
            </div>
          ))}
        </div>
      </div>

      {/* Premium Tokens Section */}
      <div className="w-full">
        <h2 className="text-4xl font-bold mb-10 text-text-subtle">
          Premium Tokens
        </h2>
        <div className="grid grid-cols-1 min-[630px]:grid-cols-2 min-[850px]:grid-cols-3 gap-12 min-[1200px]:gap-20 w-full">
          {premiumTokens.map((token) => (
            <div key={token.tokenId} className="w-full">
              <NFTCard tokenId={token.tokenId} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTCollection;
