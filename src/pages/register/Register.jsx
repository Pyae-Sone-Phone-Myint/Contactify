import React, { useState } from "react";
import { useRegisterMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router";
import { PasswordInput, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import { BiKey, BiUser } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { BsShieldLock } from "react-icons/bs";

const Register = () => {
	const [failed, setFailed] = useState("");
	const [register] = useRegisterMutation();
	const nav = useNavigate();

	const form = useForm({
		initialValues: {
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
		},

		validate: {
			name: (value) => (value.length > 4 ? null : "Your name is short"),
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			password: (value) =>
				value.length > 8 ? "Password must be 8 characters" : null,
			password_confirmation: (value, values) =>
				value === values.password ? null : "Retype your password",
		},
	});

	return (
		<div className="container mx-auto shadow-sm flex items-center   ">
			<div className="  ">
				<img
					src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg?size=626&ext=jpg"
					className="hidden md:block w-auto"
					alt=""
				/>
			</div>
			<div className=" flex justify-center items-center h-screen w-full md:w-1/2">
				<form
					onSubmit={form.onSubmit(async (values) => {
						const { data, error } = await register(values);
						if (data?.success) {
							nav("/login");
						} else if (error) {
							setFailed(error?.data?.message);
						}
					})}
					className=" flex flex-col gap-6 w-96 p-7 "
				>
					<h2 className=" text-gray-800 font-medium text-2x">Register</h2>

					<div className=" flex gap-3 items-center">
						<BiUser className=" text-xl mr-3" />

						<TextInput
						required
							withAsterisk
							className=" w-full"
							{...form.getInputProps("name")}
							placeholder="Enter your name..."
						/>
					</div>

					<div className=" flex gap-3 items-center">
						<GoMail className=" text-xl mr-3" />

						<TextInput
						required
							withAsterisk
							className=" w-full"
							{...form.getInputProps("email")}
							placeholder="Enter your email..."
						/>
					</div>
					<div className=" flex gap-3 items-center">
						<BiKey className=" text-xl mr-3" />

						<PasswordInput
						required
							className=" w-full"
							{...form.getInputProps("password")}
							placeholder="Enter your password ..."
						/>
					</div>
					<div className="flex gap-3 items-center">
						<BsShieldLock className=" text-xl mr-3" />

						<PasswordInput
						required
							className=" w-full"
							{...form.getInputProps("password_confirmation")}
							placeholder="Retype your password ..."
						/>
					</div>
					<div className=" flex gap-3">
						<p className=" select-none text-gray-400">
							Already have an account
						</p>
						<Link to={"/login"}>
							<p className=" cursor-pointer select-none text-gray-400">Login</p>
						</Link>
					</div>

					{failed?.length != 0 ? (
						<p className=" text-red-600 text-sm m-0">{failed}</p>
					) : null}
					<button
						type="submit"
						className=" bg-purple-600 text-white px-4 py-2 rounded"
					>
						Sign up
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
