import { ApiGet, ApiPost } from "../http";
import type { Balance, SwapBalance as SwapBalanceType } from "./balance.type";

export async function GetBalance(walletAddress: string) {
  return await ApiGet<Balance[]>(`balance/${walletAddress}`);
}

export async function SwapBalance(data: SwapBalanceType) {
  return await ApiPost<void>(
    `balance/swap/${data.fromToken}/${data.toToken}/${data.amount}/${data.walletAddress}`,
    {}
  );
}
