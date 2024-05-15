import {Link, Outlet} from "react-router-dom";
export const Layout = () => {
    return (
        <>
            <nav className="navbar">
                <li><Link to={"/home"}>Home</Link></li>
                <li><Link to={"/buy-a-watch"}>Buy a Watch</Link></li>
                <li><Link to={"/sell-a-watch"}><button className={"sellawatch"}>Sell a Watch</button></Link></li>
            </nav>

            <Outlet/>
        </>
    )
}