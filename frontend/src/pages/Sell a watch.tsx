import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const SellAWatch = () => {
    const navigation = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const formData = new FormData();
            formData.append('brand', data.brand);
            formData.append('model', data.model);
            formData.append('price', data.price);
            formData.append('image', data.image[0]); // Assuming 'image' is the file input name

            const response = await fetch(`http://localhost:3001/api/watch`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error creating watch');
            }

            navigation("/buy-a-watch");
        } catch (error) {
            console.error('Error creating watch:', error);
            // Optionally handle error feedback to the user
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Brand:</label>
            <input type="text" {...register("brand", { required: true })} />
            {errors.brand && <h4>Brand is required</h4>}
            <label>Model:</label>
            <input type="text" {...register("model", { required: true })} />
            {errors.model && <h4>Model is required</h4>}
            <label>Price:</label>
            <input type="number" {...register("price", { required: true })} />
            {errors.price && <h4>Price is required</h4>}
            <label>Image:</label>
            <input type="file" {...register("image", { required: true })} />
            {errors.image && <h4>Image is required</h4>}
            <input type="submit" />
        </form>
    );
};
