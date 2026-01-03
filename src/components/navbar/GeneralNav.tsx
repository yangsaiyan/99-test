import { Link, useLocation } from "react-router";

export default function GeneralNav() {

    const routes = useLocation()

    return (
        <div className="mt-[10px] px-[40px] w-4/5 min-h-[60px] self-center bg-black border border-solid border-white/20 rounded-[40px] flex justify-start items-center gap-[50px] *:!text-white">
            <Link to={'/one'} className="data-[active=true]:!text-white/50" data-active={routes.pathname === "/one"}>One</Link>
            <Link to={'/two'} className="data-[active=true]:!text-white/50" data-active={routes.pathname === "/two"}>Two</Link>
            <Link to={'/three'} className="data-[active=true]:!text-white/50" data-active={routes.pathname === "/three"}>Three</Link>
        </div>
    )
}
