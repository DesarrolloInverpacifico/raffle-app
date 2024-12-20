import { RaffleParticipant } from "@/types/raffle-participant";
import { ColumnDef } from "@tanstack/react-table";

const ListParticipantTableColumn: ColumnDef<RaffleParticipant>[] = [
	{
		accessorKey: "attributes.name",
		header: "Nombre",
	},
	{
		accessorKey: "attributes.identification_number",
		header: "Cedula",
	},
	{
		accessorKey: "attributes.email",
		header: "Correo electronico",
	},
];

export default ListParticipantTableColumn;
