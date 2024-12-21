import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RaffleParticipant } from "@/types/raffle-participant";
import { ColumnDef } from "@tanstack/react-table";

const ListParticipantTableColumn: ColumnDef<RaffleParticipant>[] = [
	{
		accessorKey: "attributes.name",
		header: "Nombre",
	},
	{
		accessorKey: "attributes.lastName",
		header: "Apellidos",
	},
	{
		accessorKey: "attributes.identification_number",
		header: "Cedula",
	},
	{
		id: "is_active",
		accessorKey: "attributes.is_active",
		header: "Asistencia",
		cell: ({ row }) => {
			const winner = row.original.attributes?.is_active;

			return (
				<Badge className={cn(winner ? "bg-green-500" : "bg-red-500")}>
					{winner ? "Si" : "No"}
				</Badge>
			);
		},
	},
	{
		id: "is_winner",
		accessorKey: "attributes.is_winner",
		header: "Ganador",
		cell: ({ row }) => {
			const winner = row.original.attributes?.is_winner;

			return (
				<Badge className={cn(winner ? "bg-green-500" : "bg-red-500")}>
					{winner ? "Si" : "No"}
				</Badge>
			);
		},
	},
	{
		id: "actions",
	},
];

export default ListParticipantTableColumn;
