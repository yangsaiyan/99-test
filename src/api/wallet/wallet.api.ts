import { ApiPost } from "../http";
import { getDelay } from "../../../utils/localStorage";

export async function CreateWalletAddress(data: { walletAddress: string }) {
  return await ApiPost<void>(
    `wallets/${data.walletAddress}/${getDelay()}`,
    data
  );
}
