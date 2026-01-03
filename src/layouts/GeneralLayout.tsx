import { type ReactElement } from "react";
import GeneralNav from "../components/navbar/GeneralNav";

interface GeneralLayoutProps {
    children: ReactElement
}

export default function GeneralLayout({ children }: GeneralLayoutProps) {

    return (
        <div className="w-full h-full flex flex-col justify-start items-start">
            <GeneralNav />
            {children}
        </div>
    )
}
