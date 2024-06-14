import {useEffect, useState,} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Watch as IWatch} from "../interface/Watch.ts";
import {EditSellAWatch} from "./Edit Sell a watch.tsx";

interface Watch{
    brand: string,
    model: string,
    price: number,
}

export const Watch = () => {
    const navigation = useNavigate();
    const {id} = useParams();
    const [watch, setWatches] = useState<IWatch>({} as IWatch)
    const [isEditFormOpen,setIsEditFormOpen] = useState(false)

    useEffect(() => {
        const getWatches = async () => {
            const result = await fetch(`http://localhost:3002/api/watches/${id}`);
            const watches = await result.json();
            console.log({watches});
            setWatches(watches);
        }
        getWatches().then();
    }, []);

    const editWatch= () => {
        setIsEditFormOpen(true);
    }

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
            {isEditFormOpen
                ? <EditSellAWatch/>
                : <>
                    <p>Brand {watch.brand}</p>
                    <p>Model: {watch.model}</p>
                    <p>Price: {watch.price}$</p>
                    <button onClick={deleteWatch}>Delete Watch</button>
                    <button onClick={editWatch}>Edit watch</button>
                </>
            }
        </>
    )

}
