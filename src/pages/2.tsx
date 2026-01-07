import { useEffect, useMemo, useState } from "react";
import SwapAmount from "../components/input/SwapAmount";
import { RxUpdate } from "react-icons/rx";
import { getTokenSVG } from "../../utils/svg";
import { useWalletStore } from "../stores/walletStore";
import type { Balance } from "../api/balance/balance.type";
import { calcSwapAmount } from "../../utils/calculation";
import {
  balanceKeys,
  useAddBalanceMutation,
  useCreateWalletAddressMutation,
  useSwapBalanceMutation,
} from "../queries/balance.queries";
import { tokenKeys } from "../queries/token.queries";
import type { Token } from "../api/token/token.type";
import { useToastStore } from "../stores/toastStore";
import FullscreenLottiePlayer from "../components/player/FullscreenLottiePlayer";
import swappingLottie from "../assets/lotties/swapping.json";
import { useQueries } from "@tanstack/react-query";
import { GetTokens } from "../api/token/token.api";
import { GetBalance } from "../api/balance/balance.api";
import MockDataForm from "../components/form/MockDataForm";

export default function Two() {
  const { walletAddress } = useWalletStore();
  const { addToast } = useToastStore();

  const [
    { data: tokens = [] as Token[], isPending: isLoadingTokens = false },
    { data: balances = [] as Balance[], isPending: isLoadingBalances = false },
  ] = useQueries({
    queries: [
      {
        // Get tokens
        queryKey: tokenKeys.all,
        queryFn: GetTokens,
      },
      {
        // Get balances
        queryKey: balanceKeys.byWallet(walletAddress),
        queryFn: () => GetBalance(walletAddress),
      },
    ],
  });

  const { mutateAsync: SwapBalance, isPending: isLoadingSwapBalance } =
    useSwapBalanceMutation();
  const { isPending: isLoadingAddBalance } = useAddBalanceMutation();
  const { isPending: isLoadingCreateWalletAddress } =
    useCreateWalletAddressMutation();

  const [payToken, setPayToken] = useState<Token>({ currency: "", price: 0 });
  const [receiveToken, setReceiveToken] = useState<Token>({
    currency: "",
    price: 0,
  });
  const [payAmount, setPayAmount] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  const [tokenCurrencies, setTokenCurrencies] = useState<string[]>([]);

  const balance = useMemo(() => {
    return (
      balances?.find(
        (balance: Balance) => balance.currency === payToken.currency
      )?.balance || 0
    );
  }, [balances, payToken.currency]);

  const isLoading = useMemo(() => {
    return (
      isLoadingTokens ||
      isLoadingBalances ||
      isLoadingAddBalance ||
      isLoadingCreateWalletAddress
    );
  }, [
    isLoadingTokens,
    isLoadingBalances,
    isLoadingAddBalance,
    isLoadingCreateWalletAddress,
  ]);

  function onSwap() {
    const tempPayToken = payToken;
    setPayToken(receiveToken);
    setReceiveToken(tempPayToken);
    resetAmounts();
  }

  function resetAmounts() {
    setPayAmount("");
    setReceiveAmount("");
  }

  function onSelectionChange(currency: string, action: "pay" | "receive") {
    const token = tokens?.find((token) => token.currency === currency) || {
      currency: "",
      price: 0,
    };
    switch (action) {
      case "pay":
        setPayToken(token);
        setReceiveAmount(
          calcSwapAmount(payToken, receiveToken, Number(payAmount))
        );
        break;
      case "receive":
        setReceiveToken(token);
        setPayAmount(
          calcSwapAmount(receiveToken, payToken, Number(receiveAmount))
        );
        break;
      default:
        break;
    }
    resetAmounts();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const thisPayAmount = Number(payAmount);
    const thisReceiveAmount = Number(receiveAmount);
    if (thisPayAmount <= 0 || thisReceiveAmount <= 0) {
      addToast({
        message: "Amount must be greater than 0",
        type: "error",
        duration: 3000,
      });
      return;
    }

    if (thisPayAmount > balance) {
      addToast({
        message: "Insufficient balance",
        type: "error",
        duration: 3000,
      });
      return;
    }

    try {
      await SwapBalance({
        fromToken: payToken.currency,
        toToken: receiveToken.currency,
        amount: payAmount,
        walletAddress: walletAddress,
      });
      addToast({
        message: "Swap successful",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
      addToast({
        message: "Swap failed",
        type: "error",
        duration: 3000,
      });
    }
  }

  useEffect(() => {
    if (tokens && tokens.length > 0) {
      setTokenCurrencies(tokens.map((token) => token.currency));
      setPayToken(
        tokens.find((token) => token.currency === "USDC") ||
          tokens[0] || { currency: "", price: 0 }
      );
      setReceiveToken(
        tokens.find((token) => token.currency === "ETH") ||
          tokens[1] ||
          tokens[0] || { currency: "", price: 0 }
      );
    }
  }, [tokens]);

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center gap-[30px]">
      {/* Swapping animation */}
      {isLoadingSwapBalance && (
        <FullscreenLottiePlayer lottieJson={swappingLottie} />
      )}
      {/* Mock data form */}
      <MockDataForm tokenCurrencies={tokenCurrencies} />
      {/* Swap form */}
      <form
        className="mx-[16px] px-[20px] py-[15px] sm:px-[40px] sm:py-[25px] w-full min-w-[300px] max-w-[560px] h-[400px] grid grid-rows-10 rounded-[20px] bg-[#f0f0f0] transition-all ease-in-out duration-300"
        onSubmit={onSubmit}
      >
        {/* Loading animation */}
        {isLoading ? (
          <div className="row-span-8 flex flex-col justify-center items-center gap-[12px]">
            <div className="skeleton h-full w-full bg-gray-200 rounded-[20px]"></div>
            <div className="skeleton h-full w-full bg-gray-200 rounded-[20px]"></div>
          </div>
        ) : (
          <div className="relative row-span-8 flex flex-col justify-center items-center gap-[12px]">
            {/* Pay amount input */}
            <SwapAmount
              index={0}
              amount={payAmount}
              setAmount={(amount) => {
                setPayAmount(amount);
                setReceiveAmount(
                  calcSwapAmount(payToken, receiveToken, Number(amount))
                );
              }}
              selectPercentage={true}
              balance={balance}
              getSVG={getTokenSVG}
              selected={payToken.currency}
              selection={tokenCurrencies}
              setSelection={(token) => onSelectionChange(token, "pay")}
            />
            {/* Swap button */}
            <button
              onClick={() => onSwap()}
              type="button"
              className="!p-[8px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 !rounded-full !bg-[#512ACC]"
            >
              <RxUpdate className="text-[16px] sm:text-[24px] text-white hover:rotate-180 transition-all duration-300" />
            </button>
            {/* Receive amount input */}
            <SwapAmount
              index={1}
              amount={receiveAmount}
              setAmount={(amount) => {
                setReceiveAmount(amount);
                setPayAmount(
                  calcSwapAmount(receiveToken, payToken, Number(amount))
                );
              }}
              getSVG={getTokenSVG}
              selected={receiveToken.currency}
              selection={tokenCurrencies}
              setSelection={(token) => onSelectionChange(token, "receive")}
            />
          </div>
        )}
        <div className="row-span-1" />
        {/* Confirm swap button */}
        <button
          type="submit"
          className="btn w-full row-span-2 row-start-10 !bg-[#512ACC] !rounded-[20px]"
        >
          <p className="text-[16px] text-white">CONFIRM SWAP</p>
        </button>
      </form>
    </div>
  );
}
