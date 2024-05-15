import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Layout} from "./pages/Layout.tsx";
import {Home} from "./pages/Home.tsx";
import {BuyAWatch} from "./pages/Buy a watch.tsx";
import {NotFound} from "./pages/NotFound.tsx";
import {SellAWatch} from "./pages/Sell a watch.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Layout/>}>
                        <Route path={"/home"} element={<Home/>}/>
                        <Route path={"/buy-a-watch"} element={<BuyAWatch/>}/>
                        <Route path={"/sell-a-watch"} element={<SellAWatch/>}/>
                        <Route path={"*"} element={<NotFound/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
