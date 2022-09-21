import React, { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
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

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <h2 className="text-2xl mt-4 ml-2">Customer Login</h2>
            <hr className="shadow-lg my-4 border-b-2" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="email" value="Email" />

                    <TextInput
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password" value="Password" />

                    <TextInput
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-start mt-4">
                    <PrimaryButton className="" processing={processing}>
                        Sign in
                    </PrimaryButton>
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-gray-600 hover:text-gray-900 my-2 mx-4"
                        >
                            Lost Your Password ?
                        </Link>
                    )}
                </div>
            </form>
        </GuestLayout>
    );
}
