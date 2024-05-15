import { useForm } from "react-hook-form"
import {useNavigate} from "react-router-dom";
export const SellAWatch = () => {
    const navigation = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        fetch(`http://localhost:3002/api/watch`, {
            method: "POST",
            body: JSON.stringify({
                brand: data.brand,
                model: data.model,
                price: data.price,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then();
        navigation("/buy-a-watch");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Brand:</label>
            <input type={"text"} {...register("brand", {
                required: true
            })}/>
            {errors.brand && <h4>Password is required</h4>}
            <label>Model:</label>
            <input type={"text"} {...register("model", {
                required: true
            })}/>
            {errors.model && <h4>Password is required</h4>}
            <label>Price:</label>
            <input type={"number"} {...register("price", {
                required: true
            })}/>
            {errors.price && <h4>Password is required</h4>}
            <input type={"submit"}/>
        </form>
    )
}