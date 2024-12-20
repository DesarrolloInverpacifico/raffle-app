import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pen, Settings, Trash } from "lucide-react";
import { useState } from "react";

interface ListRaffleActionTableProps {
	raffleId: number;
}

const ActionsListRaffles = ({ raffleId }: ListRaffleActionTableProps) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Acciones</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<a
						href={`/dashboard/raffles/${raffleId}/edit`}
						className="w-full flex"
					>
						<Pen size={13} className="mr-4" />
						<span>Editar</span>
					</a>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						setIsDeleting(true);
					}}
				>
					<Trash size={13} className="mr-2" />
					<span>Eliminar</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ActionsListRaffles;
