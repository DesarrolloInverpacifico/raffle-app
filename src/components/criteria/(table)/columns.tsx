import { RaffleCriteria } from "@/types/raffle-criteria";
import { RaffleParticipant } from "@/types/raffle-participant";
import { ColumnDef } from "@tanstack/react-table";

const ListCriteriaTableColumn: ColumnDef<RaffleCriteria>[] = [
	{
		accessorKey: "attributes.prize",
		header: "Premiio",
	},
	{
		accessorKey: "attributes.position",
		header: "Posición",
	},
];

export default ListCriteriaTableColumn;
