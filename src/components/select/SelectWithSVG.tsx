import { RxChevronDown } from "react-icons/rx";

interface DefaultSelectProps<T extends number | string> {
  selectedToken: T;
  selection: T[];
  setSelection: (select: T) => void;
  getSVG: (s: string) => string;
  className?: string;
}

export default function SelectWithIcon<T extends number | string>(
  props: DefaultSelectProps<T>
) {
  const { selectedToken, selection, setSelection, className, getSVG } = props;

  function onSelect(item: T) {
    setSelection(item);
  }

  return (
    <div className={`dropdown dropdown-center h-fit ${className}`}>
      <div
        tabIndex={0}
        role="button"
        className="btn relative mx-auto w-9/10 bg-[#512ACC] m-1 flex flex-row justify-between items-center gap-[10px]"
      >
        <div className="flex flex-row justify-between items-center gap-[10px]">
          <img src={getSVG(selectedToken.toString())} />
          {selectedToken}
        </div>
        <RxChevronDown className="text-[24px] text-white" />
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content bg-[#512ACCAA] backdrop-blur-sm menu w-full max-[300px] h-[300px] flex-nowrap overflow-y-scroll rounded-[10px]"
      >
        {selection?.map((item) => {
          return (
            <li key={item.toString()} onClick={() => onSelect(item as T)}>
              <a className="!text-white">
                <img src={getSVG(item.toString())} />
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
