import { ApiGet, ApiPost } from "../http";
import type {
  Balance,
  SwapBalance as SwapBalanceType,
  AddBalance,
} from "./balance.type";
import { getDelay } from "../../../utils/localStorage";

export async function GetBalance(walletAddress: string) {
  return await ApiGet<Balance[]>(`balance/${walletAddress}/${getDelay()}`);
}

export async function SwapBalance(data: SwapBalanceType) {
  return await ApiPost<void>(
    `balance/swap/${data.fromToken}/${data.toToken}/${data.amount}/${data.walletAddress}/${getDelay()}`,
    {}
  );
}

export async function AddBalance(data: AddBalance) {
  return await ApiPost<void>(
    `balance/add/${data.currency}/${data.balance}/${data.walletAddress}/${getDelay()}`,
    data
  );
}
