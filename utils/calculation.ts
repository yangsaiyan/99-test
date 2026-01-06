import type { Token } from "../src/api/token/token.type";
import Decimal from "decimal.js";

export function calcSwapAmount(
  fromToken: Token,
  toToken: Token,
  amount: number
): string {
  const fromTokenPrice = new Decimal(fromToken.price.toString());
  const toTokenPrice = new Decimal(toToken.price.toString());
  return fromTokenPrice.mul(amount).div(toTokenPrice).toString();
}
