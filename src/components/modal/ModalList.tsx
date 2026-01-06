import { RxMagnifyingGlass } from "react-icons/rx";
import USDC from "../../assets/tokens/USDC.svg";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

interface DefaultSelectProps<T extends number | string> {
  title: string;
  getSVG?: (s: T) => string;
  selection: T[];
  setSelection: (select: T) => void;
  selected: T;
}

export default function ModalList<T extends number | string>(
  props: DefaultSelectProps<T>
) {
  const { title, selection, setSelection, getSVG, selected } = props;

  const isSmallMobile = useMediaQuery({ query: "(max-width: 480px)" });

  const [search, setSearch] = useState<string>("");
  const [searchList, setSearchList] = useState<T[]>(selection ?? []);

  const modalId = `${title.toLowerCase().replaceAll(" ", "_")}_modal`;

  function onSelect(item: T) {
    setSelection(item);
    closeModal();
  }

  function showModal() {
    const modal = document?.getElementById(modalId) as HTMLDialogElement | null;
    modal?.showModal();
    setSearch("");
    setSearchList(selection ?? []);
  }

  function closeModal() {
    const modal = document?.getElementById(modalId) as HTMLDialogElement | null;
    modal?.close();
  }

  function onSearch() {
    setSearchList(
      selection?.filter((item) =>
        item.toString().toLowerCase().includes(search.toLowerCase())
      ) || []
    );
  }

  return (
    <>
      <button
        className={`btn !bg-[#512ACC] text-white !rounded-[20px] ${
          isSmallMobile ? "!min-w-[100px]" : "min-w-[150px]"
        }`}
        type="button"
        onClick={showModal}
      >
        <img src={getSVG?.(selected) || USDC} className="w-[24px] h-[24px]" />
        {!isSmallMobile && selected}
      </button>
      <dialog onClick={closeModal} id={modalId} className="modal">
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal-box !p-0 w-full h-full max-w-[560px] max-h-[400px] flex flex-col justify-start items-start bg-[#f0f0f0dd] backdrop-blur-sm rounded-[20px]"
        >
          <div className="px-[16px] py-[16px] w-full h-fit flex flex-row justify-center items-start gap-[10px]">
            <input
              type="text"
              value={search}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSearch();
                }
              }}
              onChange={(e) => setSearch(e.target.value)}
              className="py-[4px] w-full h-[44px] px-[10px] text-[20px] text-black text-left whitespace-nowrap overflow-hidden border border-black border-solid rounded-[20px] focus:outline-none"
            />
            <button
              onClick={onSearch}
              type="button"
              className="!p-[8px] w-full h-full max-w-[44px] max-h-[44px] !rounded-full !bg-[#512ACC]"
            >
              <RxMagnifyingGlass className="text-[24px] text-white" />
            </button>
          </div>
          <div className="w-full h-[1px] border-t border-black border-solid" />
          <div className="p-[16px] w-full h-full flex flex-col justify-start items-start gap-[10px] overflow-y-scroll">
            {searchList?.map((item) => (
              <div
                key={item}
                className="p-[10px] w-full h-full max-h-[64px] flex flex-row justify-start items-center gap-[10px] cursor-pointer hover:!bg-black/10 data-[selected=true]:!bg-black/10 transition-all duration-300 rounded-[20px]"
                data-selected={selected === item}
                onClick={() => onSelect(item)}
              >
                <img
                  src={getSVG?.(item) || USDC}
                  className="w-[32px] h-[32px]"
                />
                <p className="text-[28px] text-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
