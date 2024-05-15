import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";



export const Watch = () => {
    const navigation = useNavigate();
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

    const deleteWatch= () => {
        fetch(`http://localhost:3002/api/watch/${id}`, {
            method: "DELETE",
        }).then(r => {
            console.log(r);
        })
    navigation("/buy-a-watch");
}

    return (
        <>
            <p>Brand {watch.brand}</p>
            <p>Model: {watch.model}</p>
            <p>Price: {watch.price}$</p>
            <p>Created at: {watch.created_at}</p>
            <button onClick={deleteWatch}>Delete Watch</button>
        </>
    )

}