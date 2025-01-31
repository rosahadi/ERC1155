const NFTMetadata: React.FC<{
  metadata: { name?: string; description?: string };
  tokenId: number;
  balance: number;
}> = ({ metadata, tokenId, balance }) => {
  return (
    <div className="flex justify-between items-center gap-3">
      <h3 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 bg-clip-text text-transparent">
        {metadata.name || `Token #${tokenId}`}
      </h3>
      <span className="text-2xl text-zinc-400">
        Balance: {balance}
      </span>
    </div>
  );
};

export default NFTMetadata;
