import {Link, Outlet} from "react-router-dom";

export const Layout = () => {
    return (
        <>
            <nav>
                <li><Link to={"/home"}>Home</Link></li>
                <li><Link to={"/services"}>Services</Link></li>
            </nav>

            <Outlet/>
        </>
    )
}