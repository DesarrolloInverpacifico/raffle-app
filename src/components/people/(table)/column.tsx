import { RaffleParticipant } from "@/types/raffle-participant";
import { RafflePrize } from "@/types/raffle-prize";
import { ColumnDef } from "@tanstack/react-table";

const ListPeopleTableColumn: ColumnDef<RafflePrize>[] = [
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
		header: "Número de identificación",
	},
];

export default ListPeopleTableColumn;
