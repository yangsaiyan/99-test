import { ApiGet } from "../http";
import type { Token } from "./token.type";
import { getDelay } from "../../../utils/localStorage";

export async function GetTokens() {
  return await ApiGet<Token[]>(`tokens/${getDelay()}`);
};
