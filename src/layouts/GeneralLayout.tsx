import { useEffect, type ReactNode } from "react";
import GeneralNav from "../components/navbar/GeneralNav";
import GeneralToast from "../components/toast/GeneralToast";
import { useWalletStore } from "../stores/walletStore";

interface GeneralLayoutProps {
  children?: ReactNode;
}

export default function GeneralLayout({ children }: GeneralLayoutProps) {

  const { setWalletAddress } = useWalletStore();
  useEffect(() => {
    const walletAddress = localStorage.getItem("walletAddress");
    if (walletAddress) {
      setWalletAddress(walletAddress);
    }
  }, []);
  
  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <GeneralToast />
      <GeneralNav />
      {children}
    </div>
  );
}
