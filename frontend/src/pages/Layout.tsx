import {Link, Outlet} from "react-router-dom";
export const Layout = () => {
    return (
        <>
            <nav className="navbar">
                <img className="logo" src="logo.png" alt="Logo"/>
                <li><Link to={"/home"}>Home</Link></li>
                <li><Link to={"/buy-a-watch"}>Buy a Watch</Link></li>
                <li><Link to={"/sell-a-watch"}>
                    <button className="sellawatch">Sell a Watch</button>
                </Link></li>
            </nav>

            <Outlet/>
        </>
    )
}