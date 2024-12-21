"use client";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export default function Home() {
	const { isFetchingUser, isMounted } = useAuth({
		middleware: "guest",
		redirectIfAuthenticated: "/dashboard",
	});
	return <h1>Hello word!</h1>;
}
