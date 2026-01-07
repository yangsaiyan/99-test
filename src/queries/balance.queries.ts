import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddBalance, GetBalance, SwapBalance } from "../api/balance/balance.api";
import { useWalletStore } from "../stores/walletStore";
import { CreateWalletAddress } from "../api/wallet/wallet.api";

export const balanceKeys = {
  all: ["balances"] as const,
  byWallet: (address: string) => [...balanceKeys.all, address] as const,
};

export const useBalanceQuery = (walletAddress: string) =>
  useQuery({
    queryKey: balanceKeys.byWallet(walletAddress),
    queryFn: () => GetBalance(walletAddress),
    enabled: !!walletAddress,
  });

export const useSwapBalanceMutation = () => {
  const { walletAddress } = useWalletStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SwapBalance,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: balanceKeys.byWallet(walletAddress),
      }),
  });
};

export const useAddBalanceMutation = () => {
  const { walletAddress } = useWalletStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddBalance,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: balanceKeys.byWallet(walletAddress),
      }),
  });
};

export const useCreateWalletAddressMutation = () => {
  const { walletAddress } = useWalletStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateWalletAddress,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: balanceKeys.byWallet(walletAddress),
      }),
  });
};