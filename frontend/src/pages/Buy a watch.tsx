// BuyAWatch.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Watch as IWatch } from "../interface/Watch.ts";

export const BuyAWatch = () => {
    const [watches, setWatches] = useState<IWatch[]>([]);

    useEffect(() => {
        const getWatches = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/watches");
                if (!response.ok) {
                    throw new Error('Failed to fetch watches');
                }
                const watchesData = await response.json();
                setWatches(watchesData);
            } catch (error) {
                console.error("Error fetching watches:", error);
            }
        };

        getWatches();
    }, []);

    return (
        <div className="buy-watch-container">
            <h1 className="centered">Buy a Watch</h1>
            <div className="watches-table">
                {watches.map((watch: IWatch) => (
                    <Link to={`/watches/${watch.id}`} key={watch.id} className="watch-item">
                        {watch.image_url && (
                            <img
                                src={`http://localhost:3001/uploads/${watch.image_url}`}
                                alt={`${watch.brand} ${watch.model}`}
                                className="watch-image"
                            />
                        )}
                        <div className="watch-details">
                            <p>Brand: {watch.brand}</p>
                            <p>Model: {watch.model}</p>
                            <p>Price: {watch.price}$</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
