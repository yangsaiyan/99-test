import { create } from "zustand";

interface WalletStoreProps {
  getWalletAddress: () => string;
}

export const useWalletStore = create<WalletStoreProps>(() => ({
  getWalletAddress: () => {
    return localStorage.getItem("walletAddress") || "";
  },
}));
