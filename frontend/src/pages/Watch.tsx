import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Watch as IWatch } from "../interface/Watch.ts";
import { EditSellAWatch } from "./Edit Sell a watch.tsx"; // Adjust import path based on your file structure

export const Watch = () => {
    const navigation = useNavigate();
    const { id } = useParams();
    const [watch, setWatch] = useState<IWatch>({ id: 0, brand: "", model: "", price: 0, image_url: "" });
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState("");

    useEffect(() => {
        const getWatch = async () => {
            try {
                const result = await fetch(`http://localhost:3001/api/watches/${id}`);
                if (!result.ok) {
                    throw new Error("Failed to fetch watch");
                }
                const fetchedWatch = await result.json();
                setWatch(fetchedWatch);
            } catch (error) {
                console.error("Error fetching watch:", error);
            }
        };

        getWatch();
    }, [id]);

    const editWatch = () => {
        setIsEditFormOpen(true);
    };

    const deleteWatch = () => {
        fetch(`http://localhost:3001/api/watch/${id}`, {
            method: "DELETE",
        })
            .then((r) => {
                console.log(r);
                // Optionally show a success message or handle navigation
                navigation("/buy-a-watch");
            })
            .catch((error) => {
                console.error("Error deleting watch:", error);
                // Handle error state or display error message
            });
    };

    const openModal = (image: string) => {
        setModalImage(image);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {isEditFormOpen ? (
                <EditSellAWatch />
            ) : (
                <div>
                    <h1>Watch Details</h1>
                    {watch.image_url && (
                        <div>
                            <img
                                src={`http://localhost:3001/uploads/${watch.image_url}`}
                                alt={`${watch.brand} ${watch.model}`}
                                style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "20px", cursor: "pointer" }}
                                onClick={() => openModal(`http://localhost:3001/uploads/${watch.image_url}`)}
                            />
                        </div>
                    )}
                    <p>Brand: {watch.brand}</p>
                    <p>Model: {watch.model}</p>
                    <p>Price: {watch.price}$</p>

                    <button onClick={deleteWatch}>Delete Watch</button>
                    <button onClick={editWatch}>Edit Watch</button>
                </div>
            )}

            {/* Modal for displaying bigger image */}
            {showModal && (
                <div className="modal" onClick={closeModal}>
                    <img src={modalImage} alt="Watch" className="modal-image" />
                </div>
            )}
        </>
    );
};
