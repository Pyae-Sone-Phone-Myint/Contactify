import React, { useState } from "react";
import { useLoginMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router";
import { PasswordInput, TextInput } from "@mantine/core";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/feature/authSlice";
import { useForm } from "@mantine/form";
import {  BiKey } from "react-icons/bi";
import {  GoMail } from "react-icons/go";
import { SyncLoader } from "react-spinners";

const Login = () => {
	const [failed, setFailed] = useState("");
	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			password: (value) =>
				value.length > 8 ? "Password must be 8 characters" : null,
		},
	});

	const [login,{isLoading}] = useLoginMutation();
	const nav = useNavigate();

	const dispatch = useDispatch();

	return (
		<div className="flex  mx-auto items-center justify-center">
			<div className="  w-1/2">
				<img
					src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg?size=626&ext=jpg"
					className="  hidden md:block w-auto"
					alt=""
				/>
			</div>
			<div className=" flex justify-center items-center h-screen w-full md:w-1/2">
				<form
					onSubmit={form.onSubmit(async (values) => {
						const { data, error } = await login(values);
						dispatch(addUser({ user: data?.user, token: data?.token }));
						if (data?.success) {
							nav("/");
						} else if (error) {
							setFailed(error?.data?.message);
						}
					})}
					className=" flex flex-col gap-5 w-96 p-7 shadow-md h-[80%]"
				>
					<h1 className=" text-3xl font-bold text-center">Contactify</h1>
					<h3 className=" text-xl font-medium text-center">Hello Again</h3>
					<h2 className=" text-gray-800 font-medium text-2x">Login</h2>

					<div className=" flex gap-3 items-center">
						<GoMail className=" text-xl mr-3" />

						<TextInput
						required
							className=" w-full"
							withAsterisk
							{...form.getInputProps("email")}
							placeholder="Enter your email..."
						/>
					</div>
					{failed?.length != 0 ? (
						<p className=" text-red-600 text-sm m-0">{failed}</p>
					) : null}
					<div className=" flex gap-3 items-center">
						<BiKey className=" text-xl mr-3" />
						<PasswordInput
						required
							className=" w-full"
							withAsterisk
							{...form.getInputProps("password")}
							placeholder="Enter your password ..."
						/>
					</div>

					<button
						disabled={isLoading&&true}
						type="submit"
						className=" btn-color text-color  px-4 py-2 tracking-wider shadow-sm hover:bg-orange-700 duration-300 rounded"
					>
						{isLoading ? (<SyncLoader color="#d6b336" />): "Login"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
