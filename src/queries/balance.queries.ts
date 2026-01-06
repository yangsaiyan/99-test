import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetBalance, SwapBalance } from "../api/balance/balance.api";

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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SwapBalance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: balanceKeys.all,
      });
    },
  });
};
