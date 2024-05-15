import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export const Watch = () => {
    const {id} = useParams();
    const [watch, setWatches] = useState([] as any)
    useEffect(() => {
        const getWatches = async () => {
            const result = await fetch(`http://localhost:3002/api/watches/${id}`);
            const watches = await result.json();
            console.log({watches});
            setWatches(watches);
        }
        getWatches().then();
    }, []);
    return (
        <>
            <p>{watch.brand}</p>
            <p>{watch.model}</p>
            <p>{watch.price}</p>
            <p>{watch.created_at}</p>
        </>
    )
}