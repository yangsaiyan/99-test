import { useMemo, type ReactNode } from "react";
import WalletRow from "../components/data/wallet/WalletRow";

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: Blockchain
}
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    blockchain: Blockchain
    formatted: string;
}

interface BoxProps {

}

interface Props extends BoxProps {
    children: ReactNode
}

enum Blockchain {
    Osmosis = 'Osmosis',
    Ethereum = 'Ethereum',
    Arbitrum = 'Arbitrum',
    Zilliqa = 'Zilliqa',
    Neo = 'Neo'
}

const Three: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    // const balances: WalletBalance[] = useWalletBalances();
    // const prices = usePrices();

    // Mock Wallet Balances
    const balances: WalletBalance[] = [
        { currency: 'ZIL', amount: 500, blockchain: Blockchain.Zilliqa },
        { currency: 'ATOM', amount: 120, blockchain: Blockchain.Osmosis },
        { currency: 'NEO', amount: 15, blockchain: Blockchain.Neo },
        { currency: 'ARB', amount: 10, blockchain: Blockchain.Arbitrum },
        { currency: 'ETH', amount: 2.5, blockchain: Blockchain.Ethereum },
    ];

    // Mock Prices
    const prices: Record<string, number> = {
        ATOM: 5,
        ETH: 3000,
        ARB: 0.5,
        ZIL: 1,
        NEO: 3,
    };

    const getPriority = (blockchain: Blockchain): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 200
            case 'Ethereum':
                return 50
            case 'Arbitrum':
                return 30
            case 'Zilliqa':
                return 20
            case 'Neo':
                return 20
            default:
                return -99
        }
    }

    const sortedBalances = useMemo(() => {
        if (!balances) return [];

        return balances
            .filter(b => getPriority(b.blockchain) > -99)
            .map(b => ({
                ...b,
                formatted: b.amount.toFixed(),
            }))
            .sort(
                (a, b) =>
                    getPriority(b.blockchain) - getPriority(a.blockchain)
            );
    }, [balances, prices]);


    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                // className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        )
    })

    return (
        <div className="px-[20px] w-full h-full flex flex-col justify-center items-center" {...rest}>
            {rows}
        </div>
    )
}

export default Three