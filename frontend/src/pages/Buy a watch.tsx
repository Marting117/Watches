import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Watch } from '../interface/Watch';

export const BuyAWatch = () => {
    const [watches, setWatches] = useState<Watch[]>([]);

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
        <div>
            <h1>Buy a Watch</h1>
            <ul>
                {watches.map((watch: Watch) => (
                    <li key={watch.id}>
                        <Link to={`/watches/${watch.id}`}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                {watch.image && (
                                    <img
                                        src={`http://localhost:3001/${watch.image}`}
                                        alt={`${watch.brand} ${watch.model}`}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px' }}
                                    />
                                )}
                                <div>
                                    <p>Brand: {watch.brand}</p>
                                    <p>Model: {watch.model}</p>
                                    <p>Price: {watch.price}$</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
