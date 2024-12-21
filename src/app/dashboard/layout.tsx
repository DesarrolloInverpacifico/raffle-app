"use client";
import DashboardSidebar from "@/components/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isFetchingUser, userLogged, errorLogin } = useAuth({
		middleware: "auth",
		redirectIfAuthenticated: "/login",
	});

	console.log(userLogged);
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<main className="w-full px-6">
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
