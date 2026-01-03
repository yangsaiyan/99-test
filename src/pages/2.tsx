import { useState } from "react";

export default function Two() {
  const myArray = [
    "BLUR",
    "bNEO",
    "BUSD",
    "USD",
    "ETH",
    "GMX",
    "STEVMOS",
    "LUNA",
    "RATOM",
    "STRD",
    "EVMOS",
    "IBCX",
    "IRIS",
    "ampLUNA",
    "KUJI",
    "STOSMO",
    "axlUSDC",
    "ATOM",
    "STATOM",
    "OSMO",
    "rSWTH",
    "STLUNA",
    "LSI",
    "OKB",
    "OKT",
    "SWTH",
    "USC",
    "USDC",
    "WBTC",
    "wstETH",
    "YieldUSD",
    "ZIL",
  ];

  const [selectedToken, setSelectedToken] = useState<string>(myArray[0]);
  const [selectedToken2, setSelectedToken2] = useState<string>(myArray[0]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="card px-[40px] py-[20px] bg-[#f0f0f0] w-full min-w-[300px] max-w-[560px] h-[300px]">
        <form
          className="w-full h-full grid grid-rows-11"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="row-span-4 border border-white border-dashed"></div>
          <div className="row-span-4 border border-white border-dashed"></div>
          {/* <h5>Swap</h5>
        <label for="input-amount">Amount to send</label>
        <input id="input-amount" />

        <label for="output-amount">Amount to receive</label>
        <input id="output-amount" /> */}
          <div className="row-span-1" />
          <button className="btn w-full row-span-2 !bg-[#512ACC]">CONFIRM SWAP</button>
        </form>
      </div>
    </div>
  );
}
