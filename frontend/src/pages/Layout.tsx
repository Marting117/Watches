import {Link, Outlet} from "react-router-dom";
export const Layout = () => {
    return (
        <>
            <nav className="navbar">
                <img className="logo" src="logo.png" alt="Logo" />
                <li><Link to={"/home"}>Home</Link></li>
                <li><Link to={"/buy-a-watch"}>Buy a Watch</Link></li>
                <li><Link to={"/sell-a-watch"}>
                    <button className="sellawatch">Sell a Watch</button>
                </Link></li>
                <li><Link to={"/about-us"}>About Us</Link></li>
            </nav>
            <div className="layout">
                <main className="content">
                    <Outlet />
                </main>
                <footer className="footer">
                    <div className="socials">
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src="Instagram_icon.png" alt="Instagram" />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src="facebook.png" alt="Facebook" />
                        </a>
                        <a href="https://mail.google.com">
                            <img src="Gmail.png" alt="Email" />
                        </a>
                    </div>
                </footer>
            </div>
        </>
    );
}