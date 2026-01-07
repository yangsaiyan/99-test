import ModalList from "../modal/ModalList";
import { useMediaQuery } from "react-responsive";
import { formatBalance } from "../../../utils/format";

interface SwapAmountProps {
  balance?: number;
  index?: number;
  selectPercentage?: boolean;
  amount?: string;
  selected: string;
  selection: string[];
  setAmount?: (amount: string) => void;
  setSelection: (select: string) => void;
  getSVG: (s: string) => string;
}

export default function SwapAmount(props: SwapAmountProps) {
  const {
    index = 0,
    selectPercentage = false,
    selected,
    selection,
    setSelection,
    getSVG,
    balance = 0,
    amount = "",
    setAmount,
  } = props;

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const percentages = [25, 50, 75, 100];

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value !== "" && !value.match(/^\d*\.?\d*$/)) return;

    setAmount?.(value);
  }

  function onPercentageClick(percentage: number) {
    const calculatedAmount = (balance * percentage) / 100;
    setAmount?.(calculatedAmount.toString());
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center rounded-[20px] border border-black border-dashed">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-full h-full flex flex-row justify-start items-center">
          <input
            autoComplete="off"
            name={`swap-amount-${index}`}
            type="text"
            onChange={onInputChange}
            placeholder="0"
            className="px-[10px] w-full h-full text-[24px] text-black text-left focus:outline-none"
            value={amount}
          />
          <div className="relative px-[8px] min-w-fit h-full flex flex-row justify-start items-center gap-[5px]">
            <ModalList
              title={`Balance ${index + 1}`}
              selection={selection}
              setSelection={setSelection}
              getSVG={getSVG}
              selected={selected}
            />
          </div>
        </div>
        {selectPercentage && (
          <div className="px-[10px] py-[5px] w-full h-full max-h-[36px] flex flex-row justify-end items-center">
            {!isMobile && (
              <div className="w-full h-full flex flex-row justify-start items-center gap-[5px]">
                {percentages.map((percentage) => (
                  <button
                    onClick={() => onPercentageClick(percentage)}
                    type="button"
                    key={percentage}
                    className="!px-[4px] !py-0 !border !border-black !border-solid !bg-transparent hover:!bg-black/10 text-[16px] text-black !rounded-[20px]"
                  >
                    {percentage}%
                  </button>
                ))}
              </div>
            )}
            <div className="w-full h-full flex flex-row justify-end items-center overflow-hidden whitespace-nowrap text-ellipsis">
              <p className="w-4/5 text-right text-[16px] text-black/40">
                Balance: {formatBalance(balance)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
