"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "../input";
import { Button } from "../button";
import { FormLoginData, LoginSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const LoginComponent = () => {
	const {
		handleSubmit,
		setError,
		formState: {},
		register,
	} = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
	});

	const {
		isLoading,
		errors: errorsLogin,
		login,
	} = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/dashboard",
	});

	const handleLogin = (data: FormLoginData) => {
		login(data);
	};

	useEffect(() => {}, []);

	return (
		<form onSubmit={handleSubmit(handleLogin)}>
			<div className="my-4">
				<Label>Usuario</Label>
				<Input type="text" placeholder="jhon_doe" {...register("username")} />
			</div>
			<div className="my-4">
				<Label>Contraseña</Label>
				<Input type="password" placeholder="***" {...register("password")} />
			</div>
			<div className="my-4">
				<Button type="submit" variant={"default"} className="w-full">
					Iniciar sesión
				</Button>
			</div>
		</form>
	);
};

export default LoginComponent;
