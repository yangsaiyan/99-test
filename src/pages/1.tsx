import { useState } from "react";
import DefaultSelect from "../components/select/DefaultSelect";
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "../../utils/sum";

export default function One() {
  const availableMethods = ["One", "Two", "Three"];
  const [method, setMethod] = useState<string>("one");
  const [num, setNum] = useState<string>(
    "Enter a number"
  );
  const [answer, setAnswer] = useState<number>(0);

  function sumWithX(num: number) {
    switch (method) {
      case "One":
        const a = sum_to_n_a(num);
        setAnswer(a);
        break;
      case "Two":
        const b = sum_to_n_b(num);
        setAnswer(b);
        break;
      case "Three":
        const c = sum_to_n_c(num);
        setAnswer(c);
        break;
      default:
        const d = sum_to_n_a(num);
        setAnswer(d);
        break;
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value: string = e.target?.value;
    if (!value) {
      setNum("Enter a number");
      return;
    }
    setNum(value);
    sumWithX(Number(value));
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full flex flex-col justify-center items-center gap-[50px]">
        <div className="w-full max-w-[600px] h-[250px] flex flex-col items-center gap-[40px] break-all">
          <p className="text-[24px] font-bold line-clamp-4">{num}</p>
          <p className="text-[24px] font-bold">{answer}</p>
        </div>
        <div className="w-9/10 flex flex-row justify-center">
          <input
            onChange={onChange}
            type="text"
            placeholder="Type here"
            className="input w-3/5"
          />
          <DefaultSelect
            className="w-2/5 max-w-[100px]"
            defaultSelection={availableMethods[0]}
            selection={availableMethods}
            setSelection={setMethod}
          />
        </div>
      </div>
    </div>
  );
}
