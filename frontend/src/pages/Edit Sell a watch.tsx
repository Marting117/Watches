import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Watch } from "../interface/Watch"; // Adjust import path based on your file structure

export const EditSellAWatch = () => {
    const navigation = useNavigate();
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
                const result = await fetch(`http://localhost:3002/api/watches/${id}`);
                const fetchedWatch = await result.json();
                console.log({ fetchedWatch });
                setWatch(fetchedWatch);
            } catch (error) {
                console.error("Error fetching watch:", error);
            }
        };

        getWatch();
    }, [id]);

    const onSubmit = async (data: any) => {
        try {
            // Perform form data validation if needed

            // Send PUT request to update watch data
            const response = await fetch(`http://localhost:3002/api/watch/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    brand: data.brand,
                    model: data.model,
                    price: data.price,
                    image: watch.image, // Assuming watch.image is set correctly
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update watch");
            }

            // Optionally handle response or success message

            // Navigate to another page after successful update
            navigation("/buy-a-watch");
        } catch (error) {
            console.error("Error updating watch:", error);
            // Handle error state or display error message
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Brand:</label>
            <input type="text" defaultValue={watch?.brand} {...register("brand", { required: true })} />
            {errors.brand && <h4>Brand is required</h4>}
            <label>Model:</label>
            <input type="text" defaultValue={watch?.model} {...register("model", { required: true })} />
            {errors.model && <h4>Model is required</h4>}
            <label>Price:</label>
            <input type="number" defaultValue={watch?.price} {...register("price", { required: true })} />
            {errors.price && <h4>Price is required</h4>}
            <label>Image:</label>
            <input type="file" {...register("image")} />
            <input type="submit" />
        </form>
    );
};
