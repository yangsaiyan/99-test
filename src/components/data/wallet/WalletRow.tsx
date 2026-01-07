interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

export default function WalletRow(props: WalletRowProps) {
  const { amount, usdValue, formattedAmount } = props;

  return (
    <div className="w-full grid grid-cols-3 text-center">
      <p>{amount}</p>
      <p>{usdValue + "USD"}</p>
      <p>{formattedAmount}</p>
    </div>
  );
}
