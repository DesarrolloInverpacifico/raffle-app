"use client";
import DashboardSidebar from "@/components/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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
