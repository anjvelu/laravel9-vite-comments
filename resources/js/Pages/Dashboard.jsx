import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";

export default function Dashboard(props) {
    const { comment } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        description: "",
    });

    const [comments, setComments] = useState(comment || []);

    const [errors, setErrors] = useState([]);
    useEffect(() => {
        return () => {
            reset("description");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    // console.log(route().current());

    const submit = async (e) => {
        e.preventDefault();
        try {
            const {
                data: { data: response },
            } = await axios.post(route(route().current()), { ...data });
            //console.log(response);
            setComments([response, ...comments]);
        } catch (error) {
            console.log(error);
            const { status = 0, data } = error.response || { status: 0 };
            if (status == 422) {
                setErrors(data.errors);
            }
        } finally {
            reset("description");
        }
    };
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-1">
                <div className="flex-grow w-full p-4">
                    <div className="flex w-full p-8 border-b-4 border-gray-300">
                        <form onSubmit={submit} className="w-full p-4">
                            <label className="block mb-2">
                                <span className="text-gray-600">Comment</span>
                                <textarea
                                    name="description"
                                    className="block w-full mt-1 rounded"
                                    rows="3"
                                    onChange={onHandleChange}
                                    value={data.description}
                                />
                            </label>
                            {errors.description && (
                                <div className="text-red-600">
                                    {errors.description}
                                </div>
                            )}
                            <PrimaryButton className="" processing={processing}>
                                Submit
                            </PrimaryButton>
                        </form>
                    </div>
                    {comments.map((item) => (
                        <div
                            key={item.id}
                            className="flex w-full p-8 border-b border-gray-300"
                        >
                            <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
                            <div className="flex flex-col flex-grow ml-4">
                                <div className="flex">
                                    <span className="font-bold">
                                        {item.name} -{" "}
                                        {item.is_admin ? "Admin" : "Customer"}
                                    </span>
                                    <span className="ml-auto text-sm">
                                        {item.created_at}
                                    </span>
                                </div>
                                <p className="mt-1">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
