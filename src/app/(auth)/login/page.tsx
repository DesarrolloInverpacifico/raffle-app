"use client";
import LoginComponent from "@/components/ui/auth/login";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
	const { isFetchingUser, isMounted } = useAuth({
		middleware: "guest",
		redirectIfAuthenticated: "/dashboard",
	});

	return (
		<div className="flex justify-center items-center">
			<Card className="w-[90%] md:w-[350] shadow-md mt-10">
				<CardHeader>
					<CardTitle>Iniciar sesión</CardTitle>
				</CardHeader>
				<CardContent>
					<LoginComponent />
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginPage;
