import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Watch as IWatch } from "../interface/Watch.ts";
import { EditAWatch } from "./Edit a watch.tsx";

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
                navigation("/buy-a-watch");
            })
            .catch((error) => {
                console.error("Error deleting watch:", error);
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
                <EditAWatch />
            ) : (
                <div className="watch-details">
                    <h1>Watch Details</h1>
                    {watch.image_url && (
                        <div>
                            <img
                                src={`http://localhost:3001/uploads/${watch.image_url}`}
                                alt={`${watch.brand} ${watch.model}`}
                                className="watch-image"
                                onClick={() => openModal(`http://localhost:3001/uploads/${watch.image_url}`)}
                            />
                        </div>
                    )}
                    <p><strong>Brand:</strong> {watch.brand}</p>
                    <p><strong>Model:</strong> {watch.model}</p>
                    <p><strong>Price:</strong> {watch.price}$</p>

                    <div className="action-buttons">
                        <button className="delete-button" onClick={deleteWatch}>Buy this watch</button>
                        <button className="edit-button" onClick={editWatch}>Edit Watch</button>
                    </div>
                </div>
            )}
            {showModal && (
                <div className="modal" onClick={closeModal}>
                    <img src={modalImage} alt="Watch" className="modal-image" />
                </div>
            )}
        </>
    );
};