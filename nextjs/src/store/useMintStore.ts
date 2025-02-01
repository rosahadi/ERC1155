import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MintState {
  cooldownTimestamp: number;
  isMintPending: boolean;
  isMintLoading: boolean;
  activeTokenId: number | null;
  setCooldownTimestamp: (timestamp: number) => void;
  setMintPending: (pending: boolean) => void;
  setMintLoading: (loading: boolean) => void;
  setActiveTokenId: (tokenId: number | null) => void;
  getRemainingCooldown: () => number;
}

export const useMintStore = create<MintState>()(
  persist(
    (set, get) => ({
      cooldownTimestamp: 0,
      isMintPending: false,
      isMintLoading: false,
      activeTokenId: null,

      setCooldownTimestamp: (timestamp) =>
        set({ cooldownTimestamp: timestamp }),
      setMintPending: (pending) =>
        set({ isMintPending: pending }),
      setMintLoading: (loading) =>
        set({ isMintLoading: loading }),
      setActiveTokenId: (tokenId) =>
        set({ activeTokenId: tokenId }),

      getRemainingCooldown: () => {
        const cooldown = get().cooldownTimestamp;
        return Math.max(
          0,
          Math.ceil((cooldown - Date.now()) / 1000)
        );
      },
    }),
    { name: "mint-store" }
  )
);
