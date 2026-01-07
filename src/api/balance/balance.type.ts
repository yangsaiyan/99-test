export interface Balance {
  currency: string;
  balance: number;
}

export interface SwapBalance {
  fromToken: string;
  toToken: string;
  amount: string;
  walletAddress: string;
}

export interface AddBalance {
  walletAddress: string;
  balance: string;
  currency: string;
}