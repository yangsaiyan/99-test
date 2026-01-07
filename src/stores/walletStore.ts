import { create } from "zustand";

interface WalletStoreProps {
  walletAddress: string;
  setWalletAddress: (walletAddress: string) => void;
}

export const useWalletStore = create<WalletStoreProps>((set) => ({
  walletAddress: "",
  setWalletAddress: (walletAddress: string) => set({ walletAddress }),
}));
