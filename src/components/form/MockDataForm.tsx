import DefaultSelect from "../select/DefaultSelect";
import { useWalletStore } from "../../stores/walletStore";
import { useToastStore } from "../../stores/toastStore";
import { useAddBalanceMutation } from "../../queries/balance.queries";
import { useCreateWalletAddressMutation } from "../../queries/balance.queries";
import { useState } from "react";

interface MockDataFormProps {
  tokenCurrencies: string[];
}

export default function MockDataForm(props: MockDataFormProps) {
  const { tokenCurrencies } = props;
  const { setWalletAddress } = useWalletStore();
  const { addToast } = useToastStore();

  const { mutateAsync: AddBalance, isPending: isLoadingAddBalance } =
    useAddBalanceMutation();
  const {
    mutateAsync: CreateWalletAddress,
    isPending: isLoadingCreateWalletAddress,
  } = useCreateWalletAddressMutation();

  const [mockWalletAddress, setMockWalletAddress] = useState<string>(
    localStorage.getItem("walletAddress") || ""
  );
  const [mockBalance, setMockBalance] = useState<string>("");
  const [mockToken, setMockToken] = useState<string>("");
  const [mockDelay, setMockDelay] = useState<string>(
    localStorage.getItem("mockDelay") || ""
  );

  function handleMockDelayChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === "" || /^[0-9]*$/.test(value)) {
      setMockDelay(value);
    }
  }

  async function onSubmitSetAddress(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    localStorage.setItem("walletAddress", mockWalletAddress);
    setWalletAddress(mockWalletAddress);

    try {
      await CreateWalletAddress({ walletAddress: mockWalletAddress });
      addToast({
        message: "Wallet address set",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
      addToast({
        message: "Failed to set wallet address",
        type: "error",
        duration: 3000,
      });
    }
  }

  async function onSubmitAddBalance(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await AddBalance({
        walletAddress: mockWalletAddress,
        balance: mockBalance,
        currency: mockToken,
      });
      addToast({
        message: "Balance added",
        type: "success",
        duration: 3000,
      });
    } catch (error) {
      addToast({
        message: "Failed to add balance",
        type: "error",
        duration: 3000,
      });
    }
  }

  async function onSubmitAddDelay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    localStorage.setItem("mockDelay", mockDelay);
    addToast({
      message: "Delay added",
      type: "success",
      duration: 3000,
    });
  }

  return (
    <div className="px-[16px] py-[4px] w-full h-full max-w-[600px] max-h-[220px] flex flex-col justify-center items-center gap-[10px] bg-white rounded-[20px] border border-black border-solid">
      <p className="text-[24px] text-black">Add mock data here</p>
      {isLoadingAddBalance || isLoadingCreateWalletAddress ? (
        <div className="w-full h-[156px] flex flex-col justify-center items-center gap-[10px]">
          <span className="loading loading-dots loading-lg text-black"></span>
        </div>
      ) : (
        <>
          <form
            onSubmit={onSubmitSetAddress}
            className="w-full h-fit flex flex-row justify-between items-center gap-[20px]"
          >
            <input
              type="text"
              placeholder="Mock wallet address"
              className="px-[16px] py-[4px] w-full h-full max-h-[44px] text-[24px] text-black text-left border border-black border-solid rounded-[20px] focus:outline-none"
              value={mockWalletAddress}
              onChange={(e) => setMockWalletAddress(e.target.value)}
            />
            <button
              type="submit"
              className="btn min-w-[100px] !bg-[#512ACC] !rounded-[20px]"
            >
              Use
            </button>
          </form>
          <form
            onSubmit={onSubmitAddBalance}
            className="w-full h-fit flex flex-row justify-between items-center gap-[20px]"
          >
            <input
              type="text"
              placeholder="Add balance"
              className="px-[16px] py-[4px] w-full h-full max-h-[44px] text-[24px] text-black text-left border border-black border-solid rounded-[20px] focus:outline-none"
              value={mockBalance}
              onChange={(e) => setMockBalance(e.target.value)}
            />
            <DefaultSelect
              className="relative w-full h-full max-h-[44px] text-[24px] text-black border border-black border-solid rounded-[20px] bg-white focus:outline-none"
              title="mock-token-select"
              defaultSelection={mockToken}
              selection={tokenCurrencies}
              setSelection={(token) => setMockToken(token)}
            />
            <button
              type="submit"
              className="btn min-w-[100px] !bg-[#512ACC] !rounded-[20px]"
            >
              Add
            </button>
          </form>
          <form
            onSubmit={onSubmitAddDelay}
            className="w-full h-fit flex flex-row justify-between items-center gap-[20px]"
          >
            <input
              type="text"
              placeholder="Add delay in seconds"
              className="px-[16px] py-[4px] w-full h-full max-h-[44px] text-[24px] text-black text-left border border-black border-solid rounded-[20px] focus:outline-none"
              value={mockDelay}
              onChange={handleMockDelayChange}
            />
            <button
              type="submit"
              className="btn min-w-[100px] !bg-[#512ACC] !rounded-[20px]"
            >
              Add
            </button>
          </form>
        </>
      )}
    </div>
  );
}
