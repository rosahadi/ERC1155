import BurnButton from "./nft-actions/BurnButton";
import ForgeButton from "./nft-actions/ForgeButton";
import MintButton from "./nft-actions/MintButton";
import TradeButton from "./nft-actions/TradeButton";

const NFTActions: React.FC<{
  tokenId: number;
  balance: number;
}> = ({ tokenId, balance }) => {
  return (
    <div>
      {/* Mint & Trade Logic */}
      {tokenId <= 2 && (
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <MintButton
              onMint={() => console.log("mint")}
              isPending={false}
            />
          </div>
          {balance > 0 && (
            <div className="flex-1">
              <TradeButton
                tokenId={tokenId}
                onTrade={() => console.log("trade")}
                isPending={false}
                balance={balance}
              />
            </div>
          )}
        </div>
      )}

      {/* Forge & Burn Logic */}
      {tokenId >= 3 && (
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <ForgeButton
              onForge={() => console.log("forge")}
              isPending={false}
              balance={balance}
            />
          </div>
          {balance > 0 && (
            <div className="flex-1">
              <BurnButton
                onBurn={() => console.log("burn")}
                isPending={false}
                balance={balance}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NFTActions;
