import { Cat } from "lucide-react";
import Image from "next/image";

const NFTImage: React.FC<{
  imageUrl: string;
  metadata: { name?: string };
}> = ({ imageUrl, metadata }) => {
  return (
    <div className="relative aspect-square w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={metadata.name || "NFT Image"}
          fill
          objectFit="cover"
          unoptimized={true}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full animate-[spin_3s_linear_infinite] opacity-75 blur-lg" />
            <div className="relative w-full h-full rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Cat className="w-12 h-12 text-white animate-[spin_2s_linear_infinite]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTImage;
