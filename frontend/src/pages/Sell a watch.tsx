import { useForm } from "react-hook-form"
export const SellAWatch = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log({ data });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type={"text"} defaultValue={"dido"} {...register("username")}/>
            <input type={"text"} {...register("password", {
                required: true
            })}/>
            {errors.password && <h3>Password is required</h3>}
            <input type={"submit"}/>
        </form>
    )
}