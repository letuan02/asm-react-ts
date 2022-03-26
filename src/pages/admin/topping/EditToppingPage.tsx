import { yupResolver } from "@hookform/resolvers/yup";
import toastr from "toastr";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { get, update } from "../../../api/topping";
import { useEffect } from "react";

type InputsType = {
    name: string,
    price: number,
}

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Vui lòng nhập tên Topping"),
    price: yup
        .number()
        .min(0, "Vui lòng nhập lại giá")
        .required("Vui lòng nhập giá Topping")
})

const EditToppingPage = () => {
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<InputsType>({ resolver: yupResolver(schema) });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<InputsType> = async data => {
        try {
            await update(data);
            toastr.success("Cập nhật topping thành công");
            navigate("/admin/topping");
        } catch (error: any) {
            toastr.error(error.response.data.error.message || error.response.data.message);
        }
    }

    useEffect(() => {
        // get data
        (async () => {
            const { data } = await get(id);
            reset(data);
        })();
    }, []);

    return (
        <>
            <header className="z-10 fixed top-14 left-0 md:left-60 right-0 px-4 py-1.5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                    <h5 className="relative pr-5 after:content-[''] after:absolute after:w-[1px] after:h-4 after:top-1/2 after:-translate-y-1/2 after:right-2.5 after:bg-gray-300">
                    Topping
                    </h5>
                    <span>Cập nhật Topping</span>
                </div>
                <Link to="/admin/topping">
                    <button type="button" className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        DS Topping
                    </button>
                </Link>
            </header>

            <div className="p-6 mt-24 overflow-hidden">
                <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <span className="font-semibold mb-4 block text-xl">Thông tin chi tiết topping:</span>
                            <div className="grid grid-cols-6 gap-3">
                                <div className="col-span-6">
                                    <label htmlFor="form__add-topping-name" className="block text-sm font-medium text-gray-700">Tên topping</label>
                                    <input
                                        type="text"
                                        {...register("name")}
                                        id="form__add-topping-name"
                                        className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Nhập tên topping"
                                    />
                                    <div className="text-sm mt-0.5 text-red-500">{errors.name?.message}</div>
                                </div>
                                <div className="col-span-6">
                                    <label htmlFor="form__add-topping-price" className="block text-sm font-medium text-gray-700">Giá topping</label>
                                    <input
                                        type="number"
                                        {...register("price")}
                                        id="form__add-topping-price"
                                        className="py-2 px-3 mt-1 border focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Nhập giá topping"
                                    />
                                    <div className="text-sm mt-0.5 text-red-500">{errors.price?.message}</div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cập nhật topping</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditToppingPage;