import { Button } from "@/components/ui/button";
import { RaffleType } from "../../../types/raffle";
import { ColumnDef } from "@tanstack/react-table";
import FormattedDate from "../../formatted-date";
import ActionsListRaffles from "./actions";

const ListRaffleTableColumn: ColumnDef<RaffleType>[] = [
	{
		accessorKey: "attributes.name",
		header: "Nombre",
	},
	{
		accessorKey: "attributes.description",
		header: "Descripción",
	},
	{
		id: "date",
		accessorKey: "attributes.date",
		header: "Fecha del sorteo",
		cell: ({ row }) => {
			const date = row.original.attributes?.date;

			//     console.log(date)
			return <FormattedDate date={date} />;
		},
	},
	{
		accessorKey: "attributes.created_at",
		header: "Fecha de creación",
		cell: ({ row }) => {
			const date = row.original.attributes?.created_at;

			//     console.log(date)
			return <FormattedDate date={date} />;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const id = row.original.id;

			return <ActionsListRaffles raffleId={id} />;
		},
	},
];

export default ListRaffleTableColumn;
