import { useQuery } from "@tanstack/react-query";
import { GetTokens } from "../api/token/token.api";

export const tokenKeys = {
  all: ["tokens"] as const,
  byCurrency: (currency: string) => [...tokenKeys.all, currency] as const,
};

export const useTokenQuery = () => {
  return useQuery({
    queryKey: tokenKeys.all,
    queryFn: GetTokens,
    staleTime: 10000,
  });
};
