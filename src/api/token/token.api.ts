import { ApiGet } from "../http";
import type { Token } from "./token.type";

export async function GetTokens() {
  return await ApiGet<Token[]>(`tokens`);
};
