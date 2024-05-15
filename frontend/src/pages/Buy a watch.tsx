import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const BuyAWatch = () => {
    const [watches, setWatches] = useState([])
    useEffect(() => {
        const getWatches = async () => {
             const result = await fetch("http://localhost:3002/api/watches");
             const watches = await result.json();
             console.log({ watches });
             setWatches(watches);
        }
        getWatches().then();
    }, [])
    return (
        <>
    <ul>
        {watches.map((watch : any) => {
            return <li key={watch.id}>
                <Link to={`/watches/${watch.id}`}>{ watch.brand } { watch.model }</Link>
            </li>
        })}
    </ul>
        </>
    )
}

