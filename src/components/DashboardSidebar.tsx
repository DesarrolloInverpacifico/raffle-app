import { Home, UsersRound } from "lucide-react";
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	Sidebar,
} from "./ui/sidebar";

const items = [
	{
		title: "Inicio",
		url: "/dashboard",
		icon: Home,
	},
	{
		title: "Personas",
		url: "/dashboard/people",
		icon: UsersRound,
	},
	{
		title: "Sorteos",
		url: "/dashboard/raffles",
		icon: Home,
	},
];
const DashboardSidebar = () => {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};

export default DashboardSidebar;
