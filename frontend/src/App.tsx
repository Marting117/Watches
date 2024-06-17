import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Layout} from "./pages/Layout.tsx";
import {Home} from "./pages/Home.tsx";
import {BuyAWatch} from "./pages/Buy a watch.tsx";
import {NotFound} from "./pages/NotFound.tsx";
import {SellAWatch} from "./pages/Sell a watch.tsx";
import {Watch} from "./pages/Watch.tsx";
import { AboutUs } from "./pages/About Us.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Layout/>}>
                        <Route path={"/home"} element={<Home/>}/>
                        <Route path={"/buy-a-watch"} element={<BuyAWatch/>}/>
                        <Route path={"/sell-a-watch"} element={<SellAWatch/>}/>
                        <Route path={"/watches/:id"} element={<Watch/>}/>
                        <Route path={"*"} element={<NotFound/>}/>
                        <Route path={"/about-us"} element={<AboutUs/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
