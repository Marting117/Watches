import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const SellAWatch = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append('brand', data.brand);
        formData.append('model', data.model);
        formData.append('price', data.price);
        formData.append('image', data.image[0]);

        try {
            const response = await fetch('http://localhost:3001/api/watch', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to create watch");
            }

            navigate("/buy-a-watch");
        } catch (error) {
            console.error("Error creating watch:", error);
        }
    };

    return (
        <div className="sell-watch-container">
            <h1>Sell Your Watch</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="sell-watch-form">
                <div className="form-group">
                    <label htmlFor="brand">Brand:</label>
                    <input
                        type="text"
                        id="brand"
                        {...register("brand", { required: true })}
                        className={errors.brand ? "error" : ""}
                    />
                    {errors.brand && <span className="error-message">Brand is required</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="model">Model:</label>
                    <input
                        type="text"
                        id="model"
                        {...register("model", { required: true })}
                        className={errors.model ? "error" : ""}
                    />
                    {errors.model && <span className="error-message">Model is required</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        {...register("price", { required: true })}
                        className={errors.price ? "error" : ""}
                    />
                    {errors.price && <span className="error-message">Price is required</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        {...register("image", { required: true })}
                        className={errors.image ? "error" : ""}
                    />
                    {errors.image && <span className="error-message">Image is required</span>}
                </div>

                <div className="button-group1">
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
};
