import { RaffleParticipant } from "@/types/raffle-participant";
import { RafflePrize } from "@/types/raffle-prize";
import { ColumnDef } from "@tanstack/react-table";

const ListPrizeTableColumn: ColumnDef<RafflePrize>[] = [
	{
		accessorKey: "attributes.name",
		header: "Nombre",
	},
	{
		accessorKey: "attributes.description",
		header: "Descripción",
	},
];

export default ListPrizeTableColumn;
