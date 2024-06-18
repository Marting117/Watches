import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Watch } from "../interface/Watch";

export const EditAWatch = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [watch, setWatch] = useState<Watch>({ id: 0, brand: "", model: "", price: 0 });

    useEffect(() => {
        const getWatch = async () => {
            try {
                const result = await fetch(`http://localhost:3001/api/watches/${id}`);
                const fetchedWatch = await result.json();
                setWatch(fetchedWatch);
            } catch (error) {
                console.error("Error fetching watch:", error);
            }
        };

        getWatch();
    }, [id]);

    const onSubmit = async (data: any) => {
        try {
            const formData = new FormData();
            formData.append('brand', data.brand || watch.brand);
            formData.append('model', data.model || watch.model);
            formData.append('price', data.price || watch.price.toString());

            if (data.image && data.image[0]) {
                if (watch.image_url) {
                    await fetch(`http://localhost:3001/api/delete-image/${watch.image_url}`, {
                        method: 'DELETE',
                    });
                }
                formData.append('image', data.image[0]);
            } else {
                formData.append('image', watch.image_url || '');
            }
            const response = await fetch(`http://localhost:3001/api/watch/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to update watch");
            }

            // Navigate to another page after successful update
            navigate("/buy-a-watch");
        } catch (error) {
            console.error("Error updating watch:", error);
        }
    };

    return (
        <form className="edit-watch-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Edit Watch</h2>
            <div className="form-group">
                <label className="edit-watch-label">Brand:</label>
                <input
                    type="text"
                    defaultValue={watch?.brand}
                    {...register("brand")}
                    className="edit-watch-input"
                />
                {errors.brand && <span className="edit-watch-error">Brand is required</span>}
            </div>
            <div className="form-group">
                <label className="edit-watch-label">Model:</label>
                <input
                    type="text"
                    defaultValue={watch?.model}
                    {...register("model")}
                    className="edit-watch-input"
                />
                {errors.model && <span className="edit-watch-error">Model is required</span>}
            </div>
            <div className="form-group">
                <label className="edit-watch-label">Price:</label>
                <input
                    type="number"
                    defaultValue={watch?.price}
                    {...register("price")}
                    className="edit-watch-input"
                />
                {errors.price && <span className="edit-watch-error">Price is required</span>}
            </div>
            <div className="form-group">
                <label className="edit-watch-label">Image:</label>
                <input type="file" {...register("image")} className="edit-watch-file-input" />
                {watch?.image_url && (
                    <div className="edit-watch-image-preview">
                        <img
                            src={`http://localhost:3001/uploads/${watch.image_url}`}
                            alt={`${watch.brand} ${watch.model}`}
                            className="edit-watch-image"
                        />
                    </div>
                )}
            </div>
            <button type="submit" className="edit-watch-submit-btn">Update Watch</button>
        </form>
    );
};